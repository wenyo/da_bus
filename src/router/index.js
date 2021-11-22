import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import News from "../views/News.vue";
import QA from "../views/QA.vue";

export const routes = [
  {
    path: "/",
    name: "主頁",
    component: Home,
  },
  {
    path: "/news",
    name: "最新消息",
    component: News,
  },
  {
    path: "/qa",
    name: "常見問題",
    component: QA,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
