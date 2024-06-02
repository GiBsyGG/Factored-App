import type { Metadata } from "next";
import { Roboto, Inter } from "next/font/google";
import "./globals.css";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { styled } from "@mui/material";

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  style: 'normal',
  display: 'swap',
});

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
  style: 'normal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Factored App",
  description: "Fullstack application for managing employee profiles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
