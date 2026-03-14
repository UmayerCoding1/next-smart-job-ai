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
    UserCircle,
    Shield,
    ShieldAlert,
    ShieldCheck,
    Ban,
    UserCheck,
    Briefcase,
    Globe,
    UserX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IUser, ROLE, Status } from "@/lib/types";
import { getTimeAgo } from "@/lib/getTimeAgo";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";

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
    { label: string; className: string; dot: string; icon: React.ComponentType<{ size?: number }> }
> = {
    [Status.ACTIVE]: {
        label: "Active",
        className: "bg-emerald-50 text-emerald-700 border-emerald-100",
        dot: "bg-emerald-500",
        icon: UserCheck,
    },
    [Status.INACTIVE]: {
        label: "Inactive",
        className: "bg-amber-50 text-amber-700 border-amber-100",
        dot: "bg-amber-500",
        icon: ShieldAlert,
    },
    [Status.BLACKLISTED]: {
        label: "Blacklisted",
        className: "bg-rose-50 text-rose-700 border-rose-100",
        dot: "bg-rose-500",
        icon: Ban,
    },
};

const roleConfig: Record<string, { label: string; icon: React.ComponentType<{ size?: number }>; color: string; badge: string }> = {
    [ROLE.ADMIN]: {
        label: "Admin",
        icon: ShieldCheck,
        color: "text-purple-700",
        badge: "bg-purple-50 border-purple-100 text-purple-700"
    },
    [ROLE.RECRUITER]: {
        label: "Recruiter",
        icon: Briefcase,
        color: "text-blue-700",
        badge: "bg-blue-50 border-blue-100 text-blue-700"
    },
    [ROLE.JOBSEEKER]: {
        label: "Jobseeker",
        icon: UserCircle,
        color: "text-indigo-700",
        badge: "bg-indigo-50 border-indigo-100 text-indigo-700"
    },
};

const StatusPill = ({ status }: { status: string }) => {
    const cfg = statusConfig[status] || statusConfig[Status.ACTIVE];
    const Icon = cfg.icon;
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 text-[11px] px-2.5 rounded-full font-semibold border shadow-sm transition-all",
                cfg.className
            )}
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
    const [deleteUserPopup, setDeleteUserPopup] = useState<boolean>(false);
    const [deleteUserId, setDeleteUserId] = useState<string>("");
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

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
        try {
            setIsDeleting(true);
            const res = await axios.delete('/api/admin/users/' + userId);
            console.log(res.data)
            if (true) {
                setDeleteUserPopup(false);
                setDeleteUserId("");
                setIsDeleting(false);
                setUsers(users.filter(u => String(u._id) !== userId));
                toast.success("User deleted successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete user");
        }
    };

    const handleChangeStatus = async (userId: string, newStatus: string) => {
        try {


            const res = await axios.patch('/api/admin/users/status/' + userId, { status: newStatus });
            console.log(res.data)
            if (res.data.success) {
                setUsers(users.map(u => String(u._id) === userId ? { ...u, status: newStatus } : u));
                toast.success("User status updated successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update user status");
        }

    };



    return (
        <div className="lg:px-8 pb-12 space-y-8 animate-in fade-in duration-500">
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-neutral-900 tracking-tight">
                        User Management
                    </h1>
                    <p className="text-neutral-500 text-base max-w-2xl">
                        Monitor and manage the smart-job community. Control access, roles, and status for all users.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        className="hidden sm:flex items-center gap-2 text-neutral-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all font-semibold"
                        onClick={async () => {
                            try {
                                const response = await fetch('/api/admin/users/export');
                                const data = await response.json();
                                if (data.success) {
                                    const usersToExport = data.users;
                                    const headers = ["Full Name", "Email", "Username", "Role", "Status", "Joined"];
                                    const csvContent = [
                                        headers.join(","),
                                        ...usersToExport.map((u: IUser) => [
                                            `"${u.fullname}"`,
                                            `"${u.email}"`,
                                            `"${u.username}"`,
                                            `"${u.role}"`,
                                            `"${u.status}"`,
                                            `"${u.createdAt ? new Date(u.createdAt).toLocaleDateString() : ""}"`
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
                        <Globe size={18} />
                        Export
                    </Button>
                    <Button className="bg-neutral-950 hover:bg-neutral-800 text-white shadow-xl shadow-neutral-200 transition-all font-bold px-6">
                        <Shield size={18} className="mr-2" />
                        Settings
                    </Button>
                </div>
            </div>

            {/* ── Filters ── */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2 bg-neutral-50/50 rounded-2xl border border-neutral-100">
                <div className="md:col-span-2 relative group">
                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-indigo-500 transition-colors"
                    />
                    <Input
                        placeholder="Search by name, email, or username..."
                        className="pl-12 h-12 bg-white border-none shadow-sm focus:ring-2 focus:ring-indigo-500/20 rounded-xl"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div>
                    <select
                        className="w-full h-12 px-4 bg-white border-none shadow-sm rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none cursor-pointer"
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
                        className="w-full h-12 px-4 bg-white border-none shadow-sm rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none cursor-pointer"
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
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-2xl shadow-neutral-200/50 overflow-hidden">
                <Table>
                    <TableHeader className="bg-neutral-50/50">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-neutral-500">User Identification</TableHead>
                            <TableHead className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-neutral-500">Platform Role</TableHead>
                            <TableHead className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-neutral-500">Status</TableHead>
                            <TableHead className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-neutral-500">Joined Date</TableHead>
                            <TableHead className="px-8 py-5" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="py-24 text-center">
                                        <div className="flex flex-col items-center gap-4 max-w-xs mx-auto">
                                            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center">
                                                <Users size={32} className="text-neutral-300" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-neutral-900">No results found</p>
                                                <p className="text-sm text-neutral-500 mt-1">Try adjusting your filters or search terms to find what you&apos;re looking for.</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((user, i) => {
                                    const role = roleConfig[user.role] || roleConfig[ROLE.JOBSEEKER];
                                    const RoleIcon = role.icon;


                                    return (
                                        <motion.tr
                                            key={String(user._id)}
                                            layout
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3, delay: i * 0.03 }}
                                            className="group border-b border-neutral-50 last:border-0 hover:bg-neutral-100 transition-all"
                                        >
                                            <TableCell className="px-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="relative flex-shrink-0">
                                                        {user.avatar ? (
                                                            <Image
                                                                src={user.avatar}
                                                                alt={user.fullname}
                                                                width={32}
                                                                height={32}
                                                                className="rounded-2xl object-cover ring-2 ring-white shadow-md"
                                                            />
                                                        ) : (
                                                            <div className="w-8 h-8 text-sm rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold  shadow-lg ring-2 ring-white">
                                                                {user.fullname.charAt(0)}
                                                            </div>
                                                        )}
                                                        {user.status === Status.ACTIVE && (
                                                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm animate-pulse" />
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col ">
                                                        <span className="font-bold text-neutral-900 text-[13px] truncate">
                                                            {user.fullname}
                                                        </span>
                                                        <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                                                            <span className="truncate">{user.email}</span>
                                                            <span className="text-neutral-300">•</span>
                                                            <span className="text-neutral-400 font-mono text-[10px]">@{user.username}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell className="px-8 py-5">
                                                <div className={cn(
                                                    "inline-flex items-center gap-2 px-3 rounded-xl text-xs font-bold border transition-all",
                                                    role.badge
                                                )}>
                                                    <RoleIcon size={14} />
                                                    {role.label}
                                                </div>
                                            </TableCell>

                                            <TableCell className="px-8  ">
                                                <StatusPill status={user.status} />
                                            </TableCell>

                                            <TableCell className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-neutral-700 font-bold text-sm">
                                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                                                    </span>
                                                    <span className="text-[11px] text-neutral-400 font-medium tracking-wide uppercase mt-0.5">
                                                        {user.createdAt ? getTimeAgo(user.createdAt) : ''}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            <TableCell className="px-8 py-5 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-neutral-100">
                                                            <MoreHorizontal size={20} />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-56  rounded-2xl shadow-2xl border-neutral-100">
                                                        <DropdownMenuItem className="gap-3 py-3 rounded-xl cursor-pointer hover:bg-neutral-50 transition-colors font-semibold">
                                                            <Eye size={18} className="text-blue-600" />
                                                            View Profile
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="my-1.5 " />

                                                        {user.status === Status.ACTIVE && (
                                                            <>
                                                                <DropdownMenuItem
                                                                    className="gap-3 py-3 rounded-xl cursor-pointer text-amber-600 hover:bg-amber-50 transition-colors font-semibold"
                                                                    onClick={() => handleChangeStatus(String(user._id), Status.BLACKLISTED)}
                                                                >
                                                                    <Ban size={18} />
                                                                    Block User
                                                                </DropdownMenuItem>

                                                                <DropdownMenuItem
                                                                    className="gap-3 py-3 rounded-xl cursor-pointer text-amber-600 hover:bg-amber-50 transition-colors font-semibold"
                                                                    onClick={() => handleChangeStatus(String(user._id), Status.INACTIVE)}
                                                                >
                                                                    <UserX size={18} />
                                                                    Inactive User
                                                                </DropdownMenuItem>
                                                            </>
                                                        )}
                                                        {user.status === Status.BLACKLISTED && (
                                                            <>

                                                                <DropdownMenuItem
                                                                    className="gap-3 py-3 rounded-xl cursor-pointer text-emerald-600 hover:bg-emerald-50 transition-colors font-semibold"
                                                                    onClick={() => handleChangeStatus(String(user._id), Status.ACTIVE)}
                                                                >
                                                                    <UserCheck size={18} />
                                                                    Unblock User
                                                                </DropdownMenuItem>
                                                            </>
                                                        )}
                                                        {user.status === Status.INACTIVE && (
                                                            <>

                                                                <DropdownMenuItem
                                                                    className="gap-3 py-3 rounded-xl cursor-pointer text-emerald-600 hover:bg-emerald-50 transition-colors font-semibold"
                                                                    onClick={() => handleChangeStatus(String(user._id), Status.ACTIVE)}
                                                                >
                                                                    <UserCheck size={18} />
                                                                    Active User
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    className="gap-3 py-3 rounded-xl cursor-pointer text-amber-600 hover:bg-amber-50 transition-colors font-semibold"
                                                                    onClick={() => handleChangeStatus(String(user._id), Status.BLACKLISTED)}
                                                                >
                                                                    <Ban size={18} />
                                                                    Block User
                                                                </DropdownMenuItem>
                                                            </>
                                                        )}

                                                        <DropdownMenuItem
                                                            className="gap-3 py-3 rounded-xl cursor-pointer text-rose-600 hover:bg-rose-50 transition-colors font-semibold"
                                                            onClick={() => { setDeleteUserId(String(user._id)); setDeleteUserPopup(true) }}
                                                        >
                                                            <Trash2 size={18} />
                                                            Delete Account
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </motion.tr>
                                    );
                                })
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>

                {/* ── Footer ── */}
                <div className="px-8 py-6 bg-neutral-50/50 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-neutral-500 font-medium">
                        Showing <span className="text-neutral-900 font-bold">{Math.min((pagination.currentPage - 1) * pagination.limit + 1, pagination.totalUsers)}</span>-
                        <span className="text-neutral-900 font-bold">{Math.min(pagination.currentPage * pagination.limit, pagination.totalUsers)}</span> of
                        <span className="text-neutral-900 font-bold ml-1">{pagination.totalUsers}</span> users
                    </p>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-10 px-4 font-bold rounded-xl bg-white border-neutral-200 hover:bg-neutral-100 disabled:opacity-50 transition-all shadow-sm"
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                        >
                            Previous
                        </Button>
                        <div className="flex items-center gap-1.5 hidden md:flex">
                            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => i + 1).map((pageNum) => (
                                <Button
                                    key={pageNum}
                                    variant="outline"
                                    size="sm"
                                    className={cn(
                                        "h-10 w-10 font-black rounded-xl transition-all shadow-sm",
                                        pagination.currentPage === pageNum
                                            ? "bg-neutral-900 text-white border-neutral-900 shadow-neutral-300"
                                            : "bg-white text-neutral-500 hover:bg-neutral-100 border-neutral-200"
                                    )}
                                    onClick={() => handlePageChange(pageNum)}
                                >
                                    {pageNum}
                                </Button>
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-10 px-4 font-bold rounded-xl bg-white border-neutral-200 hover:bg-neutral-100 disabled:opacity-50 transition-all shadow-sm"
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage === pagination.totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>


            {deleteUserPopup && <div className="fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 flex items-center justify-center ">
                <div className="w-[330px] bg-white p-6 rounded-2xl">
                    <div>
                        <h2 className="text-2xl font-bold">Are you sure you want to delete this user?</h2>
                        <p className="text-sm text-gray-600">This action cannot be undone.</p>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-5">
                        <Button variant="outline" onClick={() => { setDeleteUserPopup(false) }}>Cancel</Button>
                        <Button onClick={() => handleDeleteUser(deleteUserId)} disabled={isDeleting}> {isDeleting ? "Deleting..." : "Yes, delete"}</Button>
                    </div>
                </div>
            </div>}
        </div>
    );
};
