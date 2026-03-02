"use client";
import { RootState } from "@/app/redux/store";
import { Button } from "@/components/ui/button";
import { Bot, BotMessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

const AdminHeroBanner = () => {
    const user = useSelector((state: RootState) => state.authR.user);
    const [greeting, setGreeting] = useState<string>("");

    useEffect(() => {
        const hours = new Date().getHours();
        if (hours >= 4 && hours < 12) setGreeting("Good Morning");
        else if (hours >= 12 && hours < 16) setGreeting("Good Afternoon");
        else if (hours >= 16 && hours < 20) setGreeting("Good Evening");
        else setGreeting("Good Night");
    }, []);

    return (
        <motion.div
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl p-5 text-white relative overflow-hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-52 h-52 bg-white/10 absolute -top-24 -right-16 rounded-full pointer-events-none" />
            <div className="w-32 h-32 bg-white/5 absolute -bottom-10 right-32 rounded-full pointer-events-none" />

            <h2 className="text-2xl font-medium">
                {greeting}, {user?.fullname ?? "Admin"}
            </h2>
            <p className="text-white/70 text-sm mt-1">
                Platform overview —{" "}
                {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </p>

            <div className="mt-4 flex items-start gap-3">
                <Bot className="mt-0.5 shrink-0" />
                <div>
                    <p className="font-semibold text-lg">AI Platform Assistant</p>
                    <p className="text-sm text-white/80">
                        24,830 users registered · 1,482 active jobs · 18 items need your
                        attention
                    </p>
                </div>
            </div>

            <Button variant="ghost" className="border active:scale-105 mt-3">
                <BotMessageSquare />
                <span>Open AI Console</span>
            </Button>
        </motion.div>
    );
};

export default AdminHeroBanner;
