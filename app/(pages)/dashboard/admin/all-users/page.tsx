import { AllUsers } from '@/components/dashboard/admin/all-users'
import React from 'react'
import { cookies } from 'next/headers'

interface Props {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const page = async ({ searchParams }: Props) => {
    const params = await searchParams;
    const currentPage = parseInt((params.page as string) || "1");
    const limit = 5;

    // Fetch users via the API route
    const nextCookies = await cookies();
    const cookieString = nextCookies.toString();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/users?page=${currentPage}&limit=${limit}`, {
        headers: {
            Cookie: cookieString
        },
        cache: 'no-store'
    });

    const data = await response.json();
    const users = data.success ? data.users : [];
    const pagination = data.pagination || { totalUsers: 0, totalPages: 0, currentPage: 1, limit: 5 };

    return (
        <div>
            <AllUsers initialUsers={users} pagination={pagination} />
        </div>
    )
}

export default page
