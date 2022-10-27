import { resolve, join } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Autoprefixer from 'autoprefixer';
import Webpackbar from 'webpackbar';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration, DllPlugin } from 'webpack';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const lessLoadder = {
  loader: 'less-loader',
  options: {
    lessOptions: {
      javascriptEnabled: true
    }
  }
};
const commonCssLoader = (cssModules: boolean) => {
  const cssLoader = [
    { loader: MiniCssExtractPlugin.loader },
    {
      loader: 'css-loader',
      options: {
        modules: cssModules ? {
          localIdentName: '[datav]_[hash:base64:5]',
        } : false,
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          ident: 'postcss',
          plugins: [Autoprefixer()],
        }
      },
    },
  ]
  return cssLoader;
};
const DllConfig: Configuration = {
  mode: 'production',
  entry: {
    react: ['react', 'react-dom'],
    datav: './src/datav/index.ts',
  },
  output: {
    path: join(__dirname, '../node_modules/.dll'),
    filename: '_dll_.[name].js',
    chunkFilename: '_dll_.[name]_async.js',
    library: '_dll_[name]',
    // clean: true
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules|public/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.css$/,
            use: [...commonCssLoader(false)]
          },
          {
            test: /\.less$/,
            resourceQuery: /css_modules/,
            use: [
              ...commonCssLoader(true),
              lessLoadder,
            ]
          },
          {
            test: /\.less$/,
            use: [
              ...commonCssLoader(false),
              lessLoadder,
            ]
          },
          {
            test: /\.(jpg|png|jepg|gif|svg)$/,
            type: 'asset/resource',
            parser: {
              dataUrlCondition: {
                maxSize: 8 * 1024,
              },
            },
            generator: {
              filename: 'static/[name][ext][query]',
            },
          }
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': resolve(__dirname, '../src/'),
    },
  },
  externals: ['antd'],
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
    new Webpackbar({}),
    // 抽离css
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: 'vendors_[contenthash:8].css',
      ignoreOrder: true
    }),
    new DllPlugin({
      name: '_dll_[name]', // name === output.library
      path: resolve(__dirname, '../node_modules/.dll/[name].manifest.json'),
    })
  ],
};
export default DllConfig;
