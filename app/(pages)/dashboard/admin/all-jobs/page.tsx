import AllJobs from '@/components/dashboard/admin/all-jobs'
import axios from 'axios'
import React from 'react'

const getAllJobs = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL!}/api/admin/job`);
        if (!res.data.success) {
            return [];
        }

        return res.data.jobs
    } catch (error) {
        console.log(error);
        return [];
    }
}

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
