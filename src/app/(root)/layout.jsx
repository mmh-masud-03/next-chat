import { Inter } from "next/font/google";
import "../globals.css";
import Provider from "../../components/Provider";
import TosterContext from "../../components/TosterContext";
import TopBar from "../../components/Topbar";
import BottomBar from "../../components/BottomBar"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ConvoSphere",
  description: "Chat application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-2`}>
        <Provider>
          <TopBar />
          {children}
          <BottomBar />
        </Provider>
      </body>
    </html>
  );
}