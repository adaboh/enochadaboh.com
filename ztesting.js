var path = require("path");
var fs = require("fs");
var HtmlWebpackPlugin = require("html-webpack-plugin");

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
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve("dist/"),
    clean: true,
  },
  module: {},
  plugins: [
    // Build a new plugin instance for each .html file found
    ...htmlFiles.map(
      (htmlFile) =>
        new HtmlWebpackPlugin({
          template: htmlFile,
          filename: htmlFile.replace(path.normalize("src/"), ""),
          inject: false,
        })
    ),
  ],
};
