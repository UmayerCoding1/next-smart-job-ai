'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react';
import { Archive, Building2, CheckCircle2, Edit2, Eye, Flag, MoreHorizontal, Pause, ShieldCheck, Trash2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { JobStatus, TableJobType } from './all-jobs';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import axios from 'axios';







interface Props {
  job: TableJobType;
  i: number;
  handleApprove: (id: string, status: JobStatus, setCurrentStatus: React.Dispatch<React.SetStateAction<JobStatus>>) => void
  handleDeleteJobs: (id: string) => void
}

export const JobTableColum = ({ job, i, handleApprove, handleDeleteJobs }: Props) => {
  const [currentStatus, setCurrentStatus] = useState(job.status);

  useEffect(() => {
    setCurrentStatus(job.status);
  }, [job.status]);



  return (
    <>
      <motion.tr
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, delay: i * 0.04 }}
        className={`border-b last:border-0 hover:bg-gray-50/70 transition-colors `}
      >
        {/* Job title + company */}
        {/* bg-gradient-to-br from-blue-100 to-indigo-100 */}
        <td className="px-4 py-3">
          <div className="flex items-start gap-3">
            <div className={cn("w-9 h-9 rounded-lg  flex items-center justify-center shrink-0 mt-0.5", !job.company?.logo && "bg-gradient-to-br from-blue-100 to-indigo-100")}>
              {job.company?.logo ? <img src={job.company?.logo} alt="" className="w-full h-full object-cover rounded-full " /> : <Building2 size={16} className="text-indigo-500" />}
            </div>
            <div>
              <p className="font-semibold text-gray-800 leading-tight">
                {job.title}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {job.company?.toString()}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                {job.jobtype.map((type, i) => <Badge
                  key={i}
                  variant="outline"
                  className="text-[10px] h-4 px-1.5"
                >
                  {type}
                </Badge>)}
                <Badge
                  variant="outline"
                  className="text-[10px] h-4 px-1.5"
                >
                  {job.category}
                </Badge>
              </div>
            </div>
          </div>
        </td>

        {/* Location */}
        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
          {job.location}
        </td>

        {/* Salary */}
        <td className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">

          {job.salaryrange.min} - {job.salaryrange.max}
        </td>

        {/* Applications */}
        <td className="px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-gray-800">
              {job.appliedjobs.length}
            </span>
            <span className="text-gray-400 text-xs">
              applicants
            </span>
          </div>
        </td>

        {/* Posted */}
        <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">
          <div>{new Date(job.createdAt).toLocaleDateString()}</div>
          <div className="text-gray-400 truncate max-w-[120px]">
            {job.company.email}
          </div>
        </td>

        {/* Status */}
        <td className="px-4 py-3">
          <StatusPill status={currentStatus} />

        </td>

        {/* Actions */}
        <td className="px-4 py-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-600 transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <Eye size={13} className="text-blue-500" />
                View Details
              </DropdownMenuItem>
              {currentStatus === "paused" && (
                <>
                  <DropdownMenuItem onClick={() => handleApprove(job._id, "active", setCurrentStatus)} className="gap-2 cursor-pointer text-green-600">
                    <CheckCircle2 size={13} />
                    Activate Job
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleApprove(job._id, "draft", setCurrentStatus)} className="gap-2 cursor-pointer text-green-600">
                    <Archive size={13} />
                    Draft
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleApprove(job._id, "closed", setCurrentStatus)} className="gap-2 cursor-pointer text-red-400">
                    <XCircle size={13} />
                    Close Job
                  </DropdownMenuItem>
                </>

              )}
              {currentStatus === "active" && (
                <>
                  <DropdownMenuItem onClick={() => handleApprove(job._id, "paused", setCurrentStatus)} className="gap-2 cursor-pointer text-yellow-600">
                    <Pause size={13} />
                    Pause Job
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleApprove(job._id, "closed", setCurrentStatus)} className="gap-2 cursor-pointer text-red-400">
                    <XCircle size={13} />
                    Close Job
                  </DropdownMenuItem>
                </>
              )}
              {currentStatus === "draft" && (
                <>
                  <DropdownMenuItem onClick={() => handleApprove(job._id, "active", setCurrentStatus)} className="gap-2 cursor-pointer text-green-600">
                    <CheckCircle2 size={13} />
                    Activate Job
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleApprove(job._id, "closed", setCurrentStatus)} className="gap-2 cursor-pointer text-red-400">
                    <XCircle size={13} />
                    Close Job
                  </DropdownMenuItem>
                </>
              )}
              {currentStatus === "closed" && (
                <>
                  <DropdownMenuItem onClick={() => handleApprove(job._id, "active", setCurrentStatus)} className="gap-2 cursor-pointer text-green-600">
                    <CheckCircle2 size={13} />
                    Activate Job
                  </DropdownMenuItem>
                </>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteJobs(job._id)} className="gap-2 cursor-pointer text-red-500">
                <Trash2 size={13} />
                Delete Job
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </td>
      </motion.tr>
    </>
  )
}







const StatusPill = ({ status }: { status: JobStatus }) => {
  const statusConfig: Record<
    JobStatus,
    { label: string; className: string; dot: string }
  > = {
    active: {
      label: "Active",
      className: "bg-green-100 text-green-700",
      dot: "bg-green-500",
    },
    paused: {
      label: "Paused",
      className: "bg-yellow-100 text-yellow-700",
      dot: "bg-yellow-500",
    },
    closed: {
      label: "Closed",
      className: "bg-gray-100 text-gray-600",
      dot: "bg-gray-400",
    },
    draft: {
      label: "Draft",
      className: "bg-blue-100 text-blue-600",
      dot: "bg-blue-400",
    },

  };

  const cfg = statusConfig[status];
  console.log('cfg', status);
  if (!cfg) return null
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};