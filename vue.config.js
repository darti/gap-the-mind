const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")

module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  chainWebpack: config => {
    config.plugin("monaco-editor").use(MonacoWebpackPlugin, [
      {
        // Languages are loaded on demand at runtime
        languages: ["json", "css"]
      }
    ])
  }
}
