'use client';
import React from 'react';
import { Bookmark, BriefcaseBusiness, Inbox, LayoutDashboard } from "lucide-react";
import Sidebar from '@/components/shared/dashboard/Sidebar';
const AdminSidebar = () => {
    const navItem = [
        {
            name: "Overview",
            url: "/dashboard/admin",
            icon: LayoutDashboard,
        },
        {
            name: "All Jobs",
            url: "/dashboard/admin/all-jobs",
            icon: BriefcaseBusiness,
        },
        {
            name: "All Users",
            url: "/dashboard/admin/all-users",
            icon: Bookmark,
        },

        {
            name: "Inbox",
            url: "/dashboard/admin/inbox",
            icon: Inbox,
        },
    ];
    return (
        <>
            <Sidebar navItem={navItem} />
        </>
    );
};

export default AdminSidebar;