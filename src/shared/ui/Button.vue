<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{ type?: "button" | "submit" }>();
</script>

<template>
  <button :type="props.type ?? 'button'" class="base-button">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  background: var(--primary-gradient);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.4s ease;
}
.base-button:hover {
  transform: translateY(-2px);
}
</style>
