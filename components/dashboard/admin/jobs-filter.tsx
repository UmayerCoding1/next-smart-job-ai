import { Input } from '@/components/ui/input';
import { LucideIcon, Search } from 'lucide-react';
import React from 'react'
import { JobStatus } from './all-jobs';

interface JobFiltterProps {
    tabs: { label: string, icon: LucideIcon, filter: JobStatus | null }[],
    counts: Record<string, number>,
    activeTab: string,
    setActiveTab: (tab: string) => void,
    search: string,
    setSearch: (search: string) => void,
}

export const JobFiltter = ({ tabs, counts, activeTab, setActiveTab, search, setSearch }: JobFiltterProps) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-1">
                {tabs?.map((tab) => {
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
    )
}
