import { cookies } from "next/headers";

const getCookieInClient = (name: string) => {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return cookie[1];
    }
  }
  return null;
};



export async function getCookieInServer (name: string) {
  const cookiesSrote = (await cookies()).get(name)?.value as unknown as string;
 return cookiesSrote;

};



