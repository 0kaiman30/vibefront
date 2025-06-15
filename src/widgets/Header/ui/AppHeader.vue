<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import ThemeToggle from "@/features/themeToggle/ui/ThemeToggle.vue";

const route = useRoute();
const router = useRouter();

function go(path: string) {
  if (route.path !== path) router.push(path);
}

function goProfile() {
  const token = localStorage.getItem("token");
  if (token) {
    go("/profile");
  } else {
    go("/login");
  }
}
</script>

<template>
  <header class="header">
    <div class="logo" @click="go('/')">AsmanAI</div>
    <nav class="nav">
      <a
        class="nav-link"
        :class="{ active: route.path === '/' }"
        @click.prevent="go('/')"
        href="#"
        >Home</a
      >
      <a
        class="nav-link"
        :class="{ active: route.path === '/chat' }"
        @click.prevent="go('/chat')"
        href="#"
        >Chat</a
      >
      <a
        class="nav-link"
        :class="{ active: route.path === '/subscriptions' }"
        @click.prevent="go('/subscriptions')"
        href="#"
        >Subscriptions</a
      >
      <a
        class="nav-link"
        :class="{ active: route.path === '/profile' }"
        @click.prevent="goProfile"
        href="#"
        >Profile</a
      >
    </nav>
    <ThemeToggle />
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 60px;
  border-bottom: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text);
  position: sticky;
  top: 0;
  z-index: 10;
}
.logo {
  font-weight: 700;
  cursor: pointer;
  font-size: 1.25rem;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.nav {
  display: flex;
  gap: 20px;
  align-items: center;
}
.nav-link {
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  position: relative;
}
.nav-link.active::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--primary-color);
}
.nav-link:hover {
  color: var(--primary-color);
}

/* Ensure toggle inside header aligned */
.header > *:last-child {
  margin-left: 20px;
}
</style>
