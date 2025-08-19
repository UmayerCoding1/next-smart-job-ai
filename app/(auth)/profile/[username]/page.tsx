import Profile from "@/components/ui/profile/Profile";
import type { Metadata } from 'next';

type Props = {
  params: { username: string };
};

// export async function generateMetadata(props: {
//   params: Promise<{ username: string }>;
// }) {
//   // console.log((await props.params));
//   const { username } = await props.params;
//   console.log(username);
//   return {
//     title: `Profile of ${username || "User"} | Smart Job AI`,
//     description: `View the profile of ${username || "User"} on Smart Job AI.`,
//   };
// }

export const metadata: Metadata = {
   title: 'Profile | Smart Job AI',
   description: 'View your profile on Smart Job AI.',
}

export default function Page() {
  return (
    <div>
      <Profile/>
    </div>
  );
}
