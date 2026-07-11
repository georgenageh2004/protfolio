import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "George Nageh | Frontend Angular Developer",
  description:
    "Computer Science student passionate about building modern, responsive web applications using Angular, Next.js, and .NET. Explore my portfolio of projects and skills.",
  keywords: [
    "George Nageh",
    "Frontend Developer",
    "Angular Developer",
    "React Developer",
    "Next.js",
    "Computer Science",
    "El Shorouk Academy",
    "Portfolio",
  ],
  authors: [{ name: "George Nageh", url: "https://github.com/georgenageh2004" }],
  creator: "George Nageh",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "George Nageh | Frontend Angular Developer",
    description:
      "Computer Science student passionate about building modern, responsive web applications using Angular, Next.js, and .NET.",
    siteName: "George Nageh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "George Nageh | Frontend Angular Developer",
    description: "Computer Science student passionate about building modern web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
