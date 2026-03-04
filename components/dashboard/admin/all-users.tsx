"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
    Users,
    Search,
    Eye,
    Trash2,
    MoreHorizontal,
    Mail,
    UserCircle,
    Shield,
    ShieldAlert,
    ShieldCheck,
    Ban,
    UserCheck,
    Briefcase,
    Calendar,
    MapPin,
    Smartphone,
    Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser, ROLE, Status } from "@/lib/types";
import { getTimeAgo } from "@/lib/getTimeAgo";

// ─── Types ───────────────────────────────────────────────────────────────────
interface PaginationData {
    totalUsers: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}

interface AllUsersProps {
    initialUsers: IUser[];
    pagination: PaginationData;
}

// ─── Status Config ────────────────────────────────────────────────────────────
const statusConfig: Record<
    string,
    { label: string; className: string; dot: string; icon: any }
> = {
    [Status.ACTIVE]: {
        label: "Active",
        className: "bg-green-100 text-green-700",
        dot: "bg-green-500",
        icon: UserCheck,
    },
    [Status.INACTIVE]: {
        label: "Inactive",
        className: "bg-yellow-100 text-yellow-700",
        dot: "bg-yellow-500",
        icon: ShieldAlert,
    },
    [Status.BLACKLISTED]: {
        label: "Blacklisted",
        className: "bg-red-100 text-red-600",
        dot: "bg-red-500",
        icon: Ban,
    },
};

const roleConfig: Record<string, { label: string; icon: any; color: string }> = {
    [ROLE.ADMIN]: { label: "Admin", icon: ShieldCheck, color: "text-purple-600 bg-purple-100" },
    [ROLE.RECRUITER]: { label: "Recruiter", icon: Briefcase, color: "text-blue-600 bg-blue-100" },
    [ROLE.JOBSEEKER]: { label: "Jobseeker", icon: UserCircle, color: "text-indigo-600 bg-indigo-100" },
};

const StatusPill = ({ status }: { status: string }) => {
    const cfg = statusConfig[status] || statusConfig[Status.ACTIVE];
    const Icon = cfg.icon;
    return (
        <span
            className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${cfg.className}`}
        >
            <Icon size={12} />
            {cfg.label}
        </span>
    );
};

// ─── Component ────────────────────────────────────────────────────────────────
export const AllUsers: React.FC<AllUsersProps> = ({ initialUsers, pagination }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [users, setUsers] = useState<IUser[]>(initialUsers);
    const [search, setSearch] = useState<string>("");
    const [roleFilter, setRoleFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    // Sync state with initialUsers when props change (for pagination)
    useEffect(() => {
        setUsers(initialUsers);
    }, [initialUsers]);

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.fullname.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.username.toLowerCase().includes(search.toLowerCase());

        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        const matchesStatus = statusFilter === "all" || user.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > pagination.totalPages) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleDeleteUser = async (userId: string) => {
        if (confirm("Are you sure you want to delete this user?")) {
            // Ideally call API here
            setUsers(users.filter(u => String(u._id) !== userId));
        }
    };

    const handleChangeStatus = async (userId: string, newStatus: string) => {
        // Ideally call API here
        setUsers(users.map(u => String(u._id) === userId ? { ...u, status: newStatus } : u));
    };

    return (
        <div className="lg:px-[30px] pb-10 space-y-6">
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
                        User Management
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Review, moderate, and manage all users on the smart-job platform.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        className="hidden sm:flex items-center gap-2"
                        onClick={async () => {
                            try {
                                const response = await fetch('/api/admin/users/export');
                                const data = await response.json();
                                if (data.success) {
                                    const usersToExport = data.users;
                                    const headers = ["Full Name", "Email", "Username", "Role", "Status", "Joined"];
                                    const csvContent = [
                                        headers.join(","),
                                        ...usersToExport.map((u: any) => [
                                            `"${u.fullname}"`,
                                            `"${u.email}"`,
                                            `"${u.username}"`,
                                            `"${u.role}"`,
                                            `"${u.status}"`,
                                            `"${new Date(u.createdAt).toLocaleDateString()}"`
                                        ].join(","))
                                    ].join("\n");

                                    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                                    const link = document.createElement("a");
                                    const url = URL.createObjectURL(blob);
                                    link.setAttribute("href", url);
                                    link.setAttribute("download", `users-export-${new Date().toISOString().split('T')[0]}.csv`);
                                    link.style.visibility = 'hidden';
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }
                            } catch (error) {
                                console.error("Export failed", error);
                                alert("Failed to export users.");
                            }
                        }}
                    >
                        <Globe size={16} />
                        Export CSV
                    </Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200">
                        <Shield size={16} className="mr-2" />
                        Admin Settings
                    </Button>
                </div>
            </div>

            {/* ── Filters ── */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="md:col-span-2 relative">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                        placeholder="Search by name, email, or username..."
                        className="pl-10 h-11 border-gray-200 focus:ring-indigo-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div>
                    <select
                        className="w-full h-11 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="all">All Roles</option>
                        <option value={ROLE.JOBSEEKER}>Jobseekers</option>
                        <option value={ROLE.RECRUITER}>Recruiters</option>
                        <option value={ROLE.ADMIN}>Admins</option>
                    </select>
                </div>
                <div>
                    <select
                        className="w-full h-11 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value={Status.ACTIVE}>Active</option>
                        <option value={Status.INACTIVE}>Inactive</option>
                        <option value={Status.BLACKLISTED}>Blacklisted</option>
                    </select>
                </div>
            </div>

            {/* ── Table ── */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="text-left px-6 py-4 font-semibold text-gray-600">User</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600">Role</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600">Status</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600">Joined</th>
                                <th className="px-6 py-4" />
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence mode="popLayout">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                            <div className="flex flex-col items-center gap-2">
                                                <Users size={40} className="opacity-20" />
                                                <p className="font-medium">No users found matching your criteria</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user, i) => {
                                        const role = roleConfig[user.role] || roleConfig[ROLE.JOBSEEKER];

                                        const RoleIcon = role.icon;
                                        return (
                                            <motion.tr
                                                key={String(user._id)}
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2, delay: i * 0.03 }}
                                                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/80 transition-colors"
                                            >
                                                {/* User Info */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative">
                                                            {user.avatar ? (
                                                                <img
                                                                    src={user.avatar}
                                                                    alt={user.fullname}
                                                                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                                                />
                                                            ) : (
                                                                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 font-bold border border-indigo-100">
                                                                    {user.fullname.charAt(0)}
                                                                </div>
                                                            )}
                                                            {user.status === Status.ACTIVE && (
                                                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900 leading-tight">
                                                                {user.fullname}
                                                            </p>
                                                            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                                                                <Mail size={12} />
                                                                {user.email}
                                                            </div>
                                                            <p className="text-[10px] text-gray-400 mt-0.5 font-mono">
                                                                @{user.username}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Role */}
                                                <td className="px-6 py-4">
                                                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${role.color}`}>
                                                        <RoleIcon size={12} />
                                                        {role.label}
                                                    </div>
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-4">
                                                    <StatusPill status={user.status} />
                                                </td>

                                                {/* Joined */}
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-gray-700 font-medium">
                                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                                        </span>
                                                        <span className="text-xs text-gray-400">
                                                            {user.createdAt ? getTimeAgo(user.createdAt) : ''}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4 text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                                                                <MoreHorizontal size={18} />
                                                            </button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-52 p-1.5">
                                                            <DropdownMenuItem className="gap-2.5 py-2 cursor-pointer">
                                                                <Eye size={15} className="text-blue-500" />
                                                                View Full Profile
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />

                                                            {user.status !== Status.ACTIVE && (
                                                                <DropdownMenuItem
                                                                    className="gap-2.5 py-2 cursor-pointer text-green-600"
                                                                    onClick={() => handleChangeStatus(String(user._id), Status.ACTIVE)}
                                                                >
                                                                    <UserCheck size={15} />
                                                                    Unblock User
                                                                </DropdownMenuItem>
                                                            )}

                                                            {user.status !== Status.BLACKLISTED && (
                                                                <DropdownMenuItem
                                                                    className="gap-2.5 py-2 cursor-pointer text-orange-600"
                                                                    onClick={() => handleChangeStatus(String(user._id), Status.BLACKLISTED)}
                                                                >
                                                                    <Ban size={15} />
                                                                    Block User
                                                                </DropdownMenuItem>
                                                            )}

                                                            <DropdownMenuItem
                                                                className="gap-2.5 py-2 cursor-pointer text-red-600"
                                                                onClick={() => handleDeleteUser(String(user._id))}
                                                            >
                                                                <Trash2 size={15} />
                                                                Delete Permanently
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </motion.tr>
                                        );
                                    })
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* ── Footer ── */}
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between font-medium">
                    <p className="text-xs text-gray-500">
                        Showing <span className="text-gray-900 font-bold">{Math.min((pagination.currentPage - 1) * pagination.limit + 1, pagination.totalUsers)}</span> to <span className="text-gray-900 font-bold">{Math.min(pagination.currentPage * pagination.limit, pagination.totalUsers)}</span> of <span className="text-gray-900 font-bold">{pagination.totalUsers}</span> users
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-[11px] px-3 font-semibold hover:bg-white active:scale-95 transition-all"
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                        >
                            Previous
                        </Button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <Button
                                    key={pageNum}
                                    variant="outline"
                                    size="sm"
                                    className={`h-8 w-8 text-[11px] p-0 font-bold transition-all ${pagination.currentPage === pageNum
                                        ? "bg-indigo-50 text-indigo-600 border-indigo-200 shadow-sm"
                                        : "hover:bg-white text-gray-500 hover:text-gray-900"
                                        }`}
                                    onClick={() => handlePageChange(pageNum)}
                                >
                                    {pageNum}
                                </Button>
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-[11px] px-3 font-semibold hover:bg-white active:scale-95 transition-all"
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage === pagination.totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
