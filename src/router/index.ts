import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { get as httpGet } from "../api/httplib";
import makeDyncRoute from "./mekeDyncRouter";

Vue.use(VueRouter);

const myImport = (file: string) => () => import(`../views${file}`);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: myImport("/login/index.vue")
  },
  {
    path: "/home",
    component: () => import("../business/BcFrame/index.vue")
  },
  {
    path: "/test",
    component: myImport("/test/index.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  routes
});

/**
 * 解析最外层的固定的路由，不需要动态加载的路由
 */
function parseFixRoutes() {
  const arr: string[] = [];
  return routes.reduce((sum, next) => {
    const path: string = next.path;
    if (path !== "/home") sum.push(path);

    return sum;
  }, arr);
}

// 路由初始化
let loadEnd = false;
router.beforeEach((to, from, next) => {
  const path = to.fullPath;
  if (parseFixRoutes().includes(path)) {
    next();
  } else if (loadEnd === false) {
    httpGet("/api/menu")
      .then(res => {
        loadEnd = true;

        makeDyncRoute(res.data);
        router.replace(path);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    next();
  }
});

export default router;
