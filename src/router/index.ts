import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const myImport = (file: string) => () => import(`../views${file}`);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    component: myImport("/login/index.vue")
  },
  {
    path: "/home",
    component: () => import("../business/BcFrame/index.vue"),
    children: [
      {
        path: "/entry/overview",
        component: myImport("/entry/overview/index.vue")
      },
      {
        path: "/asset/view/dev",
        component: myImport("/asset/view/dev/index.vue")
      },
      {
        path: "/asset/view/asset",
        component: myImport("/asset/view/asset/index.vue")
      },
      {
        path: "/asset/view/tag",
        component: myImport("/asset/view/tag/index.vue")
      }
    ]
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

// let alreadyParseRouter = false;
// router.beforeEach((to, from, next) => {
//   if(alreadyParseRouter === false){
//     router.addRoutes(routes);
//     alreadyParseRouter = true;
//     router.push({path: to.path})
//   }else{
//     next()
//   }
// })

export default router;
