const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rules = [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            loaders: {
                scss: MiniCssExtractPlugin.loader + '!css-loader!sass-loader?indentedSyntax',
                sass: MiniCssExtractPlugin.loader + '!css-loader!sass-loader?indentedSyntax',
            }
        }
    }, {
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
        include: [
            path.resolve(__dirname, '../src')
        ]
    }, {
        test: /\.js$/,
        // use: ['babel-loader'],
        loader: 'happypack/loader?id=happy-babel',
        exclude: /node_modules/
    }, {
        test: /\.(css|scss|sass)$/,
        // mini-css-extract-plugin不支持css热更新,开发环境需要引入'css-hot-loader'
        use: process.env.NODE_ENV === 'development' ? [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
        ] : [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
        // use: process.env.NODE_ENV === 'development' ? ['vue-style-loader', 'css-loader', 'sass-loader', 'postcss-loader'] : ExtractTextPlugin.extract({
        //     fallback: 'vue-style-loader',
        //     use: ['css-loader', 'sass-loader', 'postcss-loader'],
        //     // css中的基础路径
        //     publicPath: '../'
        // })
    }, {
        test: /\.less$/,
        // use: ['style-loader', 'css-loader', 'less-loader'] 区别开发环境和生成环境 loader的顺序不能变
        use: process.env.NODE_ENV === 'development' ? [
            'vue-style-loader',
            'css-loader',
            'less-loader'
            ] : [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
    }, {
        test: /\.(png|jpg|gif)$/i,
        use: [{
            // 依赖file-loader和url-loader
            loader: 'url-loader',
            options: {
                name: 'assets/img/[name].[hash:7].[ext]',
                limit: 5 * 1024,
                publicPath: '../'
            }
        }]
    }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            name: 'assets/fonts/[name].[hash:7].[ext]',
            limit: 10000,
            publicPath: ''
        }
    }, {
        test: /\.html$/,
        // 处理html中的img标签
        use: ['html-withimg-loader']
    },
];
module.exports = rules;