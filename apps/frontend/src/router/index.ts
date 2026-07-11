import { createRouter, createWebHistory } from "vue-router";

import Layout from "../components/layout/Layout.vue";
import { ROUTES } from "./routes";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: Layout,
      children: [
        {
          path: ROUTES.Home.path,
          name: ROUTES.Home.name,
          component: () => import("../views/home/Home.vue"),
        },
        {
          path: ROUTES.Contact.path,
          name: ROUTES.Contact.name,
          component: () => import("../views/contact/Contact.vue"),
        },
      ],
    },
  ],
});
