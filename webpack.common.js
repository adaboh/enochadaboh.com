const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: {
    vendor: "./src/scripts/vendor.js",
    main: "./src/index.js",
  },

  devtool: "source-map",
  module: {
    rules: [
      //js loading
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      //html
      {
        test: /\.html$/,
        use: ["html-loader"],
      },

      // images
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/about.html",
      filename: "about.html",
    }),
    // new HtmlWebpackPlugin({
    //   template: "./src/uses.html",
    //   filename: "uses.html",
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./src/contact.html",
    //   filename: "contact.html",
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./src/resume.html",
    //   filename: "resume.html",
    // }),
  ],
};
