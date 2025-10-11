import JobCard from '@/components/shared/job-card';
import { IDBDraftJobData } from '@/lib/types';
import { getAllDraftJobIDB } from '@/utils/indexedDB';
import React, { useEffect, useState } from 'react';

const DraftJobs = ({tab}: {tab: string}) => {
    const [draftJobs, setDraftJobs] = useState<IDBDraftJobData[]>([]);
    useEffect(() => {
       const handleGetAllDraftJobIDB = async () => {
        const draftJobs = await getAllDraftJobIDB();
        setDraftJobs(draftJobs);
       }
    
       handleGetAllDraftJobIDB();
      }, [tab]);
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