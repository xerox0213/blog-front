import type { RouterOptions } from "vue-router";

export const routes: RouterOptions["routes"] = [
  {
    path: "/register",
    name: "register",
    component: () => import("@/pages/register.vue"),
  },
];
