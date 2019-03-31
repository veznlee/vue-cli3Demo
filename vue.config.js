// vue.config.js
// 用于做相应的合并处理
const merge = require('webpack-merge');

console.log(process.env); // development（在终端输出）


// 使用额外配置文件
const configs = require('./config');
// 根据环境判断使用哪份配置
const cfg = process.env.NODE_ENV === 'production' ? configs.build.env : configs.dev.env;


module.exports = {
    //baseUrl: 'vue',// 改变 webpack 配置文件中 output 的 publicPath 项
    outputDir: 'dist', // 输出文件夹，默认dist
    productionSourceMap: true, // 该配置项用于设置是否为生产环境构建生成 source map

    // 使用iview自定义主题时，引入less报错的问题
    css: {
        loaderOptions: { // 向 CSS 相关的 loader 传递选项
            less: {
                javascriptEnabled: true
            }
        }
    },
    

    // config 参数为已经解析好的 webpack 配置
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .tap(options =>
                merge(options, {
                  limit: 5120,
                })
            )

        // 使用额外配置文件，可在最后的业务代码中进行访问，比如，在main.js中，console.log(process.env)中，会有
        // IP: "127.0.0.1"
        // TYPE: "dev"
        config.plugin('define')
            .tap(args => {
                let name = 'process.env';
                // 使用 merge 保证原始值不变，合并来自额外配置文件的变量
                // 此处改变的是process.env
                args[0][name] = merge(args[0][name], cfg);
                return args
            })
        

        // 为路径设置别名
        // key,value自行定义，比如.set('@@', resolve('src/components'))
        // config.resolve.alias
        //     .set('@', resolve('src'))
        //     .set('_c', resolve('src/components'))
    },


    // 如果你不需要使用eslint，把lintOnSave设为false即可
    // lintOnSave: false,
    // 设为false打包时不生成.map文件
    // productionSourceMap: false



    // 除了上述使用 chainWebpack 来改变 webpack 内部配置外，我们还可以使用 configureWebpack 来进行修改，
    // 两者的不同点在于 chainWebpack 是链式修改，而 configureWebpack 更倾向于整体替换和修改。示例代码如下：
    // configureWebpack 可以直接是一个对象，也可以是一个函数
    // configureWebpack: config => {
    //     // config.plugins = []; // 这样会直接将 plugins 置空
    //     // 使用 return 一个对象会通过 webpack-merge 进行合并，plugins 不会置空
    //     return {
    //         plugins: []
    //     }
    // },

    // devServer: { //这里面的某一配置项不受支持
    //     open: true, // 是否自动打开浏览器页面
    //     host: '127.0.0.1', // 指定使用一个 host。默认是 localhost
    //     port: 8080, // 端口地址
    //     https: false, // 使用https提供服务
    //     proxy: null, // string | Object 代理设置
        
    //     // 提供在服务器内部的其他中间件之前执行自定义中间件的能力
    //     before: app => {
    //       // `app` 是一个 express 实例
    //       console.log(app);
    //     },
    //     overlay: {
    //         warnings: false,
    //         errors: false
    //     },
    //     lintOnSave: false //去掉eslint检查
    // }
}