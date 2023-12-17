sap.ui.define([
  "./BaseController",
  "sap/ui/model/json/JSONModel",
  "../model/formatter",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageToast",
], function (BaseController, JSONModel, formatter, Filter, FilterOperator, MessageToast) {
  "use strict";

  return BaseController.extend("dashtracking.controller.Worklist", {

      formatter: formatter,

      /* =========================================================== */
      /* lifecycle methods                                           */
      /* =========================================================== */

      /**
       * Called when the worklist controller is instantiated.
       * @public
       */
      onInit : function () {
          var oViewModel;

          // keeps the search state
          this._aTableSearchState = [];

          // Model used to manipulate control states
          oViewModel = new JSONModel({
              worklistTableTitle : this.getResourceBundle().getText("worklistTableTitle"),
              shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
              shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
              tableNoDataText : this.getResourceBundle().getText("tableNoDataText")
          });
          this.setModel(oViewModel, "worklistView");

          this.initialValuesFilters()

          this.onPressExecutar()

      },

      initialValuesFilters() {
          let dataInicial = new Date()
          dataInicial.setMonth(dataInicial.getMonth() - 6)

          this.getView().byId("inpDataInicial").setDateValue(dataInicial);
          this.getView().byId("inpDataInicial").setValue(this.timestampToBrazilianShort(dataInicial));
          this.getView().byId("inpDataFinal").setDateValue(new Date());
          this.getView().byId("inpDataFinal").setValue(this.timestampToBrazilianShort(new Date()));
      },

      /* =========================================================== */
      /* event handlers                                              */
      /* =========================================================== */
      onPressExecutar: function (oEvent) {
          
          let oView = this.getView();
          let dtFiltroInicial = oView.byId("inpDataInicial").getDateValue();
          let dtFiltroFinal = oView.byId("inpDataFinal").getDateValue();

          //Datas teste INI---------------------------------------------
          if(!dtFiltroInicial){
              dtFiltroInicial = new Date("1/1/2000"); //FORMATO: Tue Apr 27 2021 10:37:30 GMT-0300 (Brasilia Standard Time)
              // dtFiltroInicial = this.addMonths(new Date(), -6); (<---Solução FINAL)
          }

          if(!dtFiltroFinal){
              dtFiltroFinal = new Date("1/1/3000"); //FORMATO: Tue Apr 27 2021 10:37:30 GMT-0300 (Brasilia Standard Time)
              // dtFiltroFinal = new Date(); (<---Solução FINAL)
          }
          //Datas teste FIM---------------------------------------------

          //Chart 1B (CRIAR MODEL alqui).
          var oDataChart1b = [];
          var oModelChart1b = new JSONModel(oDataChart1b); 
          this.setModel(oModelChart1b, "card1b");

          // oDataOutliers.results = tab_OUTLIER_test;

          // var filters = [];
          // filters.push(new sap.ui.model.Filter("cpuDt", "BT", dtFiltroInicial, dtFiltroFinal ) );

          // Seleção ASSET_VERSION 
          // this.getOwnerComponent().getModel().read(`/ASSET_VERSION`, {
          //     filters: filters,
          //     success: (oDataAssetVersion) => {        
          //         //******************************************* 
          //         //TESTE dados - INI
          //         //******************************************* 
          //         tab_ASSET_VERSION_test = [];
          //         if(oView.byId("inpTestRunVersion").getSelected()){
          //             var tab_ASSET_VERSION_test  = this.preencherDadosTesteAssetVersion();
          //             oDataAssetVersion.results = tab_ASSET_VERSION_test;

          //         };
          //         var tab_OUTLIER_test = [];
          //         if(oView.byId("inpTestRunOutlier").getSelected()){
                      
          //             tab_OUTLIER_test        = this.preencherDadosTesteOutlier();
          //             var oDataOutliers = new JSONModel(tab_OUTLIER_test);
          //             oDataOutliers.results = tab_OUTLIER_test;
          //         };
                  
          //         var oModelTest;
          //         oModelTest = new JSONModel({
          //             tab_ASSET_VERSION_test : tab_ASSET_VERSION_test,
          //             tab_OUTLIER_test: tab_OUTLIER_test,
          //         });
          //         this.setModel(oModelTest, "test");
          //         //******************************************* 
          //         //TEST dados - FIM
          //         //******************************************* 
                  
          //         // this.getOwnerComponent().getModel().setSizeLimit(999999);
          //         // // Card 2A
          //         // this.processChart2a(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion);
          //         // Card 2B
          //         // this.processChart2b(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion);
          //         // Card 2C
          //         // this.processChart2c(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion);
          //         // Card 2D
          //         // this.processChart2d(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion);
          //         // // Card 1B-part 1 Version part
          //         // this.processChart1bVersion(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion);
          //     },
          //     error: (oError) => {
          //         console.log(oError)
          //     }
          // });
          
          // // Seleção OUTLIERS
          // this.getOwnerComponent().getModel().read(`/OUTLIERS`, {
          //     filters: filters,
          //     success: (oDataOutliers) => {
          //         // Card 1B-part 2 Outlier part
          //         this.processChart1bOutlier(dtFiltroInicial,dtFiltroFinal,oDataOutliers);
          //         // Card 3A
          //         this.processChart3a(dtFiltroInicial,dtFiltroFinal,oDataOutliers);
          //         // Card 3B
          //         this.processChart3b(dtFiltroInicial,dtFiltroFinal,oDataOutliers);
          //     },
          //     error: (oError) => {
          //         console.log(oError)
          //     }
          // }); 

          //Eu quero retornar este formato: "2022-08-04T04:02:10.909Z"
          var dtIni = dtFiltroInicial.toISOString().substr(0, 19);
          var dtFim = dtFiltroFinal.toISOString().substr(0, 19);

          // this.getView().setBusy(true)

          // Faz requisicoes para carregar a tela
          this.doRequests(dtIni,dtFim);
          this.requestVersionChart1B(dtIni,dtFim);
          this.requestOutliersChart1B(dtIni,dtFim);
          this.processChart1b();
          this.requestVersionChart2A(dtIni,dtFim);
          this.requestVersionChart2B(dtIni,dtFim);
          this.requestVersionChart2C(dtIni,dtFim);
          this.requestVersionChart2D(dtIni,dtFim);
          this.requestOutliersChart3A(dtIni,dtFim);
          this.requestOutliersChart3B(dtIni,dtFim);

          // this.getView().setBusy(false)
          
      },

      timestampToBrazilianShort: function (timestampDate) {
          let brazilianShortDate = timestampDate.toLocaleDateString('pt-BR');//'2023-06-07'
          return brazilianShortDate;
      },
      brazilianShortDateToChartDate: function (brazilianShortDate) {
          let chartDate = brazilianShortDate.substring(6,10) + '-' + brazilianShortDate.substring(3,5);
          return chartDate;
      },

      getDaysInMonth : function(year, month) {
          return new Date(year, month, 0).getDate();
      },

      addMonths: function (input, months){
          const date = new Date(input);
          date.setDate(1);
          date.setMonth(date.getMonth() + months);
          date.setDate(Math.min(input.getDate(), this.getDaysInMonth(date.getFullYear(), date.getMonth()+1)));
          return date;
      },

      async doRequests(dtFiltroInicial,dtFiltroFinal) {
          await this.selectOutliers(dtFiltroInicial,dtFiltroFinal)
      },

      async requestVersionChart1B(dtFiltroInicial,dtFiltroFinal) {
          await this.selectVersionChart1B(dtFiltroInicial,dtFiltroFinal)
      },

      async requestOutliersChart1B(dtFiltroInicial,dtFiltroFinal) {
          await this.selectOutliersChart1B(dtFiltroInicial,dtFiltroFinal)
      },

      async requestVersionChart2A(dtFiltroInicial,dtFiltroFinal) {
          await this.selectVersionChart2A(dtFiltroInicial,dtFiltroFinal)
      },

      async requestVersionChart2B(dtFiltroInicial,dtFiltroFinal) {
          await this.selectVersionChart2B(dtFiltroInicial,dtFiltroFinal)
      },

      async requestVersionChart2C(dtFiltroInicial,dtFiltroFinal) {
          await this.selectVersionChart2C(dtFiltroInicial,dtFiltroFinal)
      },

      async requestVersionChart2D(dtFiltroInicial,dtFiltroFinal) {
          await this.selectVersionChart2D(dtFiltroInicial,dtFiltroFinal)
      },

      async requestOutliersChart3A(dtFiltroInicial,dtFiltroFinal) {
          await this.selectOutliersChart3A(dtFiltroInicial,dtFiltroFinal)
      },

      async requestOutliersChart3B(dtFiltroInicial,dtFiltroFinal) {
          await this.selectOutliersChart3B(dtFiltroInicial,dtFiltroFinal)
      },

      selectOutliers(dtFiltroInicial,dtFiltroFinal) {
          console.log("chamando selecionarOutliersDashboard()")
          return new Promise((resolve, reject) => {
              this.getOwnerComponent().getModel().read(`/selecionarOutliersDashboard()`, {
                  urlParameters: {
                      'dtFiltroInicial': dtFiltroInicial,
                      'dtFiltroFinal': dtFiltroFinal
                  },
                  success: oData => {
                      console.log("sucesso",oData)
                      // oData = oData.results[0]

                      resolve()
                  },
                  error: oError => {
                      console.log(oError);
                  }
              })
          })
      },

      selectVersionChart2A(dtFiltroInicial,dtFiltroFinal) {
          console.log("chamando selectOutliersChart2A()")
          return new Promise((resolve, reject) => {
              this.getOwnerComponent().getModel().read(`/selectVersionChart2A()`, {
                  urlParameters: {
                      'dtFiltroInicial': dtFiltroInicial,
                      'dtFiltroFinal': dtFiltroFinal
                  },
                  success: oData => {
                      console.log("sucesso 2A",oData)
                      // Chart 2A
                      this.processChart2a(dtFiltroInicial,dtFiltroFinal,oData.results);

                      resolve()
                  },
                  error: oError => {
                      console.log(oError);
                  }
              })
          })
      },

      selectVersionChart2B(dtFiltroInicial,dtFiltroFinal) {
          console.log("chamando selectOutliersChart2B()")
          return new Promise((resolve, reject) => {
              this.getOwnerComponent().getModel().read(`/selectVersionChart2B()`, {
                  urlParameters: {
                      'dtFiltroInicial': dtFiltroInicial,
                      'dtFiltroFinal': dtFiltroFinal
                  },
                  success: oData => {
                      console.log("sucesso 2B",oData)
                      // Chart 2B
                      this.processChart2b(dtFiltroInicial,dtFiltroFinal,oData.results);

                      resolve()
                  },
                  error: oError => {
                      console.log(oError);
                  }
              })
          })
      },

      selectVersionChart2C(dtFiltroInicial,dtFiltroFinal) {
          console.log("chamando selectOutliersChart2C()")
          return new Promise((resolve, reject) => {
              this.getOwnerComponent().getModel().read(`/selectVersionChart2C()`, {
                  urlParameters: {
                      'dtFiltroInicial': dtFiltroInicial,
                      'dtFiltroFinal': dtFiltroFinal
                  },
                  success: oData => {
                      console.log("sucesso 2C",oData)
                      // Chart 2C
                      this.processChart2c(dtFiltroInicial,dtFiltroFinal,oData.results);

                      resolve()
                  },
                  error: oError => {
                      console.log(oError);
                  }
              })
          })
      },

      selectVersionChart2D(dtFiltroInicial,dtFiltroFinal) {
          console.log("chamando selectOutliersChart2D()")
          return new Promise((resolve, reject) => {
              this.getOwnerComponent().getModel().read(`/selectVersionChart2D()`, {
                  urlParameters: {
                      'dtFiltroInicial': dtFiltroInicial,
                      'dtFiltroFinal': dtFiltroFinal
                  },
                  success: oData => {
                      console.log("sucesso 2D",oData)
                      // Chart 2D
                      this.processChart2d(dtFiltroInicial,dtFiltroFinal,oData.results);

                      resolve()
                  },
                  error: oError => {
                      console.log(oError);
                  }
              })
          })
      },

      selectVersionChart1B(dtFiltroInicial,dtFiltroFinal) {
          console.log("chamando selectOutliersChart1B()")
          return new Promise((resolve, reject) => {
              this.getOwnerComponent().getModel().read(`/selectVersionChart1B()`, {
                  urlParameters: {
                      'dtFiltroInicial': dtFiltroInicial,
                      'dtFiltroFinal': dtFiltroFinal
                  },
                  success: oData => {
                      console.log("sucesso 1B Version",oData)
                      // Chart 1B
                      this.processChart1bVersion(dtFiltroInicial,dtFiltroFinal,oData.results);

                      resolve()
                  },
                  error: oError => {
                      console.log(oError);
                  }
              })
          })
      },

      selectOutliersChart1B(dtFiltroInicial,dtFiltroFinal) {
          console.log("chamando selectOutliersChart1B()")
          return new Promise((resolve, reject) => {
              this.getOwnerComponent().getModel().read(`/selectOutliersChart1B()`, {
                  urlParameters: {
                      'dtFiltroInicial': dtFiltroInicial,
                      'dtFiltroFinal': dtFiltroFinal
                  },
                  success: oData => {
                      console.log("sucesso 1B Outliers",oData)
                      // Chart 1B
                      this.processChart1bOutlier(dtFiltroInicial,dtFiltroFinal,oData.results);

                      resolve()
                  },
                  error: oError => {
                      console.log(oError);
                  }
              })
          })
      },

      selectOutliersChart3A(dtFiltroInicial,dtFiltroFinal) {
          console.log("chamando selectOutliersChart3A()")
          return new Promise((resolve, reject) => {
              this.getOwnerComponent().getModel().read(`/selectOutliersChart3A()`, {
                  urlParameters: {
                      'dtFiltroInicial': dtFiltroInicial,
                      'dtFiltroFinal': dtFiltroFinal
                  },
                  success: oData => {
                      console.log("sucesso 3A Outliers",oData)
                      // Card 3B
                      this.processChart3a(dtFiltroInicial,dtFiltroFinal,oData.results);

                      resolve()
                  },
                  error: oError => {
                      console.log(oError);
                  }
              })
          })
      },

      selectOutliersChart3B(dtFiltroInicial,dtFiltroFinal) {
          console.log("chamando selectOutliersChart3B()")
          return new Promise((resolve, reject) => {
              this.getOwnerComponent().getModel().read(`/selectOutliersChart3B()`, {
                  urlParameters: {
                      'dtFiltroInicial': dtFiltroInicial,
                      'dtFiltroFinal': dtFiltroFinal
                  },
                  success: oData => {
                      console.log("sucesso 3B Outliers",oData)
                      // Card 3B
                      this.processChart3b(dtFiltroInicial,dtFiltroFinal,oData.results);

                      resolve()
                  },
                  error: oError => {
                      console.log(oError);
                  }
              })
          })
      },

      //--------------------------------------------------------------------------
      // CHART 1B part 1 Version
      //--------------------------------------------------------------------------
      processChart1b : function(){
          
          var oVizFrameChart1b = this.getView().byId("idVizFrameChart1b");
          if (oVizFrameChart1b){
              oVizFrameChart1b.setVizProperties({
                  plotArea: {
                      dataLabel: {
                          visible: true
                      }
                  },
                  title: {
                      visible: true,
                      text: '1B Version x Outliers'
                  }
              });
          }

      },

      processChart1bVersion : function(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion){
          // const novosDados = [];
          this.montarDadosCard1bVersion(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion);
          // const oModelCard3a = new JSONModel(novosDados);
          // this.setModel(oModelCard3a, "card3a");
          
          // var oVizFrameChart1b = this.getView().byId("idVizFrameChart1b");
          // if (oVizFrameChart1b){
          //     oVizFrameChart1b.setVizProperties({
          //         plotArea: {
          //             dataLabel: {
          //                 visible: true
          //             }
          //         },
          //         title: {
          //             visible: true,
          //             text: '1B Version x Outliers'
          //         }
          //     });
          // }

      },

      montarDadosCard1bVersion : function (dtFiltroInicial,dtFiltroFinal,oDataAssetVersion){
          try {
              let novoRegistro = {};
              // cpudtAnoMes: "", //"2021-01"
              // countVersion: 0,
              // countOutlier: 0,
              // countTotal: 0
              
              let oModelChart1b = this.getModel("card1b");
              let oDataChart1b = oModelChart1b.getData();
              
              try {
                  oDataAssetVersion.forEach(registroAtual => {
                      
                      // 'Tue Apr 27 2021 10:37:30 GMT-0300 (Brasilia Standard Time)' p/ '2021-02'
                      // let registroAtualData = this.brazilianShortDateToChartDate(this.timestampToBrazilianShort(registroAtual.cpuDt));

                      //Procurar se já existe o ano-mês atual já no array de dados finais do chart
                      // let oModelChart1b = this.getModel("card1b");
                      let registroEncontrado = oDataChart1b.find((regEncontrado) => regEncontrado["Mês"] == registroAtual.mes);

                      //SE JÁ existe este ano-mês 
                      if (!!registroEncontrado){
                          registroEncontrado["Version"] = registroAtual.count;
                      //SE ainda NÃO existe este ano-mês
                      } else {
                          novoRegistro["Version"]     = registroAtual.count;
                          novoRegistro["Outlier"]     = 0;
                          novoRegistro["Mês"]         = registroAtual.mes;
                          oDataChart1b.push(novoRegistro); 
                          novoRegistro = {};
                      }
                  });

                  oModelChart1b = new JSONModel(oDataChart1b);
                  this.setModel(oModelChart1b, "card1b");

              } catch (error) {
                  console.log(error);
              }
          } catch (oError) {
              console.log(oError);
          }
      },

      //--------------------------------------------------------------------------
      // CHART 1B part 2 Outlier
      //--------------------------------------------------------------------------
      processChart1bOutlier(dtFiltroInicial,dtFiltroFinal,oDataOutliers){

          this.montarDadosCard1bOutlier(dtFiltroInicial,dtFiltroFinal,oDataOutliers);

          // let oView = this.getView();
          // oView.byId("inpTestRunOutlier").getSelected();
          
          // var test = [];
          // if (oView.byId("inpTestRunOutlier").getSelected()) {
          //     this.montarDadosCard1bOutlier(dtFiltroInicial,dtFiltroFinal,test);   
          // } else {
          //     this.montarDadosCard1bOutlier(dtFiltroInicial,dtFiltroFinal,oDataOutliers);
          // }

      },

      montarDadosCard1bOutlier : function (dtFiltroInicial,dtFiltroFinal,oDataOutliers){
          try {
              
              //Test dados
              // let oView = this.getView();
              // if (oView.byId("inpTestRunOutlier").getSelected()) {
              //     var tab_OUTLIER_test = [];
              //     var oModelTest = this.getModel("test");
              //     tab_OUTLIER_test = oModelTest.getProperty("/tab_OUTLIER_test");
              //     oDataOutliers = tab_OUTLIER_test;
              // }

              let novoRegistro = {};
              // cpudtAnoMes: "", //"2021-01"
              // countVersion: 0,
              // countOutlier: 0,
              // countTotal: 0
              
              let oModelChart1b = this.getModel("card1b");
              let oDataChart1b = oModelChart1b.getData();
              
              try {
                  oDataOutliers.forEach(registroAtual => {
                      
                      // 'Tue Apr 27 2021 10:37:30 GMT-0300 (Brasilia Standard Time)' p/ '2021-02'
                      // let registroAtualData = this.brazilianShortDateToChartDate(this.timestampToBrazilianShort(registroAtual.cpuDt));

                      //Procurar se já existe o ano-mês atual já no array de dados finais do chart
                      // let oModelChart1b = this.getModel("card1b");
                      let registroEncontrado = oDataChart1b.find((regEncontrado) => regEncontrado["Mês"] == registroAtual.mes);

                      //SE JÁ existe este ano-mês 
                      if (!!registroEncontrado){
                          registroEncontrado["Outlier"] = registroAtual.count;
                      //SE ainda NÃO existe este ano-mês
                      } else {
                          novoRegistro["Version"]       = 0;
                          novoRegistro["Outlier"]       = registroAtual.count;
                          novoRegistro["Mês"]           = registroAtual.mes;
                          oDataChart1b.push(novoRegistro);
                          novoRegistro = {};
                      }
                  });

                  oDataChart1b.sort(function (x, y) {
                      let a = x["Mês"],
                          b = y["Mês"];
                      return a == b ? 0 : a > b ? 1 : -1;
                  });
                  oModelChart1b = new JSONModel(oDataChart1b);
                  this.setModel(oModelChart1b, "card1b");
                  

              } catch (error) {
                  console.log(error);
              }
          } catch (oError) {
              console.log(error);
          }
      },
      // processChart1bOutlier(dtFiltroInicial,dtFiltroFinal,oDataOutliers){

      //     let oView = this.getView();
      //     oView.byId("inpTestRunOutlier").getSelected();
          
      //     var test = [];
      //     if (oView.byId("inpTestRunOutlier").getSelected()) {
      //         this.montarDadosCard1bOutlier(dtFiltroInicial,dtFiltroFinal,test);   
      //     } else {
      //         this.montarDadosCard1bOutlier(dtFiltroInicial,dtFiltroFinal,oDataOutliers.results);
      //     }

      // },

      // montarDadosCard1bOutlier : function (dtFiltroInicial,dtFiltroFinal,oDataOutliers){
      //     try {
              
      //         //Test dados
      //         let oView = this.getView();
      //         if (oView.byId("inpTestRunOutlier").getSelected()) {
      //             var tab_OUTLIER_test = [];
      //             var oModelTest = this.getModel("test");
      //             tab_OUTLIER_test = oModelTest.getProperty("/tab_OUTLIER_test");
      //             oDataOutliers = tab_OUTLIER_test;
      //         }

      //         let novoRegistro = {};
      //         // cpudtAnoMes: "", //"2021-01"
      //         // countVersion: 0,
      //         // countOutlier: 0,
      //         // countTotal: 0
              
      //         let oModelChart1b = this.getModel("card1b");
      //         let oDataChart1b = oModelChart1b.getData();
              
      //         try {
      //             oDataOutliers.forEach(registroAtual => {
                      
      //                 // 'Tue Apr 27 2021 10:37:30 GMT-0300 (Brasilia Standard Time)' p/ '2021-02'
      //                 let registroAtualData = this.brazilianShortDateToChartDate(this.timestampToBrazilianShort(registroAtual.cpuDt));

      //                 //Procurar se já existe o ano-mês atual já no array de dados finais do chart
      //                 // let oModelChart1b = this.getModel("card1b");
      //                 let registroEncontrado = oDataChart1b.find((regEncontrado) => regEncontrado["Mês"] == registroAtualData);

      //                 //SE JÁ existe este ano-mês 
      //                 if (!!registroEncontrado){
      //                     registroEncontrado["Outlier"]++;
      //                     // registroEncontrado.countTotal++;
      //                 //SE ainda NÃO existe este ano-mês
      //                 } else {
      //                     novoRegistro["Version"]       = 0;
      //                     novoRegistro["Outlier"]       = 1;
      //                     // novoRegistro.countTotal       = 1;
      //                     novoRegistro["Mês"]           = registroAtualData;
      //                     oDataChart1b.push(novoRegistro); 
      //                     novoRegistro = {};
      //                 }
      //             });

      //             oDataChart1b.sort(function (x, y) {
      //                 let a = x["Mês"],
      //                     b = y["Mês"];
      //                 return a == b ? 0 : a > b ? 1 : -1;
      //             });
      //             oModelChart1b = new JSONModel(oDataChart1b);
      //             this.setModel(oModelChart1b, "card1b");
                  

      //         } catch (error) {
      //             console.log(error);
      //         }
      //     } catch (oError) {
      //         console.log(error);
      //     }
      // },

      //--------------------------------------------------------------------------
      // CHART 2A
      //--------------------------------------------------------------------------
      processChart2a(dtFiltroInicial, dtFiltroFinal, oDataAssetVersion){
          const oCard2aDados = [];
          this.montarDadosCard2a(dtFiltroInicial, dtFiltroFinal, oDataAssetVersion, oCard2aDados);
          const oModelCard2a = new JSONModel(oCard2aDados);
          this.setModel(oModelCard2a, "card2a");
          
          var oVizFrameChart2a = this.getView().byId("idVizFrameChart2a");
          if (oVizFrameChart2a){
              oVizFrameChart2a.setVizProperties({
                  plotArea: {
                      dataLabel: {
                          visible: true
                      }
                  },
                  title: {
                      visible: true,
                      text: '2A Monitor do Fisco'
                  }
              });
          }

          //BKP old
          // const oCard2aDados = [];
          // const oModelCard2a = new JSONModel(oCard2aDados);
          // this.montarDadosCard2a(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion.results,oModelCard2a.getData());
          // this.setModel(oModelCard2a, "card2a");
          
          // var oVizFrameChart2a = this.getView().byId("idVizFrameChart2a");
          // if (oVizFrameChart2a){
          //     oVizFrameChart2a.setVizProperties({
          //         plotArea: {
          //             dataLabel: {
          //                 visible: true
          //             }
          //         },
          //         title: {
          //             visible: true,
          //             text: '2A Monitor do Fisco'
          //         }
          //     });
          // }

      },

      montarDadosCard2a : function (dtFiltroInicial,dtFiltroFinal,oDataAssetVersion, oModelCard2a){
          var lv_card2a = {};
          try {

              oDataAssetVersion.forEach(lineAssetversion => {

                  if (lineAssetversion.isActiveVs && !lineAssetversion.cancelado) {
                          // Linha nova Ativa 
                          lv_card2a.Tipo      = 'Ativa';
                          lv_card2a.Contador  = lineAssetversion.count;
                          oModelCard2a.push(lv_card2a);
                          lv_card2a = {};

                  } else if (!lineAssetversion.isActiveVs && !lineAssetversion.cancelado) {
                          // Linha nova Inativa por Saldo 
                          lv_card2a.Tipo      = 'Inativa Por Saldo';
                          lv_card2a.Contador  = lineAssetversion.count;
                          oModelCard2a.push(lv_card2a);
                          lv_card2a = {};

                  } else if (!lineAssetversion.isActiveVs && lineAssetversion.cancelado) {
                          // Linha nova Inativa por Saldo 
                          lv_card2a.Tipo      = 'Inativa Cancelada';
                          lv_card2a.Contador  = lineAssetversion.count;
                          oModelCard2a.push(lv_card2a);
                          lv_card2a = {};
                  }
              });

              oModelCard2a.sort(function (x, y) {
                  let a = x["Tipo"],
                      b = y["Tipo"];
                  return a == b ? 0 : a > b ? 1 : -1;
              });

              return oModelCard2a;

          } catch (oError) {

          }

      },

      // montarDadosCard2a : function (dtFiltroInicial,dtFiltroFinal,oDataAssetVersion, oModelCard2a){
      //     try {
      //         let lv_card2a = {};

      //         oDataAssetVersion.forEach(lineAssetversion => {
                  
      //             if (lineAssetversion.isActiveVs && !lineAssetversion.cancelado) {
      //                 //Procurar se já existe no oModelCard2a
      //                 let linhaExistenteAtiva = oModelCard2a.find((chartLinha) => chartLinha["Tipo"] == "Ativa" )
      //                 // Linha Ativa já existe 
      //                 if (!!linhaExistenteAtiva) {
      //                     linhaExistenteAtiva.Contador++;
      //                 } else {
      //                     // Linha nova Ativa 
      //                     lv_card2a.Tipo      = 'Ativa';
      //                     lv_card2a.Contador  = 1;
      //                     oModelCard2a.push(lv_card2a);
      //                     lv_card2a = {};
      //                 }

      //             } else if (!lineAssetversion.isActiveVs && !lineAssetversion.cancelado) {
      //                 //Procurar se já existe no oModelCard2a
      //                 let linhaExistenteInativaSaldo = oModelCard2a.find((chartLinha) => chartLinha["Tipo"] == "Inativa Por Saldo" )
      //                 // Linha Ativa já existe 
      //                 if (!!linhaExistenteInativaSaldo) {
      //                     linhaExistenteInativaSaldo.Contador++;
      //                 } else {
      //                     // Linha nova Inativa por Saldo 
      //                     lv_card2a.Tipo = 'Inativa Por Saldo';
      //                     lv_card2a.Contador = 1;
      //                     oModelCard2a.push(lv_card2a);
      //                     lv_card2a = {};
      //                 }

      //             } else if (!lineAssetversion.isActiveVs && lineAssetversion.cancelado) {
      //                 //Procurar se já existe no oModelCard2a
      //                 let linhaExistenteInativaCanc = oModelCard2a.find((chartLinha) => chartLinha["Tipo"] == "Inativa Cancelada" )
      //                 // Linha Ativa já existe 
      //                 if (!!linhaExistenteInativaCanc) {
      //                     linhaExistenteInativaCanc.Contador++;
      //                 } else {
      //                     // Linha nova Inativa por Saldo 
      //                     lv_card2a.Tipo = 'Inativa Cancelada';
      //                     lv_card2a.Contador = 1;
      //                     oModelCard2a.push(lv_card2a);
      //                     lv_card2a = {};
      //                 }
      //             }
      //         });

      //         return oModelCard2a;

      //     } catch (oError) {

      //     }

      // },

      //--------------------------------------------------------------------------
      // CHART 2B
      //--------------------------------------------------------------------------
      processChart2b(dtFiltroInicial, dtFiltroFinal, oDataAssetVersion){

          const oCard2bDados = [];
          this.montarDadosCard2b(dtFiltroInicial, dtFiltroFinal, oDataAssetVersion, oCard2bDados);

          const oModelCard2b = new JSONModel(oCard2bDados);
          this.setModel(oModelCard2b, "card2b");
          
          var oVizFrameChart2b = this.getView().byId("idVizFrameChart2b");
          if (oVizFrameChart2b){
              oVizFrameChart2b.setVizProperties({
                  plotArea: {
                      dataLabel: {
                          visible: true
                      }
                  },
                  title: {
                      visible: true,
                      text: '2B Asset Type x Doc. Type'
                  }
              });
          }
      },

      montarDadosCard2b : function(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion, chartDados){
          try {
              let lv_card = {};
              // Y1= assetTypeCode
              // Y2= docTypeCode
              // X= count
              
              try {
                  oDataAssetVersion.forEach(linhaAssetVersion => {
                      lv_card["Asset Type Code"]   = linhaAssetVersion.assetTypeCode;
                      lv_card["Doc Type Code"]     = linhaAssetVersion.docTypeCode;
                      lv_card["Contador"]          = linhaAssetVersion.Contador;
                      chartDados.push(lv_card);
                      lv_card = {};
                  });

                  chartDados.sort(function (x, y) {
                      let a = x["Asset Type Code"],
                          b = y["Asset Type Code"];
                      return a == b ? 0 : a > b ? 1 : -1;
                  });
                  return chartDados;
              } catch (error) {
                  
              }

          } catch (oError) {
              
          }
      },

      // processChart2b(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion){
         
      //     const oDados = [];
      //     this.montarDadosCard2b(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion.results,oDados);

      //     const oModelCard2b = new JSONModel(oDados);
      //     this.setModel(oModelCard2b, "card2b");

      //     var oVizFrameChart2b = this.getView().byId("idVizFrameChart2b");
      //     if (oVizFrameChart2b){
      //         oVizFrameChart2b.setVizProperties({
      //             plotArea: {
      //                 dataLabel: {
      //                     visible: true
      //                 }
      //             },
      //             title: {
      //                 visible: true,
      //                 text: '2B Asset Type x Doc. Type'
      //             }
      //         });
      //     }

      // },

      // montarDadosCard2b : function(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion, chartDados){
      //     try {
      //         let lv_card = {};
      //         // Y1= assetTypeCode
      //         // Y2= docTypeCode
      //         // X= count
              
      //         try {
      //             oDataAssetVersion.forEach(linhaAssetVersion => {
      //                 if (linhaAssetVersion.isActiveVs) {
      //                     //Procurar se já existe no chartDados
      //                     let linhaExistente = chartDados.find((chartLinha) => chartLinha["Asset Type Code"] == linhaAssetVersion.assetTypeCode && chartLinha["Doc Type Code"] == linhaAssetVersion.docTypeCode)

      //                     //Se sim
      //                     if (!!linhaExistente){
      //                         linhaExistente["Contador"]++;
      //                     // Se não, NOVA LINHA
      //                     } else {
      //                         lv_card["Asset Type Code"]   = linhaAssetVersion.assetTypeCode;
      //                         lv_card["Doc Type Code"]     = linhaAssetVersion.docTypeCode;
      //                         lv_card["Contador"]          = 1;
      //                         chartDados.push(lv_card);
      //                         lv_card = {};
      //                     }
      //                 }
      //             });

      //             chartDados.sort(function (x, y) {
      //                 let a = x["Asset Type Code"],
      //                     b = y["Asset Type Code"];
      //                 return a == b ? 0 : a > b ? 1 : -1;
      //             });
      //             return chartDados;
      //         } catch (error) {
                  
      //         }

      //     } catch (oError) {
              
      //     }
      // },

      //--------------------------------------------------------------------------
      // CHART 2C
      //--------------------------------------------------------------------------
      processChart2c(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion){
         
          const oDados = [];
          this.montarDadosCard2c(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion,oDados);
          
          const oModelCard2c = new JSONModel(oDados);
          this.setModel(oModelCard2c, "card2c");

          var oVizFrameChart2c = this.getView().byId("idVizFrameChart2c");
          if (oVizFrameChart2c){
              oVizFrameChart2c.setVizProperties({
                  plotArea: {
                      dataLabel: {
                          visible: true
                      }
                  },
                  title: {
                      visible: true,
                      text: '2C Status Iva x Cenário'
                  }
              });
          }

      },

      montarDadosCard2c : function(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion, chartDados){
          try {
              let lv_card = {};                
              // Y1=Status (valores NP, 00, até 13)
              // Y2=Count
              // X=Cenario (valores F0017, F0027, F0540, etc)
              
              try {
                  oDataAssetVersion.forEach(linhaAssetVersion => {
                      lv_card.Status   = linhaAssetVersion.status_PC;
                      lv_card.Cenario  = linhaAssetVersion.cenario;
                      lv_card.Contador = linhaAssetVersion.Contador;
                      chartDados.push(lv_card);
                      lv_card = {};
                  });

                  chartDados.sort(function (x, y) {
                      let a = x.Cenario,
                          b = y.Cenario;
                      return a == b ? 0 : a > b ? 1 : -1;
                  });
                  return chartDados;
              } catch (error) {
                  
              }

          } catch (oError) {
              
          }
      },
      // processChart2c(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion){
         
      //     const oDados = [];
      //     this.montarDadosCard2c(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion.results,oDados);
          
      //     const oModelCard2c = new JSONModel(oDados);
      //     this.setModel(oModelCard2c, "card2c");

      //     var oVizFrameChart2c = this.getView().byId("idVizFrameChart2c");
      //     if (oVizFrameChart2c){
      //         oVizFrameChart2c.setVizProperties({
      //             plotArea: {
      //                 dataLabel: {
      //                     visible: true
      //                 }
      //             },
      //             title: {
      //                 visible: true,
      //                 text: '2C Status Iva x Cenário'
      //             }
      //         });
      //     }

      // },

      // montarDadosCard2c : function(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion, chartDados){
      //     try {
      //         let lv_card = {};                
      //         // Y1=Status (valores NP, 00, até 13)
      //         // Y2=Count
      //         // X=Cenario (valores F0017, F0027, F0540, etc)

      //         try {
      //             oDataAssetVersion.forEach(linhaAssetVersion => {
                      
      //                 //Procurar se já existe o ano-mês atual já no array de dados finais do chart
      //                 let linhaExistente = chartDados.find((chartLinha) => chartLinha.Cenario == linhaAssetVersion.cenario && chartLinha.Status == linhaAssetVersion.status_PC)

      //                 //Se sim
      //                 if (!!linhaExistente){
      //                     linhaExistente.Contador++;
      //                 // Se não, NOVA LINHA
      //                 } else {
      //                     lv_card.Status   = linhaAssetVersion.status_PC;                            
      //                     lv_card.Contador = 1;
      //                     lv_card.Cenario  = linhaAssetVersion.cenario;
      //                     chartDados.push(lv_card);
      //                     lv_card = {};
      //                 }
      //             });

      //             chartDados.sort(function (x, y) {
      //                 let a = x.Cenario,
      //                     b = y.Cenario;
      //                 return a == b ? 0 : a > b ? 1 : -1;
      //             });
      //             return chartDados;
      //         } catch (error) {
                  
      //         }

      //     } catch (oError) {
              
      //     }
      // },

      //--------------------------------------------------------------------------
      // CHART 2D
      //--------------------------------------------------------------------------
      processChart2d(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion){

          const oDados2d = [];
          this.montarDadosCard2d(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion,oDados2d);

          const oModelCard2d = new JSONModel(oDados2d);
          this.setModel(oModelCard2d, "card2d");

          var oVizFrameChart2d = this.getView().byId("idVizFrameChart2d");
          if (oVizFrameChart2d){
              oVizFrameChart2d.setVizProperties({
                  plotArea: {
                      dataLabel: {
                          visible: true
                      }
                  },
                  title: {
                      visible: true,
                      text: '2D (V0) x (Vn)'
                      // text: '2D Assets Criados (V0) x Trackings Criados (Vn)'
                  }
              });
          }

      },

      montarDadosCard2d : function (dtFiltroInicial,dtFiltroFinal,oDataAssetVersion, novosDados){
          try {
              let lv_card = {};
              // isActiveVs : false,
              // cancelado : true,
              // version: 1,
              // cpudtAnoMes: "Mar-2021"
              try {
                  oDataAssetVersion.forEach(data => {
                      lv_card.V0    = data.Contadorv0;
                      lv_card.VN    = data.Contadorvn;
                      lv_card.Total = data.Contadorv0 + data.Contadorvn;
                      lv_card["Mês"] = data.mes;
                      novosDados.push(lv_card);
                      lv_card = {};
                  });

                  novosDados.sort(function (x, y) {
                      let a = x["Mês"],
                          b = y["Mês"];
                      return a == b ? 0 : a > b ? 1 : -1;
                  });
                  return novosDados;
              } catch (error) {
                  
              }

          } catch (oError) {

          }

      },

      // processChart2d(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion){

      //     const oDados2d = [];
      //     this.montarDadosCard2d(dtFiltroInicial,dtFiltroFinal,oDataAssetVersion.results,oDados2d);
      //     const oModelCard2d = new JSONModel(oDados2d);
      //     this.setModel(oModelCard2d, "card2d");

      //     var oVizFrameChart2d = this.getView().byId("idVizFrameChart2d");
      //     if (oVizFrameChart2d){
      //         oVizFrameChart2d.setVizProperties({
      //             plotArea: {
      //                 dataLabel: {
      //                     visible: true
      //                 }
      //             },
      //             title: {
      //                 visible: true,
      //                 text: '2D (V0) x (Vn)'
      //                 // text: '2D Assets Criados (V0) x Trackings Criados (Vn)'
      //             }
      //         });
      //     }

      // },

      // montarDadosCard2d : function (dtFiltroInicial,dtFiltroFinal,oDataAssetVersion, novosDados){
      //     try {
      //         let lv_card = {};
      //         // isActiveVs : false,
      //         // cancelado : true,
      //         // version: 1,
      //         // cpudtAnoMes: "Mar-2021"

      //         try {
      //             oDataAssetVersion.forEach(data => {
                      
      //                 // 'Tue Apr 27 2021 10:37:30 GMT-0300 (Brasilia Standard Time)' p/ '2021-02'
      //                 let chartDate = this.brazilianShortDateToChartDate(this.timestampToBrazilianShort(data.cpuDt));

      //                 //Procurar se já existe o ano-mês atual já no array de dados finais do chart
      //                 let novoDado = novosDados.find((novoDado) => novoDado["Mês"] == chartDate)

      //                 //Se sim
      //                 if (!!novoDado){
      //                     if (data.version == 0) {
      //                         novoDado.V0++;
      //                         novoDado.Total++;
      //                     } else {
      //                         novoDado.VN++;
      //                         novoDado.Total++;
      //                     }
      //                 // Se não
      //                 } else {
      //                     if (data.version == 0) {
      //                         lv_card.V0    = 1;
      //                         lv_card.VN    = 0;
      //                         lv_card.Total       = 1;
      //                         lv_card["Mês"] = chartDate;
      //                         novosDados.push(lv_card);
      //                         lv_card = {};
      //                     } else {
      //                         lv_card.version0    = 0;
      //                         lv_card.versionN    = 1;
      //                         lv_card.total       = 1;
      //                         lv_card["Mês"] = chartDate;
      //                         novosDados.push(lv_card);
      //                         lv_card = {};
      //                     }
      //                 }
      //             });

      //             novosDados.sort(function (x, y) {
      //                 let a = x["Mês"],
      //                     b = y["Mês"];
      //                 return a == b ? 0 : a > b ? 1 : -1;
      //             });
      //             return novosDados;
      //         } catch (error) {
                  
      //         }

      //     } catch (oError) {

      //     }

      // },

      //--------------------------------------------------------------------------
      // CHART 3A
      //--------------------------------------------------------------------------
      processChart3a(dtFiltroInicial,dtFiltroFinal,oDataOutliers){

          const oDados = [];
          this.montarDadosCard3a(dtFiltroInicial,dtFiltroFinal,oDataOutliers,oDados);

          const oModelCard3a = new JSONModel(oDados);
          this.setModel(oModelCard3a, "card3a");
          
          var oVizFrameChart3a = this.getView().byId("idVizFrameChart3a");
          if (oVizFrameChart3a){
              oVizFrameChart3a.setVizProperties({
                  plotArea: {
                      dataLabel: {
                          visible: true
                      }
                  },
                  title: {
                      visible: true,
                      text: '3A Classif. x Não Classif.'
                  }
              });
          }

      },

      ///PAREI AQUI FALTA APENAS AQUI NO FIORI.....
      montarDadosCard3a : function (dtFiltroInicial,dtFiltroFinal,oDataOutliers, novosDados){
          try {
              let lv_card = {};
              
              try {
                  oDataOutliers.forEach(data => {
                      //Procurar se já existe o ano-mês atual já no array de dados finais do chart
                      let novoDado = novosDados.find((novoDado) => novoDado["Mês"] == data.mes);

                      //SE JÁ existe este ano-mês nos novosDados
                      // if (!!novoDado){
                          
                      //     if (!!data.docTypeCode) {
                      //         novoDado["Classif."]++;
                      //         novoDado.Total++;
                      //     } else {
                      //         novoDado["Não Classif."]++;
                      //         novoDado.Total++;
                      //     }
                      //SE ainda NÃO existe este ano-mês nos novosDados
                      // } else {
                          lv_card["Classif."]     = data.classificado ? 1 : 0;
                          lv_card["Não Classif."] = data.naoClassificado ? 1 : 0;
                          lv_card.Total           = data.total;
                          lv_card["Mês"]          = data.mes;
                          novosDados.push(lv_card);
                          lv_card = {};
                      // }
                  });

                  novosDados.sort(function (x, y) {
                      let a = x["Mês"],
                          b = y["Mês"];
                      return a == b ? 0 : a > b ? 1 : -1;
                  });
                  return novosDados;
              } catch (error) {
                  debugger
              }
          } catch (oError) {
              debugger
          }

      },

      // processChart3a(dtFiltroInicial,dtFiltroFinal,oDataOutliers){

      //     const oDados3a = [];
      //     this.montarDadosCard3a(dtFiltroInicial,dtFiltroFinal,oDataOutliers.results,oDados3a);
      //     const oModelCard3a = new JSONModel(oDados3a);
      //     this.setModel(oModelCard3a, "card3a");
      //     var oVizFrameChart3a = this.getView().byId("idVizFrameChart3a");
      //     if (oVizFrameChart3a){
      //         oVizFrameChart3a.setVizProperties({
      //             plotArea: {
      //                 dataLabel: {
      //                     visible: true
      //                 }
      //             },
      //             title: {
      //                 visible: true,
      //                 text: '3A Classif. x Não Classif.'
      //             }
      //         });
      //     }

      // },

      // montarDadosCard3a : function (dtFiltroInicial,dtFiltroFinal,oDataOutliers, novosDados){
      //     try {
      //         let lv_card = {};
              
      //         try {
      //             oDataOutliers.forEach(data => {

      //                 // 'Tue Apr 27 2021 10:37:30 GMT-0300 (Brasilia Standard Time)' p/ '2021-02'
      //                 let chartDate = this.brazilianShortDateToChartDate(this.timestampToBrazilianShort(data.cpuDt));

      //                 //Procurar se já existe o ano-mês atual já no array de dados finais do chart
      //                 let novoDado = novosDados.find((novoDado) => novoDado["Mês"] == chartDate);

      //                 //SE JÁ existe este ano-mês nos novosDados
      //                 if (!!novoDado){
                          
      //                     if (!!data.docTypeCode) {
      //                         novoDado["Classif."]++;
      //                         novoDado.Total++;
      //                     } else {
      //                         novoDado["Não Classif."]++;
      //                         novoDado.Total++;
      //                     }
      //                 //SE ainda NÃO existe este ano-mês nos novosDados
      //                 } else {
      //                     if (!!data.docTypeCode) {
      //                         lv_card["Classif."]     = 1;
      //                         lv_card["Não Classif."] = 0;
      //                         lv_card.Total           = 1;
      //                         lv_card["Mês"]          = chartDate;
      //                         novosDados.push(lv_card);
      //                         lv_card = {};
      //                     } else {
      //                         lv_card["Classif."]     = 0;
      //                         lv_card["Não Classif."] = 1;
      //                         lv_card.Total           = 1;
      //                         lv_card["Mês"]          = chartDate;
      //                         novosDados.push(lv_card);
      //                         lv_card = {};
      //                     }
      //                 }
      //             });

      //             novosDados.sort(function (x, y) {
      //                 let a = x["Mês"],
      //                     b = y["Mês"];
      //                 return a == b ? 0 : a > b ? 1 : -1;
      //             });
      //             return novosDados;
      //         } catch (error) {
                  
      //         }
      //     } catch (oError) {

      //     }

      // },


      //--------------------------------------------------------------------------
      // CHART 3B
      //--------------------------------------------------------------------------
      processChart3b(dtFiltroInicial,dtFiltroFinal,oDataOutliers){
          
          const oDados = [];
          this.montarDadosCard3b(dtFiltroInicial,dtFiltroFinal,oDataOutliers,oDados);

          const oModelCard3b = new JSONModel(oDados);
          this.setModel(oModelCard3b, "card3b");

          var oVizFrameChart3b = this.getView().byId("idVizFrameChart3b");
          if (oVizFrameChart3b){
              oVizFrameChart3b.setVizProperties({
                  plotArea: {
                      dataLabel: {
                          visible: true
                      }
                  },
                  title: {
                      visible: true,
                      text: '3B DocType + Não Classificados'
                  }
              });
          }

      },

      montarDadosCard3b : function(dtFiltroInicial,dtFiltroFinal,oDataOutliers, chartDados){
          try {
              let lv_card = {};
              // Y1= Não Classificados
              // Y2= Sem Movimento
              // Y3= Ignorados MATDOC
              // X= count DocType (é a cor)
              
              try {
                  oDataOutliers.forEach(linhaOutlier => {
                      lv_card["Outlier Descr"]   = linhaOutlier.outlierDescr;
                      lv_card["Doc Type Code"]   = linhaOutlier.docTypeCode;
                      lv_card["Contador"]        = linhaOutlier.count;
                      chartDados.push(lv_card);
                      lv_card = {};
                  });

                  return chartDados;
              } catch (error) {
                  
              }

          } catch (oError) {
              
          }
      },
      // processChart3b(dtFiltroInicial,dtFiltroFinal,oDataOutliers){
          
      //     const oDados = [];
      //     this.montarDadosCard3b(dtFiltroInicial,dtFiltroFinal,oDataOutliers.results,oDados);

      //     const oModelCard3b = new JSONModel(oDados);
      //     this.setModel(oModelCard3b, "card3b");

      //     var oVizFrameChart3b = this.getView().byId("idVizFrameChart3b");
      //     if (oVizFrameChart3b){
      //         oVizFrameChart3b.setVizProperties({
      //             plotArea: {
      //                 dataLabel: {
      //                     visible: true
      //                 }
      //             },
      //             title: {
      //                 visible: true,
      //                 text: '3B DocType + Não Classificados'
      //             }
      //         });
      //     }

      // },

      // montarDadosCard3b : function(dtFiltroInicial,dtFiltroFinal,oDataOutliers, chartDados){
      //     try {
      //         let lv_card = {};
      //         // Y1= Não Classificados
      //         // Y2= Sem Movimento
      //         // Y3= Ignorados MATDOC
      //         // X= count DocType (é a cor)
              
      //         try {
      //             oDataOutliers.forEach(linhaOutlier => {
      //                 //Procurar se já existe no chartDados
      //                 let linhaExistente = chartDados.find((chartLinha) => chartLinha["Outlier Descr"] == linhaOutlier.outlierDescr && chartLinha["Doc Type Code"] == linhaOutlier.docTypeCode)

      //                 //Se sim
      //                 if (!!linhaExistente){
      //                     linhaExistente["Contador"]++;
      //                 // Se não, NOVA LINHA
      //                 } else {
      //                     lv_card["Outlier Descr"]   = linhaOutlier.outlierDescr;
      //                     lv_card["Doc Type Code"]   = linhaOutlier.docTypeCode;
      //                     lv_card["Contador"]        = 1;
      //                     chartDados.push(lv_card);
      //                     lv_card = {};
      //                 }
      //             });

      //             // chartDados.sort(function (x, y) {
      //             //     let a = x["Asset Type Code"],
      //             //         b = y["Asset Type Code"];
      //             //     return a == b ? 0 : a > b ? 1 : -1;
      //             // });
      //             return chartDados;
      //         } catch (error) {
                  
      //         }

      //     } catch (oError) {
              
      //     }
      // },


      //--------------------------------------------------------------------------
      // AUXILIARY FUNCTIONS
      //--------------------------------------------------------------------------


      preencherDadosTesteAssetVersion: function(){
          var tab_ASSET_VERSION_test = 
          [   { 
                  isActiveVs : true,
                  cancelado : false,
                  version: 0,
                  cpudt: "2021-01"
              },
              { 
                  isActiveVs : false,
                  cancelado : false,
                  version: 1,
                  cpudt: "2021-01"
              },
              { 
                  isActiveVs : true,
                  cancelado : false,
                  version: 0,
                  cpudt: "2021-02"
              },
              { 
                  isActiveVs : true,
                  cancelado : false,
                  version: 1,
                  cpudt: "2021-02"
              },
              { 
                  isActiveVs : true,
                  cancelado : false,
                  version: 1,
                  cpudt: "2021-02"
              },
              { 
                  isActiveVs : true,
                  cancelado : false,
                  version: 0,
                  cpudt: "2021-03"
              },
              { 
                  isActiveVs : true,
                  cancelado : false,
                  version: 0,
                  cpudt: "2021-03"
              },
              { 
                  isActiveVs : true,
                  cancelado : false,
                  version: 1,
                  cpudt: "2021-03"
              },
              { 
                  isActiveVs : true,
                  cancelado : false,
                  version: 0,
                  cpudt: "2021-04"
              },
              { 
                  isActiveVs : true,
                  cancelado : false,
                  version: 0,
                  cpudt: "2021-04"
              },
              { 
                  isActiveVs : true,
                  cancelado : false,
                  version: 1,
                  cpudt: "2021-04"
              },
              { 
                  isActiveVs : true,
                  cancelado : false,
                  version: 1,
                  cpudt: "2021-04"
              },
              { 
                  isActiveVs : true,
                  cancelado : false,
                  version: 1,
                  cpudt: "2021-04"
              },
              { 
                  isActiveVs : true,
                  cancelado : false,
                  version: 1,
                  cpudt: "2021-04"
              },
              { 
                  isActiveVs : true,
                  cancelado : false,
                  version: 1,
                  cpudt: "2021-04"
              },
              { 
                  isActiveVs : true,
                  cancelado : false,
                  version: 1,
                  cpudt: "2021-04"
              },
              { 
                  isActiveVs : true,
                  cancelado : false,
                  version: 1,
                  cpudt: "2021-04"
              },
              { 
                  isActiveVs : true,
                  cancelado : false,
                  version: 1,
                  cpudt: "2021-04"
              }
          ];
          return tab_ASSET_VERSION_test;
      },

      preencherDadosTesteOutlier: function(){

          let tab_OUTLIER_test = [
              { 
                  docTypeCode: '00105',
                  cpuDt: new sap.ui.model.type.Date("01/01/2021")
              },
              { 
                  docTypeCode: '00105',
                  cpuDt: new sap.ui.model.type.Date("01/01/2021")
              },
              { 
                  docTypeCode: '',
                  cpuDt: new sap.ui.model.type.Date("01/01/2021")
              },
              { 
                  docTypeCode: '07600',
                  cpuDt: new sap.ui.model.type.Date("02/01/2021")
              },
              { 
                  docTypeCode: '07600',
                  cpuDt: new sap.ui.model.type.Date("02/01/2021")
              },
              { 
                  docTypeCode: '00105',
                  cpuDt: new sap.ui.model.type.Date("02/01/2021")
              },
              { 
                  docTypeCode: '00105',
                  cpuDt: new sap.ui.model.type.Date("02/01/2021")
              },
              { 
                  docTypeCode: '',
                  cpuDt: new sap.ui.model.type.Date("02/01/2021")
              },
              { 
                  docTypeCode: '00105',
                  cpuDt: new sap.ui.model.type.Date("03/01/2021")
              },
              { 
                  docTypeCode: '00105',
                  cpuDt: new sap.ui.model.type.Date("03/01/2021")
              },
              { 
                  docTypeCode: '00105',
                  cpuDt: new sap.ui.model.type.Date("03/01/2021")
              },
              { 
                  docTypeCode: '00105',
                  cpuDt: new sap.ui.model.type.Date("03/01/2021")
              },
              { 
                  docTypeCode: '00105',
                  cpuDt: new sap.ui.model.type.Date("03/01/2021")
              },
              { 
                  docTypeCode: '00105',
                  cpuDt: new sap.ui.model.type.Date("04/01/2021")
              },
              { 
                  docTypeCode: '00105',
                  cpuDt: new sap.ui.model.type.Date("04/01/2021")
              },
              { 
                  docTypeCode: '',
                  cpuDt: new sap.ui.model.type.Date("04/01/2021")
              },
              { 
                  docTypeCode: '00105',
                  cpuDt: new sap.ui.model.type.Date("04/01/2021")
              },
              { 
                  docTypeCode: '00105',
                  cpuDt: new sap.ui.model.type.Date("05/01/2021")
              },
              { 
                  docTypeCode: '00105',
                  cpuDt: new sap.ui.model.type.Date("05/01/2021")
              },
              { 
                  docTypeCode: '',
                  cpuDt: new sap.ui.model.type.Date("05/01/2021")
              }
          ];

          return tab_OUTLIER_test;
      },
      /**
       * Triggered by the table's 'updateFinished' event: after new table
       * data is available, this handler method updates the table counter.
       * This should only happen if the update was successful, which is
       * why this handler is attached to 'updateFinished' and not to the
       * table's list binding's 'dataReceived' method.
       * @param {sap.ui.base.Event} oEvent the update finished event
       * @public
       */
      onUpdateFinished : function (oEvent) {
          // update the worklist's object counter after the table update
          var sTitle,
              oTable = oEvent.getSource(),
              iTotalItems = oEvent.getParameter("total");
          // only update the counter if the length is final and
          // the table is not empty
          if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
              sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
          } else {
              sTitle = this.getResourceBundle().getText("worklistTableTitle");
          }
          this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);
      },

      /**
       * Event handler when a table item gets pressed
       * @param {sap.ui.base.Event} oEvent the table selectionChange event
       * @public
       */
      onPress : function (oEvent) {
          // The source is the list item that got pressed
          this._showObject(oEvent.getSource());
      },

      /**
       * Event handler for navigating back.
       * Navigate back in the browser history
       * @public
       */
      onNavBack : function() {
          // eslint-disable-next-line fiori-custom/sap-no-history-manipulation, fiori-custom/sap-browser-api-warning
          history.go(-1);
      },


      onSearch : function (oEvent) {
          if (oEvent.getParameters().refreshButtonPressed) {
              // Search field's 'refresh' button has been pressed.
              // This is visible if you select any main list item.
              // In this case no new search is triggered, we only
              // refresh the list binding.
              this.onRefresh();
          } else {
              var aTableSearchState = [];
              var sQuery = oEvent.getParameter("query");

              if (sQuery && sQuery.length > 0) {
                  aTableSearchState = [new Filter("assetId", FilterOperator.Contains, sQuery)];
              }
              this._applySearch(aTableSearchState);
          }

      },

      /**
       * Event handler for refresh event. Keeps filter, sort
       * and group settings and refreshes the list binding.
       * @public
       */
      onRefresh : function () {
          var oTable = this.byId("table");
          oTable.getBinding("items").refresh();
      },

      /* =========================================================== */
      /* internal methods                                            */
      /* =========================================================== */

      /**
       * Shows the selected item on the object page
       * @param {sap.m.ObjectListItem} oItem selected Item
       * @private
       */
      _showObject : function (oItem) {
          this.getRouter().navTo("object", {
              objectId: oItem.getBindingContext().getPath().substring("/ASSET_VERSION".length)
          });
      },

      /**
       * Internal helper method to apply both filter and search state together on the list binding
       * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
       * @private
       */
      _applySearch: function(aTableSearchState) {
          var oTable = this.byId("table"),
              oViewModel = this.getModel("worklistView");
          oTable.getBinding("items").filter(aTableSearchState, "Application");
          // changes the noDataText of the list in case there are no filter results
          if (aTableSearchState.length !== 0) {
              oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
          }
      }

  });
});
