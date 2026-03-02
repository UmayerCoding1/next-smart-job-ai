"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Globe } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const platformHealth = [
    { label: "Server Uptime", value: 99.97, color: "#10B981" },
    { label: "AI Match Rate", value: 87.4, color: "#8B5CF6" },
    { label: "Job Fill Rate", value: 73.2, color: "#3B82F6" },
    { label: "User Retention", value: 81.5, color: "#F59E0B" },
];

const AdminPlatformHealth = () => {
    return (
        <Card className="w-full lg:w-64 shrink-0">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Globe size={16} />
                    Platform Health
                </CardTitle>
                <CardDescription>Live metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
                {platformHealth.map((metric, i) => (
                    <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">{metric.label}</span>
                            <span
                                className="text-sm font-bold"
                                style={{ color: metric.color }}
                            >
                                {metric.value}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <motion.div
                                className="h-1.5 rounded-full"
                                style={{ backgroundColor: metric.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${metric.value}%` }}
                                transition={{ duration: 1, delay: i * 0.2 }}
                            />
                        </div>
                    </div>
                ))}
                <div className="flex items-center gap-2 pt-2 text-green-600 text-sm font-medium">
                    <CheckCircle2 size={14} />
                    All systems operational
                </div>
            </CardContent>
        </Card>
    );
};

export default AdminPlatformHealth;
