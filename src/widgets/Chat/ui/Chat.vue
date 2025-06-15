<script setup lang="ts">
import { computed, onMounted } from "vue";
import MessageItem from "@/entities/message/ui/MessageItem.vue";
import SendMessageForm from "@/features/sendMessage/ui/SendMessageForm.vue";
import type { Message } from "@/entities/message/model/types";
import { sendChat } from "@/shared/api/chat";
import { useChats } from "@/entities/chat/model/useChats";

const GREET: Message = {
  id: "greet",
  role: "assistant",
  content: "Привет! Я PenisAi. Чем могу помочь?",
};

const { chats, currentChatId, addChat, addMessage } = useChats();

const currentChat = computed(() =>
  chats.value.find((c) => c.id === currentChatId.value)
);
const messagesList = computed(() => currentChat.value?.messages ?? []);

async function sendMessage(text: string) {
  if (!currentChat.value) addChat();

  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user",
    content: text,
  };
  addMessage(userMessage);

  try {
    const { reply } = await sendChat({ message: text });
    addMessage({
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: reply,
    });
  } catch (e) {
    console.error(e);
    addMessage({
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "Ошибка сервера. Попробуйте позже.",
    });
  }
}

onMounted(() => {
  if (!currentChat.value) addChat();
  else if (currentChat.value.messages.length === 0) {
    addMessage(GREET);
  }
});
</script>

<template>
  <div class="chat">
    <transition-group name="slide-up" tag="div" class="messages">
      <MessageItem v-for="m in messagesList" :key="m.id" :message="m" />
    </transition-group>
    <SendMessageForm @send="sendMessage" />
  </div>
</template>

<style scoped>
.chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 850px;
  width: 100%;
  margin: 0 auto;
}

.messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
</style>
