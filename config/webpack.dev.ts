import { merge } from 'webpack-merge';
import { Configuration, DefinePlugin } from 'webpack';
import { baseConfig } from './webpack.base';
import WebpackDevServer from 'webpack-dev-server';

process.env.NODE_ENV = 'development';

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
    new DefinePlugin({
      REACT_APP_ENV: '"dev"',
      APP_CODE: '"cms"',
      APP_SIG: '"O7NWdk*0e9-3#Gc.iqappkey"',
      PWD_SALT: '"O7Sw0k*0e9-3#Gc.UjfT8"',
      API_URL: '"http://47.97.189.139:3001"',
    })
  ],
};

export default merge<Configuration>(baseConfig, devConfig);
