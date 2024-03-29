import { Imessage, useMessages } from "@/lib/store/messages";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useUser } from "@/lib/store/user";

export default function Message({ message }: { message: Imessage }) {
  const user = useUser((state) => state.user);

  return (
    <div className="flex gap-2">
      <div>
        <Image
          src={message.users?.avatar_url!}
          alt={message.users?.display_name!}
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <h1 className="font-bold">{message.users?.display_name}</h1>
            <h1 className="text-sm text-gray-600">
              {new Date(message.created_at).toDateString()}
            </h1>
            {message.is_edit ? (
              <h1 className="text-sm text-gray-600 ">(Edited)</h1>
            ) : null}
          </div>
          {message.send_by === user?.id ? (
            <MessageMenu message={message} />
          ) : null}
        </div>
        <p>{message.text}</p>
      </div>
    </div>
  );
}

const MessageMenu = ({ message }: { message: Imessage }) => {
  const setActionMessage = useMessages((state) => state.setActionMessage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            document.getElementById("trigger-edit")?.click();
            setActionMessage(message);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            document.getElementById("trigger-button-delete")?.click();
            setActionMessage(message);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
