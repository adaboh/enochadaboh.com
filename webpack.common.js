const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: {
    vendor: "./src/scripts/vendor.js",
    main: "./src/index.js",
  },

  // devtool: "source-map",
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

      // images\
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
        // use: {
        //   loader: "file-loader",
        //   options: {
        //     name: "[name].[hash].[ext]",
        //     outputPath: "assets",
        //   },
        // },
      },

      {
        // test: /\.svg$/!,
        // use: ["svg-sprite-loader"],
        // "svg-transform-loader", "svgo-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "body",
      //inject scripts at the end of the body
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
