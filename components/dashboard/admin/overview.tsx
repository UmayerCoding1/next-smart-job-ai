"use client";
import React from "react";
import AdminHeroBanner from "./AdminHeroBanner";
import AdminStatCards from "./AdminStatCards";
import AdminRecentUsers from "./AdminRecentUsers";
import AdminSystemActivity from "./AdminSystemActivity";
import AdminJobCategories from "./AdminJobCategories";
import AdminPlatformHealth from "./AdminPlatformHealth";
import AdminQuickActions from "./AdminQuickActions";

export const Overview = () => {
    return (
        <div className="lg:px-[30px] pb-10 space-y-6">
            {/* Hero Banner */}
            <AdminHeroBanner />

            {/* Stat Cards */}
            <AdminStatCards />

            {/* Recent Users + System Activity */}
            <div className="flex flex-col lg:flex-row gap-4">
                <AdminRecentUsers />
                <AdminSystemActivity />
            </div>

            {/* Job Categories + Platform Health + Quick Actions */}
            <div className="flex flex-col lg:flex-row gap-4">
                <AdminJobCategories />
                <AdminPlatformHealth />
                <AdminQuickActions />
            </div>
        </div>
    );
};
