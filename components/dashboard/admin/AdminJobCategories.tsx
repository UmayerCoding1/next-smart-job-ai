"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const jobCategories = [
    { category: "Software Engineering", jobs: 420, fill: 85 },
    { category: "Product Management", jobs: 210, fill: 65 },
    { category: "Data Science", jobs: 185, fill: 55 },
    { category: "UI/UX Design", jobs: 140, fill: 45 },
    { category: "Marketing", jobs: 98, fill: 32 },
];

const AdminJobCategories = () => {
    return (
        <Card className="flex-1">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                    <BarChart3 size={16} />
                    Top Job Categories
                </CardTitle>
                <CardDescription>Active listing distribution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
                {jobCategories.map((cat, i) => (
                    <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">
                                {cat.category}
                            </span>
                            <span className="text-xs font-semibold text-gray-500">
                                {cat.jobs} jobs
                            </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <motion.div
                                className="h-2 rounded-full"
                                style={{
                                    background: "linear-gradient(to right, #3B82F6, #8B5CF6)",
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${cat.fill}%` }}
                                transition={{ duration: 1, delay: i * 0.15 }}
                            />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default AdminJobCategories;
