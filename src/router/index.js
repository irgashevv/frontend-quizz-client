import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/Home.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../pages/Register.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.name === "register") {
//     next();
//   } else {
//     next("/register");
//   }
// })


export default router;
