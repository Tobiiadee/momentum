import type { Metadata } from "next";
import "./globals.css";
import "@fontsource-variable/nunito-sans";
import ClientProvider from "@/modules/common/components/shared/client-provider";

export const metadata: Metadata = {
  title: "Momentum",
  description: "Small Steps, Big Momentum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <div id='overlay'></div>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
