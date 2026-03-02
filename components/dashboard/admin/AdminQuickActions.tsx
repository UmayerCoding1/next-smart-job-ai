"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    BarChart3,
    Clock,
    Flag,
    Settings,
    ShieldCheck,
    Star,
    Users,
} from "lucide-react";
import React from "react";

const quickActions = [
    { label: "Approve Recruiters", icon: ShieldCheck, color: "#10B981" },
    { label: "Review Flagged Jobs", icon: Flag, color: "#EF4444" },
    { label: "Manage Users", icon: Users, color: "#3B82F6" },
    { label: "View Reports", icon: BarChart3, color: "#8B5CF6" },
    { label: "Feature Spotlight", icon: Star, color: "#F59E0B" },
    { label: "System Logs", icon: Clock, color: "#6B7280" },
];

const AdminQuickActions = () => {
    return (
        <Card className="w-full lg:w-56 shrink-0">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Settings size={16} />
                    Quick Actions
                </CardTitle>
                <CardDescription>Admin shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
                {quickActions.map((action, i) => {
                    const Icon = action.icon;
                    return (
                        <Button
                            key={i}
                            variant="outline"
                            className="w-full justify-start bg-transparent hover:bg-gray-50 text-sm h-9"
                        >
                            <Icon size={14} style={{ color: action.color }} className="mr-2" />
                            {action.label}
                        </Button>
                    );
                })}
            </CardContent>
        </Card>
    );
};

export default AdminQuickActions;
