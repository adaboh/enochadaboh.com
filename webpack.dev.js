const path = require("path");
const common = require("./webpack.common");
const webpackMiddleware = require("webpack-dev-middleware");
const { merge } = require("webpack-merge");
// const autoprefixer = require("autoprefixer");

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  stats: "errors-warnings",

  devServer: {
    static: {
      directory: path.resolve(__dirname, "src"),
    },
    client: {
      logging: "error",
      logging: "verbose",
      overlay: true,
    },
    devMiddleware: {
      // logLevel: "error",
      //   index: true,
      //   // noInfo: true,
      //   serverSideRender: true,
      //   writeToDisk: false,
    },

    // static: path.resolve(__dirname, "src"),
    port: 8097,
    // open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  // webpackMiddleware: {
  //   logLevel: "error",
  // },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      //css*sass loading
      {
        test: /\.(sc|c)ss$/,
        use: [
          //
          "style-loader",
          //
          "css-loader",
          {
            loader: "postcss-loader",
          },
          //
          {
            loader: "sass-loader",
            // options: { sourceMap: true },
          },
          // "sass-loader",
        ],
      },

      //html
    ],
  },
});

// webpack serve --config webpack.dev.js
// webpack-dev-server --config webpack.dev.js
// last 2 versions || defaults
/* "browserslist": 
  [
    "> 10.5%"
  ] */

// "last 2 versions, not dead, > 5.2%",
