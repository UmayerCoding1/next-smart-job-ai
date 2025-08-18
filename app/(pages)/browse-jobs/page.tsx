
import React, { Suspense } from 'react';
import BrowseJobs from '../../../components/ui/job/BrowseJobs';


export const metadata = {
  title: 'Browse Jobs',
  description: 'Browse jobs page of Smart Job AI AI-powered job platform.',
}
const page = () => {
  return (
   <Suspense fallback={<div>Loading...</div>}>
    <BrowseJobs/>
   </Suspense>
  );
};

export default page;