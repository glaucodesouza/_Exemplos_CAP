const cds = require('@sap/cds');
const { ensureDraftsSuffix } = require('@sap/cds/libx/_runtime/fiori/utils/handler');
const actionsBD = require("./utils/actionsBD");

module.exports = cds.service.impl(async function () {

    const { OUTLIERS, TRACK_ORDER, AT_NM_CORREL, VW_FLUXO_PROCESSO_ASSET, ASSET_VERSION, ASSET_VERSION_INBOUND } = this.entities;

    const db = await cds.connect.to('db')

    this.after('READ', 'OUTLIERS', (each) => {
        if (each.cpuDt != '') {
            each.reprocessarEnabled = true
        }
        // if (each.cpuDt != '') {
        //     each.ignorarEnabled = true
        // }
    })

    this.on('reprocessar', async (req) => {
        const ID = req.params[0]
        const n = await UPDATE(OUTLIERS).set({
            status: 'Aguardando Reprocessamento'
        }).where({ ID: ID })
        n > 0 || req.error(404)
    })

    this.on("Reclassificar", async (req) => {
        const cds = require("@sap/cds");
        const tx = cds.tx()

        let selectReclas = SELECT.from`Y_ASSET_TRACKING_RECLASSIFICACAO`.where`STATUS = 'NotProcessed'`
        let hanaReclass = await cds.run(selectReclas);

        for (let inb of hanaReclass) {
            let varkokrs = 'ACPB';
            let varbelnr = inb.DOCUMENTO;
            let varbuzei = inb.LINHALANCAMENTO;

            let selectObj = SELECT.one`Kokrs,Belnr,Buzei,Ebeln,Ebelp,Zekkn,Bukrs,Werks,Gjahr,Matnr,Awtyp,Awkey,Gkont,Timestmp`
                .from("CatalogService.CoepSet")
                .where({
                    Kokrs: varkokrs,
                    Belnr: varbelnr,
                    Buzei: varbuzei.toString()
                })

            let Odata = await cds.connect.to('YGWGL_AT_COEP_SRV');
            let dataRS = await Odata.run(selectObj)

            let resPo = dataRS.Ebeln;
            let resItem = parseInt(dataRS.Ebelp);
            let buzeInt = parseInt(dataRS.Buzei)

            if (resPo != '') {
                let resZekkn = dataRS.Zekkn;
                let resMATDOC = dataRS.Awkey.slice(0, -4);

                let selectPo = SELECT.from`Y_ASSET_TRACKING_ASSET_VERSION`.where({ PO: resPo, POITEM: resItem, MATDOC: resMATDOC, ZEKKN: resZekkn, ISACTIVEVS: true })
                let hanaReclass = await cds.run(selectPo)

                if (hanaReclass.length == 0) {
                    cds.tx(async () => {
                        let update = cds.update('Y_ASSET_TRACKING_RECLASSIFICACAO')
                            .where({ DOCUMENTO: dataRS.Belnr, LINHALANCAMENTO: buzeInt })
                            .with({ STATUSRECLASS: '99', STATUS: 'pendente' })
                        let resSQL = await cds.run(update).then(
                            tx.commit,
                            tx.rollback)
                        console.log(`${resPo} / ${resItem}/ update:${resSQL}`);
                    })
                } else {
                    //Fluxo do [SIM]
                    cds.tx(async () => {
                        let update = cds.update('Y_ASSET_TRACKING_RECLASSIFICACAO')
                            .where({ DOCUMENTO: dataRS.Belnr, LINHALANCAMENTO: buzeInt })
                            .with({ STATUSRECLASS: null, STATUS: 'processando', ASSETVSID: hanaReclass[0].VSID, ASSETID: hanaReclass[0].ASSETID })
                        let resSQL = await cds.run(update).then(tx.commit, tx.rollback)
                        console.log(`>> ${resPo} / ${resItem}/ update:${resSQL}`);
                    })
                }
            } else {
                cds.tx(async () => {
                    let update = cds.update('Y_ASSET_TRACKING_RECLASSIFICACAO')
                        .where({ DOCUMENTO: dataRS.Belnr, LINHALANCAMENTO: buzeInt })
                        .with({ STATUSRECLASS: '99', STATUS: 'pendente' })

                    let resSQL = await cds.run(update).then(tx.commit, tx.rollback)
                    console.log(`${resPo} / ${resItem}/ update:${resSQL}`);
                })

            }
        }
        await cds.run(`CALL "ASSET_TRACKING"."ASSETTRACKING_RECLASSIFICACAO"('processando')`);
        console.log('Finalizado')
        return 'Finalizado';
    })

    //Processo da Outlier
    this.on("OutReprocessar", async (req) => {
        const getDataRes = require('./utils/httpRequestAPI')
        const cds = require("@sap/cds");
        const tx = cds.tx()
        const listoutliId = req.data
        let strlistId = ""
        await cds.tx(async () => {
            for (let outli of listoutliId.ids) {
                strlistId += `'${outli}',`

                let update = cds.update('Y_ASSET_TRACKING_OUTLIERS')
                    .where({ ID: outli })
                    .with({ status: 'ENVIADO PARA REPROCESSAMENTO', outlier: true }) //AGUARDANDO PROCESSAMENTO

                let resSQL = await cds.run(update).then(
                    tx.commit,
                    tx.rollback)
                console.log(`update:${resSQL}`);
            }
        })

        let SelgroupCPUDT = `SELECT LEFT(CPUDT,10) FROM Y_ASSET_TRACKING_OUTLIERS WHERE ID IN (${strlistId.substring(0, strlistId.length - 1)}) GROUP BY LEFT(CPUDT,10)`
        let groupCPUDT = await cds.run(SelgroupCPUDT)

        /** Referente AT 17
         * Aqui segue logica para enviar o range de data para API ABAP
         * Falta desenvolver esta parte
         * 
         * chamadaApi(dtIniti,DtFim)
        
            MAPA

            https://ui5.sap.com/#/entity/sap.ui.vbm.GeoMap

            SAPUI5 SDK - Demo Kit

            PROCESS FLOW
            https://ui5.sap.com/#/entity/sap.suite.ui.commons.ProcessFlow
            SAPUI5 SDK - Demo Kit
            SAPUI5 SDK - Demo Kit
        */

        return "FIM";
    })

    this.on("OutDeletar", async (req) => {
        const cds = require("@sap/cds");
        const tx = cds.tx()
        const listoutliId = req.data
        await cds.tx(async () => {
            for (let outli of listoutliId.ids) {
                let dbdelete = DELETE.from('Y_ASSET_TRACKING_OUTLIERS').where({ ID: outli })
                let resSQL = await cds.run(dbdelete).then(
                    tx.commit,
                    tx.rollback)
                console.log(`dbdelete:${resSQL}`);
            }
        })
        return "FIM";
    });

    this.before(["CREATE", "UPDATE"], "TRACK_ORDER", async (req) => {
        console.log("SAVE");
        try {
            console.log("update on");
            let cds = require("@sap/cds");

            if (req.data.trackOrderID === undefined) {
                //retornar mensagem de erro
                return;
            };

            let vardocTypeCode = req.data.docTypeCode;
            let varassetTypeCode = req.data.assetTypeCode;
            let varassetTypeTo = req.data.assetTypeTo;

            if (vardocTypeCode === undefined ||
                varassetTypeCode === undefined ||
                varassetTypeTo === undefined
            ) {
                //dar mensagem erro aqui indicando os campos vazios
                return;
            };

            let selectDoctAsset = SELECT.one`DoctypeDescr,AssetTypeDescr,AssetTypeToDesc`
                .from("CatalogService.DOCT_ASSETT_SRV")
                .where({
                    DoctypeId: vardocTypeCode,
                    AssetTypeId: varassetTypeCode,
                    AssetTypeTo: varassetTypeTo
                })

            let OdataDOCT_ASSET = await cds.connect.to('YGWGL_AT_DOCT_ASSETT_SRV');
            let ItmDCT_AT = await OdataDOCT_ASSET.run(selectDoctAsset)

            //preencher descrições
            req.data.docTypeDescr = ItmDCT_AT.DoctypeDescr;
            req.data.assetTypeDescr = ItmDCT_AT.AssetTypeDescr;
            req.data.assetTypeToDesc = ItmDCT_AT.AssetTypeToDesc;

            //preencher zeros à esquerda para códigos
            req.data.docTypeCode = ("00000" + req.data.docTypeCode).slice(-5);
            req.data.assetTypeCode = ("00000" + req.data.assetTypeCode).slice(-5);
            req.data.assetTypeTo = ("00000" + req.data.assetTypeTo).slice(-5);

            console.log('Finalizado');
            return req;
        } catch (erro) {
            console.log(erro);
            return;
        }
    });

    this.after(["CREATE", "UPDATE"], "PARCEIRO_FILIAL", (req) => {
        console.log("ASSETTRACKING_PARCEIRO_FILIAL")
        const cds = require("@sap/cds");

        cds.run(`CALL "ASSET_TRACKING"."ASSETTRACKING_PARCEIRO_FILIAL_UNITARIO"(${req.parid},${req.bukrs})`)
        console.log("ASSETTRACKING_PARCEIRO_FILIAL_UNITARIO:: executado")

        console.log("ASSETTRACKING_PARCEIRO_FILIAL_UNITARIO:: executando")

        return "executando"
    })

    this.on("READ", "DatasSet", async (req) => {
        debugger;
        const extServ = await cds.connect.to('YGWGL_AT_CARGAINB_SRV');
        const oReturn = await extServ.run(req.query);
        return oReturn;
    });

    this.on("READ", "CARGAINBDatasSet", async (req) => {
        debugger;
        const extServ = await cds.connect.to('YGWGL_AT_CARGAINB_SRV');
        const oReturn = await extServ.tx(req).run(req.query);
        return oReturn;
    });

    this.on("montaTelaMonitorTracking", async req => {
        const { sObjectId } = req.data

        // Pega infos do v0
        const oVZero = await db.run(
            SELECT.one.from(ASSET_VERSION).where({
                assetId: sObjectId,
                version: 0
            })
        )

        if (!oVZero) {
            return req.error({
                code: 404,
                message: "Versão 0 do asset não encontrada."
            })
        }

        oVZero.cpuDt = oVZero.cpuDt ? formatDatePtBr(oVZero.cpuDt) : ""

        const aAssets = await db.run(
            SELECT.from(VW_FLUXO_PROCESSO_ASSET).where({ paiAssetId: sObjectId })
        )

        // Fornece informacoes iniciais para o objeto geral
        const oProcessflowData = {
            "nodes": [
                {
                    "id": 0,
                    "lane": 0,
                    "title": "0 - " + oVZero.assetTypeDescr,
                    "titleAbbreviation": "0",
                    "children": [],
                    "state": oVZero.isActiveVs ? "Positive" : "Negative",
                    "stateText": "Ativo",
                    "focused": true,
                    "highlighted": false,
                    "texts": [oVZero.docTypeDescr, `Mov: ${oVZero.tpMov} - ${oVZero.cpuDt}`],
                    "vsId": oVZero.vsId
                }
            ],
            "lanes": [
                {
                    "id": "0",
                    "icon": "sap-icon://family-care",
                    "label": "Versão 0",
                    "position": 0
                }
            ],
            "Spots": [
                {
                    pos: `${oVZero.posLong};${oVZero.posLat};0`,
                    type: oVZero.isActiveVs ? "Success" : "Error",
                    tooltip: `V0`,
                    routePosition: ""
                }
            ]
        }

        aAssets.forEach(oAsset => {
            // Verifica se ja existe lane para filhos desse pai, se nao ele cria
            if (!oProcessflowData.lanes.find(oLane => oLane.id == oAsset.paiVersion + 1)) {
                oProcessflowData.lanes.push({
                    id: oAsset.paiVersion + 1,
                    icon: "sap-icon://family-care",
                    label: `Filhos versão ${oAsset.paiVersion}`,
                    position: oProcessflowData.lanes.length,
                })
            }

            // Cria nodes de acordo com informacoes do oData
            oAsset.cpuDt = oAsset.cpuDt ? formatDatePtBr(oAsset.cpuDt) : ""
            oProcessflowData.nodes.push({
                id: oAsset.Version,
                lane: oAsset.paiVersion + 1,
                title: `${oAsset.Version} - ${oAsset.assetTypeDescr}`,
                titleAbbreviation: oAsset.Version,
                children: [],
                state: oAsset.ISActiveVs ? "Positive" : "Negative",
                stateText: oAsset.ISActiveVs ? "Ativo" : "Inativo",
                focused: true,
                highlighted: false,
                texts: [oAsset.docTypeDescr, `Mov: ${oAsset.tpMov} - ${oAsset.cpuDt}`],
                vsId: oAsset.VsId
            })
        })

        // Vincula filhos aos pais nos nodes
        oProcessflowData.lanes.forEach(oLane => {
            if (oLane.position == 0) { return }

            const nIndexNodePai = oProcessflowData.nodes.findIndex(oNode => oNode.id == oLane.id - 1)

            let aFilhos = oProcessflowData.nodes.filter(oNode => (oNode.lane - 1) == oLane.id - 1)
            const sLabelPaiVersion = oProcessflowData.nodes[nIndexNodePai].lane

            aFilhos = aFilhos.map(oFilho => {
                return {
                    nodeId: oFilho.id,
                    connectionLabel: {
                        id: `IDLabel${oFilho.id}`,
                        text: `Pai: ${oLane.id - 1}`,
                        enabled: true,
                        state: "Neutral",
                    }
                }
            })


            oProcessflowData.nodes[nIndexNodePai].children = aFilhos
        })

        // Ordena array de nodes
        oProcessflowData.nodes.sort((node1, node2) => Number(node1.id) < Number(node2.id) ? -1 : 0)

        // Ordena pelo id array de lanes para setar o position certo
        oProcessflowData.lanes.sort((lane1, lane2) => Number(lane1.id) < Number(lane2.id) ? -1 : 0)
        oProcessflowData.lanes.forEach((oLane, index) => oLane.position = index)

        // Adiciona spots
        const mapOData = aAssets.map(oAsset => {
            return {
                posLong: oAsset.posLong,
                posLat: oAsset.posLat,
                isActiveVs: oAsset.isActiveVs,
                Version: oAsset.Version,
                paiVersion: oAsset.paiVersion
            }
        })

        mapOData.forEach(oAsset => {
            if (oAsset.posLat != 0 && oAsset.posLong != 0) {
                const sPosition = `${oAsset.posLong};${oAsset.posLat};0`

                // Pega position do pai
                let sPositionPai
                if (oAsset.paiVersion != 0) {
                    const oAssetPai = aAssets.find(oAssetPai => oAssetPai.Version == oAsset.paiVersion)

                    sPositionPai = `${oAssetPai.posLong};${oAssetPai.posLat};0`
                } else {
                    sPositionPai = oProcessflowData.Spots[0].pos
                }

                oProcessflowData.Spots.push({
                    pos: sPosition,
                    type: oAsset.isActiveVs ? "Success" : "Error",
                    tooltip: `V${oAsset.Version}`,
                    routePosition: sPosition + "; " + sPositionPai
                })
            }
        })

        return oProcessflowData
    })

    this.on("READ", ASSET_VERSION, async (req) => {
        try {
            req.query.SELECT.limit.rows.val = 10000;
        } catch (error) {

        }
        const oReturn = await db.run(
            req.query
        )
        return oReturn;
    });

    this.on("cancelaVs", async req => {
        try {
            const { motivoCancelado, vsId } = req.data;
            const { ID: userId } = req.user;

            await db.run(`
                UPDATE "ASSET_TRACKING"."Y_ASSET_TRACKING_ASSET_VERSION" 
                    SET CANCELADO = true,
                        ISACTIVEVS = false,
                        MOTIVOCANCELADO = '${motivoCancelado}',
                        modifiedAt = now(),
                        modifiedBy = '${userId}'
                    WHERE VSID = '${vsId}'
            `)

            // Pega quantidade do vs
            const [quantidade] = await db.run(`
                SELECT quantidade, inbid FROM "ASSET_TRACKING"."Y_ASSET_TRACKING_ASSET_VERSION"
                    WHERE VSID = '${vsId}'
            `)

            // Logica para pai
            const [pai] = await actionsBD.pegaPai(db, vsId, 'pai.SALDO, pai.VSID')

            if (pai) {
                if (!pai.SALDO) pai.SALDO = 0

                pai.SALDO = Number(pai.SALDO) + Number(quantidade.QUANTIDADE)

                await db.run(`
                    UPDATE "ASSET_TRACKING"."Y_ASSET_TRACKING_ASSET_VERSION"
                        SET SALDO = ${pai.SALDO},
                            isActiveVs = true,
                            modifiedAt = now(),
                            modifiedBy = '${userId}'
                        WHERE VSID = '${pai.VSID}'
                `)
            }

            // Logica para filhos
            const IDsFilhosENetos = await actionsBD.pegaFilhosENetos(db, vsId)

            for (let vsIdLoop of IDsFilhosENetos) {
                await actionsBD.colocaReprocessar(db, vsIdLoop, userId)
            }
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }

        return 'Cancelado com sucesso';
    })

    this.on("selecionarOutliersDashboard", async req => {

        const dtFiltroInicial = req.data.dtFiltroInicial;
        const dtFiltroFinal = req.data.dtFiltroFinal;

        const oSelect = await db.run(
            SELECT.columns(["outlierDescr", "docTypeCode", "COUNT(*) as count"]).from(OUTLIERS).where`cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal}`.limit(1001).groupBy("outlierDescr", "docTypeCode").orderBy({ outlierDescr: "asc", docTypeCode: "asc" })

            //Exemplo BOM
            // SELECT.columns(["outlierDescr", "docTypeCode", "COUNT(*)"]).from(OUTLIERS).where `cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal}`.limit(1001)

            // SELECT.columns(["outlierDescr", "docTypeCode"]).from(OUTLIERS).where(`cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal}`).limit(1001).groupBy(["outlierDescr", "docTypeCode"]).orderBy(["outlierDescr", "docTypeCode"]).count(true)
            // SELECT.columns(["outlierDescr", "docTypeCode"]).from(OUTLIERS).limit(1001).where `cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal}`
            // SELECT.columns(["outlierDescr", "docTypeCode"]).from(OUTLIERS).limit(1000).where({cpuDt: [{'<=':`${dtFiltroFinal}`},{'>=':`${dtFiltroInicial}`}]})
        )

        return oSelect;

        // .groupBy(["outlierDescr", "docTypeCode"]).orderBy(["outlierDescr", "docTypeCode"]).count(true)

        // const dtFiltroInicial = req.data.dtFiltroInicial;
        // const dtFiltroFinal = req.data.dtFiltroFinal;
        // debugger;
        // req.query.SELECT.limit.rows.val = 1000;
        // const oSelect = await db.run(
        //     SELECT `top 1000`.from(OUTLIERS).where `cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal}`
        // )

        // return oSelect;
    });

    this.on("selecionarOutliersDashboard", async req => {

        const dtFiltroInicial = req.data.dtFiltroInicial;
        const dtFiltroFinal = req.data.dtFiltroFinal;

        const oSelect = await db.run(
            SELECT.columns(["outlierDescr", "docTypeCode", "COUNT(*) as count"]).from(OUTLIERS).where`cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal}`.limit(1001).groupBy("outlierDescr", "docTypeCode").orderBy({ outlierDescr: "asc", docTypeCode: "asc" })

            //Exemplo BOM
            // SELECT.columns(["outlierDescr", "docTypeCode", "COUNT(*)"]).from(OUTLIERS).where `cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal}`.limit(1001)

            // SELECT.columns(["outlierDescr", "docTypeCode"]).from(OUTLIERS).where(`cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal}`).limit(1001).groupBy(["outlierDescr", "docTypeCode"]).orderBy(["outlierDescr", "docTypeCode"]).count(true)
            // SELECT.columns(["outlierDescr", "docTypeCode"]).from(OUTLIERS).limit(1001).where `cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal}`
            // SELECT.columns(["outlierDescr", "docTypeCode"]).from(OUTLIERS).limit(1000).where({cpuDt: [{'<=':`${dtFiltroFinal}`},{'>=':`${dtFiltroInicial}`}]})
        )

        return oSelect;

        // .groupBy(["outlierDescr", "docTypeCode"]).orderBy(["outlierDescr", "docTypeCode"]).count(true)

        // const dtFiltroInicial = req.data.dtFiltroInicial;
        // const dtFiltroFinal = req.data.dtFiltroFinal;
        // debugger;
        // req.query.SELECT.limit.rows.val = 1000;
        // const oSelect = await db.run(
        //     SELECT `top 1000`.from(OUTLIERS).where `cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal}`
        // )

        // return oSelect;
    });

    this.on("selectVersionChart1B", async req => {

        const dtFiltroInicial = req.data.dtFiltroInicial;
        const dtFiltroFinal = req.data.dtFiltroFinal;

        const oSelect = await db.run(
            SELECT.columns(["left(cpuDt,7) as mes", "COUNT(*) as count"])
                .from(ASSET_VERSION)
                .where`cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal}`
                .limit(999)
                .groupBy("left(cpuDt,7)")
                .orderBy({ 'left(cpuDt,7)': 'asc' })

        )

        return oSelect;

    });

    this.on("selectOutliersChart1B", async req => {

        const dtFiltroInicial = req.data.dtFiltroInicial;
        const dtFiltroFinal = req.data.dtFiltroFinal;

        const oSelect = await db.run(
            SELECT.columns(["left(cpuDt,7) as mes", "COUNT(*) as count"])
                .from(OUTLIERS)
                .where`cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal}`
                .limit(999)
                .groupBy("left(cpuDt,7)")
                .orderBy({ 'left(cpuDt,7)': 'asc' })

        )

        return oSelect;

    });

    this.on("selectVersionChart2A", async req => {

        const dtFiltroInicial = req.data.dtFiltroInicial;
        const dtFiltroFinal = req.data.dtFiltroFinal;

        const oSelect = await db.run(
            SELECT.columns(["isActiveVs", "cancelado", "COUNT(*) as count"])
                .from(ASSET_VERSION)
                .where`cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal}`
                .limit(999)
                .groupBy("isActiveVs", "cancelado")
                .orderBy({ 'isActiveVs': 'asc', 'cancelado': 'asc' })
        )

        return oSelect;

    });

    this.on("selectVersionChart2B", async req => {

        const dtFiltroInicial = req.data.dtFiltroInicial;
        const dtFiltroFinal = req.data.dtFiltroFinal;

        const oSelect = await db.run(
            SELECT.columns(["assetTypeCode", "docTypeCode", "COUNT(*) as Contador"])
                .from(ASSET_VERSION)
                .where`cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal} and isActiveVs = true`
                .limit(999)
                .groupBy("assetTypeCode", "docTypeCode")
                .orderBy({ 'assetTypeCode': 'asc', 'docTypeCode': 'asc' })
        )

        return oSelect;

    });

    this.on("selectVersionChart2C", async req => {

        const dtFiltroInicial = req.data.dtFiltroInicial;
        const dtFiltroFinal = req.data.dtFiltroFinal;

        const oSelect = await db.run(
            SELECT.columns(["status_PC", "cenario", "COUNT(*) as Contador"])
                .from(ASSET_VERSION)
                .where`cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal} and isActiveVs = true`
                .limit(999)
                .groupBy("status_PC", "cenario")
                .orderBy({ 'status_PC': 'asc', 'cenario': 'asc' })
        )

        return oSelect;

    });

    this.on("selectVersionChart2D", async req => {

        const dtFiltroInicial = req.data.dtFiltroInicial;
        const dtFiltroFinal = req.data.dtFiltroFinal;

        const oSelectV0 = await db.run(
            SELECT.columns(["left(cpuDt,7) as mes", "version", "COUNT(*) as Contador"])
                .from(ASSET_VERSION)
                .where`cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal} and isActiveVs = true and version = 0`
                .limit(999)
                .groupBy("left(cpuDt,7)", "version")
                .orderBy({ 'left(cpuDt,7)': 'asc' })
        )

        const oSelectVN = await db.run(
            SELECT.columns(["left(cpuDt,7) as mes", "COUNT(*) as Contador"])
                .from(ASSET_VERSION)
                .where`cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal} and isActiveVs = true and version > 0`
                .limit(999)
                .groupBy("left(cpuDt,7)")
                .orderBy({ 'left(cpuDt,7)': 'asc' })
        )

        let novoRegistro = {};
        let dadosFinais = [];
        //Adicionar dados de version = 0 (V0)
        oSelectV0.forEach(registroVersionV0 => {
            novoRegistro["Contadorv0"] = registroVersionV0.Contador;
            novoRegistro["Contadorvn"] = 0;
            novoRegistro["mes"] = registroVersionV0.mes;
            dadosFinais.push(novoRegistro);
            novoRegistro = {};
        });

        //Adicionar dados de version > 0 (VN)
        oSelectVN.forEach(registroVersionVn => {
            //Procurar se já existe no chartDados
            let registroExistenteVn = dadosFinais.find((registroDadosFinais) => registroDadosFinais["mes"] == registroVersionVn.mes);
            //Se sim
            if (!!registroExistenteVn) {
                registroExistenteVn["Contadorvn"] = registroVersionVn.Contador;
                // Se não, NOVA LINHA
            } else {
                novoRegistro["Contadorv0"] = 0;
                novoRegistro["Contadorvn"] = registroVersionVn.Contador;
                novoRegistro["mes"] = registroVersionVn.mes;
                dadosFinais.push(novoRegistro);
                novoRegistro = {};
            }
        });

        return dadosFinais;

    });

    this.on("selectOutliersChart3A", async req => {

        const dtFiltroInicial = req.data.dtFiltroInicial;
        const dtFiltroFinal = req.data.dtFiltroFinal;

        const oDocTypeCodePreenchido = await db.run(
            SELECT.columns(["left(cpuDt,7) as mes", "COUNT(*) as count"])
                .from(OUTLIERS)
                .where`cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal} and docTypeCode != ''`
                .limit(999)
                .groupBy("left(cpuDt,7)")
                .orderBy({ 'left(cpuDt,7)': 'asc' })
        )

        const oDocTypeCodeVazio = await db.run(
            SELECT.columns(["left(cpuDt,7) as mes", "COUNT(*) as count"])
                .from(OUTLIERS)
                .where`cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal} and docTypeCode = ''`
                .limit(999)
                .groupBy("left(cpuDt,7)")
                .orderBy({ 'left(cpuDt,7)': 'asc' })
        )

        let novoRegistro = {};
        let oRetorno = [];
        //Adicionar registros dos Classificados (DocTypeCode <> '')
        oDocTypeCodePreenchido.forEach(registro => {
            novoRegistro.mes = registro.mes;
            novoRegistro.classificado = registro.count;
            novoRegistro.naoClassificado = 0;
            novoRegistro.total = registro.count;
            oRetorno.push(novoRegistro);
            novoRegistro = {};
        });

        //Adicionar registros dos Não Classificados (DocTypeCode = '')
        oDocTypeCodeVazio.forEach(registroCodesVazios => {
            //Procurar se já existe no oRetorno
            let registroExistente = oRetorno.find((registroRetorno) => registroRetorno["mes"] == registroCodesVazios.mes);
            //Se sim
            if (!!registroExistente) {
                registroExistente.naoClassificado = registroCodesVazios.count;
                registroExistente.total += registroCodesVazios.count;

                // Se não, NOVA LINHA
            } else {
                novoRegistro.mes = registroCodesVazios.mes;
                novoRegistro.classificado = 0;
                novoRegistro.naoClassificado = registroCodesVazios.count;
                novoRegistro.total = registroCodesVazios.count;
                oRetorno.push(novoRegistro);
                novoRegistro = {};
            }
        })

        return oRetorno;

    });

    this.on("selectOutliersChart3B", async req => {

        const dtFiltroInicial = req.data.dtFiltroInicial;
        const dtFiltroFinal = req.data.dtFiltroFinal;

        const oSelect = await db.run(
            SELECT.columns(["outlierDescr", "docTypeCode", "COUNT(*) as count"]).from(OUTLIERS).where`cpuDt between ${dtFiltroInicial} and ${dtFiltroFinal}`.limit(1001).groupBy("outlierDescr", "docTypeCode").orderBy({ outlierDescr: "asc", docTypeCode: "asc" })

        )

        return oSelect;

    });

    this.on("selectValidacao1", async req => {
        // Validacao 1 - Verificar se tem registro sem Objeto contábil com DOCTYPECODE *300, *400, *500 e *600

        let result = {
            contador: 0,
            registros: []
        }

        //--------------------------------------------------------------------------------------------------------
        // Select Contador
        //--------------------------------------------------------------------------------------------------------
        oCount = await db.run(
            SELECT.one.columns(["COUNT(*) as count"])
                .from(ASSET_VERSION_INBOUND)
                .where`outlier = false
                    and ASSETTYPECODE in ('00300','00400','00500','00600','03300','03400','07400','07500','07600')
                    and occodedest is null
                    and octypedest is null
                    and ocdescrdest is null
                    and occode is null
                    and octype is null
                    and ocdescr is null`
        );

        result.contador = oCount.count;

        //--------------------------------------------------------------------------------------------------------
        // Select Registros
        //--------------------------------------------------------------------------------------------------------
        const oSelect = await db.run(
            SELECT.columns(["*"])
                .from(ASSET_VERSION_INBOUND)
                .where`outlier = false
                    and ASSETTYPECODE in ('00300','00400','00500','00600','03300','03400','07400','07500','07600')
                    and occodedest is null
                    and octypedest is null
                    and ocdescrdest is null
                    and occode is null
                    and octype is null
                    and ocdescr is null`
                .limit(10)
        );

        //Preencher o campo Tipo de Validação
        oSelect.forEach(result => {
            result.tipoValidacaoCod = 1;
            result.tipoValidacaoDesc = 'Verificar se tem registro sem Objeto contábil com DOCTYPECODE *300, *400, *500 e *600';
        });

        // Inserir registros no results
        for (let index = 0; index < oSelect.length; index++) {
            result.registros.push(oSelect[index])
        }

        return result;
    });

    this.on("selectValidacao2", async req => {
        // Validacao 2 - Verificar se tem registro sem Grupo de Mercadoria

        let result = {
            contador: 0,
            registros: []
        }

        //--------------------------------------------------------------------------------------------------------
        // Select Contador
        //--------------------------------------------------------------------------------------------------------
        oCount = await db.run(
            SELECT.one.columns(["COUNT(*) as count"])
                .from(ASSET_VERSION_INBOUND)
                .where`outlier = false and gm is null and status = 'NotProcessed'`
        );

        result.contador = oCount.count;

        //--------------------------------------------------------------------------------------------------------
        // Select Registros
        //--------------------------------------------------------------------------------------------------------
        const oSelect = await db.run(
            SELECT.columns(["*"])
                .from(ASSET_VERSION_INBOUND)
                .where`outlier = false and gm is null and status = 'NotProcessed'`
                .limit(10)
        );

        //Preencher o campo Tipo de Validação
        oSelect.forEach(result => {
            result.tipoValidacaoCod = 2;
            result.tipoValidacaoDesc = 'Verificar se tem registro sem Grupo de Mercadoria';
        });

        // Inserir registros no results
        for (let index = 0; index < oSelect.length; index++) {
            result.registros.push(oSelect[index])
        }

        return result;

    });

    this.on("selectValidacao3", async req => {
        // Validacao 3 - Verificar se tem registro sem Descrição do NM

        let result = {
            contador: 0,
            registros: []
        }

        //--------------------------------------------------------------------------------------------------------
        // Select Contador
        //--------------------------------------------------------------------------------------------------------
        oCount = await db.run(
            SELECT.one.columns(["COUNT(*) as count"])
                .from(ASSET_VERSION_INBOUND)
                .where`nmdescription is null and NMDESCRALTERNATIVE is null and outlier = false and nm is null`
        );

        result.contador = oCount.count;

        //--------------------------------------------------------------------------------------------------------
        // Select Registros
        //--------------------------------------------------------------------------------------------------------
        const oSelect = await db.run(
            SELECT.columns(["*"])
                .from(ASSET_VERSION_INBOUND)
                .where`nmdescription is null and NMDESCRALTERNATIVE is null and outlier = false and nm is null`
                .limit(10)
        );

        //Preencher o campo Tipo de Validação
        oSelect.forEach(result => {
            result.tipoValidacaoCod = 3;
            result.tipoValidacaoDesc = 'Verificar se tem registro sem Descrição do NM';
        });

        // Inserir registros no results
        for (let index = 0; index < oSelect.length; index++) {
            result.registros.push(oSelect[index])
        }

        return result;

    });

    this.on("selectValidacao4", async req => {
        // Validacao 4 - Verificar se tem registro com DOCNUM  e sem ITMNUM

        let result = {
            contador: 0,
            registros: []
        }

        //--------------------------------------------------------------------------------------------------------
        // Select Contador
        //--------------------------------------------------------------------------------------------------------
        oCount = await db.run(
            SELECT.one.columns(["COUNT(*) as count"])
                .from(ASSET_VERSION_INBOUND)
                .where`docnum is not null and docitem is null`
        );

        result.contador = oCount.count;

        //--------------------------------------------------------------------------------------------------------
        // Select Registros
        //--------------------------------------------------------------------------------------------------------
        const oSelect = await db.run(
            SELECT.columns(["*"])
                .from(ASSET_VERSION_INBOUND)
                .where`docnum is not null and docitem is null`
                .limit(10)
        );

        //Preencher o campo Tipo de Validação
        oSelect.forEach(result => {
            result.tipoValidacaoCod = 4;
            result.tipoValidacaoDesc = 'Verificar se tem registro com DOCNUM  e sem ITMNUM';
        });

        // Inserir registros no results
        for (let index = 0; index < oSelect.length; index++) {
            result.registros.push(oSelect[index])
        }

        return result;

    });

    this.on("selectValidacao5", async req => {
        // Validacao 5 - Verificar se tem registro sem DOCNUM  e com ITMNUM

        let result = {
            contador: 0,
            registros: []
        }

        //--------------------------------------------------------------------------------------------------------
        // Select contador
        //--------------------------------------------------------------------------------------------------------
        oCount = await db.run(
            SELECT.one.columns(["COUNT(*) as count"])
                .from(ASSET_VERSION_INBOUND)
                .where`docnum is null and docitem is not null`
        );

        result.contador = oCount.count;

        //--------------------------------------------------------------------------------------------------------
        // Select Registros
        //--------------------------------------------------------------------------------------------------------
        const oSelect = await db.run(
            SELECT.columns(["*"])
                .from(ASSET_VERSION_INBOUND)
                .where`docnum is null and docitem is not null`
                .limit(10)
        );

        //Preencher o campo Tipo de Validação
        oSelect.forEach(result => {
            result.tipoValidacaoCod = 5;
            result.tipoValidacaoDesc = 'Verificar se tem registro sem DOCNUM  e com ITMNUM';
        });

        // Inserir registros no results
        for (let index = 0; index < oSelect.length; index++) {
            result.registros.push(oSelect[index])
        }

        return result;

    });

    this.on("selectValidacao6", async req => {
        // Validacao 6 - Verificar se tem registro sem Doc.contábil que não tenha vindo da FINAN

        let result = {
            contador: 0,
            registros: []
        }

        //--------------------------------------------------------------------------------------------------------
        // Select contador
        //--------------------------------------------------------------------------------------------------------
        oCount = await db.run(
            SELECT.one.columns(["COUNT(*) as count"])
                .from(ASSET_VERSION_INBOUND)
                .where`outlier = false and origem_dados != 'CDS_YEC_AT_FINAN' 
                and ACCDOC is null 
                and doctypecode not in ('10000','10050','10051','10090','10093','10099','10110','10120','10121','10125','10126','10150','10500','10550','10750','10999','11000','11090','11093','11099','11100','11150','11200','11210','11250','11260','11500','11550','11750','11999','12050','12051','12100','12150','12222','12500','12700','77001','77002','77003','77777')
                and tpmov != '861'`
        );

        result.contador = oCount.count;

        //--------------------------------------------------------------------------------------------------------
        // Select Registros
        //--------------------------------------------------------------------------------------------------------
        const oSelect = await db.run(
            SELECT.columns(["*"])
                .from(ASSET_VERSION_INBOUND)
                .where`outlier = false and origem_dados != 'CDS_YEC_AT_FINAN' 
                and ACCDOC is null 
                and doctypecode not in ('10000','10050','10051','10090','10093','10099','10110','10120','10121','10125','10126','10150','10500','10550','10750','10999','11000','11090','11093','11099','11100','11150','11200','11210','11250','11260','11500','11550','11750','11999','12050','12051','12100','12150','12222','12500','12700','77001','77002','77003','77777')
                and tpmov != '861'`
                .limit(10)
        );

        //Preencher o campo Tipo de Validação
        oSelect.forEach(result => {
            result.tipoValidacaoCod = 6;
            result.tipoValidacaoDesc = 'Verificar se tem registro sem Doc.contábil que não tenha vindo da FINAN';
        });

        // Inserir registros no results
        for (let index = 0; index < oSelect.length; index++) {
            result.registros.push(oSelect[index])
        }

        return result;

    });

    this.on("selectValidacao7", async req => {
        // Validacao 7 - DI,DDI preenchidas só na FINAN

        let result = {
            contador: 0,
            registros: []
        }

        //--------------------------------------------------------------------------------------------------------
        // Select contador
        //--------------------------------------------------------------------------------------------------------
        oCount = await db.run(
            SELECT.one.columns(["COUNT(*) as count"])
                .from(ASSET_VERSION_INBOUND)
                .where`DINO is null and origem_dados = 'CDS_YEC_AT_FINAN' and cfop like '3%'`
        );

        result.contador = oCount.count;

        //--------------------------------------------------------------------------------------------------------
        // Select Registros
        //--------------------------------------------------------------------------------------------------------
        const oSelect = await db.run(
            SELECT.columns(["*"])
                .from(ASSET_VERSION_INBOUND)
                .where`DINO is null and origem_dados = 'CDS_YEC_AT_FINAN' and cfop like '3%'`
                .limit(10)
        );

        //Preencher o campo Tipo de Validação
        oSelect.forEach(result => {
            result.tipoValidacaoCod = 7;
            result.tipoValidacaoDesc = 'DI,DDI preenchidas só na FINAN';
        });

        // Inserir registros no result
        for (let index = 0; index < oSelect.length; index++) {
            result.registros.push(oSelect[index])
        }

        return result;
        // return oSelect.count;
    });

    this.on("selectValidacao8", async req => {
        // Validacao 8 - Imobilizado se tem descrição do BWTAR = * IMOB * e tem ANLN1 e ANLN2

        let result = {
            contador: 0,
            registros: []
        }

        //--------------------------------------------------------------------------------------------------------
        // Select contador
        //--------------------------------------------------------------------------------------------------------
        oCount = await db.run(
            SELECT.one.columns(["COUNT(*) as count"])
                .from(ASSET_VERSION_INBOUND)
                .where`doctypedescr like '%IMOB%' and anln1 is null`
        );

        result.contador = oCount.count;

        //--------------------------------------------------------------------------------------------------------
        // Select Registros
        //--------------------------------------------------------------------------------------------------------
        const oSelect = await db.run(
            SELECT.columns(["*"])
                .from(ASSET_VERSION_INBOUND)
                .where`doctypedescr like '%IMOB%' and anln1 is null`
                .limit(10)
        );

        //Preencher o campo Tipo de Validação
        oSelect.forEach(result => {
            result.tipoValidacaoCod = 8;
            result.tipoValidacaoDesc = 'Imobilizado se tem descrição do BWTAR = * IMOB * e tem ANLN1 e ANLN2';
        });

        // Inserir registros no result
        for (let index = 0; index < oSelect.length; index++) {
            result.registros.push(oSelect[index])
        }

        return result;

    });

    this.on("selectCountInbound", async req => {

        const oSelect = await db.run(
            SELECT.one.columns(["COUNT(*) as count"])
                .from(ASSET_VERSION_INBOUND)
        );

        return oSelect;
    });


});

function formatDatePtBr(dDate) {
    dDate = new Date(dDate) // Força tipo Date (se já não for)
    const ano = dDate.getFullYear()
    const mes = dDate.getMonth()
    const dia = dDate.getDate()

    return `${dia}/${mes}/${ano}`
}