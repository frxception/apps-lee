const path = require('path');
// const { SkeletonPlugin } = require('page-skeleton-webpack-plugin');
module.exports = {
  // configureWebpack: {
  //   plugins: [
  //     new SkeletonPlugin({
  //       pathname: path.resolve(__dirname, './shell'),
  //       staticDir: path.resolve(__dirname, './dist'),
  //       routes: ['/']
  //     })
  //   ]
  // },
  chainWebpack: (config: any) => {
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
      .loader('pug-plain-loader')
      .end();
  },
  pluginOptions: {
    apollo: {
      typescript: true,
    }
  },
};
