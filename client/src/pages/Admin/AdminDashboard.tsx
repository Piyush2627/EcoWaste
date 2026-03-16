import React from "react";
import {


    MdDeleteSweep,
    MdTrendingUp,
    MdPayments,
    MdLocalShipping,
    MdRemove,
    MdGroupAdd,
    MdDescription,
    MdCampaign,
    MdMap,
    MdSupportAgent,
    MdEmojiEvents,
    MdCheckCircle,
    MdHub,
} from "react-icons/md";

const AdminDashboard: React.FC = () => {
    // Mock Data for cleaner JSX rendering
    const metrics = [
        {
            title: "Total Waste Collected",
            value: "1,284 Tons",
            trend: "12%",
            icon: <MdDeleteSweep size={24} />,
            trendIcon: <MdTrendingUp />,
            colorClass: "text-primary",
            bgClass: "bg-primary/10",
            hoverClass: "group-hover:bg-primary",
        },
        {
            title: "Marketplace Revenue",
            value: "$42,500.00",
            trend: "8.2%",
            icon: <MdPayments size={24} />,
            trendIcon: <MdTrendingUp />,
            colorClass: "text-blue-600",
            bgClass: "bg-blue-100",
            hoverClass: "group-hover:bg-blue-600",
        },
        {
            title: "Active Logistics",
            value: "86 Drivers",
            trend: "2%",
            icon: <MdLocalShipping size={24} />,
            trendIcon: <MdRemove />,
            colorClass: "text-orange-600",
            bgClass: "bg-orange-100",
            hoverClass: "group-hover:bg-orange-600",
        },
        {
            title: "User Growth",
            value: "+2,400",
            trend: "15%",
            icon: <MdGroupAdd size={24} />,
            trendIcon: <MdTrendingUp />,
            colorClass: "text-purple-600",
            bgClass: "bg-purple-100",
            hoverClass: "group-hover:bg-purple-600",
        },
    ];

    const recentActivity = [
        {
            id: "#TX-9021",
            type: "Plastic (HDPE)",
            dot: "bg-blue-500",
            qty: "4.2 Tons",
            loc: "North Depot",
            status: "Warehoused",
            statusColor: "bg-green-100 text-green-700",
        },
        {
            id: "#TX-9022",
            type: "Corrugated Cardboard",
            dot: "bg-orange-400",
            qty: "1.8 Tons",
            loc: "Logistics Hub B",
            status: "In Transit",
            statusColor: "bg-blue-100 text-blue-700",
        },
        {
            id: "#TX-9023",
            type: "Metal Scrap",
            dot: "bg-slate-400",
            qty: "12.5 Tons",
            loc: "Industrial Zone 4",
            status: "Pending",
            statusColor: "bg-yellow-100 text-yellow-700",
        },
        {
            id: "#TX-9024",
            type: "Hazardous Waste",
            dot: "bg-red-500",
            qty: "0.4 Tons",
            loc: "Medical Facility C",
            status: "In Transit",
            statusColor: "bg-blue-100 text-blue-700",
        },
    ];

    const topRecyclers = [
        {
            rank: 1,
            name: "Global Logistics Inc.",
            type: "Corporate Member",
            amount: "240 T",
            bgRank: "bg-amber-100 text-amber-700",
        },
        {
            rank: 2,
            name: "City Waste Mgmt",
            type: "Public Partner",
            amount: "195 T",
            bgRank: "bg-slate-100 text-slate-600",
        },
        {
            rank: 3,
            name: "Green Future Ltd.",
            type: "NGO Partner",
            amount: "156 T",
            bgRank: "bg-orange-100/50 text-orange-700",
        },
        {
            rank: 4,
            name: "EcoMotive Corp",
            type: "Corporate Member",
            amount: "120 T",
            bgRank: "bg-slate-100 text-slate-600",
        },
    ];

    return (
        <div className="min-h-screen font-sans bg-background-light text-slate-900">
            {/* Top Navigation Bar */}

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Hero Greeting */}
                <section className="flex flex-col justify-between gap-6 mb-10 md:flex-row md:items-end">
                    <div>
                        <h1 className="mb-2 text-4xl font-black tracking-tight text-slate-900">
                            Welcome back, Director <span className="text-primary">Green</span>{" "}
                            👋
                        </h1>
                        <p className="text-lg text-slate-500">
                            Your operations are running{" "}
                            <span className="font-semibold text-primary">
                                14% more efficiently
                            </span>{" "}
                            this month.
                        </p>
                    </div>

                </section>

                {/* Metric Grid */}
                <section className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2 lg:grid-cols-4">
                    {metrics.map((metric, idx) => (
                        <div
                            key={idx}
                            className="p-6 transition-all bg-white border shadow-sm rounded-2xl border-slate-100 group hover:border-primary/30 hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className={`p-3 rounded-xl transition-colors ${metric.colorClass} ${metric.bgClass} ${metric.hoverClass} group-hover:text-white`}
                                >
                                    {metric.icon}
                                </div>
                                <span
                                    className={`text-sm font-bold flex items-center gap-1 px-2 py-1 rounded-full ${metric.colorClass} bg-slate-50`}
                                >
                                    {metric.trendIcon} {metric.trend}
                                </span>
                            </div>
                            <p className="mb-1 text-sm font-medium tracking-wider uppercase text-slate-500">
                                {metric.title}
                            </p>
                            <h3 className="text-2xl font-black text-slate-900">
                                {metric.value}
                            </h3>
                        </div>
                    ))}
                </section>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column: Table & Impact */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* Environmental Impact Overview */}
                        <div className="relative p-8 overflow-hidden bg-white border shadow-sm rounded-3xl border-slate-100">
                            <div className="relative z-10 flex flex-col items-center gap-12 md:flex-row">
                                <div className="flex-1">
                                    <h2 className="mb-2 text-2xl font-bold">
                                        Environmental Impact
                                    </h2>
                                    <p className="mb-6 text-slate-500">
                                        Real-time carbon offset monitoring based on current waste
                                        processing cycles.
                                    </p>

                                    <div className="space-y-5">
                                        {[
                                            {
                                                label: "CO2 Offset",
                                                val: "450 Tons",
                                                pct: "78%",
                                                color: "bg-primary",
                                            },
                                            {
                                                label: "Water Saved",
                                                val: "2.4M Liters",
                                                pct: "62%",
                                                color: "bg-blue-500",
                                            },
                                            {
                                                label: "Energy Recovered",
                                                val: "128 MWh",
                                                pct: "45%",
                                                color: "bg-orange-400",
                                            },
                                        ].map((stat, i) => (
                                            <div key={i}>
                                                <div className="flex items-center justify-between mb-2 text-sm">
                                                    <span className="flex items-center gap-2">
                                                        <div
                                                            className={`w-3 h-3 rounded-full ${stat.color}`}
                                                        ></div>{" "}
                                                        {stat.label}
                                                    </span>
                                                    <span className="font-bold">{stat.val}</span>
                                                </div>
                                                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${stat.color} transition-all duration-1000 ease-out`}
                                                        style={{ width: stat.pct }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Custom Circle Visualization */}
                                <div className="relative flex items-center justify-center w-48 h-48">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            className="text-slate-100"
                                            cx="96"
                                            cy="96"
                                            fill="transparent"
                                            r="88"
                                            stroke="currentColor"
                                            strokeWidth="12"
                                        ></circle>
                                        <circle
                                            className="text-primary transition-all duration-1000 ease-out"
                                            cx="96"
                                            cy="96"
                                            fill="transparent"
                                            r="88"
                                            stroke="currentColor"
                                            strokeDasharray="552.92"
                                            strokeDashoffset="138"
                                            strokeWidth="12"
                                        ></circle>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                        <span className="text-3xl font-black text-slate-900">
                                            82%
                                        </span>
                                        <span className="text-xs font-bold tracking-widest uppercase text-slate-400">
                                            Efficiency
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Subtle background decoration */}
                            <div className="absolute top-0 right-0 w-64 h-64 -mt-20 -mr-20 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
                        </div>

                        {/* Recent System Activity Table */}
                        <div className="overflow-hidden bg-white border shadow-sm rounded-3xl border-slate-100">
                            <div className="flex items-center justify-between p-6 border-b border-slate-100">
                                <h2 className="text-xl font-bold text-slate-900">
                                    Recent System Activity
                                </h2>
                                <button className="text-sm font-bold transition-colors text-primary hover:text-primary/80 hover:underline">
                                    View All
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-xs font-bold tracking-wider uppercase text-slate-400 bg-slate-50/50">
                                            <th className="px-6 py-4">Transaction ID</th>
                                            <th className="px-6 py-4">Waste Type</th>
                                            <th className="px-6 py-4">Quantity</th>
                                            <th className="px-6 py-4">Location</th>
                                            <th className="px-6 py-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {recentActivity.map((row, i) => (
                                            <tr
                                                key={i}
                                                className="transition-colors hover:bg-slate-50"
                                            >
                                                <td className="px-6 py-4 text-sm font-mono text-slate-500">
                                                    {row.id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 font-medium text-slate-700">
                                                        <span
                                                            className={`w-2.5 h-2.5 rounded-full ${row.dot}`}
                                                        ></span>
                                                        {row.type}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-bold text-slate-700">
                                                    {row.qty}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-500">
                                                    {row.loc}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-3 py-1.5 rounded-full text-xs font-bold ${row.statusColor}`}
                                                    >
                                                        {row.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Quick Actions & Leaderboard */}
                    <div className="space-y-8">
                        {/* Quick Actions */}
                        <div className="p-6 bg-white border shadow-sm rounded-3xl border-slate-100">
                            <h2 className="mb-6 text-xl font-bold text-slate-900">
                                Quick Actions
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    {
                                        label: "Report",
                                        icon: (
                                            <MdDescription className="mb-2 text-2xl transition-transform group-hover:scale-110" />
                                        ),
                                    },
                                    {
                                        label: "Broadcast",
                                        icon: (
                                            <MdCampaign className="mb-2 text-2xl transition-transform group-hover:scale-110" />
                                        ),
                                    },
                                    {
                                        label: "Optimize",
                                        icon: (
                                            <MdMap className="mb-2 text-2xl transition-transform group-hover:scale-110" />
                                        ),
                                    },
                                    {
                                        label: "Support",
                                        icon: (
                                            <MdSupportAgent className="mb-2 text-2xl transition-transform group-hover:scale-110" />
                                        ),
                                    },
                                ].map((action, i) => (
                                    <button
                                        key={i}
                                        className="flex flex-col items-center justify-center p-4 transition-all bg-slate-50 rounded-2xl hover:bg-primary/10 hover:text-primary group text-slate-600"
                                    >
                                        {action.icon}
                                        <span className="text-xs font-bold tracking-tight uppercase">
                                            {action.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Top Recyclers Leaderboard */}
                        <div className="p-6 bg-white border shadow-sm rounded-3xl border-slate-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900">
                                    Top Recyclers
                                </h2>
                                <MdEmojiEvents className="text-2xl text-slate-400" />
                            </div>
                            <div className="space-y-5">
                                {topRecyclers.map((user, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between p-2 transition-colors rounded-xl hover:bg-slate-50"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${user.bgRank}`}
                                            >
                                                {user.rank}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-slate-500">{user.type}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-black text-primary">
                                            {user.amount}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-3 mt-6 font-bold transition-colors border-2 rounded-xl border-slate-50 text-slate-500 hover:bg-slate-50 hover:text-slate-700">
                                View Full Rankings
                            </button>
                        </div>

                        {/* System Health Status */}
                        <div className="relative p-6 overflow-hidden text-white bg-primary rounded-3xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-shadow">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <MdCheckCircle className="text-lg" />
                                    <span className="text-xs font-bold tracking-widest uppercase">
                                        System Health
                                    </span>
                                </div>
                                <p className="mb-2 text-2xl font-black">100% Operational</p>
                                <p className="text-sm text-white/90 leading-relaxed">
                                    All sorting facilities and logistics nodes are currently
                                    active with zero downtime reported today.
                                </p>
                            </div>
                            <MdHub className="absolute text-[150px] opacity-10 -right-8 -bottom-8 transform rotate-12" />
                        </div>
                    </div>
                </div>
            </main>

            <footer className="max-w-360 mx-auto px-6 py-12 text-center text-slate-500 text-sm">
                <div className="flex flex-col items-center justify-between pt-8 border-t md:flex-row border-slate-200">
                    <p className="font-medium">
                        © 2026 EcoWaste Systems. All rights reserved.
                    </p>
                    <div className="flex gap-8 mt-4 font-semibold md:mt-0">
                        <a className="transition-colors hover:text-primary" href="#">
                            Documentation
                        </a>
                        <a className="transition-colors hover:text-primary" href="#">
                            API Keys
                        </a>
                        <a className="transition-colors hover:text-primary" href="#">
                            System Logs
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AdminDashboard;
