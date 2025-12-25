import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar} from "lucide-react";
import React from "react";
import ApplicationSummary from "./applicatiom-summary";
import { Container } from "@/components/shared/container";
import Application from "./application";

const Applications = () => {
  return (
    <div className="">
      <ApplicationHeader />
      <Container className="max-w-[1100px]">
        <ApplicationSummary />

        <Application/>
      </Container>
    </div>
  );
};

export default Applications;

export const ApplicationHeader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-neutral-300 px-4 pb-2",
        className
      )}
    >
      <div>
        <h2 className="text-3xl font-semibold tracking-tighter">
          Applications
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          Manage and review all job applications
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" variant={"outline"}>
          <Calendar />
          Schedule Interviews
        </Button>
        <Button size="sm">Export Data</Button>
      </div>
    </div>
  );
};
