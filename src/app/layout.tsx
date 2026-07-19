
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/providers/ToastProvider";
import { ThemeProvider } from "@/providers/theme-provider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChefMind | Smart Recipe Application",
  description: "Discover, save, and cook modern recipes with ChefMind.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider defaultTheme="system">
          <SmoothScrollProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <ToastProvider />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
