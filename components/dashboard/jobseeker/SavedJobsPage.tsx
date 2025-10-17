"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";


import {  ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import useGetSaveJobs from "@/hooks/getSaveJobs";
import SaveJobLoading from "@/app/(pages)/dashboard/jobseeker/saved-jobs/loading";
import { useRouter } from "next/navigation";
import SaveJobTable from "./SaveJobTable";
import JobApplyModale from "./JobApplyModale";
import { toast } from "sonner";
import { getJob } from "@/service/api";
import axios from "axios";

export interface IJob {
  _id: string;
  job: {
    _id: string;
    title: string;
    jobtype: string[];
    salaryrange: {
      min: number;
      max: number;
      negotiable: boolean;
    };
    dedline: string;
    appliedjobs: string[];
  };
  company: {
    _id: string;
    name: string;
    logo: string;
  };
  createdAt: string;
  updatedAt: string;
}
export default function SavedJobsPage() {
  const user = useSelector((state: RootState) => state.authR.user);
  const [openApplyModal, setOpenApplyModal] = useState(false);

  const [isApplyLoding, setIsApplyLoding] = useState(false);
  const [isDeletedLoding, setIsDeletedLoding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { savedJobs, pagination, isLoading , refetch } = useGetSaveJobs(
    user?._id?.toString() || "",
    currentPage,
    itemsPerPage
  );
  const router = useRouter();




  const getStatusColor = (dedlineDate: string) => {
    const now = new Date();
    const deadline = new Date(dedlineDate);

    if (now > deadline) {
      return false;
    }
    return true;
  };

  if (isLoading) {
    return <SaveJobLoading />;
  }

  const storedJob = [...savedJobs].sort((a, b) => {
    const aActive = getStatusColor(a.job.dedline) ? 1 : 0;
    const bActive = getStatusColor(b.job.dedline) ? 1 : 0;
    return bActive - aActive;
  });

  const handleApplyJobModal = async (jobId: string,savedJobId:string) => {
    if (!jobId) return;
    setIsApplyLoding(true);
    try {
      const job = await getJob(jobId);
      console.log(job);

      if (job) {
        setIsApplyLoding(false);
        setOpenApplyModal(true);
       router.replace(`/dashboard/jobseeker/saved-jobs?jobId=${jobId}&savedJobId=${savedJobId}`);
      }
    } catch {
      toast.error("An error occurred", { duration: 1500 });
    }
  };

    const handleRemoveJob = async (jobId: string) => {
    if (!jobId) return;
    setIsDeletedLoding(true);
    const savedJobsId =  JSON.parse(localStorage.getItem("savedJobsId") || "[]");
    savedJobsId.splice(savedJobsId.indexOf(jobId), 1);
    localStorage.setItem("savedJobsId", JSON.stringify(savedJobsId));

    try {
      const response = await axios.delete(`/api/save-job/${jobId}`);
      if (response.data.success) {
        refetch();
        toast.success(response.data.message, { duration: 1500 });
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred", { duration: 1500 });
    } finally {
      setIsDeletedLoding(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Saved Jobs{" "}
              <span className="text-gray-40 text-xs font-medium">
                Total ({pagination.total})
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Table */}
        <div className="relative ">
          {isDeletedLoding && (
            <div className="bg-white/70 w-full h-full absolute top-0 left-0 z-10 flex items-center justify-center ">
              <Loader2 size={20} className="animate-spin" />
            </div>
          )}
          <SaveJobTable
            storedJob={storedJob}
            getStatusColor={getStatusColor}
            handleApplyJobModal={handleApplyJobModal}
            isApplyLoding={isApplyLoding}
            handleRemoveJob={handleRemoveJob}
          />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setCurrentPage(Math.max(1, currentPage - 1));
              router.push(
                `/dashboard/jobseeker/saved-jobs?page=${currentPage - 1}`
              );
            }}
            disabled={currentPage === 1}
            className="w-8 h-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCurrentPage(page);
                  router.push(`/dashboard/jobseeker/saved-jobs?page=${page}`);
                }}
                className={`w-8 h-8 p-0 ${
                  currentPage === page
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {page}
              </Button>
            )
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setCurrentPage(Math.min(pagination.totalPages, currentPage + 1));
              router.push(
                `/dashboard/jobseeker/saved-jobs?page=${currentPage + 1}`
              );
            }}
            disabled={currentPage === pagination.totalPages}
            className="w-8 h-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {openApplyModal && (
        <div className="w-full h-screen absolute top-0 left-0 bg-black/50 flex items-center justify-center">
          <JobApplyModale setOpenApplyModal={setOpenApplyModal} saveDataRefetch={refetch} />
        </div>
      )}
    </div>
  );
}
