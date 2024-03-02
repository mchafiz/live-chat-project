import { User } from "@supabase/supabase-js";
import { create } from "zustand";

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
  messages: Imessage[];
  addMessage: (message: Imessage) => void;
  actionMessage: Imessage | undefined;
  setActionMessage: (message: Imessage) => void;
  optimisticMessage: (messageid: string) => void;
  optimisticUpdateMessage: (messageUpdated: Imessage) => void;
}

export const useMessages = create<MessageState>()((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
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
