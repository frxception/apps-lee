module.exports = {
  lintOnSave: false,
  chainWebpack: (config: any) => {
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
      .loader('pug-plain-loader')
      .end();
  },
};
