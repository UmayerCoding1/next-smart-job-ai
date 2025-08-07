import type { Metadata } from "next";
import "./globals.css";

import { Source_Sans_3 } from "next/font/google";
import UseAuth from "@/components/ui/custom/useAuth";
import { Toaster } from "sonner";
import QueryProvider from "@/lib/QueryProvider";
import ReduxProvider from "@/lib/ReduxProvider";
import Navbar from "@/components/ui/custom/Navbar";
import Footer from "@/components/ui/custom/Footer";
import { headers } from "next/headers";

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
            <Navbar />
            <UseAuth />
            <main>
              <div>
                {children}
              </div>
            </main>
            <Footer />
            <Toaster
              closeButton={true}
              containerAriaLabel="Toaster"
              position="bottom-right"
            />
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
