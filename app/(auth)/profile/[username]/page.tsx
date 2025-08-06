import Profile from "@/components/ui/profile/Profile";

import React from "react";

export default async function page(context: {
  params: Promise<{ username: string }>;
}) {
  return (
    <div>
      <Profile />
    </div>
  );
}
