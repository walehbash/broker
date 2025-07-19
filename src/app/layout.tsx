import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OctaTrade - Premium Cryptocurrency Investment Platform",
  description: "Professional cryptocurrency investment platform with advanced trading tools, secure wallet integration, and expert support.",
  keywords: "cryptocurrency, investment, trading, bitcoin, ethereum, crypto wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-white`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}