import Vue from "vue";
import ElementUI from 'element-ui';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import lang from "./lang";
import Api from "./api/index";
import directivesPlugin from './plugin/directives'; 
import componentsPlugin from './plugin/components'; 
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(lang);
Vue.use(Api);
Vue.use(directivesPlugin);
Vue.use(componentsPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
