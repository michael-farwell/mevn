import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home                                               from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/movies",
    name: "Movies",
    component: () => import(/* webpackChunkName: "movies" */ "../views/Movies.vue"),
  },
  {
    path: "/movie/:id",
    name: "Movie",
    component: () => import(/* webpackChunkName: ""movie */ "../views/Movie.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
