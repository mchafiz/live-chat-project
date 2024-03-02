"use client";
import { useMessages } from "@/lib/store/messages";
import React from "react";
import Message from "./message";
import DeleteAlert from "./deleteAlert";
import EditDialog from "./editDialog";

export default function ListMessages() {
  const messages = useMessages((state) => state.messages);

  return (
    <div className="flex-1 flex flex-col p-5 h-full overflow-y-auto">
      <div className="flex-1"></div>
      <div className="space-y-5">
        {messages.map((value) => {
          return <Message key={value.id} message={value} />;
        })}
      </div>
      <DeleteAlert />
      <EditDialog />
    </div>
  );
}
