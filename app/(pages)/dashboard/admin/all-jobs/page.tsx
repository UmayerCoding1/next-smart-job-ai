import AllJobs from '@/components/dashboard/admin/all-jobs'
import axios from 'axios'
import React from 'react'

const getAllJobs = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL!}/api/admin/job`);
    if (!res.data.success) {
        return [];
    }

    return res.data.jobs
}

export default async function page() {

    const jobs = await getAllJobs();


    return (
        <>
            <AllJobs jobs={jobs} />
        </>
    )
}
