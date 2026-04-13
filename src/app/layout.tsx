import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthShell from "./components/AuthShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Liber Personeel - AI Matching Dashboard",
  description: "AI-gestuurde werving en matching voor de technische uitzendbranche",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full antialiased">
        <AuthShell>{children}</AuthShell>
      </body>
    </html>
  );
}
