import useMyJobs from '@/hooks/useMyJobs';
import React, { useState } from 'react';

const ClosedJobs = ({tab}: {tab: string}) => {
     const [page, setPage] = useState(1);
    const {jobs, isLoading} = useMyJobs({page: page, status: tab});

    if(isLoading) return <div>Loading...</div>;
    console.log(jobs);
    return (
        <div>
            {tab}
        </div>
    );
};

export default ClosedJobs;