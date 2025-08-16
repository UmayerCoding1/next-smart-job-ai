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

export default function AppliedJobsPage() {
 const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const appliedJobs = [
    {
      id: 1,
      title: "Networking Engineer",
      company: "Microsoft",
      location: "Remote",
      appliedDate: "Feb 2, 2019 19:28",
      status: "Active",
      logo: "https://logo.clearbit.com/microsoft.com",
      salary: "$90k-$120k/month",
      type: "Remote",
    },
    {
      id: 2,
      title: "Product Designer",
      company: "Dribbble",
      location: "Remote",
      appliedDate: "Dec 7, 2019 23:26",
      status: "Active",
      logo: "https://logo.clearbit.com/dribbble.com",
      salary: "$70k-$90k/month",
      type: "Full Time",
    },
    {
      id: 3,
      title: "Junior Graphic Designer",
      company: "Canva",
      location: "Remote",
      appliedDate: "Feb 2, 2019 19:28",
      status: "Active",
      logo: "https://logo.clearbit.com/canva.com",
      salary: "$50k-$70k/month",
      type: "Yesterday",
    },
    {
      id: 4,
      title: "Visual Designer",
      company: "Microsoft",
      location: "Remote",
      appliedDate: "Dec 7, 2019 23:26",
      status: "Active",
      logo: "https://logo.clearbit.com/microsoft.com",
      salary: "$80k-$100k/month",
      type: "Contract Base",
    },
    {
      id: 5,
      title: "Marketing Officer",
      company: "Twitter",
      location: "United States",
      appliedDate: "Dec 8, 2019 21:31",
      status: "Active",
      logo: "https://logo.clearbit.com/twitter.com",
      salary: "$90k-$140k/month",
      type: "Full Time",
    },
    {
      id: 6,
      title: "UI/UX Designer",
      company: "Figma",
      location: "Remote",
      appliedDate: "Dec 20, 2019 07:12",
      status: "Active",
      logo: "https://logo.clearbit.com/figma.com",
      salary: "$100k-$130k/month",
      type: "Full Time",
    },
    {
      id: 7,
      title: "Software Engineer",
      company: "Google",
      location: "New York",
      appliedDate: "Mar 20, 2019 19:43",
      status: "Active",
      logo: "https://logo.clearbit.com/google.com",
      salary: "$120k-$180k/month",
      type: "Full Time",
    },
    {
      id: 8,
      title: "Front End Developer",
      company: "Facebook",
      location: "Michigan",
      appliedDate: "Mar 20, 2019 19:43",
      status: "Active",
      logo: "https://logo.clearbit.com/facebook.com",
      salary: "$90k-$140k/month",
      type: "Full Time",
    },
  ]

const filteredJobs = appliedJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage)

 

  const stats = {
    total: appliedJobs.length,
    active: appliedJobs.filter((job) => ["under_review", "interview_scheduled", "pending"].includes(job.status)).length,
    interviews: appliedJobs.filter((job) => job.status === "interview_scheduled").length,
    responseRate: Math.round((appliedJobs.filter((job) => job.status !== "pending").length / appliedJobs.length) * 100),
  }

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

      <div className="p-6 max-w-7xl mx-auto">
        {/* Encouraging Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Applications</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                  <p className="text-sm text-blue-100 mt-1">You&apos;re putting yourself out there! 💪</p>
                </div>
                <Target className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Active Applications</p>
                  <p className="text-3xl font-bold">{stats.active}</p>
                  <p className="text-sm text-green-100 mt-1">Great momentum! Keep it up! 🚀</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Interviews Scheduled</p>
                  <p className="text-3xl font-bold">{stats.interviews}</p>
                  <p className="text-sm text-purple-100 mt-1">You&apos;re  impressing them! 🌟</p>
                </div>
                <Users className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Response Rate</p>
                  <p className="text-3xl font-bold">{stats.responseRate}%</p>
                  <p className="text-sm text-orange-100 mt-1">Above average! Well done! 👏</p>
                </div>
                <Star className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Motivational Message */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">You&apos;re  doing amazing! 🎉</h3>
                <p className="text-gray-600 mb-4">
                  Job searching can be challenging, but every application is a step closer to your dream role. Remember,
                  rejection isn&apos;t personal - it&apos;s just finding the right fit. Keep believing in yourself!
                </p>
                <div className="flex gap-3">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Coffee className="w-4 h-4 mr-2" />
                    Take a Break
                  </Button>
                  <Button size="sm" variant="outline">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Get Tips
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

         <div className="p-6">
        {/* Table */}
        <Card className="overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b">
                <TableHead className="font-medium text-gray-700 py-4">JOB</TableHead>
                <TableHead className="font-medium text-gray-700">DATE APPLIED</TableHead>
                <TableHead className="font-medium text-gray-700">STATUS</TableHead>
                <TableHead className="font-medium text-gray-700">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedJobs.map((job) => (
                <TableRow key={job.id} className="border-b hover:bg-gray-50">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      {/* Company Logo */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                        {job.company.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 mb-1">{job.title}</div>
                        <div className="text-sm text-gray-600 mb-1">{job.company}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                            {job.type}
                          </Badge>
                          <span className="text-xs text-gray-500">{job.salary}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm text-gray-600">{job.appliedDate}</div>
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
          </Button>
        </div>
      </div>
      </div>
    </div>
  )
}
