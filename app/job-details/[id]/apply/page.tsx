"use client";
import { RootState } from "@/app/redux/store";
import Breadcrumbs from "@/components/Breadcrumb";
import { Progress } from "@/components/ui/progress";
import { useSearchParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function tryParseJson(str: string) {
  try {
    return JSON.parse(str);
  } catch {
    let lastIndex = str.length;
    while (lastIndex > 0) {
      try {
        const substr = str.substring(0, lastIndex);
        return JSON.parse(substr);
      } catch {
        lastIndex--;
      }
    }
    return null;
  }
}

const ApplyPage = (Context: { params: Promise<{ id: string }> }) => {
  const user = useSelector((state: RootState) => state.authR.user);
  const [commpleteApplyProgress, setCommpleteApplyProgress] = useState(0);
  const id = use(Context.params);
  const raw = useSearchParams().get("applicationsQuestions");
  const jobTitle = useSearchParams().get("jobTitle");

  let applicationsQuestionsData = null;
  if (raw) {
    const decoded = decodeURIComponent(raw);
    applicationsQuestionsData = tryParseJson(decoded);
  }

  useEffect(() => {
    const timer = setTimeout(
      () => setCommpleteApplyProgress(commpleteApplyProgress),
      500
    );

    return () => clearTimeout(timer);
  }, [commpleteApplyProgress]);

  const links = [
    { href: "/", label: "Home" },
    { href: `/job-details/${id.id}`, label: "Job Details" },
  ];
console.log(jobTitle)
  return (
    <div className="max-w-7xl mx-auto p-2 ">
      <div className="flex items-center justify-between w-full">
        <Breadcrumbs link={links} currentPage="Job apply page" />

        <div className=" w-[300px] relative   rounded-full">
          <Progress
            value={commpleteApplyProgress}
            className="w-full "
            barColor="bg-emerald-500"
          />

          {commpleteApplyProgress > 0 && (
            <div
              className={`relative  top-1 bg-black text-white text-xs p-2 rounded-sm flex items-center gap-2 before:absolute before:-left-0 before:-top-[10px] before:border-[6px] before:border-transparent before:border-b-black before:content-[''] w-32 transition-all duration-500 ease-in-out `}
              style={{ left: `${commpleteApplyProgress - 2}%` }}
            >
              <span>You have completed</span>
              <span className="font-bold text-emerald-500">
                {commpleteApplyProgress}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
