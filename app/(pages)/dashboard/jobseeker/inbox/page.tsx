import InboxPage from '@/components/dashboard/recruiter/inbox/InboxPage';
import React from 'react';


export const metadata = {
    title: 'Recruiter Inbox | Smart Job AI ',
    description: 'Dashboard page of Smart Job AI AI-powered job platform.',
}

const page = () => {
    return (
        <div className='w-full'>
            <InboxPage/>
        </div>
    );
};

export default page;