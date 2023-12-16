sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("validadorcarga.controller.Worklist", {
            onInit: function () {

                //Criar a tabela de dados e Model p/ o WORKLIST com as TODAS as Validacoes
                let dadosValidacoesWorklist = [];
                let modelValidacoesWorklist = new JSONModel();
                modelValidacoesWorklist.setData(dadosValidacoesWorklist);
                this.getView().setModel(modelValidacoesWorklist,"modelValidacoesWorklist");

                //Criar a tabela de dados e Model local p/ o OBJECT PAGE 
                var dadosValidacaoDetail = [];
                var modelValidacaoDetail = new JSONModel();
                modelValidacaoDetail.setData(dadosValidacaoDetail);
                this.getView().setModel(modelValidacaoDetail,"modelValidacaoDetail");

            },
            onValidarButtonClick: function (oEvent) {
                this.requestValidacao1();
                this.requestValidacao2();
                this.requestValidacao3();
                this.requestValidacao4();
                this.requestValidacao5();
                this.requestValidacao6();
                this.requestValidacao7();
                this.requestValidacao8();
            },
            async requestValidacao1() {
                await this.selectValidacao1()
            },
            selectValidacao1() {
                console.log("chamando validaçãoCarga1()")
                return new Promise((resolve, reject) => {
                    this.getView().getModel().read(`/selectValidacao1()`, {
                        success: oData => {

                            console.log("Sucesso Validacao 1", oData);
                            let view = this.getView();
                            let model = view.getModel("modelValidacoesWorklist");
                            let dados = model.getData();

                            //---------------------------------------------------------------------
                            //Dados da Validação 1 (p/ Worklist)
                            //---------------------------------------------------------------------
                            let dadosValidacao1 = {};
                            dadosValidacao1.tipoValidacaoCod  = 1;
                            dadosValidacao1.tipoValidacaoDesc = this.getOwnerComponent().definirTipoValid(1);

                            if (oData.results.length == 0) {
                                dadosValidacao1.statusValido      = 'Sucesso';
                            } else {
                                dadosValidacao1.statusValido      = 'Erro';
                            };

                            //adicionar registro da validacao atual
                            dados.push(dadosValidacao1);
                            //atualizar o modelo
                            model.refresh();

                            //---------------------------------------------------------------------
                            //Dados da Validações 1 Detail (p/ Object Page)
                            //---------------------------------------------------------------------
                            
                            let modelValidacaoDetail = new JSONModel();
                            this.getOwnerComponent().getModel(modelValidacaoDetail,"modelValidacaoDetail");
                            let dadosValidacaoDetail = oData.results;
                            modelValidacaoDetail.setData(dadosValidacaoDetail);
                            this.getOwnerComponent().setModel(modelValidacaoDetail,"modelValidacaoDetail");                          

                        },
                        error: oError => {
                            console.log(oError);
                        }
                    })
                })
            },

            async requestValidacao2() {
                await this.selectValidacao2()
            },
            selectValidacao2() {
                console.log("chamando validaçãoCarga2()")
                return new Promise((resolve, reject) => {
                    this.getView().getModel().read(`/selectValidacao2()`, {
                        success: oData => {
                            console.log("Sucesso Validacao 1", oData);
                            let view = this.getView();
                            let model = view.getModel("modelValidacoesWorklist");
                            let dados = model.getData();
                            //---------------------------------------------------------------------
                            // Dados da Validação 2
                            // (p/ Worklist)
                            //---------------------------------------------------------------------
                            let dadosValidacao = {};
                            dadosValidacao.tipoValidacaoCod  = 2;
                            dadosValidacao.tipoValidacaoDesc = this.getOwnerComponent().definirTipoValid(2);
                            
                            if (oData.results.length == 0) {
                                dadosValidacao.statusValido      = 'Sucesso';
                            } else {
                                dadosValidacao.statusValido      = 'Erro';
                            };

                            //adicionar registro da validacao atual
                            dados.push(dadosValidacao);
                            //atualizar o modelo
                            model.refresh();
                            

                            
                            let modelValidacaoDetail = new JSONModel();
                            // this.getOwnerComponent().getModel(modelValidacaoDetail,"modelValidacaoDetail");
                            modelValidacaoDetail = this.getOwnerComponent().getModel("modelValidacaoDetail");
                            let dadosValidacaoDetail = modelValidacaoDetail.getData();
                            //adicionar registro da validacao atual
                            for (let index = 0; index < oData.results.length; index++) {
                                dadosValidacaoDetail.push(oData.results[index])
                            }

                        },
                        error: oError => {
                            console.log(oError);
                        }
                    })
                })
            },

            async requestValidacao3() {
                await this.selectValidacao3();
            },
            selectValidacao3() {
                console.log("chamando validaçãoCarga3()")
                return new Promise((resolve, reject) => {
                    this.getView().getModel().read(`/selectValidacao3()`, {
                        success: oData => {
                            console.log("Sucesso Validacao 3", oData);

                            //---------------------------------------------------------------------
                            // Dados da Validação (p/ Worklist)
                            //---------------------------------------------------------------------
                            let view = this.getView();
                            let model = view.getModel("modelValidacoesWorklist");
                            let dados = model.getData();
														
                            let dadosValidacao = {};
                            dadosValidacao.tipoValidacaoCod  = 3;
                            dadosValidacao.tipoValidacaoDesc = this.getOwnerComponent().definirTipoValid(3);

                            if (oData.results.length == 0) {
                                dadosValidacao.statusValido      = 'Sucesso';
                            } else {
                                dadosValidacao.statusValido      = 'Erro';
                            };

                            //adicionar registro da validacao atual
                            dados.push(dadosValidacao);
                            //atualizar o modelo
                            model.refresh();

                            //---------------------------------------------------------------------
                            // Dados da Validações Detail
                            //---------------------------------------------------------------------
                            let modelValidacaoDetail = new JSONModel();
                            modelValidacaoDetail = this.getOwnerComponent().getModel("modelValidacaoDetail");
                            let dadosValidacaoDetail = modelValidacaoDetail.getData();
                            
                            //adicionar registro da validacao atual
                            for (let index = 0; index < oData.results.length; index++) {
                                dadosValidacaoDetail.push(oData.results[index])
                            }
                        },
                        error: oError => {
                            console.log(oError);
                        }
                    })
                })
            },

            async requestValidacao4() {
                await this.selectValidacao4();
            },
            selectValidacao4() {
                console.log("chamando validaçãoCarga4()")
                return new Promise((resolve, reject) => {
                    this.getView().getModel().read(`/selectValidacao4()`, {
                        success: oData => {
                            console.log("Sucesso Validacao 4", oData);

                            //---------------------------------------------------------------------
                            // Dados da Validação (p/ Worklist)
                            //---------------------------------------------------------------------
                            let view = this.getView();
                            let model = view.getModel("modelValidacoesWorklist");
                            let dados = model.getData();
														
                            let dadosValidacao = {};
                            dadosValidacao.tipoValidacaoCod  = 4;
                            dadosValidacao.tipoValidacaoDesc = this.getOwnerComponent().definirTipoValid(4);

                            if (oData.results.length == 0) {
                                dadosValidacao.statusValido      = 'Sucesso';
                            } else {
                                dadosValidacao.statusValido      = 'Erro';
                            };

                            //adicionar registro da validacao atual
                            dados.push(dadosValidacao);
                            //atualizar o modelo
                            model.refresh();

                            //---------------------------------------------------------------------
                            // Dados da Validações Detail
                            //---------------------------------------------------------------------
                            let modelValidacaoDetail = new JSONModel();
                            modelValidacaoDetail = this.getOwnerComponent().getModel("modelValidacaoDetail");
                            let dadosValidacaoDetail = modelValidacaoDetail.getData();
                            
                            //adicionar registro da validacao atual
                            for (let index = 0; index < oData.results.length; index++) {
                                dadosValidacaoDetail.push(oData.results[index])
                            }
                        },
                        error: oError => {
                            console.log(oError);
                        }
                    })
                })
            },

            async requestValidacao5() {
                await this.selectValidacao5();
            },
            selectValidacao5() {
                console.log("chamando validaçãoCarga5()")
                return new Promise((resolve, reject) => {
                    this.getView().getModel().read(`/selectValidacao5()`, {
                        success: oData => {
                            console.log("Sucesso Validacao 5", oData);

                            //---------------------------------------------------------------------
                            // Dados da Validação (p/ Worklist)
                            //---------------------------------------------------------------------
                            let view = this.getView();
                            let model = view.getModel("modelValidacoesWorklist");
                            let dados = model.getData();
														
                            let dadosValidacao = {};
                            dadosValidacao.tipoValidacaoCod  = 5;
                            dadosValidacao.tipoValidacaoDesc = this.getOwnerComponent().definirTipoValid(5);
                            
                            if (oData.results.length == 0) {
                                dadosValidacao.statusValido      = 'Sucesso';
                            } else {
                                dadosValidacao.statusValido      = 'Erro';
                            };

                            //adicionar registro da validacao atual
                            dados.push(dadosValidacao);
                            //atualizar o modelo
                            model.refresh();

                            //---------------------------------------------------------------------
                            // Dados da Validações Detail
                            //---------------------------------------------------------------------
                            let modelValidacaoDetail = new JSONModel();
                            modelValidacaoDetail = this.getOwnerComponent().getModel("modelValidacaoDetail");
                            let dadosValidacaoDetail = modelValidacaoDetail.getData();
                            
                            //adicionar registro da validacao atual
                            for (let index = 0; index < oData.results.length; index++) {
                                dadosValidacaoDetail.push(oData.results[index])
                            }
                        },
                        error: oError => {
                            console.log(oError);
                        }
                    })
                })
            },

            async requestValidacao6() {
                await this.selectValidacao6();
            },
            selectValidacao6() {
                console.log("chamando validaçãoCarga6()")
                return new Promise((resolve, reject) => {
                    this.getView().getModel().read(`/selectValidacao6()`, {
                        success: oData => {
                            console.log("Sucesso Validacao 6", oData);

                            //---------------------------------------------------------------------
                            // Dados da Validação Worklist
                            //---------------------------------------------------------------------
                            let view = this.getView();
                            let model = view.getModel("modelValidacoesWorklist");
                            let dados = model.getData();
														
                            let dadosValidacao = {};
                            dadosValidacao.tipoValidacaoCod  = 6;
                            dadosValidacao.tipoValidacaoDesc = this.getOwnerComponent().definirTipoValid(6);

                            if (oData.results.length == 0) {
                                dadosValidacao.statusValido      = 'Sucesso';
                            } else {
                                dadosValidacao.statusValido      = 'Erro';
                            };

                            //adicionar registro da validacao atual
                            dados.push(dadosValidacao);
                            //atualizar o modelo
                            model.refresh();

                            //---------------------------------------------------------------------
                            // Dados da Validações Detail
                            //---------------------------------------------------------------------
                            let modelValidacaoDetail = new JSONModel();
                            modelValidacaoDetail = this.getOwnerComponent().getModel("modelValidacaoDetail");
                            let dadosValidacaoDetail = modelValidacaoDetail.getData();
                            
                            //adicionar registro da validacao atual
                            for (let index = 0; index < oData.results.length; index++) {
                                dadosValidacaoDetail.push(oData.results[index])
                            }
                        },
                        error: oError => {
                            console.log(oError);
                        }
                    })
                })
            },

            async requestValidacao7() {
                await this.selectValidacao7();
            },
            selectValidacao7() {
                console.log("chamando validaçãoCarga7()")
                return new Promise((resolve, reject) => {
                    this.getView().getModel().read(`/selectValidacao7()`, {
                        success: oData => {
                            console.log("Sucesso Validacao 7", oData);

                            //---------------------------------------------------------------------
                            // Dados da Validação Worklist
                            //---------------------------------------------------------------------
                            let view = this.getView();
                            let model = view.getModel("modelValidacoesWorklist");
                            let dados = model.getData();

                            let dadosValidacao = {};
                            dadosValidacao.tipoValidacaoCod  = 7;
                            dadosValidacao.tipoValidacaoDesc = this.getOwnerComponent().definirTipoValid(7);

                            if (oData.results.length == 0) {
                                dadosValidacao.statusValido      = 'Sucesso';
                            } else {
                                dadosValidacao.statusValido      = 'Erro';
                            };

                            //adicionar registro da validacao atual
                            dados.push(dadosValidacao);
                            //atualizar o modelo
                            model.refresh();

                            //---------------------------------------------------------------------
                            // Dados da Validações Detail
                            //---------------------------------------------------------------------
                            let modelValidacaoDetail = new JSONModel();
                            modelValidacaoDetail = this.getOwnerComponent().getModel("modelValidacaoDetail");
                            let dadosValidacaoDetail = modelValidacaoDetail.getData();
                            
                            //adicionar registro da validacao atual
                            for (let index = 0; index < oData.results.length; index++) {
                                dadosValidacaoDetail.push(oData.results[index])
                            }
                        },
                        error: oError => {
                            console.log(oError);
                        }
                    })
                })
            },

            async requestValidacao8() {
                await this.selectValidacao8();
            },
            selectValidacao8() {
                console.log("chamando validaçãoCarga8()")
                return new Promise((resolve, reject) => {
                    this.getView().getModel().read(`/selectValidacao8()`, {
                        success: oData => {
                            console.log("Sucesso Validacao 8", oData);
                            
                            //---------------------------------------------------------------------
                            // Dados da Validação Worklist
                            //---------------------------------------------------------------------
                            let view = this.getView();
                            let model = view.getModel("modelValidacoesWorklist");
                            let dados = model.getData();

                            let dadosValidacao = {};
                            dadosValidacao.tipoValidacaoCod  = 8;
                            dadosValidacao.tipoValidacaoDesc = this.getOwnerComponent().definirTipoValid(8);

                            if (oData.results.length == 0) {
                                dadosValidacao.statusValido      = 'Sucesso';
                            } else {
                                dadosValidacao.statusValido      = 'Erro';
                            };

                            //adicionar registro da validacao atual
                            dados.push(dadosValidacao);
                            //atualizar o modelo
                            model.refresh();

                            //---------------------------------------------------------------------
                            // Dados da Validações Detail
                            //---------------------------------------------------------------------
                            let modelValidacaoDetail = new JSONModel();
                            modelValidacaoDetail = this.getOwnerComponent().getModel("modelValidacaoDetail");
                            let dadosValidacaoDetail = modelValidacaoDetail.getData();
                            
                            //adicionar registro da validacao atual
                            for (let index = 0; index < oData.results.length; index++) {
                                dadosValidacaoDetail.push(oData.results[index])
                            }
                        },
                        error: oError => {
                            console.log(oError);
                        }
                    })
                })
            },

            onValidacaoWorklistClick: function (oEvent) {
                
                this.getOwnerComponent().getRouter().navTo("object", {
                    tipoValidacaoCod: oEvent.getSource().mBindingInfos.text.binding.aValues[0]
                });
                
            }
        });
    });
