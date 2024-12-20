"use client";

import React, { useEffect } from "react";
import { ThemeProvider } from "./theme-provider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useUserStore from "@/modules/store/user-store";

interface ClientProviderProps {
  children: React.ReactNode;
  user: UserDataType;
}

export default function ClientProvider({
  children,
  user,
}: ClientProviderProps) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  return (
    <>
      <ThemeProvider defaultTheme='light'>
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
      </ThemeProvider>
    </>
  );
}
