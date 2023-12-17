namespace y_asset_tracking;

using {YGWGL_AT_DOCT_ASSETT_SRV as extDOCT_ASSETT_SRV} from '../srv/external/YGWGL_AT_DOCT_ASSETT_SRV';
using {YGWGL_AT_COEP_SRV as extAT_COEP_SRV} from '../srv/external/YGWGL_AT_COEP_SRV';
using {
  Currency,
  managed,
  sap,
  cuid
} from '@sap/cds/common';
using {YGWGL_AT_CARGAINB_SRV as extAT_CARGAINB_SRV} from '../srv/external/YGWGL_AT_CARGAINB_SRV';

entity ASSET : managed {
  key assetId         : String(36);
      idAsset         : Association[1] to ASSET_VERSION
                          on idAsset.assetId = assetId;
      inbID           : String(36); // Para associação com a tabela inbound
      date            : Timestamp; //key
      branch          : String(4); //key *FILIAL
      bukrs           : String(4); //key  *EMPRESA
      werks           : String(4); //key  *CENTRO
      zekkn           : Integer;
      po              : String(10); // Ebeln
      poItem          : Integer; // Ebelp
      batch           : String(10);
      isBatch         : Boolean default false;
      serialNo        : String(18);
      isSN            : Boolean default false;
      nm              : String(40);
      nmDescription   : String(120);
      isNmAlternative : Boolean default false;
      matDoc          : String(10);
      matDocItem      : String(4);
      matUse          : String(1);
      matDocYear      : String(4);
      docNum          : String(10);
      docItem         : Integer;
      docType         : String(4);
      docTypeCode     : String(5);
      docTypeDescr    : String(40);
      tpMov           : String(4);
      docNumCanc      : String(10); //TODO:REVISAR O USO DESTE CAMPO
      docItemCanc     : Integer; //TODO:REVISAR O USO DESTE CAMPO
      userCanc        : String(12); //TODO:REVISAR O USO DESTE CAMPO
      cancelado       : Boolean default false;
      oriCancDocNum   : String(10);
      oriCancDocItem  : Integer;
      isManualCanc    : Boolean default false;
      Accdoc          : String(10);
      AccdocGjahr     : String(4);
      ocType          : String(16); // * ObjetoContabil
      ocCode          : String(16); // *COD. obje Contabil
      ocdescr         : String(24); // *desc Obje Contabil
      gm              : String(9);
      bwtar           : String(10);
      buzei           : String(5); //MatItem
      isActive        : Boolean default false;
      quantityMov     : Decimal(13, 3); // MengeEkbe
      quantityPo      : Decimal(13, 3); // MengeEkpo
      quantityUnit    : String(3); // Meins
      assetTypeCode   : String(5);
      assetTypeDescr  : String(40);
      ciapId          : String(60);
      ciapBx          : String(2);
      isDi            : Boolean default false;
      diNo            : String(20);
      diDate          : Timestamp;
      user            : String(12);
      gjahr           : Integer;
      cpuDt           : Timestamp;
      fatDoc          : String(10);
      FatdocItem      : String(4);
      FatdocYear      : String(4);
      fatBewtp        : String(1);
      fatBwart        : String(3);
      fatCpudt        : Timestamp;
      fatCputm        : Timestamp;
      fatQuantity     : Decimal(13, 3);
      motivoCancelado : String(255);
      WerksDest       : String(4);
      OccodeDes       : String(12);
      OctypeDest      : String(16);
      OcdescrDest     : String(24);
      Parid           : String(10);
      Lgort           : String(4);
      LgortDest       : String(4);
      OccodeDest      : String(16);
      nfQuantity      : Decimal(13, 3); //NfMenge
      nfQuantityUnit  : String(3); //NfMeins
      KostlMseg       : String(10);
      KostlEkkn       : String(10);
      SaktoEkpo       : String(10);
      SaktoEkkn       : String(10);
      SaktoMseg       : String(10);
      umMat           : String(40);
}

entity ASSET_VERSION : managed {
  key vsId                   : String(36);
      assetId                : String(36); //Association to ASSET; //key
      inbID                  : String(36); //key
      date                   : Timestamp; //key
      branch                 : String(4); //key *FILIAL
      bukrs                  : String(4); //key  *EMPRESA
      werks                  : String(4); //key  *CENTRO
      zekkn                  : Integer;
      trackingId             : String(36);
      version                : Integer;
      po                     : String(10); // Ebeln
      poItem                 : Integer; // Ebelp
      poAquis                : String(10); // Solucao IVA - Aquisição
      poItemAquis            : Integer; // Solucao IVA - Aquisição
      batch                  : String(10);
      serialNo               : String(18);
      nm                     : String(40);
      nmDescription          : String(120); // Alteração Feita em 02/05/22, inclusao do (campo na CDS), para exibir informaçao no relatorio
      matDoc                 : String(10);
      matDocItem             : String(4);
      matDocYear             : String(4);
      docNum                 : String(10);
      docItem                : Integer;
      docType                : String(4);
      docTypeCode            : String(5);
      docTypeDescr           : String(40);
      docNumCIAP             : String(10);
      docItemCIAP            : Integer;
      tpMov                  : String(4);
      quantidade             : Decimal(13, 3);
      saldo                  : Decimal(13, 3);
      quantityUnit           : String(3);
      assetTypeCode          : String(5);
      assetTypeDescr         : String(40);
      isActiveVs             : Boolean default true;
      Accdoc                 : String(10);
      AccdocGjahr            : String(4);
      ocType                 : String(16); // * ObjetoContabil
      ocCode                 : String(16); // *COD. obje Contabil
      ocdescr                : String(24); // *desc Obje Contabil
      ciapId                 : String(60);
      ciapBx                 : String(2);
      isDi                   : Boolean default false;
      diNo                   : String(20);
      diDate                 : Timestamp;
      procDh                 : Timestamp;
      porcDH                 : Timestamp;
      isPc                   : Boolean default false;
      buzei                  : String(5); //MatItem
      bwtar                  : String(10);
      user                   : String(12);
      isManual               : Boolean default false;
      bloqueado              : Boolean default false;
      cenario                : String(10);
      status_PC              : String(2) default 'NP';
      status_SAP             : String(2); // descricao do erro na resp da API
      documento              : String(15);
      exercicio              : String(4);
      mensagem               : String(255);
      matUse                 : String(1);
      gjahr                  : Integer;
      cpuDt                  : Timestamp;
      gm                     : String(9);
      fatDoc                 : String(10);
      FatdocItem             : String(4);
      FatdocYear             : String(4);
      fatBewtp               : String(1);
      fatBwart               : String(3);
      fatCpudt               : Timestamp;
      fatCputm               : Timestamp;
      fatQuantity            : Decimal(13, 3);
      motivoCancelado        : String(255) default null;
      WerksDest              : String(4);
      OccodeDes              : String(12);
      OctypeDest             : String(16);
      OcdescrDest            : String(24);
      Parid                  : String(10);
      Lgort                  : String(4);
      OccodeDest             : String(16);
      nfQuantity             : Decimal(13, 3); //NfMenge
      nfQuantityUnit         : String(3); //NfMeins
      cancelDoc              : Boolean default false; //Campo cancel da tabela J_1BNFDOC
      cancelado              : Boolean default false; //monitor tracking(cancelamento manual) e IVA
      oriCancDocNum          : String(10);
      oriCancDocItem         : Integer;
      KostlMseg              : String(10);
      KostlEkkn              : String(10);
      SaktoEkpo              : String(10);
      SaktoEkkn              : String(10);
      SaktoMseg              : String(10);
      VornrMseg              : String(4);
      parvw                  : String(2);
      knttp                  : String(1);
      retirementOperation    : String(2);
      retirementOperationTxt : String(60);
      quantityMov            : Decimal(13, 3);
      retorno                : String(2);
      retornoCiapId          : String(5);
      retornoMensagemCiap    : String(200);
      statusIva              : String(120) default 'NotProcessed';
      pstyp                  : String(1);
      statusBCiap            : String(120) default 'NotProcessed';
      umMat                  : String(40);
      VERSIONORI             : Integer;
      isReaj                 : Boolean;
      REAJUSTADO             : Boolean;
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
}

//TODO: REMOVER PARA PRODUCAO
entity ASSET_VERSION_BKP : managed {
  key vsId                   : String(36);
      assetId                : String(36); //Association to ASSET; //key
      inbID                  : String(36); //key
      date                   : Timestamp; //key
      branch                 : String(4); //key *FILIAL
      bukrs                  : String(4); //key  *EMPRESA
      werks                  : String(4); //key  *CENTRO
      zekkn                  : Integer;
      trackingId             : String(36);
      version                : Integer;
      po                     : String(10); // Ebeln
      poItem                 : Integer; // Ebelp
      poAquis                : String(10); // Solucao IVA - Aquisição
      poItemAquis            : Integer; // Solucao IVA - Aquisição
      batch                  : String(10);
      serialNo               : String(18);
      nm                     : String(40);
      nmDescription          : String(120); // Alteração Feita em 02/05/22, inclusao do (campo na CDS), para exibir informaçao no relatorio
      matDoc                 : String(10);
      matDocItem             : String(4);
      matDocYear             : String(4);
      docNum                 : String(10);
      docItem                : Integer;
      docType                : String(4);
      docTypeCode            : String(5);
      docTypeDescr           : String(40);
      docNumCIAP             : String(10);
      docItemCIAP            : Integer;
      tpMov                  : String(4);
      quantidade             : Decimal(13, 3);
      saldo                  : Decimal(13, 3);
      quantityUnit           : String(3);
      assetTypeCode          : String(5);
      assetTypeDescr         : String(40);
      isActiveVs             : Boolean default true;
      Accdoc                 : String(10);
      AccdocGjahr            : String(4);
      ocType                 : String(16); // * ObjetoContabil
      ocCode                 : String(16); // *COD. obje Contabil
      ocdescr                : String(24); // *desc Obje Contabil
      ciapId                 : String(60);
      ciapBx                 : String(2);
      isDi                   : Boolean default false;
      diNo                   : String(20);
      diDate                 : Timestamp;
      procDh                 : Timestamp;
      porcDH                 : Timestamp;
      isPc                   : Boolean default false;
      buzei                  : String(5); //MatItem
      bwtar                  : String(10);
      user                   : String(12);
      isManual               : Boolean default false;
      bloqueado              : Boolean default false;
      cenario                : String(10);
      status_PC              : String(2) default 'NP';
      status_SAP             : String(2); // descricao do erro na resp da API
      documento              : String(15);
      exercicio              : String(4);
      mensagem               : String(255);
      matUse                 : String(1);
      gjahr                  : Integer;
      cpuDt                  : Timestamp;
      gm                     : String(9);
      fatDoc                 : String(10);
      FatdocItem             : String(4);
      FatdocYear             : String(4);
      fatBewtp               : String(1);
      fatBwart               : String(3);
      fatCpudt               : Timestamp;
      fatCputm               : Timestamp;
      fatQuantity            : Decimal(13, 3);
      motivoCancelado        : String(255) default null;
      WerksDest              : String(4);
      OccodeDes              : String(12);
      OctypeDest             : String(16);
      OcdescrDest            : String(24);
      Parid                  : String(10);
      Lgort                  : String(4);
      OccodeDest             : String(16);
      nfQuantity             : Decimal(13, 3); //NfMenge
      nfQuantityUnit         : String(3); //NfMeins
      cancelDoc              : Boolean default false; //Campo cancel da tabela J_1BNFDOC
      cancelado              : Boolean default false; //monitor tracking(cancelamento manual) e IVA
      oriCancDocNum          : String(10);
      oriCancDocItem         : Integer;
      KostlMseg              : String(10);
      KostlEkkn              : String(10);
      SaktoEkpo              : String(10);
      SaktoEkkn              : String(10);
      SaktoMseg              : String(10);
      VornrMseg              : String(4);
      parvw                  : String(2);
      knttp                  : String(1);
      retirementOperation    : String(2);
      retirementOperationTxt : String(60);
      quantityMov            : Decimal(13, 3);
      retorno                : String(2);
      retornoCiapId          : String(5);
      retornoMensagemCiap    : String(200);
      statusIva              : String(120) default 'NotProcessed';
      pstyp                  : String(1);
      statusBCiap            : String(120) default 'NotProcessed';
      umMat                  : String(40);
      VERSIONORI             : Integer;
      isReaj                 : Boolean;
      REAJUSTADO             : Boolean;
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
}

entity EVENT : managed {
  key ID        : String(36);
      deviceId  : Integer;
      date      : Timestamp;
      time      : Timestamp;
      direction : String(2);
      code      : String(72);
      posLat    : Decimal(3, 3);
      posLong   : Decimal(3, 3);
      tracking  : Association to many TRACKING
                    on tracking.event = $self;
}

entity TRACK_TYPE : managed {
  key trackTypeID    : UUID @(Core.Computed: true);
      trackType      : Integer;
      trackTypeDescr : String(40);
}

entity TRACK_ORDER : managed {
  key trackOrderID    : UUID @(Core.Computed: true);
      trackOrder      : Integer;
      docTypeCode     : String(5);
      docTypeDescr    : String(40);
      assetTypeCode   : String(5);
      assetTypeDescr  : String(40);
      assetTypeTo     : String(5);
      assetTypeToDesc : String(40);
}

entity TRACKING : managed {
  key trackingId    : String(36);
      assetId       : String(36);
      assetVs       : String(36);
      inbID         : String(36);
      qtMoved       : Decimal(13, 3);
      docNum        : String(10);
      docItem       : Integer;
      docType       : String(4);
      docTypeCode   : String(5);
      docTypeDescr  : String(40);
      docNumCanc    : String(10);
      docItemCanc   : Integer;
      isDocTypeCanc : Boolean default false;
      event         : Association to one EVENT;
      trackOrderID  : String(36);
      trackType     : Integer;
      isRemake      : Boolean default false;
      isManual      : Boolean default false;
      isCancel      : Boolean default false;
}

entity DEVICE_TYPE : managed {
  key deviceType : Integer;
      name       : String(40);
      fromDt     : Timestamp;
      toDt       : Timestamp;
      devices    : Association to many DEVICES
                     on devices.deviceType = $self;
}

entity DEVICES : managed {
  key deviceId     : String(36);
      deviceType   : Association to one DEVICE_TYPE;
      name         : String(40);
      code         : String(20);
      isDynamicDir : Boolean default false;
      isActive     : Boolean default true;
      fromDt       : Timestamp;
      toDt         : Timestamp;
      direction    : String(1);
      isDynamicPos : Boolean default false;
      posLat       : Decimal(3, 3);
      posLong      : Decimal(3, 3);
}

entity NM_ALTERNATIVE : managed {
  key nmAlternativeId : String(36);
      name            : String(120);
      nm              : String(40);
      nameAlter       : String(120);
}

entity ASSET_VERSION_INBOUND : managed {
  key ID                     : String(36);
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
      batch                  : String(10) default ''; // LOTE
      nm                     : String(40); // Matnr
      nmDescription          : String(120); // Maktx
      nmDescrAlternative     : String(120); //NfMaktx >> alternativo para descrição
      isNmAlternative        : Boolean default false; //Nesserio para app Node - FerFranco
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
      isRsped                : Boolean default false; //Rsped
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
      manual                 : Boolean default false;
      direct                 : String(1);
      printD                 : Boolean default false;
      user                   : String(12); // Ernam
      cancelado              : Boolean default false;
      oriCancDocNum          : String(10);
      oriCancDocItem         : Integer;
      bloqueado              : Boolean default false;
      status                 : String(120) default 'NotProcessed';
      outlierDescr           : String(255);
      outlier                : Boolean default false;
      FatdocYear             : String(4);
      FatdocItem             : String(4);
      Accdoc                 : String(10);
      AccdocGjahr            : String(4);
      Vornr                  : String(4);
      DocCasado              : Boolean default false;
      cancelDoc              : Boolean default false; //Campo cancel da tabela J_1BNFDOC
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
      docRef                 : String(10) default null;
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
}

entity ASSET_VERSION_INBOUND_H : managed {
  key ID                     : String(36);
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
      batch                  : String(10) default ''; // LOTE
      nm                     : String(40); // Matnr
      nmDescription          : String(120); // Maktx
      nmDescrAlternative     : String(120); //NfMaktx >> alternativo para descrição
      isNmAlternative        : Boolean default false; //Nesserio para app Node - FerFranco
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
      isRsped                : Boolean default false; //Rsped
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
      manual                 : Boolean default false;
      direct                 : String(1);
      printD                 : Boolean default false;
      user                   : String(12); // Ernam
      cancelado              : Boolean default false;
      oriCancDocNum          : String(10);
      oriCancDocItem         : Integer;
      bloqueado              : Boolean default false;
      status                 : String(120) default 'NotProcessed';
      outlierDescr           : String(255);
      outlier                : Boolean default false;
      FatdocYear             : String(4);
      FatdocItem             : String(4);
      Accdoc                 : String(10);
      AccdocGjahr            : String(4);
      Vornr                  : String(4);
      DocCasado              : Boolean default false;
      cancelDoc              : Boolean default false; //Campo cancel da tabela J_1BNFDOC
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
      SaktoMseg              : String(10);
      VornrMseg              : String(4);
      docRef                 : String(10) default null;
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
}

entity OUTLIERS : managed {
  key ID                         : String(70);
      po                         : String(10); // Ebeln
      poItem                     : Integer; // Ebelp
      docNum                     : String(10);
      docItem                    : Integer; // Itmnum
      gjahr                      : Integer;
      belnr                      : String(10); // Belnr //não é mais ACCDOC
      buzei                      : Integer; // Buzei
      cpuDt                      : Timestamp;
      cpuTm                      : Timestamp;
      serialNo                   : String(18);
      batch                      : String(10) default ''; // LOTE
      nm                         : String(40); // Matnr
      nmDescription              : String(120); // Maktx
      nmDescrAlternative         : String(120); //NfMaktx >> alternativo para descrição
      isNmAlternative            : Boolean default false; //Nesserio para app Node - FerFranco
      docType                    : String(4); // Bsart
      docTypeCode                : String(5);
      docTypeDescr               : String(40);
      tpMov                      : String(4); // Bwart
      fatDoc                     : String(10);
      nfType                     : String(2); // Categoria de Nota fiscal
      matDoc                     : String(10);
      matDocItem                 : String(4);
      matDocYear                 : String(4);
      matUse                     : String(1);
      matOrg                     : String(1);
      matOrgTxt                  : String(120);
      quantityMov                : Decimal(13, 3); // MengeEkbe
      quantityPo                 : Decimal(13, 3); // MengeEkpo
      quantityUnit               : String(3); // Meins
      Occode                     : String(16);
      ocType                     : String(16);
      ocdescr                    : String(24);
      ciapId                     : String(60); // IdCiap
      ciapBx                     : String(2); // CiapStatus
      ciapBxText                 : String(60); // CiapStatusTxt
      assetTypeCode              : String(5);
      assetTypeDescr             : String(40);
      isRsped                    : Boolean default false; //Rsped
      bukrs                      : String(4); // Empresa
      werks                      : String(4); //Centro
      zekkn                      : Integer;
      vgabe                      : String(1);
      bewtp                      : String(1);
      bstyp                      : String(1);
      bwtar                      : String(10); // Tipo de avaliação >> Fiori
      knttp                      : String(1); // Categoria Classificação contabil
      gm                         : String(9); // Matkl
      xchpf                      : String(1);
      ps_psp_pnr                 : Integer;
      kstrg                      : String(12);
      aufnr                      : String(12);
      nplnr                      : String(12);
      branch                     : String(4);
      diNo                       : String(20); // Ndi
      diDate                     : Timestamp; // Ddi
      retirementOperation        : String(2);
      retirementOperationTxt     : String(60);
      manual                     : Boolean default false;
      direct                     : String(1);
      printD                     : Boolean default false;
      user                       : String(12); // Ernam
      cancelado                  : Boolean default false;
      oriCancDocNum              : String(10);
      oriCancDocItem             : Integer;
      bloqueado                  : Boolean default false;
      status                     : String(120) default 'NotProcessed';
      outlierDescr               : String(255);
      outlier                    : Boolean default false;
      FatdocYear                 : String(4);
      FatdocItem                 : String(4);
      Accdoc                     : String(10);
      AccdocGjahr                : String(4);
      Vornr                      : String(4);
      DocCasado                  : Boolean default false;
      cancelDoc                  : Boolean default false; //Campo cancel da tabela J_1BNFDOC
      reftyp                     : String(2);
      refkey                     : String(35);
      pstyp                      : String(1);
      fkart                      : String(4);
      cfop                       : String(10);
      parvw                      : String(2);
      fatEbeln                   : String(10);
      fatEbelp                   : String(5);
      fatZekkn                   : String(2);
      fatVgabe                   : String(1);
      fatBewtp                   : String(1);
      fatBwart                   : String(3);
      fatCpudt                   : Timestamp;
      fatCputm                   : Timestamp;
      fatWerks                   : String(4);
      fatQuantity                : Decimal(13, 3);
      BranchDest                 : String(4);
      WerksDest                  : String(4);
      OccodeDes                  : String(12);
      OctypeDest                 : String(16);
      OcdescrDest                : String(24);
      Parid                      : String(10);
      Lgort                      : String(4);
      LgortDest                  : String(4);
      OccodeDest                 : String(16);
      nfQuantity                 : Decimal(13, 3); //NfMenge
      nfQuantityUnit             : String(3); //NfMeins
      virtual reprocessarEnabled : Boolean;
      // virtual ignorarEnabled:  Boolean;
      Sobkz                      : String(1);
      Umsok                      : String(1);
      ParentId                   : String(6);
      Werksorigem                : String(4);
      Branchorigem               : String(4);
      KostlMseg                  : String(10);
      KostlEkkn                  : String(10);
      SaktoEkpo                  : String(10);
      SaktoEkkn                  : String(10);
      SaktoMseg                  : String(10);
      VornrMseg                  : String(4);
      docRef                     : String(10) default null;
      itmRef                     : Integer; // ItmRef
      umMat                      : String(40);
      origem_dados               : String(44);
      posLat                     : Decimal(16, 12); // exemplo de valor 123,123456789012
      posLong                    : Decimal(16, 12); // exemplo de valor 123,123456789012
      Mwskz_ped                  : String(2); // é o Tax Code do Pedido de Compras
      Mwskz_mat                  : String(2); // é o Tax Code de Doc de Materiais
      Mwskz_fat                  : String(2); // é o Tax Code de Doc de Fatura
      Mwskz_nf                   : String(2); // é o Tax Code de NF
      Anln1                      : String(12); //Imobilizado
      Anln2                      : String(4); //Subnúm. do Imobilizado
      Erfmg                      : Decimal(13, 3); //Quantidade do Registro
      Erfme                      : String(3); //Unidade de medida do Registro
}

entity ASSET_VERSION_INBOUND_BKP : managed {
  ID                     : String(70);
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
  batch                  : String(10) default ''; // LOTE
  nm                     : String(40); // Matnr
  nmDescription          : String(120); // Maktx
  nmDescrAlternative     : String(120); //NfMaktx >> alternativo para descrição
  isNmAlternative        : Boolean default false; //Nesserio para app Node - FerFranco
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
  isRsped                : Boolean default false; //Rsped
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
  manual                 : Boolean default false;
  direct                 : String(1);
  printD                 : Boolean default false;
  user                   : String(12); // Ernam
  cancelado              : Boolean default false;
  oriCancDocNum          : String(10);
  oriCancDocItem         : Integer;
  bloqueado              : Boolean default false;
  status                 : String(120) default 'NotProcessed';
  outlierDescr           : String(255);
  outlier                : Boolean default false;
  FatdocYear             : String(4);
  FatdocItem             : String(4);
  Accdoc                 : String(10);
  AccdocGjahr            : String(4);
  Vornr                  : String(4);
  DocCasado              : Boolean default false;
  cancelDoc              : Boolean default false; //Campo cancel da tabela J_1BNFDOC
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
  SaktoMseg              : String(10);
  VornrMseg              : String(4);
  docRef                 : String(10) default null;
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
}

entity RECLASSIFICACAO : managed, cuid {
  key documento          : String(10);
  key linhaLancamento    : Integer;
      empresa            : String(4);
      numDocRef          : String(10);
      objetoCusto        : String(25);
      dataLancamento     : Date;
      tipoObjeto         : String(10);
      classeCusto        : String(15);
      denomClasseCusto   : String(50);
      material           : String(10);
      qtdEntr            : Decimal(23, 3);
      uM                 : String(5);
      textoBreveMaterial : String(255);
      denominacao        : String(50);
      textoPedido        : String(50);
      valorMacc          : Decimal(23, 2);
      mdAcc              : String(3);
      valorMObjeto       : Decimal(23, 2);
      mdObj              : String(3);
      valorMTrasancao    : Decimal(23, 2);
      moedT              : String(3);
      operacao           : String(10);
      usuario            : String(12);
      objetoParceiro     : String(25);
      elementoPep        : String(30);
      centro             : String(4);
      tc                 : String(5);
      tipoDeDocumento    : String(2);
      sociedadeParceira  : String(30);
      classeCustoDestino : String(30);
      objetoDestino      : String(30);
      tipoObjetoDestino  : String(30);
      percentual         : String(10);
      accDocMassafi      : String(10);
      //daqui para baixo não alterar
      Accdoc             : String(10);
      assetId            : String(36);
      assetVSId          : String(36);
      loteUpdate         : String(10);
      statusPC           : String(2);
      statusReclass      : String(12);
      status             : String(30) default 'NotProcessed';
}

entity VW_ASSETVS_ASSET        as
  select from ASSET_VERSION {
    key ASSET_VERSION.vsId,
        ASSET_VERSION.assetId,
        ASSET_VERSION.version,
        ASSET_VERSION.bukrs,
        ASSET_VERSION.branch,
        ASSET_VERSION.werks,
        ASSET_VERSION.date,
        ASSET_VERSION.po,
        ASSET_VERSION.poItem,
        ASSET_VERSION.nm,
        ASSET_VERSION.docNum,
        ASSET_VERSION.docItem,
        ASSET_VERSION.matDoc,
        ASSET_VERSION.buzei,
        ASSET_VERSION.docType,
        ASSET_VERSION.quantidade,
        ASSET_VERSION.quantityUnit,
        ASSET_VERSION.saldo,
        ASSET_VERSION.bwtar,
        ASSET_VERSION.user,
        ASSET_VERSION.isActiveVs,
        ASSET_VERSION.ocCode,
        ASSET_VERSION.ocType,
        ASSET_VERSION.Accdoc
  };

entity CONFIG_PARAM_AT : managed {
  key ID        : UUID @(Core.Computed: true);
      APLICACAO : String(80);
      VARIAVEL  : String(80);
      VALOR     : String(255);
      OBS       : String(255);
}

entity DESENVOLVIMENTO : managed {
  key ID                     : UUID @(Core.Computed: true);
      inbID                  : String(36);
      date                   : Date;
      branch                 : String(4);
      bukrs                  : String(4);
      ciapId                 : String(60);
      docNum                 : String(10);
      docItem                : Integer;
      nmDescription          : String(120);
      retirementOperation    : String(2);
      retirementOperationTxt : String(60);
      nfType                 : String(2);
      Occode                 : String(16);
      ocType                 : String(16);
      ocdescr                : String(24);
      quantityMov            : Decimal(13, 3);
      quantityUnit           : String(3);
      retorno                : String(2);
      retornoCiapId          : String(5);
      retornoMensagemCiap    : String(200);
}

entity PARCEIRO_FILIAL : managed {
  key parceiroFilialID : UUID @(Core.Computed: true);
      parid            : String(10); //ID de Parceiro
      bukrs            : String(4); //EMPRESA
      branch           : String(4); //FILIAL
}

entity AT_NM_CORREL : managed {
  key nmCorrelID   : UUID @(Core.Computed: true);
      nm           : String(40);
      nmDesc       : String(40);
      nmCorrel     : String(40);
      nmCorrelDesc : String(40);
}

entity VW_FLUXO_PROCESSO_ASSET as
  select from ASSET_VERSION as pai
  inner join TRACKING as tkr
    on tkr.assetVs = pai.vsId
  inner join ASSET_VERSION as filho
    on filho.trackingId = tkr.trackingId
  {
    pai.assetId          as paiAssetId,
    pai.vsId             as paiVsId,
    filho.vsId           as VsId,
    filho.version        as Version,
    pai.version          as paiVersion,
    filho.isActiveVs     as ISActiveVs,
    filho.docTypeDescr   as docTypeDescr,
    filho.tpMov          as tpMov,
    filho.assetTypeDescr as assetTypeDescr,
    filho.cpuDt          as cpuDt,
    filho.posLat         as posLat,
    filho.posLong        as posLong
  };

@cds.odata.valuelist
view DOCT_ASSETT_SRV as
  select from extDOCT_ASSETT_SRV.doct_assettSet {
    key DoctypeId       as DoctypeId,
    key AssetTypeId     as AssetTypeId,
    key AssetTypeTo     as AssetTypeTo,
        DoctypeDescr    as DoctypeDescr,
        AssetTypeDescr  as AssetTypeDescr,
        AssetTypeToDesc as AssetTypeToDesc
  };

@cds.odata.valuelist
view CoepSet as
  select from extAT_COEP_SRV.CoepSet {
    key Kokrs,
    key Belnr,
    key Buzei,
        Ebeln,
        Ebelp,
        Zekkn,
        Bukrs,
        Werks,
        Gjahr,
        Matnr,
        Awtyp,
        Awkey,
        Gkont,
        Timestmp
  };

entity CARGA_HIST : managed, cuid {
  usuario_execution : String(4);
  data_execution    : Date;
  hora_execution    : Time;
  data_carga_ini    : Date;
  data_carga_fim    : Date;
}

@cds.odata.valuelist
view DatasSet as
  select from extAT_CARGAINB_SRV.DatasSet {
    key DataDe,
    key DataAte
  };

entity VALIDACAO_CARGA_LOG : managed, cuid {
  tipoValidacaoCod  : Integer; //1 até 8
  tipoValidacaoDesc : String(150); //Descrição do tipo de validação
  statusValido      : String(20); //true=sucesso, false=erro
}

// entity VALIDA_CARGA_LOG : managed, cuid
// {
//     origem_dados: String(44);

//     po : String(10);        // Ebeln
//     poItem : Integer;       //Ebelp
//     docNum : String(10);    //Docnum
// 	docItem : Integer;      //Itmnum

// 	tpMov : String(4);      //Bwart

//     matDoc : String(10);    //Mblnr
//     matDocItem : String(4); //Zeile
//     matDocYear : String(4); //Mjahr
//     cpuDt : Timestamp;      //Cpudt

//     fatDoc : String(10);    //Belnr
//     FatdocYear : String(4); //Gjahr
//     FatdocItem : String(4); //Buzei
//     fatCpudt: Timestamp;    //Cpudt da fatura

//     Accdoc : String(10);
//     AccdocGjahr : String(4);

//     tipoValidacaoCod: Integer;
//     tipoValidacaoDesc: String(100);
// }
