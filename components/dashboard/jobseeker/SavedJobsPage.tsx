"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ChevronLeft, ChevronRight, Trash2 } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"
import useGetSaveJobs from "@/hooks/getSaveJobs"
import { ISaveJob } from "@/app/models/SaveJob"
import SaveJobLoading from "@/app/(pages)/dashboard/jobseeker/saved-jobs/loading"


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
    company: {
      _id: string;
      name: string;
      logo: string;
    };
  },
  createdAt: string;
  updatedAt: string;
}
export default function SavedJobsPage() {
  const user = useSelector((state: RootState) => state.authR.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4
  const {savedJobs, isLoading} = useGetSaveJobs(user?._id?.toString() || "", currentPage, itemsPerPage, searchTerm);
console.log(savedJobs);
 

  // const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)
  // const startIndex = (currentPage - 1) * itemsPerPage
  // const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage)

  const handleRemoveJob = (jobId: number) => {
    // Handle removing job from saved list
    console.log("Removing job:", jobId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hot":
        return "bg-red-100 text-red-800 border-red-200"
      case "Trending":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "New":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if(isLoading){
    return <SaveJobLoading/>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Saved Jobs</h1>
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
        <Card className="overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b">
                <TableHead className="font-medium text-gray-700 py-4">JOB</TableHead>
                <TableHead className="font-medium text-gray-700">DATE SAVED</TableHead>
                <TableHead className="font-medium text-gray-700">STATUS</TableHead>
                <TableHead className="font-medium text-gray-700">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {savedJobs.map((job :IJob ) => (
                <TableRow key={job?._id} className="border-b hover:bg-gray-50">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      {/* Company Logo */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                        {job?.job?.company?.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 mb-1">{job?.job?.title}</div>
                        <div className="text-sm text-gray-600 mb-1">{job?.job?.company?.name}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                            {job?.job?.jobtype.map((jobtype: string) => jobtype).join(", ")}
                          </Badge>
                          <span className="text-xs text-gray-500">{job?.job?.salaryrange?.min} - {job?.job?.salaryrange?.max} </span>
                          {/* <span className="text-xs text-gray-400">• Posted {job.}</span> */}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm text-gray-600">{new Date(job?.createdAt).toLocaleString()}</div>
                  </TableCell>

                  <TableCell>
                    {/* <Badge className={`${getStatusColor(job.status)} hover:${getStatusColor(job.status)}`}>
                      {job.status === "Hot" && "🔥"} {job.status}
                    </Badge> */}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Apply Now
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => handleRemoveJob(job.job._id)}
                        className="text-gray-500 border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
{/* 
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 p-0 ${
                currentPage === page ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button> */}
        </div>
      </div>
    </div>
  )
}
