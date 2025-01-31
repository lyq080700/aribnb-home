import { Geist, Geist_Mono } from "next/font/google";
import MockComponent from "@/components/mockComponent";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SearchBox",
  description: "Airbnb",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ch">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <MockComponent></MockComponent>
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
