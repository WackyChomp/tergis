import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from '@/lib/utils'
import { ThemeProvider } from "@/components/theme-provider";

const roboto = Roboto({ 
  subsets: ["latin"], 
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "WIP Name",
  description: "Management system to monitor available consultants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('bg-orange-800 min-h-screen font-roboto antialiased', roboto.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"     //makes background original dark and text white by default
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
