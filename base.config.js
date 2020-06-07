const path = require('path');

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
}
module.exports.alias = alias;
