import React from "react";
import { ThemeProvider } from "./theme-provider";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider defaultTheme='light'>{children}</ThemeProvider>
    </>
  );
}
