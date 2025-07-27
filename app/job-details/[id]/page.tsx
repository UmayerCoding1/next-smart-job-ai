import JobDetails from '@/components/ui/custom/JobDetails';
import React from 'react';


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
    return (
       <JobDetails job={job}/>
    );
};

export default page;