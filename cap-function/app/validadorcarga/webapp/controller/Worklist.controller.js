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

                this.limparDados();

                // //Criar a tabela de dados e Model p/ o WORKLIST com as TODAS as Validacoes
                // let dadosValidacoesWorklist = [];
                // let modelValidacoesWorklist = new JSONModel();
                // modelValidacoesWorklist.setData(dadosValidacoesWorklist);
                // this.getView().setModel(modelValidacoesWorklist,"modelValidacoesWorklist");

                // //Criar a tabela de dados e Model local p/ o OBJECT PAGE 
                // var dadosValidacaoDetail = [];
                // var modelValidacaoDetail = new JSONModel();
                // modelValidacaoDetail.setData(dadosValidacaoDetail);
                // this.getView().setModel(modelValidacaoDetail,"modelValidacaoDetail");

                // //model c/ count(*) da tab. Inbound
                // let dadosWorklist = [{
                //     textoQtdeRegsInbound: ''
                // }];
                // let modelWorklist = new JSONModel();
                // modelWorklist.setData(dadosWorklist);
                // this.getView().setModel(modelWorklist,"modelWorklist");

                

            },

            onValidarButtonClick: function (oEvent) {
                this.limparDados();
                this.requestCountInbound();
                this.requestValidacao1();
                this.requestValidacao2();
                this.requestValidacao3();
                this.requestValidacao4();
                this.requestValidacao5();
                this.requestValidacao6();
                this.requestValidacao7();
                this.requestValidacao8();
            },

            limparDados: function (params) {
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

                //model c/ count(*) da tab. Inbound
                let dadosWorklist = [{
                    textoQtdeRegsInbound: ''
                }];
                let modelWorklist = new JSONModel();
                modelWorklist.setData(dadosWorklist);
                this.getView().setModel(modelWorklist,"modelWorklist");
            },

            //-----------------------------------------------------------------------------------------
            // Seleção de contador de registros
            //-----------------------------------------------------------------------------------------
            async requestCountInbound() {
                await this.selectCountInbound();
            },
            selectCountInbound() {
                console.log("chamando selectCountInbound()")
                return new Promise((resolve, reject) => {
                    this.getView().getModel().read(`/selectCountInbound()`, {
                        success: oData => {

                            console.log("Sucesso selectCountInbound()", oData);
                            
                            let view = this.getView();
                            let model = view.getModel("modelWorklist");
                            let dados = model.getData();

                            //adicionar registro da validacao atual
                            dados.textoQtdeRegsInbound = `Qtde. Tab. INBOUND: ` + oData.selectCountInbound.count;
                            //atualizar o modelo
                            model.refresh();                      

                        },
                        error: oError => {
                            console.log(oError);
                        }
                    })
                })
            },
            //-----------------------------------------------------------------------------------------
            // Validação 1
            //-----------------------------------------------------------------------------------------
            async requestValidacao1() {
                await this.selectValidacao1()
            },
            selectValidacao1() {
                console.log("chamando validaçãoCarga1()")
                return new Promise((resolve, reject) => {
                    this.getView().getModel().read(`/selectValidacao1()`, {
                        success: oData => {
                            debugger;
                            console.log("Sucesso Validacao 1", oData);
                            let view = this.getView();
                            let model = view.getModel("modelValidacoesWorklist");
                            let dados = model.getData();

                            //---------------------------------------------------------------------
                            //Dados da Validação 1 (p/ Worklist)
                            //---------------------------------------------------------------------
                            let dadosValidacao = {};
                            dadosValidacao.tipoValidacaoCod  = 1;
                            dadosValidacao.tipoValidacaoDesc = this.getOwnerComponent().definirTipoValid(1);
                            dadosValidacao.contador = oData.selectValidacao1.contador;

                            if (oData.selectValidacao1.contador == 0) {
                                dadosValidacao.statusValido      = 'Sucesso';
                            } else {
                                dadosValidacao.statusValido      = 'Erro';
                            };

                            //adicionar registro da validacao atual
                            dados.push(dadosValidacao);
                            //atualizar o modelo
                            model.refresh();

                            //---------------------------------------------------------------------
                            //Dados da Validações 1 Detail (p/ Object Page)
                            //---------------------------------------------------------------------
                            debugger;
                            let modelValidacaoDetail = new JSONModel();
                            this.getOwnerComponent().getModel(modelValidacaoDetail,"modelValidacaoDetail");
                            let dadosValidacaoDetail = oData.selectValidacao1.registros;
                            modelValidacaoDetail.setData(dadosValidacaoDetail);
                            this.getOwnerComponent().setModel(modelValidacaoDetail,"modelValidacaoDetail");                          

                        },
                        error: oError => {
                            console.log(oError);
                        }
                    })
                })
            },

            //-----------------------------------------------------------------------------------------
            // Validação 2
            //-----------------------------------------------------------------------------------------
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
                            dadosValidacao.contador = oData.selectValidacao2.contador;
                            
                            if (oData.selectValidacao2.contador == 0) {
                                dadosValidacao.statusValido      = 'Sucesso';
                            } else {
                                dadosValidacao.statusValido      = 'Erro';
                            };

                            //adicionar registro da validacao atual
                            dados.push(dadosValidacao);
                            //atualizar o modelo
                            model.refresh();
                            
                            debugger;
                            let modelValidacaoDetail = new JSONModel();
                            // this.getOwnerComponent().getModel(modelValidacaoDetail,"modelValidacaoDetail");
                            modelValidacaoDetail = this.getOwnerComponent().getModel("modelValidacaoDetail");
                            let dadosValidacaoDetail = modelValidacaoDetail.getData();
                            //adicionar registro da validacao atual
                            for (let index = 0; index < oData.selectValidacao2.registros.length; index++) {
                                dadosValidacaoDetail.push(oData.selectValidacao2.registros[index])
                            }

                        },
                        error: oError => {
                            console.log(oError);
                        }
                    })
                })
            },

            //-----------------------------------------------------------------------------------------
            // Validação 3
            //-----------------------------------------------------------------------------------------
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
                            dadosValidacao.contador = oData.selectValidacao3.contador;

                            if (oData.selectValidacao3.contador == 0) {
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
                            for (let index = 0; index < oData.selectValidacao3.registros.length; index++) {
                                dadosValidacaoDetail.push(oData.selectValidacao3.registros[index])
                            }
                        },
                        error: oError => {
                            console.log(oError);
                        }
                    })
                })
            },

            //-----------------------------------------------------------------------------------------
            // Validação 4
            //-----------------------------------------------------------------------------------------
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
                            dadosValidacao.contador = oData.selectValidacao4.contador;

                            if (oData.selectValidacao4.contador == 0) {
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
                            for (let index = 0; index < oData.selectValidacao4.registros.length; index++) {
                                dadosValidacaoDetail.push(oData.selectValidacao4.registros[index])
                            }
                        },
                        error: oError => {
                            console.log(oError);
                        }
                    })
                })
            },

            //-----------------------------------------------------------------------------------------
            // Validação 5
            //-----------------------------------------------------------------------------------------
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
                            dadosValidacao.contador = oData.selectValidacao5.contador;
                            
                            if (oData.selectValidacao5.contador == 0) {
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
                            for (let index = 0; index < oData.selectValidacao5.registros.length; index++) {
                                dadosValidacaoDetail.push(oData.selectValidacao5.registros[index])
                            }
                        },
                        error: oError => {
                            console.log(oError);
                        }
                    })
                })
            },

            //-----------------------------------------------------------------------------------------
            // Validação 6
            //-----------------------------------------------------------------------------------------
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
                            dadosValidacao.contador = oData.selectValidacao6.contador;

                            if (oData.selectValidacao6.contador == 0) {
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
                            for (let index = 0; index < oData.selectValidacao6.registros.length; index++) {
                                dadosValidacaoDetail.push(oData.selectValidacao6.registros[index])
                            }
                        },
                        error: oError => {
                            console.log(oError);
                        }
                    })
                })
            },

            //-----------------------------------------------------------------------------------------
            // Validação 7
            //-----------------------------------------------------------------------------------------
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

                            if (oData.selectValidacao7.contador == 0) {
                                dadosValidacao.statusValido      = 'Sucesso';
                            } else {
                                dadosValidacao.statusValido      = 'Erro';
                            };

                            dadosValidacao.contador = oData.selectValidacao7.contador;

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
                            for (let index = 0; index < oData.selectValidacao7.registros.length; index++) {
                                dadosValidacaoDetail.push(oData.selectValidacao7.registros[index])
                            }
                        },
                        error: oError => {
                            console.log(oError);
                        }
                    })
                })
            },

            //-----------------------------------------------------------------------------------------
            // Validação 8
            //-----------------------------------------------------------------------------------------
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

                            if (oData.selectValidacao8.contador == 0) {
                                dadosValidacao.statusValido      = 'Sucesso';
                            } else {
                                dadosValidacao.statusValido      = 'Erro';
                            };

                            dadosValidacao.contador = oData.selectValidacao8.contador;

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
                            for (let index = 0; index < oData.selectValidacao8.registros.length; index++) {
                                dadosValidacaoDetail.push(oData.selectValidacao8.registros[index])
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
