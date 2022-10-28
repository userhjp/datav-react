import { merge } from 'webpack-merge';
import { Configuration, EnvironmentPlugin } from 'webpack';
import { baseConfig } from './webpack.base';
import WebpackDevServer from 'webpack-dev-server';
import { environment } from './environments/environment.prod';

const Config: Configuration & { devServer: WebpackDevServer.Configuration } = {
  mode: 'development',
  output: {
    publicPath: '/', // 输出解析文件的目录，url 相对于 HTML 页面
  },
  devtool: 'eval-source-map', // 'nosources-source-map',
  // https://webpack.docschina.org/configuration/dev-server/#devserver
  devServer: {
    compress: true, // gizp 默认值true
    open: false,
    hot: true,
    static: {
      publicPath: '/',
    },
    watchFiles: ['public/**/*'],
    historyApiFallback: true,
    client: {
      logging: 'none',
      progress: true,
    },
    setupMiddlewares: (middlewares, devServer) => {
      return middlewares;
    },
  },
  optimization: {
    chunkIds: 'deterministic',
  },
  plugins: [
    new EnvironmentPlugin(environment)
  ],
};

export default merge(baseConfig(Config.mode), Config);
