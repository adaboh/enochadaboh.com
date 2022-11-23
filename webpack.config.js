const path = require("path");
const extract = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  // development" | "production" | "none"

  entry: {
    vendor: "./src/scripts/vendor.js",
    main: "./src/scripts/app.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  devtool: "source-map",
  module: {
    rules: [
      //css*sass loading
      {
        test: /\.(sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
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
      // images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new extract({
      filename: "styles.[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/about.html",
      inject: true,
      filename: "about.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/uses.html",
      inject: true,
      filename: "uses.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/contact.html",
      inject: true,
      filename: "contact.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/resume.html",
      inject: true,
      filename: "resume.html",
    }),
  ],
};
