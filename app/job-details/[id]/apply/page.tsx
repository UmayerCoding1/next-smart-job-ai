import ApplyPage from '@/components/ui/job/ApplyPage'
import React, { Suspense } from 'react'
import ApplyPageLoading from './loading';

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
