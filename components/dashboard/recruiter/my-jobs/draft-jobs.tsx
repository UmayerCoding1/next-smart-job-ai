import JobCard from '@/components/shared/job-card';
import { IDBDraftJobData } from '@/lib/types';
import { getAllDraftJobIDB } from '@/utils/indexedDB';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

const DraftJobs = ({tab}: {tab: string}) => {
    
  
  const { data: draftJobs = [], refetch } = useQuery({
    queryKey: ["draftJobs"], // unique cache key
    queryFn: getAllDraftJobIDB,
    staleTime: 1000 * 60 * 5, // ✅ cache for 5 minutes
   
  });

  useEffect(() => {
    if (tab === "Draft Jobs") refetch();
    console.log(tab)
  }, [tab, refetch]);
    return (
        <div>
            <div className={`grid 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 `}>
     {
      draftJobs?.map((job: IDBDraftJobData,inx: number) => (
        <JobCard key={inx} job={job} />
      ))
     }
     
    </div>
        </div>
    );
};

export default DraftJobs;