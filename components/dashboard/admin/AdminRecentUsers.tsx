"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Eye, Trash2 } from "lucide-react";
import React from "react";

interface UserRow {
    name: string;
    email: string;
    role: string;
    status: string;
    joined: string;
    avatar: string;
    avatarColor: string;
}

const recentUsers: UserRow[] = [
    {
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "Jobseeker",
        status: "active",
        joined: "2 hours ago",
        avatar: "AJ",
        avatarColor: "#3B82F6",
    },
    {
        name: "TechCorp Inc.",
        email: "hr@techcorp.com",
        role: "Recruiter",
        status: "pending",
        joined: "5 hours ago",
        avatar: "TC",
        avatarColor: "#10B981",
    },
    {
        name: "Marcus Webb",
        email: "marcus@example.com",
        role: "Jobseeker",
        status: "active",
        joined: "1 day ago",
        avatar: "MW",
        avatarColor: "#8B5CF6",
    },
    {
        name: "Nexus Hiring",
        email: "admin@nexushiring.com",
        role: "Recruiter",
        status: "active",
        joined: "1 day ago",
        avatar: "NH",
        avatarColor: "#EC4899",
    },
    {
        name: "Sara Lee",
        email: "sara.lee@mail.com",
        role: "Jobseeker",
        status: "suspended",
        joined: "2 days ago",
        avatar: "SL",
        avatarColor: "#EF4444",
    },
];

const StatusBadge = ({ status }: { status: string }) => {
    const map: Record<string, string> = {
        active: "bg-green-100 text-green-700",
        pending: "bg-yellow-100 text-yellow-700",
        suspended: "bg-red-100 text-red-700",
    };
    return (
        <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[status] ?? "bg-gray-100 text-gray-600"}`}
        >
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

const AdminRecentUsers = () => {
    return (
        <Card className="flex-1">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Users size={16} />
                    Recent Users
                </CardTitle>
                <CardDescription>Newly registered members on the platform</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b bg-gray-50/50">
                                <th className="text-left px-4 py-2 font-medium text-gray-500">User</th>
                                <th className="text-left px-4 py-2 font-medium text-gray-500">Role</th>
                                <th className="text-left px-4 py-2 font-medium text-gray-500">Status</th>
                                <th className="text-left px-4 py-2 font-medium text-gray-500">Joined</th>
                                <th className="px-4 py-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {recentUsers.map((u, i) => (
                                <tr
                                    key={i}
                                    className="border-b last:border-0 hover:bg-gray-50/50 transition-colors"
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                                                style={{ backgroundColor: u.avatarColor }}
                                            >
                                                {u.avatar}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">{u.name}</p>
                                                <p className="text-xs text-gray-400">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge variant="outline" className="text-xs">
                                            {u.role}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={u.status} />
                                    </td>
                                    <td className="px-4 py-3 text-gray-500 text-xs">{u.joined}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-blue-500 transition-colors">
                                                <Eye size={14} />
                                            </button>
                                            <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-500 transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

export default AdminRecentUsers;
