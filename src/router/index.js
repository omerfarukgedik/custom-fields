import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Update from "../views/Update.vue";
import Create from "../views/Create.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/create",
    name: "create",
    component: Create,
  },
  {
    path: "/update/:id",
    name: "update",
    component: Update,
  },
  {
    path: "/404",
    name: "not found",
    component: NotFound,
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
