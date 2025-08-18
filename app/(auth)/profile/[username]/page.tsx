import Profile from "@/components/ui/profile/Profile";

import React from "react";

export async function generateMetadata({ params } : { params: { username: string } }) {
  return {
    title: `Profile of ${params.username} | Smart Job AI`,
    description: `View the profile of ${params.username} on Smart Job AI.`,
  };
}

export default async function page() {
  return (
    <div>
      <Profile />
    </div>
  );
}
