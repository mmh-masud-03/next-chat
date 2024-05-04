import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Provider from "@/components/Provider";
import TosterContext from "@/components/TosterContext";
import TopBar from "@/components/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConvoSphere",
  description: "Chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-purple-1`}>
        <Provider>
          <TosterContext />
          {children}
        </Provider>
      </body>
    </html>
  );
}
