import InboxSideBar from "@/components/dashboard/recruiter/inbox/InboxSideBar";




// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
     
  return (
    <html lang="en">
      <body >
         <div className='w-full max-h-screen overflow-hidden bg-red-300  flex'>
            <InboxSideBar/>
            <div className='flex-1 bg-emerald-500 h-full'>
                {children}
            </div>
        </div>
         <div className='h-20'></div>
      </body>
    </html>
  );
}
