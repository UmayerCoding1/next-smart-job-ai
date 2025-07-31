import Profile from '@/components/ui/profile/Profile';
import React from 'react'

export default async function page(context : {params: Promise<{username: string}>}) {
    const username = await context.params;
    console.log(username);
  return (
    <div>
     <Profile/>
    </div>
  )
}
