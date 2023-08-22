const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: [
      'quasar'
    ],

    css: {
        loaderOptions: {
            sass: {
               
            }
        }
    },

    pluginOptions: {
      quasar: {
        importStrategy: 'kebab',
        rtlSupport: false
      }
    }
})
