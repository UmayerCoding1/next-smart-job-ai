import ApplyPage from "@/components/ui/job/ApplyPage";
import React, { Suspense } from "react";
import ApplyPageLoading from "./loading";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ title: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const jobTitle = (await searchParams).title;

  return {
    title: `${jobTitle} | Apply Now - Smart Job AI`,
    description: `Apply for ${jobTitle} at Smart Job AI. Submit your application easily.`,
  };
}

export default async function page({ params }: Props) {
  const id = (await params).id;
  return (
    <div>
      <Suspense fallback={<ApplyPageLoading />}>
        <ApplyPage id={id} />
      </Suspense>
    </div>
  );
}
