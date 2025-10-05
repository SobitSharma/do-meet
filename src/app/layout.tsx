import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/auth";
import StreamProvider from "./providers/StreamProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Do-Meet | Seamless Video & Whiteboard Collaboration",
  description: "Do-Meet is a video meeting app that lets you invite participants via email, create groups, and collaborate in real-time with a built-in whiteboard. Voice + whiteboard sessions are also available.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers session={session}>
          <StreamProvider>
               {children}
          </StreamProvider>
        </Providers>
      </body>
    </html>
  );
}
