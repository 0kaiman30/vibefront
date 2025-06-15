import type { Message } from "@/entities/message/model/types";

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
}
