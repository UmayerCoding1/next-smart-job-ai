import ApplyPage from '@/components/ui/job/ApplyPage'
import React, { Suspense } from 'react'
import ApplyPageLoading from './loading';
import { title } from 'process';
import { getJob } from '@/service/api';


export async function generateMetadata({  searchParams } : { searchParams: { title: string } }) {

  const jobTitle = searchParams?.title || "Apply Job";

  return {
    title: `${jobTitle} | Apply Now - Smart Job AI`,
    description: `Apply for ${jobTitle} at Smart Job AI. Submit your application easily.`,
  };
}

export default async function page(Context: { params: Promise<{ id: string }> }) {
  const id = await Context.params;
  return (
    <div>
       <Suspense fallback={<ApplyPageLoading/>}>
        <ApplyPage id={id.id}/>
       </Suspense>
    </div>
  )
}
