import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import {ClerkProvider} from "@clerk/nextjs"

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReactCall",
  description: "Ugly but works like charm",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
     <html lang="en" suppressHydrationWarning>
      <body className={cn(
        font.className, 
        "bg-lime bg-lime-300 dark:bg-lime-300"
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="ReactCall-theme"
          >
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>
              {children}
              </QueryProvider>
            </SocketProvider>
        </ThemeProvider>
      </body>
     </html>
    </ClerkProvider>
  )
}
