const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// Look for .html files
var htmlFiles = [];
var directories = ["src"];
while (directories.length > 0) {
  var directory = directories.pop();
  var dirContents = fs.readdirSync(directory).map((file) => path.join(directory, file));

  htmlFiles.push(...dirContents.filter((file) => file.endsWith(".html")));
  directories.push(...dirContents.filter((file) => fs.statSync(file).isDirectory()));
}

module.exports = {
  entry: {
    vendor: "./src/scripts/vendor.js",
    main: "./src/index.js",
  },

  // devtool: "eval-cheap-source-map",
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
        test: /\.html$/i,
        use: ["html-loader"],
      },

      {
        test: /\.(|png|svg|jpe?g|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
    ],
  },

  plugins: [
    // Build a new plugin instance for each .html file found
    ...htmlFiles.map(
      (htmlFile) =>
        new HtmlWebpackPlugin({
          template: htmlFile,
          filename: htmlFile.replace(path.normalize("src/"), ""),
          inject: "body",
        })
    ),
    require("autoprefixer"),
  ],
};
