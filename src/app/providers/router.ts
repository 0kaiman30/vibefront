import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import ChatPage from "@/pages/Chat/ui/ChatPage.vue";
import HomePage from "@/pages/Home/ui/HomePage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/chat",
    name: "Chat",
    component: ChatPage,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Auth/ui/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/pages/Auth/ui/RegisterPage.vue"),
  },
  {
    path: "/subscriptions",
    name: "Subscriptions",
    component: () => import("@/pages/Subscribe/ui/SubscribePage.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/pages/Profile/ui/ProfilePage.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
