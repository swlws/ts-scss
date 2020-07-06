const path = require("path");
const base = require("./base.config");
const bypass = require("./config/bypass.js");

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  lintOnSave: false,
  publicPath: "/",
  outputDir: "dist",
  // 生成的index页面的名称
  indexPath: "index.html",
  // 开发，调试时使用
  configureWebpack: {
    devtool: "source-map"
  },
  // 打包时，关闭source-map
  productionSourceMap: false,
  chainWebpack: config => {
    base.svgSprite(config);
    base.alias(config);
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
        target: "http://14.18.16.158:9000/",
        changeOrigin: true,
        bypass: function(req, res) {
          const data = bypass(req.method.toLowerCase(), req.url);

          if (data) {
            res.end(data);
            return false;
          }

          return undefined;
        }
      }
    }
  }
};
