let vueConfig = {
  productionSourceMap:false,
  filenameHashing: false,

  chainWebpack: config => {
    if(process.argv.includes('build')) {//if building -> do not on serve
      config.plugin('html').tap(args => {//change index.html to not minify the html
        args[0].minify.removeComments = false;
        args[0].minify.collapseWhitespace = false;
        return args;
      });
      config.optimization.delete('splitChunks')//do not split up vendor
    }
  },
  
  devServer: {
    open: true,
  }
};


module.exports = vueConfig;