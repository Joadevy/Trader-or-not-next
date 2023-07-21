import "./globals.css";
import type { Metadata } from "next";

import { Ysabeau } from "next/font/google";

const ysabeau = Ysabeau({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trader or not?",
  description: "Higher and lower app with crypto's prices",
};

export default function RootLayout({
  children,
}: {
  // eslint-disable-next-line no-undef
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ysabeau.className + " bg-dark-bg"}>{children}</body>
    </html>
  );
}
