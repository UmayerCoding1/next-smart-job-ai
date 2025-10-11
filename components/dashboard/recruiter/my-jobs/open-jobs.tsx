'use client';
import { IJob } from '@/app/models/Job';
import JobCard from '@/components/shared/job-card';
import useMyJobs from '@/hooks/useMyJobs';
import React, { useState } from 'react';

const OpenJobs = ({tab}: {tab: string}) => {
    const [page, setPage] = useState(1);
    const {jobs, isLoading} = useMyJobs({page: page, status: tab});

    if(isLoading) return <div>Loading...</div>;
    return (
        <div>
              <div className={`grid 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'gap-8 mt-4 `}>
     {
      jobs?.map((job: IJob,inx: number) => (
        <JobCard key={inx} job={job} />
      ))
     }
     
    </div>
        </div>
    );
};

export default OpenJobs;