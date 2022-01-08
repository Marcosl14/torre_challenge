import { createRouter, createWebHistory } from "vue-router";
import User from "../views/User.vue";
import Strength from "../views/Strength.vue";

const routes = [
  {
    path: "/user/:username",
    name: "User",
    props: true,
    component: User,
  },
  {
    path: "/strength/:username/:id",
    name: "Strength",
    props: true,
    component: Strength,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
