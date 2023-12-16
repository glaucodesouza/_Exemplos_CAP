sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, History) {
        "use strict";

        return Controller.extend("validadorcarga.controller.Object", {
            
            onInit: function () {

                var oViewModel = new JSONModel({
                    title : 0,
                    description : ""
                });

                this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                this._oRouter.getRoute("object").attachPatternMatched(this._onDetailMatched, this);

                this.getView().setModel(oViewModel, "objectView");
            },

            _onDetailMatched: function(oEvent) {
                var sObjectPath = "/" + oEvent.getParameter("arguments").tipoValidacaoCod;
                var oView = this.getView();
                oView.bindElement(sObjectPath);

                let codValidacao = oEvent.getParameter("arguments").tipoValidacaoCod;

                //---------------------------------------------------------------------
                // Dados da Validações Detail 
                //---------------------------------------------------------------------
                var modelValidacaoDetail = new JSONModel();
                var modelFiltrado = new JSONModel();
                
                // Resgatar modelo Detail criado globalmente no Component.js
                modelValidacaoDetail = this.getOwnerComponent().getModel("modelValidacaoDetail");
                
                let dadosValidacaoDetail = modelValidacaoDetail.getData();
                let dadosFiltrados = [];
                for (let index = 0; index < dadosValidacaoDetail.length; index++) {
                    dadosFiltrados.push(dadosValidacaoDetail[index])
                }
                //------------------------------------------------------
                //Eliminar registros dif. do Cód Valid. clicado pelo usuário
                //------------------------------------------------------
                let index = -1;
                do {
                    index = dadosFiltrados.findIndex((registro) => registro.tipoValidacaoCod != codValidacao);
                    if (index >= 0) {
                        if (dadosFiltrados[index].tipoValidacaoCod != codValidacao) {
                            dadosFiltrados.splice(index, 1);
                        }
                    } else {
                        break;
                    }
                } while (dadosFiltrados.length);

                modelFiltrado.setData(dadosFiltrados);
                this.getView().setModel(modelFiltrado, "modelValidacaoDetail");

                //model para título e descrição
                var oViewModel = this.getView().getModel("objectView");
                oViewModel.setProperty("/title", parseInt(codValidacao));
                oViewModel.setProperty("/description", this.getOwnerComponent().definirTipoValid(parseInt(codValidacao)));
                
            }

        });
    });
