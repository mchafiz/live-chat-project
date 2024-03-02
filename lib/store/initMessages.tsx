"use client";

import { User } from "@supabase/supabase-js";
import React, { useEffect, useRef } from "react";
import { useUser } from "./user";
import { Imessage, useMessages } from "./messages";

export default function InitMessages({ messages }: { messages: Imessage[] }) {
  const initRef = useRef(false);

  useEffect(() => {
    if (!initRef.current) {
      useMessages.setState({ messages: messages });
    }
    initRef.current = true;
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return <></>;
}
