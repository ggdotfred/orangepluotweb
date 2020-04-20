import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import firebase from "@/FirebaseConf";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      authRequired: true
    }
  },
  {
    path: "/account",
    name: "account",
    component: () => import("@/views/Account.vue"),
    meta: {
      authRequired: false
    }
  },
  {
    path: "/add",
    name: "add",
    component: () => import("@/views/Add.vue"),
    meta: {
      authRequired: true
    }
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("@/views/Add.vue"),
    meta: {
      authRequired: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const user = firebase.auth().currentUser;
  const authRequired = to.meta.authRequired;
  if (!user && authRequired) return next("/account");
  else if (user && !authRequired) return next("/");
  return next();
});

export default router;
