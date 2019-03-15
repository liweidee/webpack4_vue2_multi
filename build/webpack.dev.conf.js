const path = require('path');
const portfinder = require('portfinder');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfigBase = require('./webpack.base.conf');
const IP = require('../config/get-ip.js');

console.log(IP);

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
        host: IP.host,
        port: 8081,
        open: true, // 开启浏览器
        hot: true, // 开启热更新
        overlay: true, // 浏览器页面上显示错误
        stats: {
            colors: true,
            chunks: false,
            children: false,
            entrypoints: false,
            modules: false
        },
        before: (app, server) => {
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
        },
        allowedHosts: [
            '.smzdm.com'
        ]
    },
    plugins: [
        //热更新
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: "eval-source-map",  // 开启调试模式
    module: {
        rules: []
    },
};
// module.exports = merge(webpackConfigBase, webpackConfigDev);
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || webpackConfigDev.devServer.port;
    portfinder.getPortPromise()
    .then((port) => {
        process.env.PORT = port;
        webpackConfigDev.devServer.port = port;

        resolve(merge(webpackConfigBase, webpackConfigDev));
    })
    .catch((err) => {
        console.log(err);
        reject(err);
    });
});