<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const theme = ref<"light" | "dark">("dark");

onMounted(() => {
  const saved = localStorage.getItem("theme") as "light" | "dark" | null;
  theme.value =
    saved ??
    (window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark");
  apply();
});

function toggle() {
  theme.value = theme.value === "dark" ? "light" : "dark";
}

watch(theme, () => {
  localStorage.setItem("theme", theme.value);
  apply();
});

function apply() {
  const html = document.documentElement;
  if (theme.value === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}
</script>

<template>
  <button class="theme-toggle" @click="toggle">
    <span v-if="theme === 'dark'">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}
</style>
