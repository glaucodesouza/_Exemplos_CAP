using {y_asset_tracking as my} from '../db/schema';
using {CV as vw} from '../db/schema_view';
//using {YGWGL_AT_DOCT_ASSETT_SRV as AT_doct_Asset} from '../srv/external/YGWGL_AT_DOCT_ASSETT_SRV';
using {YGWGL_AT_CARGAINB_SRV as extAT_CARGAINB_SRV2} from '../srv/external/YGWGL_AT_CARGAINB_SRV';

service CatalogService {

    entity CONFIG_PARAM_AT @(restrict: [
        {
            grant: ['*'],
            to   : ['AssetTrackingAdminSuport']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingGestor']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingAnalista']
        },
        {
            grant: ['*'],
            to   : ['AssetTrackingConfig']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingSuporteTIC']
        }
    ])                      as projection on my.CONFIG_PARAM_AT;

    annotate CONFIG_PARAM_AT with @odata.draft.enabled;

    @cds.redirection.target
    entity ASSET @(restrict: [
        {
            grant: ['*'],
            to   : ['AssetTrackingAdminSuport']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingGestor']
        },
        {
            grant: ['*'],
            to   : ['AssetTrackingAnalista']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingConsultante']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingConfig']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingReclassificador']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingSuporteTIC']
        }
    ])                      as projection on my.ASSET;

    @cds.redirection.target
    entity ASSET_VERSION @(restrict: [
        {
            grant: ['*'],
            to   : ['AssetTrackingAdminSuport']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingGestor']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingAnalista']
        },
        {
            grant: ['*'],
            to   : ['AssetTrackingExecAltMTracking']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingConsultante']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingConfig']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingReclassificador']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingSuporteTIC']
        }
    ])                      as projection on my.ASSET_VERSION;

    entity TRACK_ORDER @(restrict: [
        {
            grant: ['*'],
            to   : ['AssetTrackingAdminSuport']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingGestor']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingAnalista']
        },
        {
            grant: ['*'],
            to   : ['AssetTrackingConfig']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingSuporteTIC']
        }
    ])                      as projection on my.TRACK_ORDER;

    annotate TRACK_ORDER with @odata.draft.enabled;

    entity EVENT @(restrict: [{
        grant: ['*'],
        to   : ['AssetTrackingAdminSuport']
    }])                     as projection on my.EVENT;

    entity TRACKING @(restrict: [{
        grant: ['*'],
        to   : ['AssetTrackingAdminSuport']

    }])                     as projection on my.TRACKING;

    entity TRACK_TYPE @(restrict: [
        {
            grant: ['*'],
            to   : ['AssetTrackingAdminSuport']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingGestor']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingAnalista']
        },
        {
            grant: ['*'],
            to   : ['AssetTrackingConfig']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingSuporteTIC']
        }
    ])                      as projection on my.TRACK_TYPE;

    annotate TRACK_TYPE with @odata.draft.enabled;

    entity DEVICE_TYPE @(restrict: [{
        grant: ['*'],
        to   : ['AssetTrackingAdminSuport']
    }])                     as projection on my.DEVICE_TYPE;

    entity DEVICES @(restrict: [{
        grant: ['*'],
        to   : ['AssetTrackingAdminSuport']

    }])                     as projection on my.DEVICES;

    entity NM_ALTERNATIVE @(restrict: [{
        grant: ['*'],
        to   : ['AssetTrackingAdminSuport']

    }])                     as projection on my.NM_ALTERNATIVE;

    entity ASSET_VERSION_INBOUND @(restrict: [
        {
            grant: ['READ'],
            to   : ['AssetTrackingSuporteTIC']
        },
        {
            grant: ['*'],
            to   : ['AssetTrackingExecAltMOutlier']
        }
    ])                      as projection on my.ASSET_VERSION_INBOUND;

    entity ASSET_VERSION_INBOUND_H @(restrict: [{
        grant: ['*'],
        to   : ['AssetTrackingAdminSuport']

    }])                     as projection on my.ASSET_VERSION_INBOUND_H;

    entity OUTLIERS @(restrict: [
        {
            grant: ['*'],
            to   : ['AssetTrackingAdminSuport']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingGestor']
        },
        {
            grant: ['*'],
            to   : ['AssetTrackingAnalista']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingConfig']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingSuporteTIC']
        },
        {
            grant: ['*'],
            to   : ['AssetTrackingExecAltMOutlier']
        }
    ])                      as projection on my.OUTLIERS actions {
                                   @sap.applicable.path: 'reprocessarEnabled'
                                   action reprocessar();
                               // @sap.applicable.path : 'ignorarEnabled'
                               // action ignorar();
                               }

    entity RECLASSIFICACAO @(restrict: [
        {
            grant: ['*'],
            to   : ['AssetTrackingAdminSuport']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingGestor']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingAnalista']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingConfig']
        },
        {
            grant: ['*'],
            to   : ['AssetTrackingReclassificador']
        },
        {
            grant: ['*'],
            to   : ['AssetTrackingSuporteTIC']
        }
    ])                      as projection on my.RECLASSIFICACAO;

    entity DESENVOLVIMENTO  as projection on my.DESENVOLVIMENTO;

    @readonly
    entity CV_DASH_QTDEMOVATV @(restrict: [{
        grant: ['*'],
        to   : ['AssetTrackingAdminSuport']

    }])                     as projection on vw.DASH_QTDEMOVATV;

    @readonly
    entity CV_DASH_QTDEIGNORADO @(restrict: [{
        grant: ['*'],
        to   : ['AssetTrackingAdminSuport']

    }])                     as projection on vw.DASH_QTDEIGNORADO;

    entity PARCEIRO_FILIAL @(restrict: [
        {
            grant: ['*'],
            to   : ['AssetTrackingAdminSuport']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingGestor']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingAnalista']
        },
        {
            grant: ['*'],
            to   : ['AssetTrackingConfig']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingSuporteTIC']
        }
    ])                      as projection on my.PARCEIRO_FILIAL;

    annotate PARCEIRO_FILIAL with @odata.draft.enabled;

    entity AT_NM_CORREL @(restrict: [
        {
            grant: ['*'],
            to   : ['AssetTrackingAdminSuport']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingGestor']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingAnalista']
        },
        {
            grant: ['*'],
            to   : ['AssetTrackingConfig']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingSuporteTIC']
        }
    ])                      as projection on my.AT_NM_CORREL;

    annotate AT_NM_CORREL with @odata.draft.enabled;

    entity CARGA_HIST @(restrict: [
        {
            grant: ['*'],
            to   : ['AssetTrackingAdminSuport']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingGestor']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingAnalista']
        },
        {
            grant: ['*'],
            to   : ['AssetTrackingConfig']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingSuporteTIC']
        }
    ])                      as projection on my.CARGA_HIST;

    entity VW_FLUXO_PROCESSO_ASSET @(restrict: [
        {
            grant: ['*'],
            to   : ['AssetTrackingAdminSuport']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingGestor']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingAnalista']
        },
        {
            grant: ['*'],
            to   : ['AssetTrackingConfig']
        },
        {
            grant: ['READ'],
            to   : ['AssetTrackingSuporteTIC']
        }
    ])                      as projection on my.VW_FLUXO_PROCESSO_ASSET;

    @readonly
    entity DOCT_ASSETT_SRV  as projection on my.DOCT_ASSETT_SRV;

    @readonly
    entity DatasSet         as projection on my.DatasSet;

    @readonly
    entity CARGAINBDatasSet as projection on extAT_CARGAINB_SRV2.DatasSet;

    action   Reclassificar()                                                               returns String;
    action   OutReprocessar(ids : array of String); // returns String;//array of String;

    action   OutDeletar(ids : array of String);
    action   processar_parc_filial()                                                       returns String;
    action   cancelaVs(motivoCancelado : String, vsId : String)                            returns String;

    function montaTelaMonitorTracking(sObjectId : String)                                  returns array of {
        lanes : array of TypeProcessFlowLane;
        nodes : array of TypeProcessFlowNode;
        Spots : array of TypeAnalyticMapSpots
    };

    function selecionarOutliersDashboard(dtFiltroInicial : String, dtFiltroFinal : String) returns array of viewOutliers1; //OUTLIERS;

    function selectVersionChart1B(dtFiltroInicial : String, dtFiltroFinal : String)        returns array of versionChart1B;
    function selectVersionChart2A(dtFiltroInicial : String, dtFiltroFinal : String)        returns array of versionChart2A;
    function selectVersionChart2B(dtFiltroInicial : String, dtFiltroFinal : String)        returns array of versionChart2B;
    function selectVersionChart2C(dtFiltroInicial : String, dtFiltroFinal : String)        returns array of versionChart2C;
    function selectVersionChart2D(dtFiltroInicial : String, dtFiltroFinal : String)        returns array of versionChart2D;
    function selectOutliersChart1B(dtFiltroInicial : String, dtFiltroFinal : String)       returns array of outliersChart1B; //OUTLIERS;
    function selectOutliersChart3A(dtFiltroInicial : String, dtFiltroFinal : String)       returns array of outliersChart3A; //OUTLIERS;
    function selectOutliersChart3B(dtFiltroInicial : String, dtFiltroFinal : String)       returns array of outliersChart3B; //OUTLIERS;

    function selectValidacao1()                                                            returns {
        contador : Integer;
        registros : array of type_inbound_validacao
    };

    function selectValidacao2()                                                            returns {
        contador : Integer;
        registros : array of type_inbound_validacao
    };

    function selectValidacao3()                                                            returns {
        contador : Integer;
        registros : array of type_inbound_validacao
    };

    function selectValidacao4()                                                            returns {
        contador : Integer;
        registros : array of type_inbound_validacao
    };

    function selectValidacao5()                                                            returns {
        contador : Integer;
        registros : array of type_inbound_validacao
    };

    function selectValidacao6()                                                            returns {
        contador : Integer;
        registros : array of type_inbound_validacao
    };

    function selectValidacao7()                                                            returns {
        contador : Integer;
        registros : array of type_inbound_validacao
    };

    function selectValidacao8()                                                            returns {
        contador : Integer;
        registros : array of type_inbound_validacao
    };
    // function selectValidacao2 ()  returns array of type_inbound_validacao;
    // function selectValidacao3 ()  returns array of type_inbound_validacao;
    // function selectValidacao4 ()  returns array of type_inbound_validacao;
    // function selectValidacao5 ()  returns array of type_inbound_validacao;
    // function selectValidacao6 ()  returns array of type_inbound_validacao;
    // function selectValidacao7 ()  returns array of type_inbound_validacao;
    // function selectValidacao8 ()  returns array of type_inbound_validacao;

    function selectCountInbound()                                                          returns Integer;

}

type TypeProcessFlowLane {
    id       : String;
    label    : String;
    position : Integer;
}

type TypeAnalyticMapSpots {
    pos           : String;
    type          : String;
    tooltip       : Integer;
    routePosition : String;
}

type TypeProcessFlowNode {
    children          : array of TypeProcessFlowNodeChildren;
    id                : Integer;
    lane              : Integer;
    state             : String;
    texts             : array of String;
    title             : String;
    titleAbbreviation : String;
    vsId              : String;
}

type TypeProcessFlowNodeChildren {
    connectionLabel : {
        id          : String;
        text        : String;
    };
    nodeId          : Integer;
}

type viewOutliers1 {
    outlierDescr : String;
    docTypeCode  : String;
    count        : Integer;
}

type versionChart1B {
    mes   : String; //2021-01
    count : Integer;
}

type outliersChart1B {
    mes   : String; //2021-01
    count : Integer;
}

type versionChart2A {
    isActiveVs : Boolean;
    cancelado  : Boolean;
    count      : Integer;
}

type versionChart2B {
    assetTypeCode : String;
    docTypeCode   : String;
    Contador      : Integer;
}

type versionChart2C {
    status_PC : String;
    cenario   : String;
    Contador  : Integer;
}

type versionChart2D {
    Contadorv0 : Integer;
    Contadorvn : Integer;
    mes        : String; //2021-01
}

type outliersChart3A {
    mes             : String; //2021-01
    classificado    : Integer;
    naoClassificado : Integer;
    total           : Integer;
}

type outliersChart3B {
    outlierDescr : String;
    docTypeCode  : String;
    count        : Integer;
}

// type validacao1 {
//     count: Integer;
// }

type type_inbound_validacao {
    ID                     : String(36);
    po                     : String(10); // Ebeln
    poItem                 : Integer; // Ebelp
    docNum                 : String(10);
    docItem                : Integer; // Itmnum
    gjahr                  : Integer;
    belnr                  : String(10); // Belnr //não é mais ACCDOC
    buzei                  : Integer; // Buzei
    cpuDt                  : Timestamp;
    cpuTm                  : Timestamp;
    serialNo               : String(18);
    batch                  : String(10); // LOTE
    nm                     : String(40); // Matnr
    nmDescription          : String(120); // Maktx
    nmDescrAlternative     : String(120); //NfMaktx >> alternativo para descrição
    isNmAlternative        : Boolean; //Nesserio para app Node - FerFranco
    docType                : String(4); // Bsart
    docTypeCode            : String(5);
    docTypeDescr           : String(40);
    tpMov                  : String(4); // Bwart
    fatDoc                 : String(10);
    nfType                 : String(2); // Categoria de Nota fiscal
    matDoc                 : String(10);
    matDocItem             : String(4);
    matDocYear             : String(4);
    matUse                 : String(1);
    matOrg                 : String(1);
    matOrgTxt              : String(120);
    quantityMov            : Decimal(13, 3); // MengeEkbe
    quantityPo             : Decimal(13, 3); // MengeEkpo
    quantityUnit           : String(3); // Meins
    Occode                 : String(16);
    ocType                 : String(16);
    ocdescr                : String(24);
    ciapId                 : String(60); // IdCiap
    ciapBx                 : String(2); // CiapStatus
    ciapBxText             : String(60); // CiapStatusTxt
    assetTypeCode          : String(5);
    assetTypeDescr         : String(40);
    isRsped                : Boolean; //Rsped
    bukrs                  : String(4); // Empresa
    werks                  : String(4); //Centro
    zekkn                  : Integer;
    vgabe                  : String(1);
    bewtp                  : String(1);
    bstyp                  : String(1);
    bwtar                  : String(10); // Tipo de avaliação >> Fiori
    knttp                  : String(1); // Categoria Classificação contabil
    gm                     : String(9); // Matkl
    xchpf                  : String(1);
    ps_psp_pnr             : Integer;
    kstrg                  : String(12);
    aufnr                  : String(12);
    nplnr                  : String(12);
    branch                 : String(4);
    diNo                   : String(20); // Ndi
    diDate                 : Timestamp; // Ddi
    retirementOperation    : String(2);
    retirementOperationTxt : String(60);
    manual                 : Boolean;
    direct                 : String(1);
    printD                 : Boolean;
    user                   : String(12); // Ernam
    cancelado              : Boolean;
    oriCancDocNum          : String(10);
    oriCancDocItem         : Integer;
    bloqueado              : Boolean;
    status                 : String(120);
    outlierDescr           : String(255);
    outlier                : Boolean;
    FatdocYear             : String(4);
    FatdocItem             : String(4);
    Accdoc                 : String(10);
    AccdocGjahr            : String(4);
    Vornr                  : String(4);
    DocCasado              : Boolean;
    cancelDoc              : Boolean;
    reftyp                 : String(2);
    refkey                 : String(35);
    pstyp                  : String(1);
    fkart                  : String(4);
    cfop                   : String(10);
    parvw                  : String(2);
    fatEbeln               : String(10);
    fatEbelp               : String(5);
    fatZekkn               : String(2);
    fatVgabe               : String(1);
    fatBewtp               : String(1);
    fatBwart               : String(3);
    fatCpudt               : Timestamp;
    fatCputm               : Timestamp;
    fatWerks               : String(4);
    fatQuantity            : Decimal(13, 3);
    BranchDest             : String(4);
    WerksDest              : String(4);
    OccodeDes              : String(12);
    OctypeDest             : String(16);
    OcdescrDest            : String(24);
    Parid                  : String(10);
    Lgort                  : String(4);
    LgortDest              : String(4);
    OccodeDest             : String(16);
    nfQuantity             : Decimal(13, 3); //NfMenge
    nfQuantityUnit         : String(3); //NfMeins
    Sobkz                  : String(1);
    Umsok                  : String(1);
    ParentId               : String(6);
    Werksorigem            : String(4);
    Branchorigem           : String(4);
    KostlMseg              : String(10);
    KostlEkkn              : String(10);
    SaktoEkpo              : String(10);
    SaktoEkkn              : String(10);
    SaktoMseg              : String(10); // (SAP)Classe de custo //Numero conta Razao // SAKNR
    VornrMseg              : String(4);
    docRef                 : String(10);
    itmRef                 : Integer; // ItmRef
    umMat                  : String(40);
    origem_dados           : String(44);
    posLat                 : Decimal(16, 12); // exemplo de valor 123,123456789012
    posLong                : Decimal(16, 12); // exemplo de valor 123,123456789012
    Mwskz_ped              : String(2); // é o Tax Code do Pedido de Compras
    Mwskz_mat              : String(2); // é o Tax Code de Doc de Materiais
    Mwskz_fat              : String(2); // é o Tax Code de Doc de Fatura
    Mwskz_nf               : String(2); // é o Tax Code de NF
    Anln1                  : String(12); //Imobilizado
    Anln2                  : String(4); //Subnúm. do Imobilizado
    Erfmg                  : Decimal(13, 3); //Quantidade do Registro
    Erfme                  : String(3); //Unidade de medida do Registro

    tipoValidacaoCod       : Integer; //1 até 8
    tipoValidacaoDesc      : String(150); //Descrição do tipo de validação
}
