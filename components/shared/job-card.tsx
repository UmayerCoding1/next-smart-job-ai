'use client';
import { IJob } from '@/app/models/Job';
import React from 'react';
import { Button } from '../ui/button';


type JobCardProps = {
    job: IJob,
    setShowApplications: React.Dispatch<React.SetStateAction<boolean>>
}

const JobCard = ({job,setShowApplications}: JobCardProps) => {
    return (
        <div className='bg-red-100 mb-2'>
            {job.title}

            <Button 
             onClick={() => setShowApplications(true)}
            >Applications</Button>
        </div>
    );
};

export default JobCard;