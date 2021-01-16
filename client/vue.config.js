const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../public'),
  pluginOptions: {
    apollo: {
      lintGQL: true
    }
  },
  transpileDependencies: ["vuetify"]
};
