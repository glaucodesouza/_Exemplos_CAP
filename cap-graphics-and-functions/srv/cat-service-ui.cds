using y_asset_tracking from './cat-service';

/**
        Modificações feitas de acordo com a planilha de excel enviada para a equipe tecnica da Petrobras.
        data 17/10/2022.
*/
annotate y_asset_tracking.ASSET with {
  createdAt              @title: 'Asset Criado em';
  createdBy              @title: 'Asset Criado por';
  modifiedAt             @title: 'Asset Modificado em';
  modifiedBy             @title: 'Asset Modificado por';
  assetId                @title: 'Asset Id';
  date                   @title: 'Dta Processamento';
  isActive               @title: 'Status Ativo';
  isNmAlternative        @title: 'NM Alternativo(S/N)';
  nm                     @title: 'NM';
  gm                     @title: 'Grp de Mercadorias';
  serialNo               @title: 'Número de Série';
  isBatch                @title: 'Lote(S/N)';
  batch                  @title: 'Lote';
  isRsped                @title: 'REPETRO SPED(S/N)';
  rspedTo                @title: 'Dta Final REPETRO SPED';
  rspedDate              @title: 'Dta Início REPETRO SPED';
  rspedPay               @title: 'REPETRO SPED Em Análise';
  isDocTypeCanc          @title: 'Doc de Cancelamento(S/N)';
  docNumCanc             @title: 'Num Doc de Cancelamento';
  docItemItemC           @title: 'Itm Doc de Cancelamento';
  isManualCanc           @title: 'Cancelamento Manual';
  userCanc               @title: 'Usuário do Cancelamento';
  docNum                 @title: 'DocNum';
  docItem                @title: 'Itm do DocNum';
  tpMov                  @title: 'Tp de Movimento';
  docType                @title: 'Tp de Documento(PO)';
  bukrs                  @title: 'Empresa';
  Accdoc                 @title: 'Doc Contábil';
  ocCode                 @title: 'Obj Contábil';
  werks                  @title: 'Centro';
  branch                 @title: 'Filial';
  AccdocGjahr            @title: 'Ano Doc Contábil';
  bwtar                  @title: 'Tp de Avaliação';
  docTypeCode            @title: 'Tp de Documento Asset';
  docTypeDescr           @title: 'Desc Tp de Documento Asset';
  inbID                  @title: 'Inbound ID';
  matDoc                 @title: 'Documento de Material';
  matUse                 @title: 'Utilização do Material';
  nmDescription          @title: 'Descrição do NM';
  ocdescr                @title: 'Desc Obj Contábil';
  ocType                 @title: 'Tp Obj Contábil';
  po                     @title: 'Pedido';
  poItem                 @title: 'Itm Pedido';
  quantityUnit           @title: 'UM de Medida';
  trackingId             @title: 'Tracking ID';
  quantityPo             @title: 'Qtde Pedido';
  isSN                   @title: 'Num de Série(S/N)';
  gjahr                  @title: 'Ano do Doc';
  cpuDt                  @title: 'Dta do Doc';
  assetTypeCode          @title: 'Asset Type(AT)';
  assetTypeDescr         @title: 'Desc Asset Type(AT)';
  sakto                  @title: 'Conta Razão';
  BranchDest             @title: 'Filial Destino';
  WerksDest              @title: 'Centro Destino';
  Lgort                  @title: 'Depósito Origem';
  LgortDest              @title: 'Depósito Destino';
  cancelDoc              @title: 'Doc Cancelado(S/N)';
  user                   @title: 'Usuário';
  fatDoc                 @title: 'Documento de Faturamento';
  fatCpudt               @title: 'Data Fatura';
  fatQuantity            @title: 'Qtde Item da Fatura';
  FatdocItem             @title: 'Item Doc Faturamento';
  FatdocYear             @title: 'Ano Doc Faturamento';
  matDocItem             @title: 'Item Doc Material';
  matDocYear             @title: 'Ano Doc Material';
  nfQuantity             @title: 'Qtde NF';
  nfQuantityUnit         @title: 'UM de Medida NF';
  diDate                 @title: 'Dta Declaração de Importação';
  diNo                   @title: 'Declaração de Importação';
  ciapId                 @title: 'Ciap ID';
  KostlMseg              @title: 'Centro de Custo(MIGO)';
  KostlEkkn              @title: 'Centro de Custo(Class.Contabil)';
  SaktoEkpo              @title: 'Conta do Razão(PO)';
  SaktoEkkn              @title: 'Conta do Razão(Class.Contabil)';
  SaktoMseg              @title: 'Conta do Razão(MIGO)';
  status_SAP             @title: 'Status SAP';
  OccodeDest             @title: 'Obj Contábil Destino';
  fatCputm               @title: 'Data Hora FatDoc';
  motivoCancelado        @title: 'Motivo do Cancelamento';
  oriCancDocNum          @title: 'DocNum de Cancelamento';
  oriCancDocItem         @title: 'Itm DocNum de Cancelamento';
  buzei                  @title: 'Linha Doc Contábil';
  quantityMov            @title: 'Qtde Item Pedido';
  retirementOperation    @title: 'Código Operação Baixa';
  retirementOperationTxt @title: 'Desc Operação Baixa';
  retorno                @title: ''  @UI.Hidden; /*OCULTAR*/
  retornoCiapId          @title: ''  @UI.Hidden; /*OCULTAR*/
  retornoMensagemCiap    @title: ''  @UI.Hidden; /*OCULTAR*/
  statusBCiap            @title: 'Processamento CIAP';
  statusIva              @title: 'Processamento IVA';
  pstyp                  @title: 'Categoria Item';
  porcDH                 @title: 'Hra Processamento';
  umMat                  @title: 'Mat receptor/emissor';
};

annotate y_asset_tracking.ASSET with @(UI.SelectionFields: [
  bukrs,
  nm,
  werks,
  cpuDt,
  docNum,
  tpMov,
  docType,
  ocCode,
  Accdoc
]);

/**
        Modificações feitas de acordo com a planilha de excel enviada para a equipe tecnica da Petrobras.
        data 17/10/2022.
*/
annotate y_asset_tracking.ASSET_VERSION with {
  createdAt              @title: 'Versão Asset Criado em';
  createdBy              @title: 'Versão Asset Criado por';
  modifiedAt             @title: 'Versão Asset Modificado em';
  modifiedBy             @title: 'Versão Asset Modificado por';
  assetId                @title: 'Asset Id';
  vsId                   @title: 'ID Versão';
  assetTypeId            @title: 'Tipo Asset ID';
  docType_ID             @title: 'Id do docType'; /** Analise */
  docType_docType        @title: 'Tipo de Documento'; /** Analise */
  branch                 @title: 'Filial';
  bukrs                  @title: 'Empresa';
  werks                  @title: 'Centro';
  date                   @title: 'Dta Processamento';
  nm                     @title: 'NM';
  isActiveVs             @title: 'Status Ativo(S/N)';
  tracking_tracking      @title: 'Tracking ID'; /** Analise */
  quantidade             @title: 'Qtde Mercadoria Movimentada';
  saldo                  @title: 'Saldo';
  quantityUnit           @title: 'UM de Medida';
  matDoc                 @title: 'Documento de Material';
  docNum                 @title: 'DocNum';
  docItem                @title: 'Itm do Documento';
  docType                @title: 'Tp de Documento(PO)';
  docUpdDateTime         @title: 'Data e Hora de Alteração'; /** Analise */
  Accdoc                 @title: 'Doc Contábil';
  ocType                 @title: 'Tp Obj Contábil';
  ocCode                 @title: 'Obj Contábil';
  ciapBx                 @title: 'BAIXA CIAP'; /** Analise */
  isDi                   @title: 'DI'; /** Analise */
  diDate                 @title: 'Dta de Declaração de Importação';
  diNo                   @title: 'Declaração de Importação';
  isPc                   @title: 'Pis/Cofins'  @UI.HiddenFilter;
  posLat                 @title: 'Latitude';
  posLong                @title: 'Longitude';
  isManual               @title: 'Nota Manual';
  procDh                 @title: 'Data e Hora do Processamento';
  version                @title: 'Versão do Asset';
  VERSIONORI             @title: 'Versão Origem';
  tpMov                  @title: 'Tp de Movimento';
  isSN                   @title: 'Num de Série(S/N)';
  serialNo               @title: 'Número de Série';
  gjahr                  @title: 'Ano do Doc';
  cpuDt                  @title: 'Dta do Doc';
  assetTypeCode          @title: 'Asset Type(AT)';
  assetTypeDescr         @title: 'Desc Asset Type(AT)';
  sakto                  @title: 'Conta Razão';
  BranchDest             @title: 'Filial Destino';
  WerksDest              @title: 'Centro Destino';
  Lgort                  @title: 'Deposito Origem';
  LgortDest              @title: 'Deposito Destino';
  cancelDoc              @title: 'Doc Cancelado(S/N)';
  cancelado              @title: 'Status Cancelado';
  user                   @title: 'Usuário';
  fatDoc                 @title: 'Documento de Faturamento';
  fatCpudt               @title: 'Data da Fatura';
  fatQuantity            @title: 'Qtde Fatura';
  FatdocItem             @title: 'Item Doc Faturamento';
  FatdocYear             @title: 'Ano Doc Faturamento';
  matDocItem             @title: 'Item Documento de Material';
  matDocYear             @title: 'Ano Documento de Material';
  nfQuantity             @title: 'Qtde NF';
  nfQuantityUnit         @title: 'Um de Medida NF';
  ciapId                 @title: 'Ciap ID';
  KostlMseg              @title: 'Centro de Custo (MIGO)';
  KostlEkkn              @title: 'Centro de Custo (Class.Contábil)';
  SaktoEkpo              @title: 'Conta do Razão (PO)';
  SaktoEkkn              @title: 'Conta do Razão(Class.Contábil)';
  po                     @title: 'Pedido';
  poItem                 @title: 'Itm Pedido';
  AccdocGjahr            @title: 'Ano Doc Contábil';
  batch                  @title: 'Lote';
  bloqueado              @title: 'Bloqueado';
  bwtar                  @title: 'Tp de Avaliação';
  cenario                @title: 'Cenário';
  docTypeCode            @title: 'Tp de Documento Asset';
  docTypeDescr           @title: 'Desc Tp de Documento Asset';
  documento              @title: 'Documento';
  exercicio              @title: 'Exercicio';
  gm                     @title: 'Grp de Mercadorias';
  mensagem               @title: 'Mensagem';
  matUse                 @title: 'Utilização do Material';
  motivoCancelado        @title: 'Motivo do Cancelamento';
  nmDescription          @title: 'Desc Num Material';
  ocdescr                @title: 'Desc Obj Contábil';
  poAquis                @title: 'Pedido V0 do Asset';
  poItemAquis            @title: 'Itm do Pedido - Aquisição';
  SaktoMseg              @title: 'Conta do Razão(MIGO)';
  VornrMseg              @title: 'Num Operação(Vornr)';
  status_PC              @title: 'Status Pis/Cofins';
  status_SAP             @title: 'Status SAP';
  trackingId             @title: 'Tracking ID';
  OccodeDest             @title: 'Obj Contábil Destino';
  fatCputm               @title: 'Data Hora FatDoc';
  oriCancDocNum          @title: 'DocNum de Cancelamento';
  oriCancDocItem         @title: 'Item do DocNum de Cancelamento';
  inbID                  @title: 'Inbound ID';
  Parid                  @title: 'Parceiro ID';
  parvw                  @title: 'Função Parceiro';
  knttp                  @title: 'Ctg Class Cont';
  buzei                  @title: 'Linha Doc Contábil';
  quantityMov            @title: 'Qtde Item Pedido';
  retirementOperation    @title: 'Código Operação Baixa';
  retirementOperationTxt @title: 'Desc Operação Baixa';
  retorno                @title: ''            @UI.Hidden; /*OCULTAR*/
  retornoCiapId          @title: ''            @UI.Hidden; /*OCULTAR*/
  retornoMensagemCiap    @title: ''            @UI.Hidden; /*OCULTAR*/
  statusBCiap            @title: 'Processamento CIAP';
  statusIva              @title: 'Processamento IVA';
  pstyp                  @title: 'Categoria Item';
  porcDH                 @title: 'Hra Processamento';
  umMat                  @title: 'Mat receptor/emissor';
  Anln1                  @title: 'Imobilizado';
  Anln2                  @title: 'Subnúm. do Imobilizado';
  Erfmg                  @title: 'Quantidade do Registro';
  Erfme                  @title: 'Unidade de medida do Registro';
  Mwskz_ped              @title: 'Cod. Imposto Pedido'; // é o Tax Code do Pedido de Compras
  Mwskz_mat              @title: 'Cod. Imposto Doc. Material'; // é o Tax Code de Doc de Materiais
  Mwskz_fat              @title: 'Cod. Imposto Fatura'; // é o Tax Code de Doc de Fatura
  Mwskz_nf               @title: 'Cod. Imposto NF'; // é o Tax Code de NF
};

annotate y_asset_tracking.ASSET_VERSION with @(UI.SelectionFields: [
  bukrs,
  nm,
  werks,
  cpuDt,
  docNum,
  tpMov,
  docType,
  ocCode,
  Accdoc
]);

// annotate y_asset_tracking.ASSET_VERSION with {
//     assetId @UI : {Hidden : true }
// };

annotate y_asset_tracking.TRACK_ORDER with {
  docTypeCode     @title: 'Tipo de Documento Asset';
  docTypeDescr    @title: 'Descr. Tipo de Documento Asset';
  assetTypeCode   @title: 'Asset Type(AT)';
  assetTypeDescr  @title: 'Desc Asset Type(AT)';
  trackOrder      @title: 'Track Order';
  assetTypeTo     @title: 'Asset Type To(AT)';
  assetTypeToDesc @title: 'Desc Asset Type To Desc(AT)';
  trackOrderID    @title: 'Track Order ID';
  createdAt       @title: 'Criado em';
  createdBy       @title: 'Criado por';
  modifiedAt      @title: 'Modificado em';
  modifiedBy      @title: 'Modificado por';
};

//annotate y_asset_tracking.TRACK_TYPE with @odata.draft.enabled;
/**
        Modificações feitas de acordo com a planilha de excel enviada para a equipe tecnica da Petrobras.
        data 17/10/2022.
*/
annotate y_asset_tracking.TRACK_TYPE with {
  trackType      @title: 'Track Type';
  trackTypeDescr @title: 'Track Type Descrição';
  trackTypeID    @title: 'Track Type ID';
  createdAt      @title: 'Criado em';
  createdBy      @title: 'Criado por';
  modifiedAt     @title: 'Modificado em';
  modifiedBy     @title: 'Modificado por';
};


/**
    Comentarios de Ajuda.
    Anotações padronizações de layout da entity, par exibição para o cliente com o nomes apresentável.

 */
annotate y_asset_tracking.RECLASSIFICACAO with {
  ID                 @title: '';
  createdAt          @title: 'Criado em';
  createdBy          @title: 'Criado por';
  modifiedAt         @title: 'Modificado em';
  modifiedBy         @title: 'Modificado por';
  documento          @title: 'DOCUMENTO';
  linhaLancamento    @title: 'Linha Lançamento';
  empresa            @title: 'EMPRESA';
  numDocRef          @title: 'Nº doc.de referência';
  objetoCusto        @title: 'Objeto de Custo';
  dataLancamento     @title: 'Data Lançamento';
  tipoObjeto         @title: 'Tipo Obj';
  classeCusto        @title: 'Classe Custo';
  denomClasseCusto   @title: 'Denom.classe custo';
  material           @title: 'Material';
  qtdEntr            @title: 'Qtd.entr.';
  uM                 @title: 'UM';
  textoBreveMaterial @title: 'Texto breve material';
  denominacao        @title: 'Denominação';
  textoPedido        @title: 'Texto do pedido';
  valorMacc          @title: 'Valor/MACC';
  mdAcc              @title: 'MdACC';
  valorMObjeto       @title: 'Valor/Mobjeto';
  mdObj              @title: 'MdObj';
  valorMTrasancao    @title: 'Valor/Mtransação';
  moedT              @title: 'MoedT';
  operacao           @title: 'Operação';
  usuario            @title: 'Usuário';
  objetoParceiro     @title: 'Objeto parceiro';
  elementoPep        @title: 'Elemento PEP';
  centro             @title: 'Centro';
  tc                 @title: 'TC';
  tipoDeDocumento    @title: 'Tipo de Documento';
  sociedadeParceira  @title: 'Sociedade Parceira';
  classeCustoDestino @title: 'Classe Custo Destino';
  objetoDestino      @title: 'Objeto Destino';
  tipoObjetoDestino  @title: 'Tipo Obj Destino';
  percentual         @title: '%';
  accDocMassafi      @title: 'AccDocMASSAFI';
  Accdoc             @title: 'Documento Contábil';
  assetId            @title: 'Asset ID';
  assetVSId          @title: 'AssetVS ID';
  loteUpdate         @title: 'Lote Update';
  statusPC           @title: 'Status PC';
  statusReclass      @title: 'Status Reclassificação';
  status             @title: 'Status';
};

//As Labels estão descritadas na annotations do proprio projeto do monitor
//annotate y_asset.tracking.OUTLIERS

annotate y_asset.tracking.OUTLIERS with @(UI.SelectionFields: [
  poItem,
  nm,
  fatDoc,
  docNum
]);

/**
    Comentarios de Ajuda.
    Anotação para filtros dinamicos, para exibição de dados dentro de Aplicativo.
    é usado para carregar dinâmica os filtro no app, usa o nome do atributo da "entity/tabela" do banco direto.
 */
annotate y_asset_tracking.RECLASSIFICACAO with @(UI.SelectionFields: [
  documento,
  tipoObjeto,
  elementoPep,
  centro,
  tc,
  objetoParceiro,
  assetVSId
]);

annotate y_asset_tracking.VW_ASSETVS_ASSET with @(
  UI.SelectionFields: [
    ocCode,
    date,
    nm,
    matDoc,
    ocType
  ],
  UI.LineItem       : [
    {
      $Type: 'UI.DataField',
      Label: 'NM',
      Value: nm
    },
    {
      $Type: 'UI.DataField',
      Label: 'Documento Contábil',
      Value: Accdoc
    }
  ]
);

annotate y_asset_tracking.ASSET_VERSION_INBOUND with {
  createdAt       @title: 'Versão Asset Criado em';
  createdBy       @title: 'Versão Asset Criado por';
  modifiedAt      @title: 'Versão Asset Modificado em';
  modifiedBy      @title: 'Versão Asset Modificado por';
  docType_ID      @title: 'Id do docType'; /** Analise */
  docType_docType @title: 'Tipo de Documento'; /** Analise */
  branch          @title: 'Filial';
  bukrs           @title: 'Empresa';
  werks           @title: 'Centro';
  date            @title: 'Dta Processamento';
  nm              @title: 'NM';
  quantityUnit    @title: 'UM de Medida';
  matDoc          @title: 'Documento de Material';
  docNum          @title: 'DocNum';
  docItem         @title: 'Itm do Documento';
  docType         @title: 'Tp de Documento(PO)';
  docUpdDateTime  @title: 'Data e Hora de Alteração'; /** Analise */
  Accdoc          @title: 'Doc Contábil';
  ocType          @title: 'Tp Obj Contábil';
  ocCode          @title: 'Obj Contábil';
  ciapBx          @title: 'BAIXA CIAP'; /** Analise */
  isDi            @title: 'DI'; /** Analise */
  diDate          @title: 'Dta de Declaração de Importação';
  diNo            @title: 'Declaração de Importação';
  isPc            @title: 'Pis/Cofins';
  posLat          @title: 'Latitude';
  posLong         @title: 'Longitude';
  isManual        @title: 'Nota Manual';
  procDh          @title: 'Data e Hora do Processamento';
  version         @title: 'Versão do Asset';
  tpMov           @title: 'Tp de Movimento';
  isSN            @title: 'Num de Série(S/N)';
  serialNo        @title: 'Número de Série';
  gjahr           @title: 'Ano do Doc';
  cpuDt           @title: 'Dta do Doc';
  assetTypeCode   @title: 'Asset Type(AT)';
  assetTypeDescr  @title: 'Desc Asset Type(AT)';
  sakto           @title: 'Conta Razão';
  BranchDest      @title: 'Filial Destino';
  WerksDest       @title: 'Centro Destino';
  Lgort           @title: 'Deposito Origem';
  LgortDest       @title: 'Deposito Destino';
  cancelDoc       @title: 'Doc Cancelado(S/N)';
  cancelado       @title: 'Status Cancelado';
  user            @title: 'Usuário';
  fatDoc          @title: 'Documento de Faturamento';
  fatCpudt        @title: 'Data da Fatura';
  fatQuantity     @title: 'Qtde Fatura';
  FatdocItem      @title: 'Item Doc Faturamento';
  FatdocYear      @title: 'Ano Doc Faturamento';
  matDocItem      @title: 'Item Documento de Material';
  matDocYear      @title: 'Ano Documento de Material';
  nfQuantity      @title: 'Qtde NF';
  nfQuantityUnit  @title: 'Um de Medida NF';
  ciapId          @title: 'Ciap ID';
  KostlMseg       @title: 'Centro de Custo (MIGO)';
  KostlEkkn       @title: 'Centro de Custo (Class.Contábil)';
  SaktoEkpo       @title: 'Conta do Razão (PO)';
  SaktoEkkn       @title: 'Conta do Razão(Class.Contábil)';
  po              @title: 'Pedido';
  poItem          @title: 'Itm Pedido';
  AccdocGjahr     @title: 'Ano Doc Contábil';
  batch           @title: 'Lote';
  bloqueado       @title: 'Bloqueado';
  bwtar           @title: 'Tp de Avaliação';
  cenario         @title: 'Cenário';
  docTypeCode     @title: 'Tp de Documento Asset';
  docTypeDescr    @title: 'Desc Tp de Documento Asset';
  documento       @title: 'Documento';
  exercicio       @title: 'Exercicio';
  gm              @title: 'Grp de Mercadorias';
  mensagem        @title: 'Mensagem';
  matUse          @title: 'Utilização do Material';
  motivoCancelado @title: 'Motivo do Cancelamento';
  nmDescription   @title: 'Desc Num Material';
  ocdescr         @title: 'Desc Obj Contábil';
  poAquis         @title: 'Pedido V0 do Asset';
  poItemAquis     @title: 'Itm do Pedido - Aquisição';
  SaktoMseg       @title: 'Conta do Razão(MIGO)';
  VornrMseg       @title: 'NumOperação(Vornr)';
  status_PC       @title: 'Status Pis/Cofins';
  status_SAP      @title: 'Status SAP';
  trackingId      @title: 'Tracking ID';
  OccodeDest      @title: 'Obj Contábil Destino';
  fatCputm        @title: 'Data Hora FatDoc';
  oriCancDocNum   @title: 'DocNum de Cancelamento';
  oriCancDocItem  @title: 'Item do DocNum de Cancelamento';
  ID              @title: 'Inbound ID';
  Parid           @title: 'ParceiroID';
  parvw           @title: 'FunçãoParceiro';
  knttp           @title: 'Ctg.Class.Cont';
  status          @title: 'Status do processo';
  pstyp           @title: 'Categoria Item';
  porcDH          @title: 'Hra Processamento';
  umMat           @title: 'Mat receptor/emissor';
};

annotate y_asset_tracking.CONFIG_PARAM_AT with {
  ID        @title: 'ID';
  APLICACAO @title: 'Aplicação';
  VARIAVEL  @title: 'Variável';
  VALOR     @title: 'Valor';
  OBS       @title: 'Observação';
};

annotate y_asset_tracking.PARCEIRO_FILIAL with {
  parceiroFilialID @title: 'ID';
  parid            @title: 'Parceiro ID';
  branch           @title: 'Filial';
  bukrs            @title: 'Empresa';
};

annotate y_asset_tracking.PARCEIRO_FILIAL with @(UI.SelectionFields: [
  parid,
  branch,
  bukrs
]);

annotate y_asset_tracking.AT_NM_CORREL with {
  nmCorrelID   @title: 'ID'  @UI.Hidden; /*OCULTAR*/
  createdAt    @title: 'Data Criação';
  createdBy    @title: 'Criado por';
  modifiedAt   @title: 'Modificado em';
  modifiedBy   @title: 'Modificado por';
  nm           @title: 'NM';
  nmDesc       @title: 'Descrição NM';
  nmCorrel     @title: 'Correlato NM';
  nmCorrelDesc @title: 'Desc Correlato NM';
};

annotate y_asset_tracking.AT_NM_CORREL with @(UI.SelectionFields: [
  nm,
  nmDesc,
  nmCorrel,
  nmCorrelDesc
]);

annotate y_asset_tracking.VW_FLUXO_PROCESSO_ASSET with {
  paiAssetId   @title: 'Pai Asset Id';
  paiVsId      @title: 'Pai Vs Id';
  filhoVsId    @title: 'Filho Vs Id';
  filhoVersion @title: 'filho Vs';
  paiVersion   @title: 'Pai Vs';
}

annotate y_asset_tracking.CARGA_HIST with {
  ID                @title: 'ID'  @UI.Hidden; /*OCULTAR*/
  createdAt         @title: 'Data Criação';
  createdBy         @title: 'Criado por';
  modifiedAt        @title: 'Modificado em';
  modifiedBy        @title: 'Modificado por';
  usuario_execution @title: 'Executado por';
  data_execution    @title: 'Data execução';
  hora_execution    @title: 'Hora Execução';
  data_carga_ini    @title: 'Data carga Ini';
  data_carga_fim    @title: 'Data carga Fim';
};
