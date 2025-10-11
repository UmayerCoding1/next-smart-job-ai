"use client";
import { IJob } from "@/app/models/Job";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IDBDraftJobData } from "@/lib/types";

type JobCardProps = {
  job: IJob | IDBDraftJobData;
  setShowApplications?: React.Dispatch<React.SetStateAction<boolean>>;
};

const JobCard = ({ job, setShowApplications }: JobCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

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
        <p>{job.status}</p>
        <h2 className="text-lg font-bold text-foreground truncate">
          {job.title.slice(0, 30)}
          {job.title.length > 40 && "..."}
        </h2>
        <p className="text-sm font-medium text-neutral-500">
          {typeof job.company === "object" && "name" in job.company
            ? job.company.name
            : "Draft job"}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
