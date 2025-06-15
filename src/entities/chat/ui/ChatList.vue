<script setup lang="ts">
import { computed } from "vue";
import { useChats } from "@/entities/chat/model/useChats";

const { chats, currentChatId, selectChat, addChat } = useChats();

const sortedChats = computed(() => chats.value);
</script>

<template>
  <aside class="chat-list">
    <button class="new-chat btn-gradient" @click="addChat">+ New chat</button>
    <ul>
      <li
        v-for="c in sortedChats"
        :key="c.id"
        :class="{ active: c.id === currentChatId }"
        @click="selectChat(c.id)"
      >
        {{ c.title }}
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.chat-list {
  width: 260px;
  border-right: 1px solid var(--border);
  background: var(--bg-secondary);
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 12px;
  height: 100%;
  overflow: hidden;
}
.new-chat {
  width: 100%;
  padding: 0.5rem 0;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  flex-shrink: 0;
}
ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: auto;
  flex: 1;
}
li {
  padding: 8px 10px;
  border-radius: 4px;
  cursor: pointer;
  color: var(--text);
}
li.active {
  background: var(--primary-gradient);
  color: #fff;
}
li:hover {
  background: rgba(0, 0, 0, 0.05);
}
</style>
