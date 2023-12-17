sap.ui.define(
  [],
  () => {
      return {
          // parametros obrigatorios: oController, sEntity
          get(oController, sEntity, oParams = {}, aFilters = []) {
              return new Promise((resolve, reject) => {
                  oController.getModel().read(sEntity, {
                      urlParams: oParams,
                      filters: aFilters,
                      success(oData) {
                          resolve(oData)
                      },
                      error(oError) {
                          reject(oError)
                      }
                  })
              })
          }
      }
  }
)