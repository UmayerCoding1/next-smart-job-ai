import Profile from "@/components/ui/profile/Profile";




export async function generateMetadata(props: {
  params: Promise<{ username: string }>;
}) {
  // console.log((await props.params));
  const { username } = await props.params;

  return {
    title: `Profile of ${username || "User"} | Smart Job AI`,
    description: `View the profile of ${username || "User"} on Smart Job AI.`,
  };
}



export default function Page() {
  return (
    <div>
      <Profile />
    </div>
  );
}
