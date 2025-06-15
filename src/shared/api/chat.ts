export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  reply: string;
}

const API_URL =
  import.meta.env.VITE_CHAT_ENDPOINT ||
  "http://192.168.0.112:8000/api/analyze/";

export async function sendChat(request: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    throw new Error("Failed to reach the server");
  }

  const data = await res.json();
  // Попытаемся найти текст ответа в нескольких возможных полях
  const reply =
    (typeof data === "string"
      ? data
      : data.reply || data.result || data.answer) ?? "Нет ответа";

  return { reply };
}
