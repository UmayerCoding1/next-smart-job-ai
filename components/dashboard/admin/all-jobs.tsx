"use client";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
    Briefcase,
    CheckCircle2,
    XCircle,
    Clock,
    Flag,
    MapPin,
    DollarSign,
    CalendarDays,
    Users,
    ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { JobTableColum } from "./job-table-colum";
import { JobFiltter } from "./jobs-filter";
import { JobPagination } from "./job-pagination";
import axios from "axios";
import { toast } from "sonner";


export type JobStatus = "active" | "closed" | "paused" | "draft";

export type TableJobType = {
    _id: string;
    title: string;
    appliedjobs: string[],
    category: string;
    company: {
        name: string;
        email: string;
        logo: string;
        _id: string;
    };
    createdAt: string;
    dedline: string;
    location: string
    salaryrange: {
        max: number;
        min: number;
        negotiable: boolean
    };
    jobtype: string[];
    status: JobStatus;
}


const tabs = [
    { label: "All Jobs", icon: Briefcase, filter: null },
    { label: "Active", icon: CheckCircle2, filter: "active" as JobStatus },
    { label: "Paused", icon: Clock, filter: "paused" as JobStatus },
    { label: "Closed", icon: XCircle, filter: "closed" as JobStatus },
    { label: "Draft", icon: Flag, filter: "draft" as JobStatus },
];




const AllJobs = ({ jobs }: { jobs: TableJobType[] }) => {
    const [activeTab, setActiveTab] = useState<string>("All Jobs");
    const [search, setSearch] = useState<string>("");




    const filtered = jobs?.filter((job) => {
        const matchTab =
            activeTab === "All Jobs" ||
            job.status === tabs.find((t) => t.label === activeTab)?.filter;
        const matchSearch =
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            // job.company.toLowerCase().includes(search.toLowerCase()) ||
            job.category.toLowerCase().includes(search.toLowerCase());
        return matchTab && matchSearch;
    });




    const counts = {
        "All Jobs": jobs?.length,
        Active: jobs?.filter((j) => j.status === "active").length,
        Paused: jobs?.filter((j) => j.status === "paused").length,
        Closed: jobs?.filter((j) => j.status === "closed").length,

    };






    return (
        <div className="lg:px-[30px] pb-10 space-y-5">

            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-800">All Jobs</h1>
                    <p className="text-muted-foreground text-sm mt-0.5">
                        Manage, approve, and moderate all job listings on the platform
                    </p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 active:scale-95 transition-all">
                    <ShieldCheck size={15} className="mr-1.5" />
                    Approve Paused
                </Button>
            </div>


            <JobFiltter tabs={tabs} counts={counts} activeTab={activeTab} setActiveTab={setActiveTab} search={search} setSearch={setSearch} />


            <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                                    Job
                                </th>
                                <th className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                                    <span className="flex items-center gap-1">
                                        <MapPin size={12} /> Location
                                    </span>
                                </th>
                                <th className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                                    <span className="flex items-center gap-1">
                                        <DollarSign size={12} /> Salary
                                    </span>
                                </th>
                                <th className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                                    <span className="flex items-center gap-1">
                                        <Users size={12} /> Applications
                                    </span>
                                </th>
                                <th className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                                    <span className="flex items-center gap-1">
                                        <CalendarDays size={12} /> Posted
                                    </span>
                                </th>
                                <th className="text-left px-4 py-3 font-semibold text-gray-600">
                                    Status
                                </th>
                                <th className="px-4 py-3" />
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence mode="popLayout">
                                {filtered?.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-4 py-16 text-center text-gray-400"
                                        >
                                            <Briefcase
                                                size={36}
                                                className="mx-auto mb-2 opacity-30"
                                            />
                                            <p className="font-medium">No jobs found</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filtered?.map((job, i) => (
                                        <JobTableColum key={i} job={job} i={i} />
                                    ))
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>


                <JobPagination jobs={jobs?.length} filtered={filtered?.length} />
            </div>
        </div>
    );
};

export default AllJobs;