import Overview from '@/components/dashboard/jobseeker/Overview';
import React from 'react';


export const metadata = {
    title: 'Jobseeker Dashboard | Smart Job AI ',
    description: 'Dashboard page of Smart Job AI AI-powered job platform.',
}

const page = () => {
    return (
        <div className='h-screen'>
           <Overview/>
        </div>
    );
};

export default page;