'use client';
import { IJob } from '@/app/models/Job';
import React from 'react';

const JobDetails = ({ job }: { job: IJob }) => {
    console.log(job);
    return (
        <div>
            <div className='w-full  h-[200px] bg-red-100'>

            </div>
        </div>
    );
};

export default JobDetails;