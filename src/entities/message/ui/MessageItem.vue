<script setup lang="ts">
import type { Message } from "@/entities/message/model/types";

const props = defineProps<{ message: Message }>();
</script>

<template>
  <div class="message" :class="props.message.role">
    {{ props.message.content }}
  </div>
</template>

<style scoped>
.message {
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 6px;
  max-width: 80%;
  white-space: pre-wrap;
  color: var(--text);
}
.message.user {
  align-self: flex-end;
  background: var(--primary-gradient);
}
.message.assistant {
  align-self: flex-start;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
}
</style>
 