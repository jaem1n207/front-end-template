const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const paths = require('./paths');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  return {
    mode: isEnvProduction ? 'production' : 'development',
    entry: {
      main: paths.appIndexJs,
    },
    output: {
      path: paths.appBuild,
      filename: isEnvProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/[name].js',
      chunkFilename: isEnvProduction ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
      assetModuleFilename: 'static/media/[name].[hash][ext]',
    },
    devServer: {
      port: 9000,
      historyApiFallback: true,
    },
    devtool: isEnvProduction ? (shouldUseSourceMap ? 'source-map' : false) : 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(png|jp(e*)g|svg)$/,
          loader: 'file-loader',
          options: {
            publicPath: './dist/',
            name: '[name].[ext]?[hash]',
          },
        },
        {
          test: /\.css$/,
          use: [isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          { inject: true, template: paths.appHtml, title: 'webview bundle' },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          '**/*',
          // build 폴더 안의 모든 것을 지우도록 설정
          path.resolve(process.cwd(), 'build/**/*'),
        ],
      }),
    ],
    optimization: {
      // https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 6,
        maxInitialRequests: 4,
        automaticNameDelimiter: '~',
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
  };
};
