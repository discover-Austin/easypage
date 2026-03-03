import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EasyPage – Visual Website Builder",
  description: "Build beautiful websites visually without any coding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
