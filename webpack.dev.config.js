const webpack = require("webpack");
const merge = require("webpack-merge");
// const baseConfig = require("./webpack.base.config");
const path = require("path");   //path就是node.js内置的package，用来处理路径的。
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

// const config = merge(baseConfig, {
//   mode: "development",
//   //入口
//   entry: path.resolve(__dirname, "../../src/main.js"),
//   //出口
//   output: {
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "../../build")   //打包后的文件存放的地方;注："__dirname"是node.js中的一个全局变量，它指向当前执行脚本所在的目录(即webpack.dev.config所造目录)。
//   },
//   // output: {
//   // 	filename: "bundle.js",
//   // 	path: path.resolve(__dirname, "../../build")
//   // },
//   module: {
//     rules: [
//       {
//         test: /\.vue$/,
//         loader: 'vue-loader'
//       },
//       {
//         test: /\.css$/,
//         use: ["vue-style-loader", "css-loader"]
//       },
//       {
//         test: /\.scss$/,
//         use: ["vue-style-loader", "css-loader", "postcss-loader", "sass-loader"]
//       },
//       {
//         test: /\.less$/,
//         use: ["vue-style-loader", "css-loader", "postcss-loader", "less-loader"]
//       },
//       {
//         test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)\??.*$/,
//         use: [
//           {
//             //url-loader的作用是可以把图片转换成base64代码，直接写在js文件里面，而不用生成一个新的文件，尤其是几kb小的图片，可以减少http请求
//             //url-loader实际上是把file-loader封装了一下，判断图片文件的大小如果小于10000字节，就把图片以base64代码的形式写到js文件中去
//             //当然，如果图片较大，编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，大于limit的还会使用file-loader进行copy。
//             loader: 'url-loader',
//             options: {
//               limit: 10000,
//               name: '[name].[hash:7].[ext]'
//             }
//           }
//         ],
//       },
//     ]
//   },
//   plugins:[
//     new HtmlWebpackPlugin({
//       template: path.resolve(__dirname, "../../src/index.html"),  //是个大坑，必须指定打包时的index模板，否则vue找不到要挂载的元素.
//       hash: true // 会在打包好的bundle.js后面加上hash串
//     })
//     // new webpack.HotModuleReplacementPlugin()
//   ],
//   devServer: require("./devServer")
// });

const config = {
  mode: "development",
  //入口
  entry:  "./src/main.js",
  //出口
  output: {
    filename: "bundle.js",
    path: __dirname + '/build'   //打包后的文件存放的地方;注："__dirname"是node.js中的一个全局变量，它指向当前执行脚本所在的目录(即webpack.dev.config所造目录)。
  },
  // output: {
  // 	filename: "bundle.js",
  // 	path: path.resolve(__dirname, "../../build")
  // },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader", "less-loader"]
      },
      {
        test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)\??.*$/,
        use: [
          {
            //url-loader的作用是可以把图片转换成base64代码，直接写在js文件里面，而不用生成一个新的文件，尤其是几kb小的图片，可以减少http请求
            //url-loader实际上是把file-loader封装了一下，判断图片文件的大小如果小于10000字节，就把图片以base64代码的形式写到js文件中去
            //当然，如果图片较大，编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，大于limit的还会使用file-loader进行copy。
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[hash:7].[ext]'
            }
          }
        ],
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: "./src/index.html",  //是个大坑，必须指定打包时的index模板，否则vue找不到要挂载的元素.
      hash: true // 会在打包好的bundle.js后面加上hash串
    }),
    new VueLoaderPlugin()
    // new webpack.HotModuleReplacementPlugin()
  ],
  devServer: require("./buildConfig/devServer")
};

module.exports = config;
