const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",

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
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
});
