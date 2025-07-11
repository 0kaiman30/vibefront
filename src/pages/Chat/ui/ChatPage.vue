<script setup lang="ts">
import { ref } from "vue";
import Chat from "@/widgets/Chat/ui/Chat.vue";
import { useChats } from "@/entities/chat/model/useChats";
import Modal from "@/shared/ui/Modal.vue";

const showSidebar = ref(false);
const showLimitModal = ref(false);

function toggle() {
  showSidebar.value = !showSidebar.value;
}

// new chat creation
const { addChat, chats, currentChatId, selectChat, deleteChat } = useChats();

function createNewChat() {
  const id = addChat();
  if (!id) {
    showLimitModal.value = true;
    return;
  }
  showSidebar.value = false; // автоматически закрываем панель
}
</script>

<template>
  <div class="chat-layout">
    <transition name="sidebar">
      <aside v-if="showSidebar" class="side">
        <button class="new-chat" @click="createNewChat">+ New chat</button>
        <ul class="chat-list">
          <li
            v-for="c in chats"
            :key="c.id"
            :class="{ active: c.id === currentChatId }"
          >
            <span
              class="title"
              @click="
                selectChat(c.id);
                toggle();
              "
              >{{ c.title }}</span
            >
            <button class="delete" @click.stop="deleteChat(c.id)">✕</button>
          </li>
        </ul>
      </aside>
    </transition>
    <div v-if="showSidebar" class="overlay" @click="toggle"></div>
    <Chat class="chat-content" />
    <button class="toggle" @click="toggle">
      {{ showSidebar ? "⟨" : "⟩" }}
    </button>
    <Modal :open="showLimitModal" @close="showLimitModal = false">
      <h3>Chats limit</h3>
      <p>The maximum number of chats (10) has been reached.</p>
    </Modal>
  </div>
</template>

<style scoped>
.chat-layout {
  display: flex;
  flex: 1;
  position: relative;
  overflow-x: hidden;
  height: calc(100vh - 60px); /* 60px = высота AppHeader */
  overflow: hidden;
}
.side {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border);
  z-index: 1120;
  /* тень для отделения */
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.08);
}
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.sidebar-enter-to,
.sidebar-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.new-chat {
  display: block;
  width: 100%;
  padding: 12px 16px;
  background: var(--primary-gradient);
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 14px;
}
.toggle {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);
  border: none;
  background: var(--primary-gradient);
  color: #fff;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 1200;
}
.overlay {
  position: fixed;
  /* left: 300px; ширина сайдбара */
  top: 0;
  width: calc(100%);
  height: 100%;
  backdrop-filter: blur(4px);
  z-index: 1101; /* выше формы ввода (1100) и ниже кнопки (1200) */
}
.chat-list {
  list-style: none;
  margin: 0;
  padding: 8px 0;
  max-height: calc(100% - 60px);
  overflow-y: auto;
}
.chat-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 16px;
  cursor: pointer;
  color: var(--text-primary);
}
.chat-list li:hover {
  background: rgba(255, 255, 255, 0.05);
}
.chat-list li.active {
  background: var(--primary-gradient);
  color: #fff;
}
.chat-list li .delete {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 14px;
  opacity: 0.6;
}
.chat-list li .delete:hover {
  opacity: 1;
}

@media (max-width: 600px) {
  .side {
    width: 80vw;
  }
  .toggle {
    top: 60px;
    transform: translate(-50%, 0);
  }
  .overlay {
    left: 80vw;
    width: 20vw;
  }
}

.chat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
</style>
