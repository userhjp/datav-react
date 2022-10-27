import { merge } from 'webpack-merge';
import { Configuration, EnvironmentPlugin } from 'webpack';
import { baseConfig } from './webpack.base';
import WebpackDevServer from 'webpack-dev-server';
import { environment } from './environments/environment.prod';
import ESLintPlugin from 'eslint-webpack-plugin';

const devConfig: Configuration & { devServer: WebpackDevServer.Configuration } = {
  mode: 'development',
  devtool: 'eval-source-map', // 'nosources-source-map',
  // https://webpack.docschina.org/configuration/dev-server/#devserver
  devServer: {
    compress: true, // gizp 默认值true
    open: false,
    hot: true,
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
    chunkIds: 'named',
  },
  plugins: [
    new ESLintPlugin({
      fix: false,
      emitWarning: false,
      extensions: ['tsx', 'ts', 'js', 'json'],
      exclude: ['node_modules']
    }),
    new EnvironmentPlugin(environment)
  ],
};

export default merge<Configuration>(baseConfig('development'), devConfig);
