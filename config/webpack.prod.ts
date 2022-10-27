  import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
  import { merge } from 'webpack-merge';
  import TerserPlugin from 'terser-webpack-plugin';
  import { Configuration, EnvironmentPlugin } from 'webpack';
  import { baseConfig } from './webpack.base';
  import MiniCssExtractPlugin from 'mini-css-extract-plugin';
  import { environment } from './environments/environment.prod';

  const prodConfig: Configuration = {
    mode: 'production',
    devtool: false, // 'nosources-source-map',
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          exclude: /\.html$/,
          parallel: true,
          extractComments: false, // 将注释提取到单独的文件中
        }),
      ],
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
      splitChunks: {
        chunks: 'all',
        name: false,
        cacheGroups: {
          default: {
            name: 'common',
            chunks: 'all',
            minChunks: 2,
          },
          // vendor: {  // 将react 单独打包成一个 vendor[hash].js chunks
          //   test: /[\\/]src[\\/]datav[\\/]/,
          //   name: 'vendor',
          //   chunks: 'all',
          // },
        },
      },
      emitOnErrors: true,
      chunkIds: 'deterministic',
    },
    performance: {
      hints: 'warning',
      maxAssetSize: 5 * 1024 * 1024,
      maxEntrypointSize: 4 * 1024 * 1024,
    },
    plugins: [
      // 抽离css
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/vendors_[contenthash:8].css',
        ignoreOrder: true
      }),
      new EnvironmentPlugin(environment)
    ],
  };

  export default merge(baseConfig('production'), prodConfig);
