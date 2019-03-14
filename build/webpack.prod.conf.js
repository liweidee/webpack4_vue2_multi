const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const cleanWebpackPlugin = require('clean-webpack-plugin'); // 清除目录等
// webpack4.x 移除了webpack.optimize.UglifyJsPlugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpackConfigBase = require('./webpack.base.conf');

const webpackConfigProd = {
    mode: 'production', // 通过 mode 声明生产环境
    output: {
        path: path.resolve(__dirname, '../dist'),
        // 打包多出口文件
        filename: '[name].[chunkhash:7].js',
        publicPath: ''
    },
    optimization: {
        minimizer: [
            // new ParallelUglifyPlugin({ // 多进程压缩
            //     cacheDir: '.cache/',
            //     uglifyJS: {
            //         output: {
            //             comments: false,
            //             beautify: false
            //         },
            //         compress: {
            //             warnings: false,
            //             drop_console: true,
            //             collapse_vars: true,
            //             reduce_vars: true
            //         }
            //     }
            // }),
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true
                    }
                }
            }),
            // 插件内部用的是cssnano做的优化，默认开启 会覆盖掉autoprefixer
            new OptimizeCSSPlugin({
                cssProcessorOptions: {
                    safe: true,
                    autoprefixer: false
                }
            })
        ]
    },
    plugins: [
        // 删除dist目录
        new cleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'), // 根目录
            verbose: false, // 开启在控制台输出信息
            dry: false
        }),
        // 分离css插件
        new MiniCssExtractPlugin({
            filename: '[name].[hash:7].css',
            chunkFilename: '[name].[contenthash:7].css'
        }),
        new ManifestPlugin({
            fileName: 'manifest.json',
            publicPath: '',
            // basePath: '',
            filter: (FileDescriptor) => {
                if (FileDescriptor && /\.(js|css|html)$/.test(FileDescriptor.name)) {
                    return FileDescriptor;
                }
            }
        }),
        // new BundleAnalyzerPlugin()
    ],
    module: {
        rules: []
    },

};
module.exports = merge(webpackConfigBase, webpackConfigProd);