import AllJobs from '@/components/dashboard/admin/all-jobs'
import { getAllJobs } from '@/lib/get-jobs-admin';
import axios from 'axios'
import React from 'react'



export const dynamic = 'force-dynamic';

export const metadata = {
    title: "All Jobs | Smart Job AI",
    description: "All Jobs",
}

export default async function page() {

    const jobs = await getAllJobs();


    return (
        <>
            <AllJobs jobs={jobs} />
        </>
    )
}
