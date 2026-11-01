import type { ReactNode } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import StoreProvider from "./StoreProvider";
import Themeprovider from "./ThemeProvider";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fa" className={cn("font-sans", inter.variable)}>
      <body>
        <StoreProvider>
          <Themeprovider>{children}</Themeprovider>
        </StoreProvider>
      </body>
    </html>
  );
}
