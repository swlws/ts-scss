import Vue from "vue";
import Vuex from "vuex";
import appStore from "./mudules/appStore";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    appStore
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
