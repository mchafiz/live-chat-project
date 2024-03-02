"use client";

import React from "react";
import { Input } from "./ui/input";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/lib/store/user";
import { Imessage, useMessages } from "@/lib/store/messages";

export default function ChatInput() {
  const supabase = supabaseBrowser();
  const user = useUser((state) => state.user);
  const addMessage = useMessages((state) => state.addMessage);

  const handleSendMessage = async (text: string) => {
    if (text.trim()) {
      const newMessage = {
        id: uuidv4(),
        text,
        send_by: user?.id,
        is_edit: false,
        created_at: new Date().toISOString(),
        users: {
          id: user?.id,
          avatar_url: user?.user_metadata?.avatar_url,
          display_name: user?.user_metadata?.user_name,
          created_at: new Date().toISOString(),
        },
      };

      addMessage(newMessage as Imessage);

      const { error } = await supabase.from("messages").insert({
        text: newMessage.text,
        send_by: newMessage.send_by,
        id: newMessage.id,
        is_edit: newMessage.is_edit,
      });
      if (error) {
        toast.error(error.message);
      }
      toast.success("Message sent");
    } else {
      toast.error("Message can't be empty");
    }
  };
  return (
    <div className="p-5">
      <Input
        placeholder="Type a message"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
}
