import { cookies } from "next/headers";

export const getUsers = async (page: number, limit: number) => {
    const nextCookies = await cookies();
    const cookieString = nextCookies.toString();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL! || "http://localhost:3000"}/api/admin/users?page=${page}&limit=${limit}`, {
        headers: {
            Cookie: cookieString
        },

    });

    const data = await response.json();
    const users = data.success ? data.users : [];
    const pagination = data.pagination || { totalUsers: 0, totalPages: 0, currentPage: 1, limit: 5 };

    return { users, pagination }
}