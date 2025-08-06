import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const ApplyPageLoading = () => {
    return (
        <div className='my-10 max-h-screen'>
           <Skeleton className="h-[250px] w-full rounded-xl bg-gray-200" />


           <div className='flex items-center gap-5 my-5'>
            <Skeleton className="h-[4000px] w-full rounded-xl bg-gray-200" />
            <Skeleton className="h-[4000px] w-full rounded-xl bg-gray-200" />
           </div>
        </div>
    );
};

export default ApplyPageLoading;