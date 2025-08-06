import { Skeleton } from "@/components/ui/skeleton";

// app/jobdetails/[id]/loading.tsx
export default function JobDetailsLoading() {
  return (
    <div className="relative">
      <Skeleton className="h-[250px] w-full rounded-xl bg-gray-200" />
      <Skeleton className="w-40 h-40 absolute top-[170px] lg:left-44 z-100 rounded-full bg-gray-300" />
      <div className="space-y-2 max-w-7xl mx-auto mt-16 lg:mt-20">
       <div className="flex  justify-between flex-col lg:flex-row">
         <div className="space-y-2">
          <Skeleton className="h-6 w-[250px] bg-gray-100" />
          <Skeleton className="h-4 w-[200px] bg-gray-100" />
          <Skeleton className="h-4 w-[200px] bg-gray-100" />
          <Skeleton className="h-4 w-[200px] bg-gray-100" />
        </div>
        <div className="flex flex-col lg:flex-row gap-2 mt-5">
          <Skeleton className="h-12 w-full lg:w-40 bg-gray-100" />
          <Skeleton className="h-12 w-full lg:w-40 bg-gray-100" />
          
        </div>
       </div>
      </div>
    </div>
  );
}