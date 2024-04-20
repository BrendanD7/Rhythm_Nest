import React from "react";
import NavBar from "./Components/navigation/navbar/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";
import {auth} from "./auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rhythm Nest",
  description: "Music Collection App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NavBar />
      {children}
      </body>
    </html>
  );
}
