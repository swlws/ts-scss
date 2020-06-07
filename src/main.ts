import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import lang from "./lang";

Vue.config.productionTip = false;

Vue.use(lang);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
