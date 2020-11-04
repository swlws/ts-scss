import { UPDATE_MENU } from "../mutations";
import { QUERY_MENU } from "../actions";

const appStore: FreeObject = {
  state: {
    menu: []
  },
  mutations: {
    [UPDATE_MENU](state: FreeObject, menuInfo: FreeObject) {
      state.menu = menuInfo;
    }
  },
  actions: {
    [QUERY_MENU](store: FreeObject, queryMenuApi: Function) {
      if (!queryMenuApi || typeof queryMenuApi !== "function") return;

      queryMenuApi().then((res: FreeObject) => {
        if (res.r0 === true) {
          store.state.menu = res.data;
        }
      });
    }
  }
};

export default appStore;
