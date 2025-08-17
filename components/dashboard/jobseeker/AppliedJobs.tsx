"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Search,

  Heart,
  TrendingUp,
  Users,
  Star,

  Target,
  Lightbulb,
  Coffee,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"
import { IAppliedJob } from "@/app/models/User"

export default function AppliedJobsPage() {
  const user =  useSelector((state: RootState) => state.authR.user);
 const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10;

  // const appliedJobs = [
  //   {
  //     id: 1,
  //     title: "Networking Engineer",
  //     company: "Microsoft",
  //     location: "Remote",
  //     appliedDate: "Feb 2, 2019 19:28",
  //     status: "Active",
  //     logo: "https://logo.clearbit.com/microsoft.com",
  //     salary: "$90k-$120k/month",
  //     type: "Remote",
  //   },
  //   {
  //     id: 2,
  //     title: "Product Designer",
  //     company: "Dribbble",
  //     location: "Remote",
  //     appliedDate: "Dec 7, 2019 23:26",
  //     status: "Active",
  //     logo: "https://logo.clearbit.com/dribbble.com",
  //     salary: "$70k-$90k/month",
  //     type: "Full Time",
  //   },
  //   {
  //     id: 3,
  //     title: "Junior Graphic Designer",
  //     company: "Canva",
  //     location: "Remote",
  //     appliedDate: "Feb 2, 2019 19:28",
  //     status: "Active",
  //     logo: "https://logo.clearbit.com/canva.com",
  //     salary: "$50k-$70k/month",
  //     type: "Yesterday",
  //   },
  //   {
  //     id: 4,
  //     title: "Visual Designer",
  //     company: "Microsoft",
  //     location: "Remote",
  //     appliedDate: "Dec 7, 2019 23:26",
  //     status: "Active",
  //     logo: "https://logo.clearbit.com/microsoft.com",
  //     salary: "$80k-$100k/month",
  //     type: "Contract Base",
  //   },
  //   {
  //     id: 5,
  //     title: "Marketing Officer",
  //     company: "Twitter",
  //     location: "United States",
  //     appliedDate: "Dec 8, 2019 21:31",
  //     status: "Active",
  //     logo: "https://logo.clearbit.com/twitter.com",
  //     salary: "$90k-$140k/month",
  //     type: "Full Time",
  //   },
  //   {
  //     id: 6,
  //     title: "UI/UX Designer",
  //     company: "Figma",
  //     location: "Remote",
  //     appliedDate: "Dec 20, 2019 07:12",
  //     status: "Active",
  //     logo: "https://logo.clearbit.com/figma.com",
  //     salary: "$100k-$130k/month",
  //     type: "Full Time",
  //   },
  //   {
  //     id: 7,
  //     title: "Software Engineer",
  //     company: "Google",
  //     location: "New York",
  //     appliedDate: "Mar 20, 2019 19:43",
  //     status: "Active",
  //     logo: "https://logo.clearbit.com/google.com",
  //     salary: "$120k-$180k/month",
  //     type: "Full Time",
  //   },
  //   {
  //     id: 8,
  //     title: "Front End Developer",
  //     company: "Facebook",
  //     location: "Michigan",
  //     appliedDate: "Mar 20, 2019 19:43",
  //     status: "Active",
  //     logo: "https://logo.clearbit.com/facebook.com",
  //     salary: "$90k-$140k/month",
  //     type: "Full Time",
  //   },
  // ]

  const {data: appliedJobs = []} = useQuery(({
    queryKey: ["appliedJobs", user?._id],
    queryFn: async () => {
      const res = await  axios.get(`/api/jobseekers/${user?._id}/applications`);
      return res.data.applications;
    },
  }));

  console.log(appliedJobs)

// const filteredJobs = appliedJobs.filter((job:IAppliedJob[]) => {
//     const matchesSearch =
//       job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       job.company.toLowerCase().includes(searchTerm.toLowerCase())
//     return matchesSearch
//   })

//   const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)
//   const startIndex = (currentPage - 1) * itemsPerPage
//   const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage)

 

//   const stats = {
//     total: appliedJobs.length,
//     active: appliedJobs.filter((job) => ["under_review", "interview_scheduled", "pending"].includes(job.status)).length,
//     interviews: appliedJobs.filter((job) => job.status === "interview_scheduled").length,
//     responseRate: Math.round((appliedJobs.filter((job) => job.status !== "pending").length / appliedJobs.length) * 100),
//   }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Job Applications</h1>
            <p className="text-gray-600 mt-1">Keep track of your journey and celebrate every step forward! 🌟</p>
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
          </div>
        </div>
      </div>

     
    </div>
  )
}
