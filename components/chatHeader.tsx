"use client";

import React from "react";
import { Button } from "./ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

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
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
            <h1 className="text-sm text-gray-400">10 Onlines</h1>
          </div>
        </div>
        <Button onClick={handleLoginLogoutWithGithub}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
