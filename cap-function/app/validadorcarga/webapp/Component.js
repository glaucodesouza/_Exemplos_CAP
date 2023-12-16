/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "validadorcarga/model/models",
        "sap/ui/model/json/JSONModel"
    ],
    function (UIComponent, Device, models, JSONModel) {
        "use strict";

        return UIComponent.extend("validadorcarga.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                // Criar o modelo Detail, vazio,
                // p/ usar na Object Page
                let dadosValidacaoDetail = [];
                let modelValidacaoDetail = new JSONModel();
                modelValidacaoDetail.setData(dadosValidacaoDetail);
                this.setModel(modelValidacaoDetail,"modelValidacaoDetail");

            },

            definirTipoValid: function (tipoValid) {
                switch (tipoValid) {
                    case 1:
                        return 'Verificar se tem registro sem Objeto contábil com DOCTYPECODE *300, *400, *500 e *600';
                        break;
                    case 2:
                        return 'Verificar se tem registro sem Grupo de Mercadoria';
                        break;
                    case 3:
                        return 'Verificar se tem registro sem Descrição do NM';
                        break;
                    case 4:
                        return 'Verificar se tem registro com DOCNUM  e sem ITMNUM';
                        break;
                    case 5:
                        return 'Verificar se tem registro sem DOCNUM  e com ITMNUM';
                        break;
                    case 6:
                        return 'Verificar se tem registro sem Doc.contábil que não tenha vindo da FINAN';
                        break;
                    case 7:
                        return 'DI,DDI preenchidas só na FINAN';
                        break;
                    case 8:
                        return 'Imobilizado se tem descrição do BWTAR = * IMOB * e tem ANLN1 e ANLN2';
                        break;
                    default:
                        return "";
                        break;
                };
            }
        });
    }
);
