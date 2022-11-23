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

// * WEBPACK CONFIG BOTH DEV AND PROD
const currentTask = process.env.npm_lifecycle_event;
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");

const postCSSPlugins = [
  require("postcss-hexrgba"),
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("autoprefixer"),
];

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("Copy images", function () {
      fse.copySync("./app/assets/images/", "./docs/assets/images");
    });
  }
}

let cssConfig = {
  test: /\.css$/i,
  use: [
    "css-loader?url=false",
    {
      loader: "postcss-loader",
      options: { plugins: postCSSPlugins, parser: "postcss-scss" },
    },
  ],
};

let pages = fse
  .readdirSync("./app")
  .filter(function (file) {
    return file.endsWith(".html");
  })
  .map(function (page) {
    return new HtmlWebpackPlugin({
      filename: page,
      template: `./app/${page}`,
    });
  });

let config = {
  entry: "./app/assets/scripts/index.js",
  plugins: pages,
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     filename: 'index.html',
  //     template: './app/index.html'
  //   })

  // ],
  module: {
    rules: [cssConfig],
  },
};
///////////////PRODUCTION RUNTOOL////////////////////////
if (currentTask == "dev") {
  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
  });

  cssConfig.use.unshift("style-loader");
  config.output = {
    filename: "bundled.js",
    path: path.resolve(__dirname, "dist"),
  };
  config.devServer = {
    before: function (app, server) {
      server._watch("./app/**/*.html");
    },
    contentBase: path.join(__dirname, "app"),
    hot: true,
    port: 3000,
    host: "0.0.0.0",
  };
  config.mode = "development";
}
/////////////BUILD RUNTOOL///////////////////////
if (currentTask == "build") {
  cssConfig.use.unshift(MiniCssExtractPlugin.loader);
  postCSSPlugins.push(require("cssnano"));
  config.output = {
    filename: "[name]. [chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",

    path: path.resolve(__dirname, "docs"),
  };
  config.mode = "production";
  config.optimization = {
    splitChunks: { chunks: "all" },
  };
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.[chunkhash].css",
    }),
    new RunAfterCompile()
  );
}

module.exports = config;
