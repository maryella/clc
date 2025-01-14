import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CLC: Cute Lil Calculator",
  description: "Simple calculator in pretty colors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
