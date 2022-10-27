import { join, resolve } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Webpackbar from 'webpackbar';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { Configuration } from 'webpack';

const outputDir = resolve(__dirname, '../dist/datav-react');

export const baseConfig = (NODE_ENV: 'production' | 'development'): Configuration => {
  const cssLoader = (cssModules: boolean) => {
    return [
      NODE_ENV == 'production' ?
      { loader: MiniCssExtractPlugin.loader }:  // 代替 style-loader分离css
      { loader: 'style-loader' },
      {
        loader: 'css-loader',
        options: {
          modules: cssModules ? {
            localIdentName: '[app]_[hash:base64:5]',
          } : false,
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            ident: 'postcss',
            plugins: [require('autoprefixer')],
          }
        },
      },
    ]
  };

  return {
    entry: {
      main: './src/app.tsx',
    },
    output: {
      filename: 'js/[name].[contenthash:8].js',
      chunkFilename: 'js/[id].[contenthash:8]_async.js',
      path: outputDir,
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
              use: [...cssLoader(false)]
            },
            {
              test: /\.less$/,
              resourceQuery: /css_modules/,
              use: [
                ...cssLoader(true),
                {
                  loader: 'less-loader',
                  options: { lessOptions: { javascriptEnabled: true } }
                }
              ]
            },
            {
              test: /\.less$/,
              use: [
                ...cssLoader(false),
                {
                  loader: 'less-loader',
                  options: { lessOptions: { javascriptEnabled: true } }
                }
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
      extensions: ['.tsx', '.ts', '.json', '.js'],
      alias: {
        '@': resolve(__dirname, '../src/'),
      },
    },
    plugins: [
      new Webpackbar({}),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        // filename: '[name].html',
        favicon: './static/favicon.ico',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: resolve(__dirname, '../static/'),
            to: join(outputDir, '/static/'),
          }
        ]
      }),
      // new MonacoWebpackPlugin( {
      //   languages: ['json', 'javascript', 'typescript'],
      // }),
    ],
    cache: {
      type: "filesystem", // 使用文件缓存
    },
  };
}
