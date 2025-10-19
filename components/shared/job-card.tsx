"use client";
import { IJob } from "@/app/models/Job";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IDBDraftJobData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DollarSign, Edit, Eye, MapPin, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

type JobCardProps = {
  job: IJob | IDBDraftJobData;
  setShowApplications?: React.Dispatch<React.SetStateAction<boolean>>;
setSelectedJobApplications?: React.Dispatch<
    React.SetStateAction<{ id: string; title: string, totalAppications: number }>
  >;
};

const JobCard = ({ job, setShowApplications ,setSelectedJobApplications}: JobCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  console.log(job);
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showTooltip) {
      timer = setTimeout(() => {
        setShowTooltip(false);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [showTooltip]);
  return (
    <div
      className="relative w-full border border-gray-300 p-3 rounded-lg hover:shadow-md transition-all duration-200"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-black text-white text-sm px-3 py-1 rounded shadow-lg z-50"
          >
            {job.title}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Content */}
      <div>
        <p className="bg-neutral-900 text-white inline-block px-4  text-xs rounded-2xl">
          {job.status}
        </p>
        <h2 className="text-lg font-bold text-foreground truncate">
          {job.title.slice(0, 30)}
          {job.title.length > 40 && "..."}
        </h2>
        <p className="text-sm font-medium text-neutral-500">
          {typeof job.company === "object" && "name" in job.company
            ? job.company.name
            : "Draft job"}
        </p>

        <div className="mt-6 mb-3">
          <PTag>
            <MapPin size={13} /> {job.location}
          </PTag>
          
          <PTag>
            <DollarSign size={13} />

           <p> {job.salaryrange?.min === job.salaryrange?.max
              ? job.salaryrange?.min ?? "N/A"
              : `${job.salaryrange?.min ?? "N/A"} - ${
                  job.salaryrange?.max ?? "N/A"
                }`}</p>
          </PTag>

          <PTag onClick={() => {
            setShowApplications?.(true);
            setSelectedJobApplications?.({
              id: job._id?.toString() ?? '',
              title: job.title,
              totalAppications: job?.appliedjobs?.length ?? 0
            });
          }} className="text-neutral-800 font-medium cursor-pointer hover:underline hover:text-blue-600"><Eye size={13}/>
             {job?.appliedjobs?.length ?? 0} appilications
          </PTag>
        </div>


         <div className="mt-6 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>

      
    </div>
  );
};

export default JobCard;


interface PTagProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children: React.ReactNode;
}

const PTag = ({
  children,
  className,
  ...props
}: PTagProps) => {
  return (
    <p
      {...props}
      className={cn(
        "text-sm font-medium text-neutral-500 flex items-center gap-2 mt-2",
        className
      )}
    >
      {children}
    </p>
  );
};
