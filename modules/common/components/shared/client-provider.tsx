"use client";

import React from "react";
import { ThemeProvider } from "./theme-provider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider defaultTheme='light'>
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
      </ThemeProvider>
    </>
  );
}
