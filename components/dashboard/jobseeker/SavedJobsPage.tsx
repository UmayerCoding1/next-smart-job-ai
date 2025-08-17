"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ChevronLeft, ChevronRight, Trash2 } from "lucide-react"

export default function SavedJobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  const savedJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Netflix",
      location: "Remote",
      savedDate: "Feb 15, 2024 14:30",
      status: "New",
      logo: "https://logo.clearbit.com/netflix.com",
      salary: "$120k-$160k/year",
      type: "Full Time",
      postedDate: "2 days ago",
    },
    {
      id: 2,
      title: "AI/ML Engineer",
      company: "OpenAI",
      location: "San Francisco",
      savedDate: "Feb 14, 2024 09:15",
      status: "Hot",
      logo: "https://logo.clearbit.com/openai.com",
      salary: "$180k-$250k/year",
      type: "Full Time",
      postedDate: "1 day ago",
    },
    {
      id: 3,
      title: "Product Manager",
      company: "Stripe",
      location: "Remote",
      savedDate: "Feb 13, 2024 16:45",
      status: "New",
      logo: "https://logo.clearbit.com/stripe.com",
      salary: "$140k-$180k/year",
      type: "Full Time",
      postedDate: "3 days ago",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "Vercel",
      location: "Remote",
      savedDate: "Feb 12, 2024 11:20",
      status: "Trending",
      logo: "https://logo.clearbit.com/vercel.com",
      salary: "$130k-$170k/year",
      type: "Full Time",
      postedDate: "1 week ago",
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "Spotify",
      location: "New York",
      savedDate: "Feb 11, 2024 13:55",
      status: "New",
      logo: "https://logo.clearbit.com/spotify.com",
      salary: "$110k-$150k/year",
      type: "Full Time",
      postedDate: "4 days ago",
    },
    {
      id: 6,
      title: "Mobile Developer",
      company: "Uber",
      location: "San Francisco",
      savedDate: "Feb 10, 2024 08:30",
      status: "Hot",
      logo: "https://logo.clearbit.com/uber.com",
      salary: "$125k-$165k/year",
      type: "Full Time",
      postedDate: "5 days ago",
    },
    {
      id: 7,
      title: "Backend Engineer",
      company: "Discord",
      location: "Remote",
      savedDate: "Feb 9, 2024 15:10",
      status: "New",
      logo: "https://logo.clearbit.com/discord.com",
      salary: "$115k-$155k/year",
      type: "Full Time",
      postedDate: "1 week ago",
    },
    {
      id: 8,
      title: "Security Engineer",
      company: "Cloudflare",
      location: "Austin",
      savedDate: "Feb 8, 2024 12:40",
      status: "Trending",
      logo: "https://logo.clearbit.com/cloudflare.com",
      salary: "$135k-$175k/year",
      type: "Full Time",
      postedDate: "6 days ago",
    },
  ]

  const filteredJobs = savedJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage)

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Saved Jobs</h1>
            <p className="text-gray-600 text-sm mt-1">({filteredJobs.length})</p>
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
                          <span className="text-xs text-gray-400">• Posted {job.postedDate}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm text-gray-600">{job.savedDate}</div>
                  </TableCell>

                  <TableCell>
                    <Badge className={`${getStatusColor(job.status)} hover:${getStatusColor(job.status)}`}>
                      {job.status === "Hot" && "🔥"} {job.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Apply Now
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveJob(job.id)}
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
  )
}
