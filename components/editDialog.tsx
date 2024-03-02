"use client";

import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useMessages } from "@/lib/store/messages";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";

export default function EditDialog() {
  const actionMessage = useMessages((state) => state.actionMessage);
  const optimisticUpdateMessage = useMessages(
    (state) => state.optimisticUpdateMessage
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeMessage = async () => {
    const supabase = supabaseBrowser();

    const { error } = await supabase
      .from("messages")
      .update({ text: inputRef.current?.value, is_edit: true })
      .eq("id", actionMessage?.id!);

    console.log(actionMessage);

    const newMessage = {
      ...actionMessage!,
      text: inputRef.current?.value!,
      is_edit: true,
    };

    if (error) {
      toast.error(error.message);
    } else {
      optimisticUpdateMessage(newMessage);
      toast.success("Message updated");

      // close the dialog
      const trigger = document.getElementById("trigger-edit");
      trigger?.click();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button id="trigger-edit"></button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Message</DialogTitle>
          <DialogDescription>
            Make changes to your message here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-0 items-center ">
            <Input
              id="message"
              ref={inputRef}
              defaultValue={actionMessage?.text}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleChangeMessage}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
