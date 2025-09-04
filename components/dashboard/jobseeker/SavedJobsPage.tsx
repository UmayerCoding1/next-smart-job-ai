"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import useGetSaveJobs from "@/hooks/getSaveJobs";
import SaveJobLoading from "@/app/(pages)/dashboard/jobseeker/saved-jobs/loading";
import { useRouter } from "next/navigation";
import SaveJobTable from "./SaveJobTable";
import JobApplyModale from "./JobApplyModale";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { savedJobs, pagination, isLoading } = useGetSaveJobs(
    user?._id?.toString() || "",
    currentPage,
    itemsPerPage,
    searchTerm
  );
  const router = useRouter();

  // const handleRemoveJob = (jobId: number) => {
  //   // Handle removing job from saved list
  //   console.log("Removing job:", jobId);
  // };

  console.log(openApplyModal)

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
            {/* <p className="text-gray-600 text-sm mt-1">({filteredJobs.length})</p> */}
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Job title, keyword, company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80 border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Table */}
        <SaveJobTable
          storedJob={storedJob}
          getStatusColor={getStatusColor}
          setOpenApplyModal={setOpenApplyModal}
        />

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
          <JobApplyModale setOpenApplyModal={setOpenApplyModal} />
        </div>
      )}
    </div>
  );
}
