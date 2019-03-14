const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfigBase = require('./webpack.base.conf');
const webpackConfigDev = {
    mode: 'development', // 通过 mode 声明开发环境
    output: {
        path: path.resolve(__dirname, '../dist'),
        // 打包多出口文件
        // 生成 a.bundle.[hash].js  b.bundle.[hash].js
        filename: 'js/[name].bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, '../dist/'),
        publicPath:'/',
        host: '127.0.0.1',
        port: '8080',
        overlay: true, // 浏览器页面上显示错误
        open: true, // 开启浏览器
        hot: true, // 开启热更新
        stats: {
            colors: true,
            chunks: false,
            children: false,
            entrypoints: false,
            modules: false
        },
        before: function (app, server) {
            let chunks = Object.keys(webpackConfigBase.entry);
            app.get('/', (req, res) => {
                let resHtml = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
                    <title>index</title>
                </head>
                <body>
                <ul>`;

                chunks.forEach((chunk, index) => {
                    resHtml += `<li><a href="${chunk}.html">${chunk}.html</a></li>`;
                });

                resHtml += `</ul>
                </body>
                </html>`;

                res.send(resHtml);
            });
        }
    },
    plugins: [
        //热更新
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: "eval-source-map",  // 开启调试模式
    module: {
        rules: []
    },
}
module.exports = merge(webpackConfigBase, webpackConfigDev);