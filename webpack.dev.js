const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  mode: "development",

  // DEV SERVER
  devServer: {
    hot: true,
    port: 3010,
    host: "0.0.0.0",
    stats: "errors-only",
    https: false,
    overlay: true,
    inline: true,
    before: function (src, server) {
      server._watch("./src/**/*.html");
    },
    contentBase: path.join(__dirname, "src"),
  },
  entry: {
    vendor: "./src/scripts/vendor.js",
    main: "./src/scripts/app.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  devtool: "eval-cheap-source-map",

  module: {
    rules: [
      //SASS  LOADER CONFIGURATION
      {
        test: /\.(sc|c)ss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: `postcss-loader`,
            options: {
              sourceMap: true,
              config: {
                path: "postcss.config.js",
              },
            },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
      // HTML LOADER
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      // URL LOADER FOR IMAGES
      {
        test: /\.(svg|png|jpg|gif|jpeg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      // FILE LOADER FOR IMAGES
      /*  {
        test: /\.(png|jpg|gif|jpeg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
            },
          },
        ],
      }, */
      // FILE LOADER FOR fonts
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      // JS LOADER WITH BABEL
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  plugins: [
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
