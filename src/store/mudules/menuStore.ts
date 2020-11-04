import { UPDATE_MENU, UPDATE_BREAD_CRUMB } from "../mutations";
import { QUERY_MENU } from "../actions";

function lookupBreadCrumb(menuData: FreeObject[], checkIds: string[]) {
  let tmp = [...menuData];

  const res = [];
  let index = 0;
  while (tmp) {
    const obj = tmp.find(item => item.id === checkIds[index]);
    if (obj) {
      res.push({
        label: obj.label
      });
    }

    if (obj && obj.child) {
      tmp = obj.child;
      index++;
    } else {
      break;
    }
  }

  return res;
}

const menuStore: FreeObject = {
  state: {
    menu: [],
    breadCrumb: []
  },
  mutations: {
    [UPDATE_MENU](state: FreeObject, menuInfo: FreeObject) {
      state.menu = menuInfo;
    },
    [UPDATE_BREAD_CRUMB](state: FreeObject, checkIds: string[]) {
      state.breadCrumb = lookupBreadCrumb(state.menu, checkIds);
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

export default menuStore;
