import { ref, watch } from "vue";
import type { Chat } from "./types";
import type { Message } from "@/entities/message/model/types";

const GREET: Message = {
  id: "greet",
  role: "assistant",
  content: "Привет! Я PenisAi. Чем могу помочь?",
};

// Загружаем сохранённые чаты из localStorage (не более 5)
const stored = localStorage.getItem("chats");
let initialChats: Chat[] = [];
try {
  if (stored) {
    initialChats = JSON.parse(stored).slice(0, 10);
  }
} catch {
  // ignore parse errors
}

if (initialChats.length === 0) {
  initialChats.push({
    id: Date.now().toString(),
    title: "Новый чат",
    messages: [GREET],
  });
}

const chats = ref<Chat[]>(initialChats);

const currentChatId = ref<string>(chats.value[0].id);

function addChat(): string | null {
  if (chats.value.length >= 10) {
    return null; // превышен лимит
  }
  const id = Date.now().toString();
  const chat: Chat = {
    id,
    title: "Новый чат",
    messages: [GREET],
  };
  chats.value.unshift(chat);
  currentChatId.value = id;
  return id;
}

function selectChat(id: string) {
  currentChatId.value = id;
}

function addMessage(message: Message) {
  const chat = chats.value.find((c) => c.id === currentChatId.value);
  if (!chat) return;
  chat.messages.push(message);
  if (chat.title === "Новый чат" && message.role === "user") {
    chat.title =
      message.content.slice(0, 20) + (message.content.length > 20 ? "…" : "");
  }
}

function deleteChat(id: string) {
  const index = chats.value.findIndex((c) => c.id === id);
  if (index === -1) return;
  chats.value.splice(index, 1);

  // если удалён текущий чат
  if (currentChatId.value === id) {
    if (chats.value.length) {
      currentChatId.value = chats.value[0].id;
    } else {
      // создаём новый пустой чат
      const newId = Date.now().toString();
      chats.value.push({
        id: newId,
        title: "Новый чат",
        messages: [GREET],
      });
      currentChatId.value = newId;
    }
  }
}

// Сохраняем чаты при каждом изменении
watch(
  chats,
  (val) => {
    localStorage.setItem("chats", JSON.stringify(val.slice(0, 10)));
  },
  { deep: true }
);

export function useChats() {
  return {
    chats,
    currentChatId,
    addChat,
    selectChat,
    addMessage,
    deleteChat,
  };
}
