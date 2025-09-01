import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Leben in Deutschland - Citizenship Test",
  description: "German citizenship test preparation with interactive quizzes, practice tests, and comprehensive exam simulation. Prepare for your Einbürgerungstest with official questions.",
  keywords: "German citizenship test, Leben in Deutschland, Einbürgerungstest, German quiz, citizenship preparation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
