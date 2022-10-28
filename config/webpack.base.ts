import { join, resolve } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Webpackbar from 'webpackbar';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { Configuration } from 'webpack';

const outputDir = resolve(__dirname, '../dist/datav-react');

export const baseConfig = (NODE_ENV: 'production' | 'development' | 'none'): Configuration => {
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
      path: outputDir,
      publicPath: '/', // 输出解析文件的目录，url 相对于 HTML 页面
      filename: 'js/[name].[contenthash:8].js',
      chunkFilename: 'js/[id].[contenthash:8]_async.js',
      assetModuleFilename: 'assets/[name][ext][query]',
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
              test: /\.(png|jpe?g|gif|svg)$/,
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: 4 * 1024, // 4kb
                },
              },
            },
            // {
            //   test: /\.html$/,
            //   loader: 'html-loader', // 解析html url路径
            //   options: {
            //     minimize: false
            //   }
            // },
          ],
        },
      ],
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.tsx', '.ts', '.json', '.js'],
      alias: {
        '@': resolve(__dirname, '../src/'),
      },
    },
    plugins: [
      new Webpackbar({}),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
        minify: {
          collapseWhitespace: false,
          removeComments: true,
          removeAttributeQuotes: false,
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: resolve(__dirname, '../public/'),
            to: outputDir,
            filter: (filepath) => !filepath.match(/(favicon.ico|index.html)$/)
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
