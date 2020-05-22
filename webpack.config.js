const path = require('path')
// const webpack = require('webpack')

// 插入html模板
// const HtmlWebpackPlugin = require('html-webpack-plugin')

// 清除输出目录
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  }
}