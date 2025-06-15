<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import ThemeToggle from "@/features/themeToggle/ui/ThemeToggle.vue";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const showMenu = ref(false);

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

function toggleMenu() {
  showMenu.value = !showMenu.value;
}
</script>

<template>
  <header class="header">
    <div class="logo" @click="go('/')">AsmanAI</div>
    <button class="burger" @click="toggleMenu">☰</button>
    <nav :class="['nav', { open: showMenu }]">
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
    <div v-if="showMenu" class="overlay" @click="toggleMenu"></div>
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

/* Burger styles */
.burger {
  display: none;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: var(--text);
  cursor: pointer;
}

/* Overlay background when menu open */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9;
}

@media (max-width: 768px) {
  .burger {
    display: block;
  }
  .nav {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 240px;
    flex-direction: column;
    align-items: flex-start;
    padding: 80px 20px;
    background: var(--bg-secondary);
    box-shadow: -2px 0 6px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 10;
  }
  .nav.open {
    transform: translateX(0);
  }
}
</style>
