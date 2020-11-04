import router from "./index";
import childRouterEnum from "./childRouterEnum";
import { RouteConfig } from "vue-router";

const myImport = (file: string) => () => import(`../views${file}`);

/**
 * 根据父路由生成自路由
 * @param {*} pPath 父路由
 *
 */
function makeChildRoutes(pPath: string): RouteConfig[] {
  if (!pPath) return [];

  return (childRouterEnum as FreeObject)[pPath] || [];
}

/**
 * 根据菜单数据拼接路由
 * @param menuData 菜单数据
 */
function makeRoutesByMenu(menuData: FreeObject[]): RouteConfig[] {
  const arr: FreeObject[] = [...menuData];

  const routers: RouteConfig[] = [];
  let item: FreeObject | undefined = arr.shift();
  while (item) {
    if (Array.isArray(item.child)) {
      arr.push(...item.child);
    } else if (item.url) {
      const url = item.url;
      routers.push({
        path: url,
        component: myImport(`${url}/index.vue`)
      });

      routers.push(...makeChildRoutes(url));
    }

    item = arr.shift();
  }

  return routers;
}

function installDyncRouter(menuData: FreeObject[]) {
  const routes = makeRoutesByMenu(menuData);
  console.log(routes);

  const homeRoute = {
    path: "/home",
    component: () => import("../business/BcFrame/index.vue"),
    children: routes
  };
  console.log(homeRoute);
  router.addRoutes([homeRoute]);
}

export default installDyncRouter;
