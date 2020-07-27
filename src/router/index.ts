import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const myImport = (file: string) => () => import(`../views${file}`)

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
    component: myImport("/home/index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
