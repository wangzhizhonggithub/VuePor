// 导入包
var path = require("path");
// import path from 'path';

// 导入html-webpack-plugin包，获得到插件对象,实现浏览器实时刷新功能
var htmlwp = require("html-webpack-plugin");
// import htmlwp from 'html-webpack-plugin';

// 配置默认文件
module.exports = {
    // 配置打包时的入口文件
    entry: './src/main.js',
    // 配置打包时生成的文件
    output: {
        // path.join():将多个路径拼接成一个路径
        path: path.join(__dirname, '/dist'),
        filename: 'build.js'
    },
    // 配置相关的loader
    module: {
        loaders: [
            // 优化css文件
            { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
            // 编译并优化less文件
            { test: /\.less$/, loader: ['style-loader', 'css-loader', 'less-loader'] },
            // 编译并优化scss文件
            { test: /\.scss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] },
            // 配置图片的正则表达式和loader
            { test: /\.(png|jpg|gif|ttf|woff)$/, loader: ['url-loader?limit=10240'] },
            // 配置打包Vue文件
            { test: /\.vue$/, loader: ['vue-loader'] },
            // 兼容webpack1.0,exclude:排除文件
            { test: /\.js$/, loader: ['babel-loader'], exclude: /node_modules/ }
        ]
    },
    plugins: [
        new htmlwp({
            title: '首页', //生成的页面标题
            filename: 'index.html', //生成的页面文件名
            template: 'index.html' //模板的文件名
        })
    ]
}