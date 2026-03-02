"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Activity,
    AlertTriangle,
    Bot,
    ShieldCheck,
    TrendingUp,
    UserPlus,
} from "lucide-react";
import React from "react";

interface ActivityItem {
    category: string;
    detail: string;
    time: string;
    icon: React.ElementType;
    color: string;
}

const systemActivities: ActivityItem[] = [
    {
        category: "New Recruiter Registered",
        detail: "TechCorp Inc. awaiting approval",
        time: "2 hours ago",
        icon: UserPlus,
        color: "#10B981",
    },
    {
        category: "Job Flagged",
        detail: "Suspicious listing: 'Easy $5000/day'",
        time: "3 hours ago",
        icon: AlertTriangle,
        color: "#EF4444",
    },
    {
        category: "Revenue Milestone",
        detail: "Monthly target reached: $84K",
        time: "5 hours ago",
        icon: TrendingUp,
        color: "#F59E0B",
    },
    {
        category: "AI Model Updated",
        detail: "Job matching model v3.2 deployed",
        time: "8 hours ago",
        icon: Bot,
        color: "#8B5CF6",
    },
    {
        category: "User Suspended",
        detail: "Policy violation: Sara Lee",
        time: "1 day ago",
        icon: ShieldCheck,
        color: "#3B82F6",
    },
];

const AdminSystemActivity = () => {
    return (
        <Card className="w-full lg:w-80 shrink-0">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Activity size={16} />
                    System Activity
                </CardTitle>
                <CardDescription>Recent platform events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
                {systemActivities.map((act, i) => {
                    const Icon = act.icon;
                    return (
                        <div
                            key={i}
                            className="flex gap-3 p-2 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                        >
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                style={{ backgroundColor: `${act.color}20` }}
                            >
                                <Icon size={14} style={{ color: act.color }} />
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold text-sm text-gray-800 leading-tight">
                                    {act.category}
                                </p>
                                <p className="text-xs text-gray-500 truncate">{act.detail}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{act.time}</p>
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
};

export default AdminSystemActivity;
