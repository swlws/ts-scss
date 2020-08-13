import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const myImport = (file: string) => () => import(`../views${file}`)
const testImport = (file: string) => () => import(`../viewsTest${file}`)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: '/login'
  },
  {
    path: "/login",
    component: myImport("/login/index.vue")
  },
  {
    path: "/home",
    component: myImport("/home/index.vue"),
    children: [
      {
        path: '/test/datagrid',
        component: testImport("/datagrid.vue")
      },
      {
        path: '/test/svgIcon',
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
