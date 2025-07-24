import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";


import { Source_Sans_3 } from 'next/font/google';
import Footer from "@/components/Footer";  
import UseAuth from "@/components/useAuth";
import { Toaster } from "sonner";
import QueryProvider from "@/lib/QueryProvider";
import ReduxProvider from "@/lib/ReduxProvider";


const SourceSans = Source_Sans_3({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Job AI",
  icons: "favicon.png",
  description: "AI-powered job platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <html lang="en">
      <body className={`${SourceSans.className} bg-white dark:bg-slate-900`}>
        <QueryProvider>
          <ReduxProvider>
            
            <Navbar  />
            <UseAuth />
            <main>{children}</main>
            <Footer />
           <Toaster closeButton={true} containerAriaLabel="Toaster" position="bottom-right"/>
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
