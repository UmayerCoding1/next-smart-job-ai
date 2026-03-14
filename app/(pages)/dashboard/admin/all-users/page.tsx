import { AllUsers } from '@/components/dashboard/admin/all-users'
import React from 'react'
import { getUsers } from '@/lib/get-user';

interface Props {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}


export const metadata = {
    title: "All Users | Smart Job AI",
    description: "All Users",
}

export default async function Page({ searchParams }: Props) {
    const params = await searchParams;
    const currentPage = parseInt((params.page as string) || "1");
    const limit = 30;

    const users = await getUsers(currentPage, limit);


    return (
        <div>

            <AllUsers initialUsers={users?.users || []} pagination={users?.pagination || {}} />
        </div>
    )
}


