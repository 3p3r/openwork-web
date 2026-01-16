import path from 'path'
import { readFileSync } from 'fs'
import webpack from 'webpack'
import type { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import 'webpack-dev-server'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

const config: Configuration = {
  mode: 'development',
  entry: {
    main: './src/main/index.ts',
    preload: './src/preload/index.ts',
    renderer: './src/renderer/src/main.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'webpack'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules\/langchain\/dist\/chat_models\/universal\.js/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2024',
          tsconfigRaw: {
            compilerOptions: {
              jsx: 'react-jsx',
              baseUrl: '.',
              paths: {
                '@/*': ['src/renderer/src/*'],
                '@renderer/*': ['src/renderer/src/*']
              }
            }
          }
        }
      },
      {
        test: /node_modules\/langchain\/dist\/chat_models\/universal\.js/,
        use: [
          {
            loader: 'string-replace-loader',
            options: {
              strict: true,
              search: 'await import(config.package)',
              replace: 'await import(/* webpackIgnore: true */ config.package)'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  '@tailwindcss/postcss'
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/renderer/src'),
      '@renderer': path.resolve(__dirname, 'src/renderer/src'),
      'electron': path.resolve(__dirname, 'src/preload/web-electron.ts'),
      'process': path.resolve(__dirname, 'src/preload/web-process.ts')
    },
    fallback: {
      url: require.resolve("url/"),
      util: require.resolve("util/"),
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      os: require.resolve("os-browserify/browser"),
      path: require.resolve("path-browserify"),
      fs: require.resolve("wasabio"),
      events: require.resolve('events/'),
      vm: require.resolve('vm-browserify'),
      async_hooks: false,
      child_process: false,
      deepagents: false
    }
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
      resource.request = resource.request.replace(/^node:/, '')
    }),
    new webpack.NormalModuleReplacementPlugin(/^fs\/promises$/, (resource) => {
      resource.request = path.resolve(__dirname, 'src/preload/web-filesystem.ts')
    }),
    new webpack.NormalModuleReplacementPlugin(/^node:fs\/promises$/, (resource) => {
      resource.request = path.resolve(__dirname, 'src/preload/web-filesystem.ts')
    }),
    new webpack.NormalModuleReplacementPlugin(/^crypto$/, (resource) => {
      resource.request = path.resolve(__dirname, 'src/preload/web-crypto.ts')
    }),
    new webpack.DefinePlugin({
      __APP_VERSION__: JSON.stringify(pkg.version),
      'process.env': JSON.stringify({})
    }),
    new webpack.ProvidePlugin({
      process: [path.resolve(__dirname, 'src/preload/web-process.ts'), 'default']
    }),
    new HtmlWebpackPlugin({
      template: './src/renderer/index.html',
      chunks: ['main', 'preload', 'renderer']
    })
  ],
  parallelism: 100,
  devServer: {
    static: './webpack',
    hot: true,
    port: 3000
  }
}

export default config
