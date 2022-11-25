const path = require("path");
const extract = require("mini-css-extract-plugin");
const common = require("./webpack.common");
const { merge } = require("./webpack-merge");

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
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      //html
      // images
    ],
  },
});
