const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const argv = require('yargs').argv;
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const htmlWebpackPlugin = require('html-webpack-plugin'); // html模板
const copyWebpackPlugin = require('copy-webpack-plugin'); // 静态资源输出
const rules = require('./webpack.rules.conf.js');

const resolvePath = (dir) => {
    return path.resolve(__dirname, '../', dir);
};

// 获取入口文件相关方法
let entriesPage = (entryPath => {
    let baseName,
        pathName,
        filesPath,
        filesList = {},
        excludes = [];

    filesPath = glob.sync(`${entryPath}/*/*.js`, {
        ignore: excludes
    });

    filesPath.forEach((entry, index) => {
        baseName = path.basename(entry, path.extname(entry));
        pathName = entry.split('src/pages/')[1].split('/')[0];

        let pagesEntry = !argv['pages'] ? [] : argv['pages'].split(',');
        if (pagesEntry.length) {
            pagesEntry.forEach((item, index) => {
                if (entry.indexOf(`pages/${item}`) > -1) {
                    filesList[pathName + '/' + baseName] = entry;
                }
            });
        } else {
            filesList[pathName + '/' + baseName] = entry;
        }
    });
    // console.log(filesList);

    return filesList;
})(resolvePath('src/pages'));

//配置页面
const htmlPages = (entriesPage => {
    let resultFiles = [];

    for (let key in entriesPage) {
        let htmlPlugin = {
            filename: key.split('/')[1],
            filedir: key.split('/')[0],
            chunks: [key, 'manifest', 'vendor']
        };
        resultFiles.push(htmlPlugin);
    }

    return resultFiles;
})(entriesPage);

// 设置html-webpack-plugin参数相关方法
let getHtmlConfig = (name, dirname, chunks) => {
    return {
        // title: title,
        filename: `${dirname}/${name}.html`,
        template: `src/pages/${dirname}/${name}.html`,
        inject: true,
        // favicon: './favicon.ico',
        hash: false,
        meta: {
            viewport: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1'
        },
        chunks: chunks,
        chunkSortMode: 'dependency', // 按照文件的依赖关系排序
        minify: process.env.NODE_ENV === 'development' ? false : {
            removeComments: true, // 去除注释
            collapseWhitespace: true // 去除空格
        }
    };
};

let baseConfig = {
    stats: {
        colors: true,
        chunks: false,
        children: false,
        entrypoints: false,
        modules: false
    },
    entry: entriesPage,
    // 模块引用配置
    resolve: {
        extensions: ['.js', '.vue', '.json'], // 定义模块查找的后缀
        alias: { // 定义引用路径别名
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolvePath('src')
        }
    },
    // 模块加载配置
    module: {
        rules: [...rules]
    },
    // 将外部变量或者模块加载进来
    externals: {
        // 'jquery': 'window.jQuery'
    },
    plugins: [
        // 全局暴露统一入口
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new VueLoaderPlugin(),
        //静态资源输出
        new copyWebpackPlugin([{
            from: resolvePath('static'),
            to: './assets',
            ignore: ['.*']
        }]),
        // 解决webpack4版本 无法找到eslint-loader试图访问this.options被删除的内容
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                context: __dirname
            }
        })
    ],
    // webpack4.x移除了commonChunksPulgin插件，放在了config.optimization里面
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    name: 'vendor'
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    }
};

//自动生成html模板
htmlPages.forEach(function(element) {
    baseConfig.plugins.push(new htmlWebpackPlugin(getHtmlConfig(element.filename, element.filedir, element.chunks)));
});

module.exports = baseConfig;