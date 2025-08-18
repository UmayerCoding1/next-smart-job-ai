import AppliedJobsPage from '@/components/dashboard/jobseeker/AppliedJobs'
import React from 'react'


export const metadata = {
  title: 'Applied Jobs | Smart Job AI ',
  description: 'Dashboard page of Smart Job AI AI-powered job platform.',
}


export default function page() {
  
  return (
    <div>
      <AppliedJobsPage/>
    </div>
  )
}
