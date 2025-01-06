import type { Metadata } from "next";
import "./globals.css";
import "@fontsource-variable/nunito-sans";
import ClientProvider from "@/modules/common/components/shared/client-provider";
import { getUserData } from "@/lib/helpers/get-user-data";
import { Toaster } from "@/modules/common/ui/sonner";

export const metadata: Metadata = {
  title: "Momentum",
  description: "Small Steps, Big Momentum.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserData();

  return (
    <html lang='en' suppressHydrationWarning>
      <body>
       
        <div id='overlay'></div>
        <ClientProvider user={user}>{children}</ClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
