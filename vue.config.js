const path=require('path')
const SkeletonWebpackPlugin=require('vue-skeleton-webpack-plugin')
module.exports = {
    outputDir:'../vueApicloud_APP',
    lintOnSave: process.env.NODE_ENV !== 'production',
    publicPath: process.env.NODE_ENV === 'production' ?
        './' :
        '/',
    assetsDir: 'static',
    productionSourceMap:false,
    devServer: {
        port: 8081,
        contentBase: path.join(__dirname, "mock"),
    compress: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require("./mock")
        /*proxy: {
            '/': {
                target: '',
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    '^/': '/'
                }
            }
        }*/
    },
    css:{
        //css拆分ExtractTextPlugin插件
        extract:true
    },
    /**寫完骨架屏修改 */
    /*configureWebpack:config=>{
        config.plugins.push(new SkeletonWebpackPlugin({
            webpackConfig:{
                entry:{
                    app:path.join(__dirname,'./src/config/entry-skeleton.js')
                }
            },
            minimize:true,
            quiet:true,
            router:{
                mode:'hash',
                routes:[
                    {
                        path:'/mainpage/home',
                        skeletonId:'skeletonHome'
                    }
                ]
            }
        }))
    }*/
}