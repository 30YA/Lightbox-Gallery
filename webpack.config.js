const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const config = {
  entry: {
    script: "./src/script.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "LightBox-Gallery",
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["script"],
    }),
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          publicPath: "./img/",
          outputPath: "img",
          filename: "[name][ext]",
        },
      },
    ],
  },
};
module.exports = (env, { mode }) => {
  let isDevelopment = mode == "development";

  config.module.rules.push({
    test: /\.css$/,
    use: [
      isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
      "css-loader",
    ],
  });
  config.output.filename = isDevelopment
    ? "[name].bundle.js"
    : "[name].[contenthash].bundle.js";

  if (isDevelopment) {
    config.devServer = {
      static: {
        directory: path.join(__dirname, "./dist"),
      },
      compress: true,
      open: true,
      port: 9000,
    };
  }

  if (!isDevelopment) {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: "styles/[name].[contenthash].css",
      })
    );
    config.module.rules.push({
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader",
      },
    });
  }
  return config;
};
