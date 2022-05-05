import { resolve, join } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Autoprefixer from 'autoprefixer';
import Webpackbar from 'webpackbar';
import CopyWebpackPlugin from 'copy-webpack-plugin';
// import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import { Configuration } from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';

const lessLoadder = {
  loader: 'less-loader',
  options: {
    lessOptions: {
      // modifyVars: getThemeVariables({
      //   // dark: true, // 开启暗黑模式
      //   // compact: true, // 开启紧凑模式
      // }),
      javascriptEnabled: true
    }
  }
};

const commonCssLoader = (cssModules: boolean) => {
  const cssLoader = [
    process.env.NODE_ENV == 'production' ?
    { loader: MiniCssExtractPlugin.loader }:
    { loader: 'style-loader' },
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
export const baseConfig: Configuration = {
  entry: {
    main: './src/app.tsx',
  },
  output: {
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[id].[contenthash:8]_async.js',
    path: join(__dirname, '../dist'),
    // pathinfo: false,
    publicPath: '/', // 输出解析文件的目录，url 相对于 HTML 页面
    assetModuleFilename: 'static/[hash][ext][query]',
    clean: true
  },
  stats: {
    logging: 'warn',
    modules: false,
    version: false,
    entrypoints: false,
    builtAt: true,
    hash: true,
    assets: false,
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
          },
          {
            test: /\.html$/,
            loader: 'html-loader', // 解析html url路径
            options: {
              minimize: false
            }
          },
        ],
      },
    ],
  },
  resolve: {
    mainFiles: ['index'], // 解析目录时同时解析默认文件名
    modules: ['node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': resolve(__dirname, '../src/'),
    },
  },
  performance: {
    maxAssetSize: 400000,
    maxEntrypointSize: 400000
  },
  plugins: [
    new Webpackbar({}),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // filename: '[name].html',
      minify: {
        collapseWhitespace: false,
        removeComments: true,
        removeAttributeQuotes: false,
      },
    }),
    // 抽离css
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: 'vendors_[contenthash:8].css',
      ignoreOrder: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(__dirname, '../public/'),
          to: resolve(__dirname, '../dist/'),
        }
      ]
    }),
    // new MonacoWebpackPlugin( {
    //   languages: ['json', 'javascript', 'typescript'],
    // }),
    new ESLintPlugin({
      exclude: ['node_modules', 'public'],
    })
  ],
  cache: {
    type: "filesystem", // 使用文件缓存
  },
};
