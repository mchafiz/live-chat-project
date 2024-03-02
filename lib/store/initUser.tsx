"use client";

import { User } from "@supabase/supabase-js";
import React, { useEffect, useRef } from "react";
import { useUser } from "./user";

export default function InitUser({ user }: { user: User | undefined }) {
  const initRef = useRef(false);

  useEffect(() => {
    if (!initRef.current) {
      useUser.setState({ user });
    }
    initRef.current = true;
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return <></>;
}
