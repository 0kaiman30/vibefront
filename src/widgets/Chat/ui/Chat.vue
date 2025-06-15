<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import MessageItem from "@/entities/message/ui/MessageItem.vue";
import SendMessageForm from "@/features/sendMessage/ui/SendMessageForm.vue";
import type { Message } from "@/entities/message/model/types";
import { sendChat } from "@/shared/api/chat";
import { useChats } from "@/entities/chat/model/useChats";
import Button from "@/shared/ui/Button.vue";

const GREET: Message = {
  id: "greet",
  role: "assistant",
  content: "Hello! I'm AsmanAi. How can I help you?",
};

const { chats, currentChatId, addChat, addMessage } = useChats();
const router = useRouter();

const currentChat = computed(() =>
  chats.value.find((c) => c.id === currentChatId.value)
);
const messagesList = computed(() => currentChat.value?.messages ?? []);

const loggedIn = computed(() => !!localStorage.getItem("token"));

async function sendMessage(text: string) {
  if (!currentChat.value) addChat();

  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user",
    content: text,
  };
  addMessage(userMessage);

  const assistantMessage: Message = {
    id: (Date.now() + 1).toString(),
    role: "assistant",
    content: "",
  };
  addMessage(assistantMessage);

  try {
    const { reply } = await sendChat({ message: text });
    const words = reply.split(/\s+/);
    let index = 0;
    const interval = setInterval(() => {
      const chunk = words.slice(index, index + 3).join(" ");
      assistantMessage.content += (assistantMessage.content ? " " : "") + chunk;
      index += 3;
      if (index >= words.length) {
        clearInterval(interval);
      }
    }, 500);
  } catch (e) {
    console.error(e);
    assistantMessage.content = "Server error. Please try again later.";
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
    <template v-if="loggedIn">
      <SendMessageForm @send="sendMessage" />
    </template>
    <template v-else>
      <div class="need-login">
        <p>You must be logged in to send messages.</p>
        <Button class="btn-gradient" @click="router.push('/login')">Log in</Button>
      </div>
    </template>
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
  height: 100%;
}

.messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 96px;
}

.need-login {
  padding: 24px 16px;
  text-align: center;
  border-top: 1px solid var(--border);
  background: var(--bg-secondary);
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}
</style>
