const path = require('path')
//const SkeletonWebpackPlugin=require('vue-skeleton-webpack-plugin')
module.exports = {
	outputDir: '../vueApicloud_APP',
	lintOnSave: process.env.NODE_ENV !== 'production',
	publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
	assetsDir: 'static',
	productionSourceMap: false,
	chainWebpack: (config) => {
		//自动化导入variables.scss变量文件
		const oneOfsMap = config.module.rule('scss').oneOfs.store
		oneOfsMap.forEach((item) => {
			item
				.use('sass-resources-loader')
				.loader('sass-resources-loader')
				.options({
					// 要公用的scss的路径
					resources: ['./src/assets/style/variables.scss']
				})
				.end()
		})
	},
	devServer: {
		/*proxy: {
			'/': {
				target: process.env.VUE_APP_HOST,
				changeOrigin: true,
				ws: false
			}
		},*/
		port: 8081,
		contentBase: path.join(__dirname, 'mock'),
		compress: true,
		overlay: {
			warnings: false,
			errors: true
		},
		before: require('./mock')
	},
	css: {
		//css拆分ExtractTextPlugin插件
		extract: true
	},
	configureWebpack: {
		entry: {
			api: './api/api.js'
		},
		output: {
			filename: 'static/js/[name].js'
		}
	},
	configureWebpack: () => {
		if (process.env.NODE_ENV === 'production') {
			return {
				externals: {
					api: 'api' // apiCloud配置
				}
			}
		}
	}
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
