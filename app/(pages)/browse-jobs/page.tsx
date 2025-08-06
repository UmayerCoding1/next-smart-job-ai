'use client';
import React, { Suspense } from 'react';
import BrowseJobs from '../../../components/ui/job/BrowseJobs';

const page = () => {
  return (
   <Suspense fallback={<div>Loading...</div>}>
    <BrowseJobs/>
   </Suspense>
  );
};

export default page;