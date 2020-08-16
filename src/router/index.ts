import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const myImport = (file: string) => () => import(`../views${file}`)
const testImport = (file: string) => () => import(`../viewsV2${file}`)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: '/login'
  },
  {
    path: "/login",
    component: myImport("/Login/index.vue")
  },
  {
    path: "/home",
    component: () => import("@/businessComponents/ComLayoutV1/index.vue"),
    children: [
      {
        path: '/v2/dg1',
        component: testImport("/dg1.vue")
      },
      {
        path: '/v2/dg2',
        component: testImport("/dg2.vue")
      },
      {
        path: '/v2/svgIcon',
        component: testImport("/svgIcon.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'hash',
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
