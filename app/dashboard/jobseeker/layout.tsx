import Navbar from "@/components/shared/dashboard/navbar/Navbar";
import Sidebar from "@/components/shared/dashboard/Sidebar";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Smart Job AI",
  icons: "favicon.ico",
  description: "AI-powered job platform",
};

// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <div className="flex max-h-screen overflow-hidden ">
          <header>
            <Sidebar/>
          </header>

          <div className="w-full lg:flex-1 ">
            <div>
             <Navbar/>
            </div>
            <div className="w-full bg-gray-100 h-full overflow-auto scrollbar-hide lg:px-[30px] py-1 ">
              {children}
              
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
