const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const resolve = dir => path.join(__dirname, dir);

/**
 * 修改默认的SVG解析规则
 * @param {*} config
 */
function svgSprite(config) {
  // 清空默认svg规则
  config.module
    .rule('svg')
    .uses.clear();
  config.module // 针对svg文件添加svg-sprite-loader规则
    .rule('svg1')
    .test(/\.svg$/)
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]',
    })
    .end();
}
module.exports.svgSprite = svgSprite;

/**
 * 工程目录别名
 * @param {*} config
 */
function alias(config) {
  // 别名设置
  config.resolve.alias
    .set('@', resolve('src'))
    .set('@log', resolve('src/util/log'))
    .set('@dom', resolve('src/util/dom'))
}
module.exports.alias = alias;

function compression(config){
  config.plugin('compressionPlugin').use(new CompressionWebpackPlugin({
    test: /\.js$|\.html$|\.css$|\.less$|\.sass$/,
    threshold: 10240, // 对超过10K的数据压缩
    deleteOriginalAssets: false // true不删除源文件；false删除源文件
  }))
}
module.exports.compression = compression;

function splitChunks(config){
  config.optimization.minimize(true);
  config.optimization.splitChunks({
    name: true,
    chunks: 'all',
    cacheGroups: {
      elementUI: {
        name: 'chunk-element-ui',
        priority: 20,
        test: /[\\/]node_modules[\\/]element-ui[\\/]/
      },
      libs: {
        name: 'chunk-libs',
        test: /[\\/]node_modules[\\/]/,
        priority: 10,
        chunks: 'initial'
      },
      commons: {
        name: 'chunk-common',
        test: resolve('src'),
        minChunks: 2, // 代码块最少引用次数为2
        priority: 5,
        reuseExistingChunk: true
      }
    }
  })
}
module.exports.splitChunks = splitChunks;