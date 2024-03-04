"use client";

import { User } from "@supabase/supabase-js";
import React, { useEffect, useRef } from "react";
import { useUser } from "./user";
import { Imessage, useMessages } from "./messages";
import { LIMIT_MESSAGE } from "../constant";

export default function InitMessages({ messages }: { messages: Imessage[] }) {
  const initRef = useRef(false);
  const hasMore = messages.length > LIMIT_MESSAGE;

  useEffect(() => {
    if (!initRef.current) {
      useMessages.setState({ messages: messages, hasMore });
    }
    initRef.current = true;
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return <></>;
}
