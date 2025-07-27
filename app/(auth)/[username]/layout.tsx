import { ProfileNavList } from "@/components/ui/custom/Profile";
import { getUserByUsername } from "@/service/api";
import type { Metadata } from "next";

import { Source_Sans_3 } from "next/font/google";

import { Toaster } from "sonner";

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
        <main className='max-w-7xl mx-auto p-1 lg:p-0 flex gap-3 '>
           <div className='w-80 h-screen shadow-lg border gorder-gray-200 rounded-lg p-2'>
            <ProfileNavList/>
           </div>

          <div className="w-full h-screen shadow-lg border border-gray-200 rounded-lg">{children}</div>
        </main>
        {/* <Footer /> */}
        <Toaster
          closeButton={true}
          containerAriaLabel="Toaster"
          position="bottom-right"
        />
      </body>
    </html>
  );
}
