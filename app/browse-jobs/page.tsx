'use client';
import React, { Suspense } from 'react';
import BrowseJobs from './BrowseJobs';

const page = () => {
  return (
   <Suspense fallback={<div>Loading...</div>}>
    <BrowseJobs/>
   </Suspense>
  );
};

export default page;