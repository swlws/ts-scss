const path = require("path");
const base = require("./base.config");
const bypass = require("./config/bypass.js");

const isProduction = process.env.NODE_ENV === 'production';

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  lintOnSave: false,
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  // 生成的index页面的名称
  indexPath: "index.html",
  // 打包时，关闭source-map
  productionSourceMap: false,
  // 开发，调试时使用
  configureWebpack: {
    devtool: "cheap-module-eval-source-map",
    performance: {
      hints: false, //取消提醒
      maxAssetSize: 1 * 1024 * 1024, // 单文件报警的限制为1M
      maxEntrypointSize: 2 * 1024 * 1024 // 入口文件报警限制为2M
    }
  },  
  chainWebpack: config => {
    base.svgSprite(config);
    base.alias(config);

    if(isProduction){
      base.compression(config);
      base.splitChunks(config);
    }

    // analyzer
    if(process.env.user_analyzer){
      config.plugin('webpack-bundle-analyzer').user(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  // 是否为 Babel 或 TypeScript 使用 thread-loader
  parallel: require("os").cpus().length > 1,
  css: {
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: `@import "~@/css/variables.scss";`
      }
    }
  },
  devServer: {
    https: false,
    host: "0.0.0.0",
    port: 3000,
    index: "index.html",
    hot: true,
    hotOnly: true,
    clientLogLevel: "silent", // 日志等级，过滤日志
    compress: true, // 启用压缩
    contentBase: resolve("public"), // 上下文路径
    proxy: {
      "/api": {
        target: "http://127.0.0.1/",
        changeOrigin: true,
        bypass: function(req, res) {
          console.log('---', req.url)
          const data = bypass(req.method.toLowerCase(), req.url);

          if (data) {
            console.log(data)
            res.end(data);
            return false;
          }

          return undefined;
        }
      },
      '/es': {
        target: 'https://es-dnp0iy6m.public.tencentelasticsearch.com:9200/',
        changeOrigin: true,
        pathRewrite: {
          '^/es': ''
        }
      }
    }
  }
};
