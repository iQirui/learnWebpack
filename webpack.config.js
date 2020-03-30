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
            },
            {
                test:/\.(jpg|png|jpeg|gif)$/,//处理不了html文件
                loader:"url-loader",
                options:{
                    limit:12*1024,
                    //给图片重命名源文件名+hash前十位+源文件扩展名
                    name:'[name].[hash:10].[ext]'
                }
            },
            {
                test:/\.html$/,//处理不了html文件
                loader:"html-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
}