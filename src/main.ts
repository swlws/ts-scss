import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import lang from "./lang";
import Api from "./api/index";
import directivesPlugin from './plugin/directives'; 
import componentsPlugin from './plugin/components'; 

Vue.config.productionTip = false;

Vue.use(lang);
Vue.use(Api);
Vue.use(directivesPlugin);
Vue.use(componentsPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
