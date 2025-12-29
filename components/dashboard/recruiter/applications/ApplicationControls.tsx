"use client";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { mockJobs } from "@/lib/mock-data";
import { Clock, Search, Sparkles } from "lucide-react";
import React, { useState } from "react";
import ApplicationListing from "./appication-listing";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

type StatusFilter =
  | "all"
  | "new"
  | "pending"
  | "reviewed"
  | "interview"
  | "rejected"
  | "accepted";
type SortBy = "date" | "score";

const ApplicationControls = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const {applications} = useSelector((state: RootState) => state.applicationCounterR);
  

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email"
            className="pl-9"
          />
        </div>

        {/* job filter by department */}
        <Select value={selectedJob} onValueChange={setSelectedJob}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All Jobs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            {mockJobs.map((job) => (
              <SelectItem key={job.id} value={job.department.toLowerCase()}>
                {job.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* sort by date and score */}
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortBy)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recent First
              </div>
            </SelectItem>
            <SelectItem value="score">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Best Match
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="my-8 w-full">
        <Tabs
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as StatusFilter)}
          className="w-full  "
        >
          <TabsList className="mb-6 w-full justify-start bg-gray-200">
            <TabsTrigger value="all" className="gap-2">
              All
              <Badge variant="secondary" className="ml-1">
                {applications.all}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="new" className="gap-2">
              New
              <Badge
                variant="secondary"
                className="ml-1 bg-blue-500/10 text-blue-500"
              >
               {applications.new}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="gap-2">
              Pending
              <Badge
                variant="secondary"
                className="ml-1 bg-blue-500/10 text-blue-500"
              >
               {applications.pending}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="reviewed" className="gap-2">
              Reviewed
              <Badge
                variant="secondary"
                className="ml-1 bg-blue-500/10 text-blue-500"
              >
               {applications.reviewed}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="interview" className="gap-2">
              Interview
              <Badge
                variant="secondary"
                className="ml-1 bg-cyan-500/10 text-cyan-500"
              >
               {applications.interview}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected">Rejected
              <Badge
                variant="secondary"
                className="ml-1 bg-blue-500/10 text-blue-500"
              >
               {applications.rejected}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="accepted">Accepted
              <Badge
                variant="secondary"
                className="ml-1 bg-blue-500/10 text-blue-500"
              >
               {applications.accepted}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <ApplicationListing searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default ApplicationControls;
