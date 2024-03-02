import React, { Suspense } from "react";
import ListMessages from "./listMessages";
import { supabaseServer } from "@/lib/supabase/server";
import InitMessages from "@/lib/store/initMessages";

export default async function ChatMessages() {
  const supabase = supabaseServer();

  const { data } = await supabase.from("messages").select("*,users(*)");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListMessages />
      <InitMessages messages={data || []} />
    </Suspense>
  );
}
