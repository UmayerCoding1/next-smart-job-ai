import axios from "axios";
import { cookies } from "next/headers";

export const getAllJobs = async () => {
    try {
        const nextCookies = await cookies();
        const cookieString = nextCookies.toString();

        console.log(process.env.NEXT_PUBLIC_API_URL!);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL! || "http://localhost:3001"}/api/admin/job`, {
            headers: {
                Cookie: cookieString
            },

        });
        if (!res.data.success) {
            return [];
        }

        return res.data.jobs
    } catch (error) {
        console.log(error);
        return [];
    }
}