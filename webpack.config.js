var { resolve } = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');//css分离单独文件
var OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
process.env.NODE_ENV='development'
module.exports = {
    mode:'production', //development  production
    entry: './src/index.js',
    output: {
        filename: "js/built.js",
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use:[
                    //loader加载顺序为从右往左，从下往上
                    // "style-loader",//创建style标签，将js中的样式资源插入进行，添加到head中生效
                    MiniCssExtractPlugin.loader,//css分离单独文件
                    "css-loader",//将css文件变成common.js模块加载到js中，里面内容为css字符串
                    /*
                    css兼容性处理 postcss--> postcss-loader postcss-preset-env
                    帮postcss找webpack.json中browserslist里面的配置 通过配置加载指定的css兼容性样式
                    需要设置环境变量process.env.NODE_ENV='development'
                    "browserslist":{
                        "development":[
                            "last 1 chrome version",
                            "last 1 firefox version",
                            "last 1 safari version",
                        ],
                        "production":[
                            ">0.2%",
                            "not dead",
                            "not op_mini all"
                        ]
                    }
                    */
                    {
                        loader:'postcss-loader',
                        options:{
                            ident:'postcss',
                            plugins:()=>[
                                require("postcss-preset-env")
                            ]
                        }
                    }
                ]
            },
            {
                test:/\.less$/,
                use:[
                    // "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader:'postcss-loader',
                        options:{
                            ident:'postcss',
                            plugins:()=>[
                                require("postcss-preset-env")
                            ]
                        }
                    },
                    "less-loader"//需要下载less less-loader 两个
                ]
            },
            {
                test:/\.(jpg|png|jpeg|gif)$/,//处理不了html文件
                loader:"url-loader",
                options:{
                    limit:12*1024,
                    //给图片重命名源文件名+hash前十位+源文件扩展名
                    name:'[name].[hash:10].[ext]',
                    outputPath:'img'
                }
            },
            {
                test:/\.html$/,//处理不了html文件
                loader:"html-loader"
            }
            ,
            {
                exclude:/\.(jpg|png|jpeg|gif|less|css|js|html)$/,
                loader:"file-loader"
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'css/index.css'
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    devServer:{
        contentBase: resolve(__dirname, 'build'),
        //启动压缩
        compress: true,
        port: 9000,
        open:true
    }
}