  import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
  import { merge } from 'webpack-merge';
  import TerserPlugin from 'terser-webpack-plugin';
  import { Configuration, DefinePlugin } from 'webpack';
  import { baseConfig } from './webpack.base';

  process.env.NODE_ENV = 'production';

  const prodConfig: Configuration = {
    mode: 'production',
    devtool: false, // 'nosources-source-map',
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          exclude: /\.html$/,
          extractComments: false, // 将注释提取到单独的文件中
        }),
      ],
      splitChunks: {
        chunks: 'all',
        name: false,
        cacheGroups: {
          default: {
            name: 'common',
            chunks: 'all',
            minChunks: 2,
          },
      //     utils: { //拆分指定文件
      //       test: /(src\/utils\/index.ts)$/,
      //       name: 'utils~lib',
      //       chunks: 'initial',
      //       priority: 10
      //     }
        },
      },
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
      emitOnErrors: true,
      chunkIds: 'deterministic',
    },
    performance: {
      hints: 'warning',
      maxAssetSize: 5 * 1024 * 1024,
      maxEntrypointSize: 3 * 1024 * 1024,
    },
    plugins: [
      new DefinePlugin({
        REACT_APP_ENV: false,
        APP_CODE: '"cms"',
        APP_SIG: '"O7NWdk*0e9-3#Gc.iqappkey"',
        PWD_SALT: '"O7Sw0k*0e9-3#Gc.UjfT8"',
        API_URL: '"http://47.97.189.139:3001"',
      })
    ],
  };

  export default merge(baseConfig, prodConfig);
