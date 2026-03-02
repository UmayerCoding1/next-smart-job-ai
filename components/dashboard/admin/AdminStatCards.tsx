"use client";
import {
    ArrowUpFromDot,
    ArrowDownToDot,
    Briefcase,
    Users,
    FileText,
    TrendingUp,
    ShieldCheck,
    Flag,
} from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import React from "react";

interface StatCard {
    title: string;
    value: number;
    subtitle: string;
    icon: React.ElementType;
    color: string;
    trend: "up" | "down" | "neutral";
}

const statCards: StatCard[] = [
    {
        title: "Total Users",
        value: 24830,
        subtitle: "+312 this week",
        icon: Users,
        color: "#3B82F6",
        trend: "up",
    },
    {
        title: "Active Jobs",
        value: 1482,
        subtitle: "+48 today",
        icon: Briefcase,
        color: "#10B981",
        trend: "up",
    },
    {
        title: "Applications",
        value: 9347,
        subtitle: "+215 this week",
        icon: FileText,
        color: "#8B5CF6",
        trend: "up",
    },
    {
        title: "Revenue (USD)",
        value: 84250,
        subtitle: "+9.2% vs last month",
        icon: TrendingUp,
        color: "#F59E0B",
        trend: "up",
    },
    {
        title: "Recruiters",
        value: 643,
        subtitle: "+22 new this month",
        icon: ShieldCheck,
        color: "#EC4899",
        trend: "up",
    },
    {
        title: "Flagged Content",
        value: 18,
        subtitle: "Needs review",
        icon: Flag,
        color: "#EF4444",
        trend: "down",
    },
];

const AdminStatCards = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {statCards.map((card, i) => {
                const Icon = card.icon;
                return (
                    <motion.div
                        key={card.title}
                        className="rounded-xl p-4 shadow border border-gray-100 hover:shadow-md transition-shadow duration-300"
                        style={{ backgroundColor: `${card.color}18` }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-medium text-gray-600 leading-tight">
                                {card.title}
                            </p>
                            <Icon size={14} style={{ color: card.color }} />
                        </div>
                        <p className="text-2xl font-bold text-gray-800">
                            <CountUp end={card.value} duration={1.5} separator="," />
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                            {card.trend === "up" ? (
                                <ArrowUpFromDot size={12} className="text-green-500" />
                            ) : (
                                <ArrowDownToDot size={12} className="text-red-500" />
                            )}
                            <p className="text-xs text-gray-500">{card.subtitle}</p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default AdminStatCards;
