
import JobDetails from '@/components/ui/job/JobDetails';
import React, { Suspense } from 'react';
import JobDetailsLoading from './loading';
import { title } from 'process';

export async function generateMetadata({params}: {params: {id: string}}) {
    const job = await getJob(params.id);
    return {
        title: job.title + " | Smart Job AI",
        description: job.description,
    };
}

// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://next-smart-job-ai.vercel.app";

const getJob = async (jobId: string) => {
   
    const res = await fetch(`${BASE_URL}/api/jobs/${jobId}`);
    const data = await res.json();
    
    return data.job;
    
}

const page =async (context: {params: Promise<{id: string}>}) => {
    const {id} = await context.params;
   const job = await getJob(id);

   if(!job) return <JobDetailsLoading/>;
    return (
       <Suspense fallback={<JobDetailsLoading/>}>
        <JobDetails job={job}/>
       </Suspense>
    );
};

export default page;