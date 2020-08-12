// import upperFirst from 'lodash/upperFirst';
// import camelCase from 'lodash/camelCase';

import { upperFirst,  camelCase} from '@tool'

/**
 * 将/src/components目录下的组件定义为全局组件
 *
 * @param {Object} Vue
 */
function registerGlobalComponent(Vue: any) {
  const requireComponent = require.context('./../components', true, /index\.(vue|js)$/,);

  requireComponent.keys().forEach((fileName) => {
    if (!fileName) return

    const componentConfig = requireComponent(fileName);

    const componentName = upperFirst(
      camelCase(
        (fileName.replace('/index.vue', '')
          .split('/')
          .pop() || '')
          .replace(/\.\w+$/, ''),
      ),
    );

    Vue.component(
      componentName,
      componentConfig.default || componentConfig,
    );
  });
}

/**
 * plugin的主入口
 *
 * @param {Object} Vue
 */
function install(Vue: any) {
  registerGlobalComponent(Vue);
}

export default {
  install,
};
