<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

defineProps<{ open: boolean }>();
const emit = defineEmits<{ close: [] }>();

function onEsc(e: KeyboardEvent) {
  if (e.key === "Escape") emit("close");
}

onMounted(() => window.addEventListener("keydown", onEsc));
onUnmounted(() => window.removeEventListener("keydown", onEsc));
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="overlay" @click.self="emit('close')">
        <div class="modal slide-up-enter-active">
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
.modal {
  background: var(--bg-secondary);
  border-radius: 10px;
  padding: 32px 28px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
}
</style>
