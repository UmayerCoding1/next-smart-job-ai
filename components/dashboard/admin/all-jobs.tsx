"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase,
    CheckCircle2,
    XCircle,
    Clock,
    Flag,
    Search,
    Eye,
    Trash2,
    MoreHorizontal,
    MapPin,
    Building2,
    DollarSign,
    CalendarDays,
    Users,
    ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";

// ─── Types ───────────────────────────────────────────────────────────────────
type JobStatus = "open" | "closed" | "pending" | "flagged";

interface AdminJob {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    status: JobStatus;
    applications: number;
    postedBy: string;
    postedAt: string;
    category: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const mockJobs: AdminJob[] = [
    {
        id: "1",
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "Remote",
        type: "Full-time",
        salary: "$90k–$120k",
        status: "open",
        applications: 48,
        postedBy: "hr@techcorp.com",
        postedAt: "Feb 28, 2026",
        category: "Engineering",
    },
    {
        id: "2",
        title: "Product Manager",
        company: "Nexus Hiring",
        location: "New York, USA",
        type: "Full-time",
        salary: "$100k–$140k",
        status: "open",
        applications: 35,
        postedBy: "admin@nexushiring.com",
        postedAt: "Feb 27, 2026",
        category: "Product",
    },
    {
        id: "3",
        title: "Data Analyst",
        company: "DataFlow Ltd.",
        location: "London, UK",
        type: "Part-time",
        salary: "$55k–$70k",
        status: "pending",
        applications: 12,
        postedBy: "hr@dataflow.com",
        postedAt: "Mar 1, 2026",
        category: "Data Science",
    },
    {
        id: "4",
        title: "UI/UX Designer",
        company: "Pixel Studio",
        location: "Remote",
        type: "Contract",
        salary: "$60k–$80k",
        status: "closed",
        applications: 21,
        postedBy: "studio@pixel.io",
        postedAt: "Feb 20, 2026",
        category: "Design",
    },
    {
        id: "5",
        title: "Easy $5000/Day — No Skills",
        company: "QuickBucks.net",
        location: "Unknown",
        type: "Part-time",
        salary: "$5000/day",
        status: "flagged",
        applications: 3,
        postedBy: "spam@quickbucks.net",
        postedAt: "Mar 1, 2026",
        category: "Other",
    },
    {
        id: "6",
        title: "Backend Engineer (Node.js)",
        company: "CloudBase",
        location: "Austin, USA",
        type: "Full-time",
        salary: "$85k–$110k",
        status: "open",
        applications: 60,
        postedBy: "tech@cloudbase.io",
        postedAt: "Mar 2, 2026",
        category: "Engineering",
    },
    {
        id: "7",
        title: "Marketing Specialist",
        company: "GrowthHive",
        location: "Toronto, Canada",
        type: "Full-time",
        salary: "$50k–$65k",
        status: "pending",
        applications: 9,
        postedBy: "jobs@growthhive.ca",
        postedAt: "Mar 2, 2026",
        category: "Marketing",
    },
    {
        id: "8",
        title: "DevOps Engineer",
        company: "InfraOps",
        location: "Berlin, Germany",
        type: "Full-time",
        salary: "$95k–$130k",
        status: "closed",
        applications: 17,
        postedBy: "hr@infraops.de",
        postedAt: "Feb 15, 2026",
        category: "Engineering",
    },
];

// ─── Tab Config ───────────────────────────────────────────────────────────────
const tabs = [
    { label: "All Jobs", icon: Briefcase, filter: null },
    { label: "Open", icon: CheckCircle2, filter: "open" as JobStatus },
    { label: "Pending", icon: Clock, filter: "pending" as JobStatus },
    { label: "Closed", icon: XCircle, filter: "closed" as JobStatus },
    { label: "Flagged", icon: Flag, filter: "flagged" as JobStatus },
];

// ─── Status Config ────────────────────────────────────────────────────────────
const statusConfig: Record<
    JobStatus,
    { label: string; className: string; dot: string }
> = {
    open: {
        label: "Open",
        className: "bg-green-100 text-green-700",
        dot: "bg-green-500",
    },
    pending: {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-700",
        dot: "bg-yellow-500",
    },
    closed: {
        label: "Closed",
        className: "bg-gray-100 text-gray-600",
        dot: "bg-gray-400",
    },
    flagged: {
        label: "Flagged",
        className: "bg-red-100 text-red-600",
        dot: "bg-red-500",
    },
};

const StatusPill = ({ status }: { status: JobStatus }) => {
    const cfg = statusConfig[status];
    return (
        <span
            className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${cfg.className}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
        </span>
    );
};

// ─── Component ────────────────────────────────────────────────────────────────
const AllJobs = () => {
    const [activeTab, setActiveTab] = useState<string>("All Jobs");
    const [search, setSearch] = useState<string>("");
    const [jobs, setJobs] = useState();

    useEffect(() => {
        const getAllJobs = async () => {
            const res = await axios.get(`/api/admin/job`);
            if (!res.data.success) {
                return [];
            }
            console.log(res.data)
            return []
        };

        getAllJobs()
    }, [])

    const filtered = mockJobs.filter((job) => {
        const matchTab =
            activeTab === "All Jobs" ||
            job.status === tabs.find((t) => t.label === activeTab)?.filter;
        const matchSearch =
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.company.toLowerCase().includes(search.toLowerCase()) ||
            job.category.toLowerCase().includes(search.toLowerCase());
        return matchTab && matchSearch;
    });

    // counts per tab
    const counts = {
        "All Jobs": mockJobs.length,
        Open: mockJobs.filter((j) => j.status === "open").length,
        Pending: mockJobs.filter((j) => j.status === "pending").length,
        Closed: mockJobs.filter((j) => j.status === "closed").length,
        Flagged: mockJobs.filter((j) => j.status === "flagged").length,
    };

    return (
        <div className="lg:px-[30px] pb-10 space-y-5">
            {/* ── Header ── */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-800">All Jobs</h1>
                    <p className="text-muted-foreground text-sm mt-0.5">
                        Manage, approve, and moderate all job listings on the platform
                    </p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 active:scale-95 transition-all">
                    <ShieldCheck size={15} className="mr-1.5" />
                    Approve Pending
                </Button>
            </div>

            {/* ── Filter Tabs + Search ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                {/* Tabs */}
                <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.label;
                        return (
                            <button
                                key={tab.label}
                                onClick={() => setActiveTab(tab.label)}
                                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150 whitespace-nowrap ${isActive
                                    ? "bg-white shadow text-blue-600"
                                    : "text-neutral-500 hover:text-neutral-700"
                                    }`}
                            >
                                <Icon size={13} />
                                {tab.label}
                                <span
                                    className={`ml-1 text-xs px-1.5 py-0.5 rounded-full font-semibold ${isActive
                                        ? "bg-blue-100 text-blue-600"
                                        : "bg-neutral-200 text-neutral-500"
                                        }`}
                                >
                                    {counts[tab.label as keyof typeof counts]}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                    <Search
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                        placeholder="Search jobs, companies…"
                        className="pl-9 h-9 text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* ── Table ── */}
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
                                {filtered.length === 0 ? (
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
                                    filtered.map((job, i) => (
                                        <motion.tr
                                            key={job.id}
                                            layout
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2, delay: i * 0.04 }}
                                            className={`border-b last:border-0 hover:bg-gray-50/70 transition-colors ${job.status === "flagged" ? "bg-red-50/40" : ""
                                                }`}
                                        >
                                            {/* Job title + company */}
                                            <td className="px-4 py-3">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                                                        <Building2 size={16} className="text-indigo-500" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-800 leading-tight">
                                                            {job.title}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-0.5">
                                                            {job.company}
                                                        </p>
                                                        <div className="flex items-center gap-1.5 mt-1">
                                                            <Badge
                                                                variant="outline"
                                                                className="text-[10px] h-4 px-1.5"
                                                            >
                                                                {job.type}
                                                            </Badge>
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
                                                {job.salary}
                                            </td>

                                            {/* Applications */}
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-semibold text-gray-800">
                                                        {job.applications}
                                                    </span>
                                                    <span className="text-gray-400 text-xs">
                                                        applicants
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Posted */}
                                            <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">
                                                <div>{job.postedAt}</div>
                                                <div className="text-gray-400 truncate max-w-[120px]">
                                                    {job.postedBy}
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="px-4 py-3">
                                                <StatusPill status={job.status} />
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
                                                        {job.status === "pending" && (
                                                            <DropdownMenuItem className="gap-2 cursor-pointer text-green-600">
                                                                <CheckCircle2 size={13} />
                                                                Approve Job
                                                            </DropdownMenuItem>
                                                        )}
                                                        {job.status === "open" && (
                                                            <DropdownMenuItem className="gap-2 cursor-pointer text-yellow-600">
                                                                <XCircle size={13} />
                                                                Close Job
                                                            </DropdownMenuItem>
                                                        )}
                                                        {job.status !== "flagged" && (
                                                            <DropdownMenuItem className="gap-2 cursor-pointer text-orange-500">
                                                                <Flag size={13} />
                                                                Flag Job
                                                            </DropdownMenuItem>
                                                        )}
                                                        {job.status === "flagged" && (
                                                            <DropdownMenuItem className="gap-2 cursor-pointer text-green-600">
                                                                <ShieldCheck size={13} />
                                                                Clear Flag
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="gap-2 cursor-pointer text-red-500">
                                                            <Trash2 size={13} />
                                                            Delete Job
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* ── Footer ── */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                    <span>
                        Showing{" "}
                        <span className="font-semibold text-gray-700">
                            {filtered.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-700">
                            {mockJobs.length}
                        </span>{" "}
                        jobs
                    </span>
                    <div className="flex items-center gap-1">
                        <button className="px-2.5 py-1 rounded border hover:bg-white transition-colors disabled:opacity-40">
                            Prev
                        </button>
                        <button className="px-2.5 py-1 rounded border bg-blue-600 text-white">
                            1
                        </button>
                        <button className="px-2.5 py-1 rounded border hover:bg-white transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllJobs;