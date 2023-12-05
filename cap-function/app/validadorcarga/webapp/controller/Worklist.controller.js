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
              // let dadosValidacao = [];
              // let modelValidacao = new JSONModel();
              // modelValidacao.setData(dadosValidacao);
              // this.getView().setModel(modelValidacao,"modelValidacoes");

              //Criar a tabela de dados e Model p/ o OBJECT PAGE 
              // com cada Model de sua respectiva validação
              var dadosValidacao1Detail = [];
              var modelValidacao1Detail = new JSONModel();
              modelValidacao1Detail.setData(dadosValidacao1Detail);
              this.getView().setModel(modelValidacao1Detail,"modelValidacao1Detail");

          },
          onValidarButtonClick: function (oEvent) {
              this.requestValidacao1();
              // this.requestValidacao2();
              // this.requestValidacao3();
              // this.requestValidacao4();
              // this.requestValidacao5();
              // this.requestValidacao6();
              // this.requestValidacao7();
              // this.requestValidacao8();
          },
          async requestValidacao1() {
              await this.selectValidacao1()
          },
          selectValidacao1() {
              console.log("chamando validaçãoCarga1()")
              return new Promise((resolve, reject) => {
                  this.getView().getModel().read(`/selectValidacao1()`, {
                      success: oData => {
                          console.log("Sucesso Validacao 1", oData)
                          let view = this.getView();
                          let model = view.getModel("modelValidacoesWorklist");
                          let dados = model.getData();
                          debugger;

                          //---------------------------------------------------------------------
                          //Dados da Validação 1
                          //---------------------------------------------------------------------
                          let dadosValidacao1 = {};
                          dadosValidacao1.tipoValidacaoCod  = '1';
                          dadosValidacao1.tipoValidacaoDesc = 'Verificar se tem registro sem Objeto contábil com DOCTYPECODE *300, *400, *500 e *600';

                          if (oData.results.length == 0) {
                              dadosValidacao1.statusValido      = 'Sucesso';
                          } else {
                              dadosValidacao1.statusValido      = 'Erro';
                          }

                          //adicionar registro da validacao atual
                          dados.push(dadosValidacao1);
                          //atualizar o modelo
                          model.refresh();

                          // resolve()

                          //---------------------------------------------------------------------
                          //Dados da Validações 1 Detail (p/ Tela de Object Page)
                          //---------------------------------------------------------------------
                          let modelValidacao1Detail = view.getModel("modelValidacao1Detail");
                          let dadosValidacao1Detail = oData.results;
                          modelValidacao1Detail.refresh();
                          debugger;

                      },
                      error: oError => {
                          console.log(oError);
                      }
                  })
              })
              // return new Promise((resolve, reject) => {
              //     this.getView().getModel().read(`/selectValidacao1()`, {
              //         success: oData => {
              //             console.log("Sucesso Validacao 1", oData)
              //             let view = this.getView();
              //             let model = view.getModel("modelValidacao");
              //             let dados = model.getData();
              //             debugger;
              //             let dadosValidacao1 = {};
              //             dadosValidacao1.tipoValidacaoCod  = '1';
              //             dadosValidacao1.tipoValidacaoDesc = 'Verificar se tem registro sem Objeto contábil com DOCTYPECODE *300, *400, *500 e *600';

              //             if (oData.selectValidacao1.count == 0) {
              //                 dadosValidacao1.statusValido      = 'Sucesso';
              //             } else {
              //                 dadosValidacao1.statusValido      = 'Erro';
              //             }

              //             //adicionar registro da validacao atual
              //             dados.push(dadosValidacao1);
              //             //atualizar o modelo
              //             model.refresh();

              //             // resolve()
              //         },
              //         error: oError => {
              //             console.log(oError);
              //         }
              //     })
              // })
          },

          async requestValidacao2() {
              await this.selectValidacao2()
          },
          selectValidacao2() {
              console.log("chamando validaçãoCarga2()")
              return new Promise((resolve, reject) => {
                  this.getView().getModel().read(`/selectValidacao2()`, {
                      success: oData => {
                          console.log("Sucesso Validacao 2", oData)
                          let view = this.getView();
                          let model = view.getModel("modelValidacao");
                          let dados = model.getData();
                          debugger;
                          let dadosValidacao = {};
                          dadosValidacao.tipoValidacaoCod  = '2';
                          dadosValidacao.tipoValidacaoDesc = 'Verificar se tem registro sem Grupo de Mercadoria';

                          if (oData.selectValidacao2.count == 0) {
                              dadosValidacao.statusValido = 'Sucesso';
                          } else {
                              dadosValidacao.statusValido = 'Erro';
                          }

                          //adicionar registro da validacao atual
                          dados.push(dadosValidacao);
                          //atualizar o modelo
                          model.refresh();

                          // resolve()
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
                          console.log("Sucesso Validacao 3", oData)
                          let view = this.getView();
                          let model = view.getModel("modelValidacao");
                          let dados = model.getData();
                          debugger;
                          let dadosValidacao = {};
                          dadosValidacao.tipoValidacaoCod  = '3';
                          dadosValidacao.tipoValidacaoDesc = 'Verificar se tem registro sem Descrição do NM';

                          if (oData.selectValidacao3.count == 0) {
                              dadosValidacao.statusValido = 'Sucesso';
                          } else {
                              dadosValidacao.statusValido = 'Erro';
                          }

                          //adicionar registro da validacao atual
                          dados.push(dadosValidacao);
                          //atualizar o modelo
                          model.refresh();

                          // resolve()
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
                          console.log("Sucesso Validacao 4", oData)
                          let view = this.getView();
                          let model = view.getModel("modelValidacao");
                          let dados = model.getData();
                          debugger;
                          let dadosValidacao = {};
                          dadosValidacao.tipoValidacaoCod  = '4';
                          dadosValidacao.tipoValidacaoDesc = 'Verificar se tem registro com DOCNUM  e sem ITMNUM';

                          if (oData.selectValidacao4.count == 0) {
                              dadosValidacao.statusValido = 'Sucesso';
                          } else {
                              dadosValidacao.statusValido = 'Erro';
                          }

                          //adicionar registro da validacao atual
                          dados.push(dadosValidacao);
                          //atualizar o modelo
                          model.refresh();

                          // resolve()
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
                          console.log("Sucesso Validacao 5", oData)
                          let view = this.getView();
                          let model = view.getModel("modelValidacao");
                          let dados = model.getData();
                          debugger;
                          let dadosValidacao = {};
                          dadosValidacao.tipoValidacaoCod  = '5';
                          dadosValidacao.tipoValidacaoDesc = 'Verificar se tem registro sem DOCNUM  e com ITMNUM';

                          if (oData.selectValidacao5.count == 0) {
                              dadosValidacao.statusValido = 'Sucesso';
                          } else {
                              dadosValidacao.statusValido = 'Erro';
                          }

                          //adicionar registro da validacao atual
                          dados.push(dadosValidacao);
                          //atualizar o modelo
                          model.refresh();

                          // resolve()
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
                          console.log("Sucesso Validacao 6", oData)
                          let view = this.getView();
                          let model = view.getModel("modelValidacao");
                          let dados = model.getData();
                          debugger;
                          let dadosValidacao = {};
                          dadosValidacao.tipoValidacaoCod  = '6';
                          dadosValidacao.tipoValidacaoDesc = 'Verificar se tem registro sem Doc.contábil que não tenha vindo da FINAN';

                          if (oData.selectValidacao6.count == 0) {
                              dadosValidacao.statusValido = 'Sucesso';
                          } else {
                              dadosValidacao.statusValido = 'Erro';
                          }

                          //adicionar registro da validacao atual
                          dados.push(dadosValidacao);
                          //atualizar o modelo
                          model.refresh();

                          // resolve()
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
                          console.log("Sucesso Validacao 7", oData)
                          let view = this.getView();
                          let model = view.getModel("modelValidacao");
                          let dados = model.getData();
                          debugger;
                          let dadosValidacao = {};
                          dadosValidacao.tipoValidacaoCod  = '7';
                          dadosValidacao.tipoValidacaoDesc = 'DI,DDI preenchidas só na FINAN';

                          if (oData.selectValidacao7.count == 0) {
                              dadosValidacao.statusValido = 'Sucesso';
                          } else {
                              dadosValidacao.statusValido = 'Erro';
                          }

                          //adicionar registro da validacao atual
                          dados.push(dadosValidacao);
                          //atualizar o modelo
                          model.refresh();

                          // resolve()
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
                          console.log("Sucesso Validacao 8", oData)
                          let view = this.getView();
                          let model = view.getModel("modelValidacao");
                          let dados = model.getData();
                          debugger;
                          let dadosValidacao = {};
                          dadosValidacao.tipoValidacaoCod  = '8';
                          dadosValidacao.tipoValidacaoDesc = 'Imobilizado se tem descrição do BWTAR = * IMOB * e tem ANLN1 e ANLN2';

                          if (oData.selectValidacao8.count == 0) {
                              dadosValidacao.statusValido = 'Sucesso';
                          } else {
                              dadosValidacao.statusValido = 'Erro';
                          }

                          //adicionar registro da validacao atual
                          dados.push(dadosValidacao);
                          //atualizar o modelo
                          model.refresh();

                          // resolve()
                      },
                      error: oError => {
                          console.log(oError);
                      }
                  })
              })
          },



          // onPressExecutar: async function (oEvent) {

          //     let oView = this.getView();
          //     let strDtIni = oView.byId("inpDataIni1").getValue();
          //     let strDtFim = oView.byId("inpDataFim1").getValue();
  
          //     let dtIni = oView.byId("inpDataIni1").getDateValue();
          //     let dtFim = oView.byId("inpDataFim1").getDateValue();
  
          //     if (!dtIni) {
          //         sap.m.MessageToast.show("Data Ini vazia !");
          //         // dados.Region.focus();
          //         return;
          //     }
          //     if (!dtFim) {
          //         sap.m.MessageToast.show("Data Fim vazia !");
          //         // dados.Region.focus();
          //         return;
          //     }
  
          //     if (dtIni > dtFim) {
          //         sap.m.MessageToast.show("Data Ini maior que Data Fim !");
          //         // dados.Region.focus();
          //         return;
          //     }
  
          //     let dtIniAno = (strDtIni.substring(6, 10));
          //     let dtIniMes = (strDtIni.substring(3, 5));
          //     let dtIniDia = (strDtIni.substring(0, 2));
          //     let dtIniFormatoSap = dtIniAno + dtIniMes + dtIniDia;
  
          //     let dtFimAno = (strDtFim.substring(6, 10));
          //     let dtFimMes = (strDtFim.substring(3, 5));
          //     let dtFimDia = (strDtFim.substring(0, 2));
          //     let dtFimFormatoSap = dtFimAno + dtFimMes + dtFimDia;
  
          //     let dados = {
          //         DataDe: dtIniFormatoSap,
          //         DataAte: dtFimFormatoSap
          //     }
  
          //     let path = `/CARGAINBDatasSet(DataDe='${dados.DataDe}',DataAte='${dados.DataAte}')`;
          //     this.getOwnerComponent().getModel().read(path, {
          //         success: function (oData) {
          //             try {
          //                 let dataLonga = new Date();
          //                 let dataAtualShort = dataLonga.toLocaleDateString('pt-BR');//'2023-06-07'
          //                 let horaAtualShort = dataLonga.toLocaleTimeString('pt-BR');//hh:mm:ss
  
          //                 let dataExecutionInterna =  dataAtualShort.substring(6, 10) + '-' + 
          //                                             dataAtualShort.substring(3, 5) + '-' + 
          //                                             dataAtualShort.substring(0, 2);
          //                 let dataIniInterna = strDtIni.substring(6, 10) + '-' + strDtIni.substring(3, 5) + '-' + strDtIni.substring(0, 2);
          //                 let dataFimInterna = strDtFim.substring(6, 10) + '-' + strDtFim.substring(3, 5) + '-' + strDtFim.substring(0, 2);
          //                     //Inserir log na tabela CARGA_HIST
          //                     let dados_hist = {
          //                         usuario_execution: '',
          //                         data_execution: dataExecutionInterna, //'2023-06-07'
          //                         hora_execution: horaAtualShort, //hh:mm:ss.s
          //                         data_carga_ini: dataIniInterna,
          //                         data_carga_fim: dataFimInterna
          //                     };
  
          //                     var oModelCreate = oView.getModel();
  
          //                     oModelCreate.create("/CARGA_HIST", dados_hist, {
          //                         success: function (oData,response){
          //                             console.log('Inserindo Log na tab. CARGA_HIST');
          //                             console.log(response);
          //                         }.bind(this),
          //                             error: function(erro){
          //                             console.log(erro);
          //                         }.bind(this)
          //                     });
          //             } catch (error) {
          //                 console.log(error);
          //             }
          //         }, error: function (oError) {
          //             console.log('Erro ao chamr API');
          //             console.log(oError);
          //             // MessageToast.show(ctx.getView().getModel("i18n").getResourceBundle().getText(`ReprocessarErro`));
          //         }
  
          //     });
          // }
      });
  });
