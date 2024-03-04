import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { LIMIT_MESSAGE } from "../constant";

export type Imessage = {
  created_at: string;
  id: string;
  is_edit: boolean;
  send_by: string;
  text: string;
  users: {
    avatar_url: string;
    created_at: string;
    display_name: string;
    id: string;
  } | null;
};

interface MessageState {
  hasMore: boolean;
  page: number;
  messages: Imessage[];
  addMessage: (message: Imessage) => void;
  actionMessage: Imessage | undefined;
  setActionMessage: (message: Imessage) => void;
  optimisticIds: string[];
  optimisticMessage: (messageid: string) => void;
  optimisticUpdateMessage: (messageUpdated: Imessage) => void;
  setOptimisticIds: (id: string) => void;
  setMessages: (messages: Imessage[]) => void;
}

export const useMessages = create<MessageState>()((set) => ({
  hasMore: true,
  page: 1,
  messages: [],
  optimisticIds: [],
  setOptimisticIds: (id) =>
    set((state) => ({
      optimisticIds: [...state.optimisticIds, id],
    })),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) =>
    set((state) => ({
      messages: [...messages, ...state.messages],
      page: state.page + 1,
      hasMore: messages.length >= LIMIT_MESSAGE,
    })),
  actionMessage: undefined,
  setActionMessage: (message) => set({ actionMessage: message }),
  optimisticMessage: (messageid) =>
    set((state) => ({
      messages: state.messages.filter((message) => message.id !== messageid),
    })),
  optimisticUpdateMessage: (messageUpdated) =>
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === messageUpdated.id
          ? {
              ...message,
              is_edit: messageUpdated.is_edit,
              text: messageUpdated.text,
            }
          : message
      ),
    })),
}));
