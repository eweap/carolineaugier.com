import { createRouter, createWebHistory } from "vue-router";

import { SHOPIFY_ROUTES } from "@carolineaugier/common";

import Layout from "../components/layout/Layout.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: Layout,
      children: [
        // General
        {
          path: SHOPIFY_ROUTES.Home.path,
          name: SHOPIFY_ROUTES.Home.name,
          component: () => import("../views/home/Home.vue"),
        },
        {
          path: SHOPIFY_ROUTES.Contact.path,
          name: SHOPIFY_ROUTES.Contact.name,
          component: () => import("../views/contact/Contact.vue"),
        },

        // Products
        {
          path: SHOPIFY_ROUTES.Products.path,
          name: SHOPIFY_ROUTES.Products.name,
          component: () => import("../views/products/Products.vue"),
        },
        {
          path: SHOPIFY_ROUTES.ProductDetails.path,
          name: SHOPIFY_ROUTES.ProductDetails.name,
          component: () => import("../views/products/ProductDetails.vue"),
        },
      ],
    },
  ],
});
