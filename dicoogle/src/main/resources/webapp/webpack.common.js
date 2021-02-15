/* eslint-env node */

const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    bundle: [
      path.resolve(__dirname, "js/app.js"),
      path.resolve(__dirname, "js/external-requires.js")
    ]
  },
  node: {
    global: false
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.DICOOGLE_BASE_URL": JSON.stringify(
        process.env.DICOOGLE_BASE_URL
      ),
      global: "window"
    }),
    new MiniCssExtractPlugin({
      filename: "dist/[name].css",
      chunkFilename: "dist/[id].css"
    }),
    new webpack.ProvidePlugin({
      // required for Bootstrap to work
      jQuery: "jquery"
    })
  ],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          failOnError: true
        }
      },
      {
        test: /\.jsx?$/i,
        include: path.resolve(__dirname, "js"),
        use: ["babel-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        include: path.resolve(__dirname, "sass"),
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Minifies CSS
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  }
};
