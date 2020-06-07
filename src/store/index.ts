import Vue from "vue";
import Vuex from "vuex";
import { dateFormat } from "@/util/tool";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    height: 100,
    width: 200
  },
  getters: {
    cfg(state) {
      return `width: ${state.width}, height: ${state.height}`;
    }
  },
  mutations: {
    add: state => {
      state.height++;
    }
  },
  actions: {},
  modules: {}
});

const log = (name: string, obj: any) => {
  console.info(`${dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss")} ${name}`);
  console.log("    ", obj);
};

store.watch(
  state => state.height,
  (val, oldVal) => {
    log("store.watch", { val, oldVal });
  },
  {
    deep: true,
    immediate: true
  }
);

store.subscribe(
  (mutation, state) => {
    log("store.subscribe", {
      mutation,
      state
    });
  },
  {
    prepend: true
  }
);

store.subscribeAction(
  (action, payload) => {
    log("store.subscribeAction", {
      action,
      payload
    });
  },
  {
    prepend: true
  }
);

export default store;
