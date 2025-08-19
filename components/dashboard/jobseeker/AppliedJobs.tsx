"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { Search, ChevronRight, ChevronLeft } from "lucide-react";
// import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Image from "next/image";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface ApplyedJob {
  _id: string;
  applicant: string;
  appliedAt: string;
  coverLetter: string;
  expectedSalary: number;
  name: string;
  phone: string;
  resumeLink: string;
  status: string;
  job: {
    category: string;
    company: { logo: string; name: string; _id: string };
    title: string;
    jobtype: string[];
    salaryrange: { min: number; max: number; negotiable: boolean };
    _id: string;
  };
}

export default function AppliedJobsPage() {
  const user = useSelector((state: RootState) => state.authR.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  

  const { data: appliedJobs = [] } = useQuery({
    queryKey: ["appliedJobs", user?._id],
    queryFn: async () => {
      const res = await axios.get(`/api/jobseekers/${user?._id}/applications`);
      return res.data.applications;
    },
     enabled: !!user?._id, 
  staleTime: 10 * 60 * 1000, 
  gcTime: 10 * 60 * 1000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  });

  console.log(appliedJobs);

 

  const totalPages = Math.ceil(appliedJobs.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const paginatedJobs = appliedJobs.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Your Job Applications
            </h1>
            <p className="text-gray-600 mt-1">
              Keep track of your journey and celebrate every step forward! 🌟
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>

            <div>
               <Select>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Allication status</SelectLabel>
          {['pending', 'reviewed', 'interview', 'rejected', 'accepted'].map((item,inx) =><SelectItem key={inx} value={item}>{item}</SelectItem> )}
        </SelectGroup>
      </SelectContent>
    </Select>
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
                <TableHead className="font-medium text-gray-700 py-4">
                  JOB
                </TableHead>
                <TableHead className="font-medium text-gray-700">
                  DATE APPLIED
                </TableHead>
                <TableHead className="font-medium text-gray-700">
                  STATUS
                </TableHead>
                <TableHead className="font-medium text-gray-700">
                  ACTION
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appliedJobs.map((job: ApplyedJob) => (
                <TableRow key={job._id} className="border-b hover:bg-gray-50">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      {/* Company Logo */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                        {job.job.company.logo ? (
                          <Image
                            src={job.job.company.logo}
                            alt={job.job.company.name}
                            width={400}
                            height={400}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                            {job.job.company.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 mb-1">
                          {job.job.title}
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          {job.job.company.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {job.job.jobtype
                              .map((jobtype: string) => jobtype)
                              .join(", ")}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            ${job.job.salaryrange.max}k-$
                            {job.job.salaryrange.min}k
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm text-gray-600">
                      {new Date(job.appliedAt).toLocaleDateString()}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
                      ✓ {job.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
                    >
                      View Details
                    </Button>
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

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 p-0 ${
                currentPage === page
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="w-8 h-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
