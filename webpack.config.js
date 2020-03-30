var { resolve } = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'development', //development  production
    entry: './src/index.js',
    output: {
        filename: "built.js",
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use:[
                    //loader加载顺序为从右往左，从下往上
                    "style-loader",//创建style标签，将js中的样式资源插入进行，添加到head中生效
                    "css-loader"//将css文件变成common.js模块加载到js中，里面内容为css字符串
                ]
            },
            {
                test:/\.less$/,
                use:[
                    "style-loader","css-loader","less-loader"//需要下载less less-loader 两个
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
}