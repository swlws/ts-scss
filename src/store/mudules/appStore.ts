import { UPDATE_MENU } from '../mutations';
import { QUERY_MENU } from '../actions';

const appStore = {
    state: {
        menu: []
    },
    mutations: {
        [UPDATE_MENU](state: any, menuInfo: any) {
            state.menu = menuInfo
        }
    },
    actions: {
        [QUERY_MENU](store: any, queryMenuApi: Function, param: any) {
            if(!queryMenuApi || typeof queryMenuApi !== 'function') return;

            queryMenuApi().then((res: FreeObject) => {
                if(res.r0 === true){
                    store.state.menu = res.data
                }
            })
        }
    }
}

export default appStore;