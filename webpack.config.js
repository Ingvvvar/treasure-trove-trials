const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  return ({
    stats: 'minimal',
    entry: './src/game.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/treasure-trove-trials/'
    },
    devServer: {
      compress: true,
      static: false,
      client: {
        logging: "warn",
        overlay: {
          errors: true,
          warnings: false,
        },
        progress: true,
      },
      port: 9000, host: '0.0.0.0'
    },
    performance: { hints: false },
    devtool: argv.mode === 'development' ? 'eval-source-map' : undefined,
    optimization: {
      minimize: argv.mode === 'production',
      minimizer: [new TerserPlugin({
        terserOptions: {
          ecma: 6,
          compress: { drop_console: true },
          output: { comments: false, beautify: false },
        },
      })],
    },
    module: {
      rules: [
        {
          test: /\.ts(x)?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [
        '.tsx',
        '.ts',
        '.js'
      ]
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: 'assets/' }],
      }),

      new HtmlWebpackPlugin({
        template: 'src/index.html',
        hash: true,
        minify: false
      })
    ]
  });
}
