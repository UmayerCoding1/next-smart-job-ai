import { cookies } from "next/headers";


export default async function setCookies (name: string, value: string, option?: {[key: string]: string | number | boolean}): Promise<void> {
     (await cookies()).set(name, value, option);
}