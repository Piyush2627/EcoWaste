import React from 'react';
import {
    MdDownload,
    MdPersonAdd,
    MdGroup,
    MdVerified,
    MdFilterList,
    MdSettings,
    MdMoreHoriz,
    MdShield
} from 'react-icons/md';
import { fetchUserData } from '../../api/fetchUserData';
import { useQuery } from '@tanstack/react-query';
import type { UserType } from '../../Index.types';





const AdminUserDashboard: React.FC = () => {

    const { data: remoteUsers, isLoading } = useQuery<UserType[]>({
        queryKey: ["user"],
        queryFn: fetchUserData
    });

    // Mock data for cleaner JSX mapping
    const metrics = [
        { title: "Total Users", value: remoteUsers?.length.toString() || "0", icon: <MdGroup className="text-xl" />, iconBg: "bg-primary/10 text-primary", badge: "+4.5%", badgeColor: "text-emerald-600 bg-emerald-50" },
        { title: "Active Today", value: "842", icon: <MdGroup className="text-xl" />, iconBg: "bg-blue-100 text-blue-600", badge: "Live", badgeColor: "text-blue-600 bg-blue-50" },
        { title: "New This Week", value: "+124", icon: <MdPersonAdd className="text-xl" />, iconBg: "bg-purple-100 text-purple-600", badge: "New", badgeColor: "text-purple-600 bg-purple-50" },
        { title: "Top Performers", value: "15 VIPs", icon: <MdVerified className="text-xl" />, iconBg: "bg-amber-100 text-amber-600", badge: "VIP", badgeColor: "text-amber-600 bg-amber-50" },
    ];



    const roleDistribution = [
        { role: "User", percentage: "70%", dotColor: "bg-primary" },
        { role: "Driver", percentage: "20%", dotColor: "bg-blue-500" },
        { role: "Admin", percentage: "10%", dotColor: "bg-slate-300" },
    ];

    const chartHeights = ["40%", "60%", "45%", "75%", "65%", "90%"];
    const chartDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];

    return (
        <div className="relative flex flex-col min-h-screen w-full font-sans bg-background-light text-slate-900 antialiased">
            <main className="flex-1 px-6 py-8 lg:px-12">
                <div className="mx-auto max-w-7xl">

                    {/* Page Header */}
                    <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">User Management</h1>
                            <p className="text-slate-500">Manage, monitor, and configure platform access for all users.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors bg-white border rounded-lg border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm">
                                <MdDownload className="text-lg" />
                                Export User Data
                            </button>
                        </div>
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                        {metrics.map((metric, idx) => (
                            <div key={idx} className="p-6 transition-all bg-white border rounded-xl border-slate-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-2 rounded-lg ${metric.iconBg}`}>
                                        {metric.icon}
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${metric.badgeColor}`}>
                                        {metric.badge}
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-slate-500">{metric.title}</p>
                                <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-8 lg:flex-row">

                        {/* Data Table Section */}
                        <div className="flex-1 overflow-hidden bg-white border shadow-sm rounded-xl border-slate-200">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                                <h3 className="font-bold text-slate-900">Users List</h3>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 transition-colors rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200">
                                        <MdFilterList className="text-lg" />
                                    </button>
                                    <button className="p-2 transition-colors rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200">
                                        <MdSettings className="text-lg" />
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="text-xs font-semibold tracking-wider uppercase bg-slate-50 text-slate-500">
                                        <tr>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Email</th>
                                            <th className="px-6 py-4">Role</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Last Active</th>

                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {isLoading && (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-4 text-center text-slate-500">
                                                    Loading users...
                                                </td>
                                            </tr>
                                        )}
                                        {remoteUsers?.map((ele, idx) => (
                                            <tr key={idx} className="transition-colors group hover:bg-slate-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="bg-center bg-cover rounded-full h-10 w-10 bg-slate-200"
                                                            style={{ backgroundImage: `url('${"https://i.pravatar.cc/150?img=11"}')` }}
                                                        ></div>
                                                        <span className="text-sm font-semibold text-slate-900">{ele.full_name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{ele.email}</td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                                                        {ele.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${"text-emerald-700 bg-emerald-100"}`}>
                                                        <span className={`h-1.5 w-1.5 rounded-full ${"bg-emerald-500"}`}></span>
                                                        {"Active"}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    <button className="p-1 transition-colors rounded-md text-slate-400 hover:text-primary hover:bg-primary/10">
                                                        <MdMoreHoriz className="text-xl" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-white">
                                <span className="text-sm font-medium text-slate-500">Showing 1 to 5 of 5,240 users</span>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 text-sm font-medium transition-colors border rounded-lg border-slate-200 hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                                    <button className="px-3 py-1 text-sm font-medium text-white rounded-lg bg-primary">1</button>
                                    <button className="px-3 py-1 text-sm font-medium transition-colors border rounded-lg border-slate-200 hover:bg-slate-50 text-slate-600">2</button>
                                    <button className="px-3 py-1 text-sm font-medium transition-colors border rounded-lg border-slate-200 hover:bg-slate-50 text-slate-600">3</button>
                                    <button className="px-3 py-1 text-sm font-medium transition-colors border rounded-lg border-slate-200 hover:bg-slate-50 text-slate-600">Next</button>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Insights */}
                        <div className="w-full space-y-8 lg:w-80">

                            {/* User Growth Chart Mockup */}
                            <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
                                <h3 className="mb-4 text-sm font-bold tracking-wider uppercase text-slate-500">User Growth</h3>
                                <div className="relative w-full h-48">
                                    <div className="absolute inset-0 flex items-end gap-2">
                                        {chartHeights.map((height, i) => (
                                            <div key={i} className="w-full transition-all duration-500 rounded-t-sm bg-primary/40 hover:bg-primary" style={{ height }}></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400">
                                    {chartDays.map(day => <span key={day}>{day}</span>)}
                                </div>
                            </div>

                            {/* Role Distribution Pie Chart Mockup */}
                            <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
                                <h3 className="mb-6 text-sm font-bold tracking-wider uppercase text-slate-500">Role Distribution</h3>
                                <div className="flex items-center justify-center py-4">
                                    <div className="relative flex items-center justify-center h-32 w-32">
                                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                                            <circle cx="16" cy="16" fill="transparent" r="14" stroke="#f1f5f9" strokeWidth="4"></circle>
                                            <circle cx="16" cy="16" fill="transparent" r="14" stroke="#11d452" strokeDasharray="70 100" strokeWidth="4"></circle>
                                            <circle cx="16" cy="16" fill="transparent" r="14" stroke="#3b82f6" strokeDasharray="40 100" strokeDashoffset="-70" strokeWidth="4"></circle>
                                        </svg>
                                        <div className="absolute text-center">
                                            <span className="block text-xl font-black text-slate-900">5.2k</span>
                                            <span className="block text-[10px] font-bold tracking-widest text-slate-400">TOTAL</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 space-y-3">
                                    {roleDistribution.map((role, i) => (
                                        <div key={i} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 font-medium text-slate-700">
                                                <div className={`h-2.5 w-2.5 rounded-full ${role.dotColor}`}></div>
                                                <span>{role.role}</span>
                                            </div>
                                            <span className="font-bold text-slate-900">{role.percentage}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Security Alerts Section */}
                            <div className="p-6 border bg-red-50 rounded-xl border-red-100">
                                <div className="flex items-center gap-2 mb-4 text-red-700">
                                    <MdShield className="text-xl" />
                                    <h3 className="text-sm font-bold tracking-wider uppercase">Security Alerts</h3>
                                </div>
                                <p className="text-xs leading-relaxed text-red-600 font-medium">3 accounts flagged for suspicious login patterns. Review pending actions.</p>
                                <button className="w-full py-2.5 mt-5 text-xs font-bold text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700 shadow-sm shadow-red-600/20 hover:shadow-md">
                                    Review Alerts
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminUserDashboard;