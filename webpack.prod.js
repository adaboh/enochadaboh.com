const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: "production",

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
          //separates css
          MiniCssExtractPlugin.loader,
          //turns css into common js
          "css-loader",
          //turns sass into css
          "sass-loader",
        ],
      },

      //html
      // images
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
});
