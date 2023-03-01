import { createRouter, createWebHashHistory } from "vue-router";
import routes from "~pages";

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
