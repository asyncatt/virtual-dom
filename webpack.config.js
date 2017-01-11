var webpack = require('webpack')
var path = require('path')
var glob = require('glob')
var OpenBrowserPlugin = require('open-browser-webpack-plugin')

// 获取指定路径下的入口文件
function getEntries(globPath) {
    var files = glob.sync(globPath),
        entries = {};

    files.forEach(function(filepath) {
        // 取倒数第二层(view下面的文件夹)做包名
        console.log(filepath);
        var split = filepath.split('/');
        var name = split[split.length - 2];

        entries[name] = './' + filepath;
    });

    return entries;
}

var entries = getEntries('example/*/index.js');

module.exports = {
  entry: entries,
  output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: './[name].js'
  },
  module: {
    loaders: [

      {
        test: /\.css$/,
        loader: "style!css"
      }, {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  babel: {
    presets: [ "es2015", "latest", "react"],
    plugins: ['transform-runtime']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
  ]
}
