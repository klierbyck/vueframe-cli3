const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')

const resolve = dir => path.join(__dirname, dir)

const isProduction = ['production'].includes(process.env.NODE_ENV)
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            // title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },
    publicPath: '/', //部署应用包时的基本URL
    outputDir: 'dist', // 'dist', 生产环境构建文件的目录
    assetsDir: 'static', //静态资源(js、css、img、fonts)目录
    lintOnSave: false, //保存时是否进行代码检查
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: isProduction, // 生产环境的 source map

    configureWebpack: (config) => {
        // cdn引用时配置externals
        // config.externals = {
        //     'vue': 'Vue',
        //     'element-ui': 'ELEMENT',
        //     'vue-router': 'VueRouter',
        //     'vuex': 'Vuex',
        //     'axios': 'axios'
        // }
        /**
         * 删除懒加载模块的 prefetch preload，降低带宽压力
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
         * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
         */
        // config.plugins.delete('prefetch').delete('preload');
        if (isProduction) {
            const plugins = [];
            // 移除console
            plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ['console.log']
                        }
                    },
                    sourceMap: process.env.NODE_ENV !== 'production',
                    parallel: true
                })
            );
            // gzip压缩
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
            config.plugins = [...config.plugins, ...plugins];
        } else {
            // config.devtool = 'cheap-module-eval-source-map';
        }
    },
    chainWebpack: (config) => {
        // 修复HMR
        // config.resolve.symlinks(true)
        // 修复Lazy loading routes Error： Cyclic dependency  [https://github.com/vuejs/vue-cli/issues/1669]
        // config.plugin('html').tap(args => {
        //     args[0].chunksSortMode = 'none'
        //     return args
        // })

        // 添加别名
        config.resolve.alias
            .set('@', resolve('src'))

        // 打包分析
        if (process.env.IS_ANALYZ) {
            config.plugin('webpack-report').use(BundleAnalyzerPlugin, [{
                analyzerMode: 'static'
            }])
        }

        // 压缩图片
        // config.module
        //   .rule("images")
        //   .use("image-webpack-loader")
        //   .loader("image-webpack-loader")
        //   .options({
        //     mozjpeg: { progressive: true, quality: 65 },
        //     optipng: { enabled: false },
        //     pngquant: { quality: "65-90", speed: 4 },
        //     gifsicle: { interlaced: false },
        //     webp: { quality: 75 }
        //   });

        // stylus
        // const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        // types.forEach(type =>
        //   addStylusResource(config.module.rule('stylus').oneOf(type))
        // )

        // 多页面配置，为js添加hash
        // config.output.chunkFilename(`js/[name].[chunkhash:8].js`)

        // 修改图片输出路径
        // config.module
        //   .rule('images')
        //   .test(/\.(png|jpe?g|gif|ico)(\?.*)?$/)
        //   .use('url-loader')
        //   .loader('url-loader')
        //   .options({
        //       name: path.join('../assets/', 'img/[name].[ext]')
        //   })
    },
    css: {
        modules: false,
        extract: isProduction,
        // 为css后缀添加hash
        // extract: {
        //  filename: 'css/[name].[hash:8].css',
        //  chunkFilename: 'css/[name].[hash:8].css'
        // },
        sourceMap: false,
        loaderOptions: {
            // px转换为rem
            // postcss: {
            //   plugins: [
            //     require('postcss-pxtorem')({
            //       rootValue : 1, // 换算的基数
            //       selectorBlackList : ['weui', 'el'], // 忽略转换正则匹配项
            //       propList : ['*']
            //     })
            //   ]
            // }
        }
    },
    pluginOptions: {
        // 安装vue-cli-plugin-style-resources-loader插件
        // 添加全局样式global.scss
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [
                resolve(__dirname, "./src/assets/styles/base.less")
            ]
        }
    },
    parallel: require('os').cpus().length > 1,
    pwa: {},
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        },
        open: true,
        host: 'localhost',
        port: 9999,
        https: false,
        hotOnly: false,
        // proxy: {
        // '/api': {
        //     //测试环境接口
        //     target: 'http://113.108.174.246:8080',
        //     changeOrigin: true,
        //     pathRewrite: {
        //         'api': ''
        //     }
        // }
        // }
    }
}