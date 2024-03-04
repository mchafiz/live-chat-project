import React from "react";
import { Button } from "./ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { LIMIT_MESSAGE } from "@/lib/constant";
import { getFromAndTo } from "@/lib/utils";
import { useMessages } from "@/lib/store/messages";
import { toast } from "sonner";

export default function LoadMoreMessages() {
  const { page, setMessages, hasMore } = useMessages((state) => state);

  const fetchMore = async () => {
    const { from, to } = getFromAndTo(page, LIMIT_MESSAGE);
    const supabase = supabaseBrowser();

    const { data, error } = await supabase
      .from("messages")
      .select("*,users(*)")
      .range(from, to)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setMessages(data.reverse());
    }
  };
  if (hasMore) {
    return (
      <Button variant="outline" className="w-full" onClick={fetchMore}>
        Load more
      </Button>
    );
  }
  return <></>;
}
