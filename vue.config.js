const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,

	//部署应用包时的基本 URL
	publicPath: process.env.NODE_ENV === "production" ? "././" : "/",
	configureWebpack: {
		resolve: {
			//配置别名
			alias: {
				assets: "@/assets",
				components: "@/components",
				network: "@/network",
				views: "@/views",
				utils: "@/utils",
			},
		},
		devServer: {
			host: "localhost",
			port: 8888,
			open: true,
			https: false,
			proxy: {
				"/devApiServer": {
					target: "http://192.168.0.230:8080/efg/mobileFlyFlower",
					changeOrigin: true,
					ws: true,
					pathRewrite: {
						"^/devApiServer": "",
					},
				},
			},
		},
	},
	css: {
		loaderOptions: {
			sass: {
				//additionalData: `@import "@/assets/scss/_var.scss";`, 最新版需要改为这个
				//npm install postcss-pxtorem --save-dev
				additionalData: `
				          @import "@/assets/scss/_var.scss";
				          @import "@/assets/scss/mixin.scss";
				          `,
			},
		},
	},
})


