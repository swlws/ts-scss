import Vue from "vue";
import Vuex from "vuex";
import { dateFormat } from "@/util/tool";
import logger from '@log';

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


store.watch(
  state => state.height,
  (val, oldVal) => {
    logger.info("store.watch", { val, oldVal });
  },
  {
    deep: true,
    immediate: true
  }
);

store.subscribe(
  (mutation, state) => {
    logger.info("store.subscribe", {
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
    logger.info("store.subscribeAction", {
      action,
      payload
    });
  },
  {
    prepend: true
  }
);

export default store;
