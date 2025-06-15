<script setup lang="ts">
import { ref } from "vue";
import Input from "@/shared/ui/Input.vue";
import Button from "@/shared/ui/Button.vue";

const emits = defineEmits<{ send: [text: string] }>();

const messageText = ref("");

function send() {
  if (!messageText.value.trim()) return;
  emits("send", messageText.value.trim());
  messageText.value = "";
}
</script>

<template>
  <div class="send-form">
    <Input v-model="messageText" @keydown.enter.prevent="send" />
    <Button @click="send">Отправить</Button>
  </div>
</template>

<style scoped>
.send-form {
  display: flex;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid var(--border);
  position: sticky;
  bottom: 0;
  background: var(--bg-secondary);
  z-index: 5;
  border-radius: 12px 12px 0 0;
}
</style>
