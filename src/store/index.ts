import Vue from "vue";
import Vuex from "vuex";
import appStore from "./mudules/appStore";
import menuStore from "./mudules/menuStore";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    appStore,
    menuStore
  }
});

// store.watch(
//   state => state.height,
//   (val, oldVal) => {
//     logger.info("store.watch", { val, oldVal });
//   },
//   {
//     deep: true,
//     immediate: true
//   }
// );

// store.subscribe(
//   (mutation, state) => {
//     logger.info("store.subscribe", {
//       mutation,
//       state
//     });
//   },
//   {
//     prepend: true
//   }
// );

// store.subscribeAction(
//   (action, payload) => {
//     logger.info("store.subscribeAction", {
//       action,
//       payload
//     });
//   },
//   {
//     prepend: true
//   }
// );

export default store;
