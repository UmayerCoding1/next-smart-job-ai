import Navbar from "@/components/shared/dashboard/Navbar";
import Sidebar from "@/components/shared/dashboard/Sidebar";


// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" ">
        <div className="flex max-h-screen overflow-hidden ">
          <header>
            <Sidebar/>
          </header>

          <div className="w-full lg:flex-1 ">
            <div>
             <Navbar/>
            </div>
            <div className="w-full bg-gray-100 h-full overflow-auto scrollbar-hide p-1 ">
              {children}
              
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
