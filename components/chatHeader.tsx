"use client";

import React from "react";
import { Button } from "./ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import ChatPresence from "./chatPresence";

const ChatHeader = ({ user }: { user: User | undefined }) => {
  const router = useRouter();

  const handleLoginLogoutWithGithub = async () => {
    const supabase = supabaseBrowser();

    if (!user) {
      supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: location.origin + "/auth/callback",
        },
      });
    } else {
      await supabase.auth.signOut();
      router.refresh();
    }
  };
  return (
    <div className="h-20">
      <div className="p-5 border-b flex items-center justify-between h-full">
        <div>
          <h1 className="text-xl font-bold">Daily Chat</h1>
          {user ? (
            <div className="flex items-center gap-1">
              <ChatPresence />
            </div>
          ) : null}
        </div>
        <Button onClick={handleLoginLogoutWithGithub}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
