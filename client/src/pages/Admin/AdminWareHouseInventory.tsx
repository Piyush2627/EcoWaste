import React from "react";
import {

    MdFileDownload,
    MdSwapHoriz,
    MdLocationOn,
    MdCategory,
    MdInventory,
    MdFilterAltOff,
    MdMonitorWeight,
    MdTrendingUp,
    MdStorage,
    MdStar,
    MdWarning,
    MdLocalShipping,
    MdSchedule,
    MdMemory,
    MdMonitor,
    MdDeveloperBoard,
    MdBatteryChargingFull,
    MdMoreVert,
    MdChevronLeft,
    MdChevronRight,
    MdLightbulb,
    MdArrowForward,
} from "react-icons/md";

const AdminWareHouseInventory: React.FC = () => {
    // Mock data for cleaner JSX mapping
    const metrics = [
        {
            title: "Total Inventory",
            value: "1,240.5 Tons",
            icon: <MdMonitorWeight className="text-xl" />,
            subtext: "+5.2% vs last month",
            subIcon: <MdTrendingUp />,
            subColor: "text-primary",
        },
        {
            title: "Capacity Used",
            value: "68.4%",
            icon: <MdStorage className="text-xl" />,
            isProgress: true,
            progressValue: 68.4,
        },
        {
            title: "High-Value Items",
            value: "428 Units",
            icon: <MdStar className="text-xl" />,
            subtext: "12 Require QC check",
            subIcon: <MdWarning />,
            subColor: "text-amber-500",
        },
        {
            title: "Pending Shipments",
            value: "12 Active",
            icon: <MdLocalShipping className="text-xl" />,
            subtext: "3 Dispatching today",
            subIcon: <MdSchedule />,
            subColor: "text-primary",
        },
    ];

    const inventoryItems = [
        {
            name: "Intel Core i7 Gen 8",
            category: "Motherboards",
            location: "North Depot",
            quantity: "140 Units",
            condition: "Grade A",
            conditionColor: "bg-green-100 text-green-800",
            icon: <MdMemory />,
        },
        {
            name: "Dell P2419H Panels",
            category: "Screens",
            location: "Industrial Zone 4",
            quantity: "85 Units",
            condition: "For Scrap",
            conditionColor: "bg-amber-100 text-amber-800",
            icon: <MdMonitor />,
        },
        {
            name: "DDR4 8GB RAM Sticks",
            category: "RAM",
            location: "North Depot",
            quantity: "1,200 Units",
            condition: "Grade A",
            conditionColor: "bg-green-100 text-green-800",
            icon: <MdDeveloperBoard />,
        },
        {
            name: "Li-Ion Battery Packs",
            category: "E-Waste",
            location: "Central Processing",
            quantity: "2.4 Tons",
            condition: "Hazardous",
            conditionColor: "bg-red-100 text-red-800",
            icon: <MdBatteryChargingFull />,
        },
    ];

    const capacities = [
        { name: "North Depot", value: 92, color: "bg-red-500" },
        { name: "Industrial Zone 4", value: 45, color: "bg-primary" },
        { name: "Central Processing", value: 78, color: "bg-amber-400" },
        { name: "East Logistics Hub", value: 22, color: "bg-primary" },
    ];

    return (
        <div className="relative flex flex-col w-full min-h-screen overflow-x-hidden font-sans bg-background-light text-slate-900">
            <main className="flex flex-col w-full max-w-[1280px] px-10 py-8 mx-auto flex-1">
                {/* Page Header */}
                <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900">
                            Warehouse Inventory
                        </h1>
                        <p className="text-base font-normal text-slate-500">
                            Real-time stock monitoring and distribution across all active
                            depots.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center justify-center gap-2 h-10 px-4 text-sm font-bold transition-colors bg-white border rounded-lg border-primary/20 text-slate-700 shadow-sm hover:bg-primary/5">
                            <MdFileDownload className="text-lg" />
                            <span>Export Report</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 h-10 px-6 text-sm font-bold text-white transition-all bg-primary rounded-lg shadow-lg shadow-primary/20 hover:brightness-105 hover:-translate-y-0.5">
                            <MdSwapHoriz className="text-xl" />
                            <span>Move Inventory</span>
                        </button>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap gap-3 p-4 mb-8 bg-white border shadow-sm rounded-xl border-primary/10">
                    <div className="flex items-center flex-1 min-w-[200px] gap-2 px-3 py-2 border border-transparent rounded-lg bg-primary/5 focus-within:border-primary/30 transition-colors">
                        <MdLocationOn className="text-xl text-primary" />
                        <select className="w-full text-sm font-medium bg-transparent border-none text-slate-700 focus:ring-0 outline-none">
                            <option>All Warehouse Locations</option>
                            <option>North Depot</option>
                            <option>Industrial Zone 4</option>
                            <option>Central Processing</option>
                        </select>
                    </div>
                    <div className="flex items-center flex-1 min-w-[200px] gap-2 px-3 py-2 border border-transparent rounded-lg bg-primary/5 focus-within:border-primary/30 transition-colors">
                        <MdCategory className="text-xl text-primary" />
                        <select className="w-full text-sm font-medium bg-transparent border-none text-slate-700 focus:ring-0 outline-none">
                            <option>All Waste Types</option>
                            <option>E-Waste</option>
                            <option>Plastic Scrap</option>
                            <option>Metal Components</option>
                        </select>
                    </div>
                    <div className="flex items-center flex-1 min-w-[200px] gap-2 px-3 py-2 border border-transparent rounded-lg bg-primary/5 focus-within:border-primary/30 transition-colors">
                        <MdInventory className="text-xl text-primary" />
                        <select className="w-full text-sm font-medium bg-transparent border-none text-slate-700 focus:ring-0 outline-none">
                            <option>Stock Level: Any</option>
                            <option>Critical (&lt; 10%)</option>
                            <option>Low (&lt; 30%)</option>
                            <option>Optimal (30-80%)</option>
                        </select>
                    </div>
                    <button className="flex items-center justify-center px-4 transition-colors rounded-lg bg-slate-100 text-slate-500 hover:text-primary hover:bg-primary/10">
                        <MdFilterAltOff className="text-xl" />
                    </button>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 gap-4 mb-10 sm:grid-cols-2 lg:grid-cols-4">
                    {metrics.map((metric, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col gap-3 p-6 bg-white border shadow-sm transition-all rounded-xl border-primary/10 hover:shadow-md hover:border-primary/30 hover:-translate-y-1"
                        >
                            <div className="flex items-start justify-between">
                                <p className="text-sm font-medium text-slate-500">
                                    {metric.title}
                                </p>
                                <div className="p-1.5 rounded-lg text-primary bg-primary/10">
                                    {metric.icon}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-2xl font-bold text-slate-900">
                                    {metric.value}
                                </p>

                                {metric.isProgress ? (
                                    <div className="w-full h-1.5 mt-3 overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className="h-full bg-primary"
                                            style={{ width: `${metric.progressValue}%` }}
                                        ></div>
                                    </div>
                                ) : (
                                    <p
                                        className={`flex items-center gap-1 mt-1 text-xs font-semibold ${metric.subColor}`}
                                    >
                                        {metric.subIcon}
                                        {metric.subtext}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Data Table Section */}
                    <div className="flex flex-col gap-4 lg:col-span-2">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold leading-tight text-slate-900">
                                Live Inventory Status
                            </h2>
                            <span className="text-xs font-medium text-slate-400">
                                Updated 2 minutes ago
                            </span>
                        </div>

                        <div className="overflow-x-auto bg-white border shadow-sm rounded-xl border-primary/10">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b bg-primary/5 border-primary/10">
                                        <th className="px-4 py-3 text-xs font-bold tracking-wider uppercase text-slate-500">
                                            Item Name
                                        </th>
                                        <th className="px-4 py-3 text-xs font-bold tracking-wider uppercase text-slate-500">
                                            Category
                                        </th>
                                        <th className="px-4 py-3 text-xs font-bold tracking-wider uppercase text-slate-500">
                                            Location
                                        </th>
                                        <th className="px-4 py-3 text-xs font-bold tracking-wider uppercase text-slate-500">
                                            Quantity
                                        </th>
                                        <th className="px-4 py-3 text-xs font-bold tracking-wider uppercase text-slate-500">
                                            Condition
                                        </th>
                                        <th className="px-4 py-3 text-xs font-bold tracking-wider text-right uppercase text-slate-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-primary/5">
                                    {inventoryItems.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="transition-colors hover:bg-primary/5 group"
                                        >
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center justify-center rounded size-8 bg-slate-100 text-slate-500">
                                                        {item.icon}
                                                    </div>
                                                    <span className="text-sm font-semibold text-slate-900">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-slate-600">
                                                {item.category}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-slate-600">
                                                {item.location}
                                            </td>
                                            <td className="px-4 py-4 text-sm font-bold text-slate-900">
                                                {item.quantity}
                                            </td>
                                            <td className="px-4 py-4">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold ${item.conditionColor}`}
                                                >
                                                    {item.condition}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <button className="transition-colors text-slate-400 hover:text-primary group-hover:bg-white p-1 rounded-md">
                                                    <MdMoreVert className="text-xl" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                            <p className="text-sm text-slate-500">Showing 4 of 248 items</p>
                            <div className="flex gap-2">
                                <button className="flex items-center justify-center w-8 h-8 transition-colors bg-white border rounded border-primary/20 text-slate-500 hover:bg-primary/5">
                                    <MdChevronLeft className="text-lg" />
                                </button>
                                <button className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white border rounded bg-primary border-primary/20">
                                    1
                                </button>
                                <button className="flex items-center justify-center w-8 h-8 transition-colors bg-white border rounded border-primary/20 text-slate-500 hover:bg-primary/5">
                                    2
                                </button>
                                <button className="flex items-center justify-center w-8 h-8 transition-colors bg-white border rounded border-primary/20 text-slate-500 hover:bg-primary/5">
                                    3
                                </button>
                                <button className="flex items-center justify-center w-8 h-8 transition-colors bg-white border rounded border-primary/20 text-slate-500 hover:bg-primary/5">
                                    <MdChevronRight className="text-lg" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Side Cards */}
                    <div className="flex flex-col gap-6">
                        {/* Storage Capacity */}
                        <div className="p-6 bg-white border shadow-sm rounded-xl border-primary/10">
                            <h3 className="mb-6 text-lg font-bold text-slate-900">
                                Storage Capacity
                            </h3>
                            <div className="space-y-6">
                                {capacities.map((cap, i) => (
                                    <div key={i}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-slate-700">
                                                {cap.name}
                                            </span>
                                            <span className="text-sm font-bold text-slate-900">
                                                {cap.value}%
                                            </span>
                                        </div>
                                        <div className="w-full h-2 overflow-hidden rounded-full bg-slate-100">
                                            <div
                                                className={`h-full ${cap.color}`}
                                                style={{ width: `${cap.value}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-2.5 mt-8 text-sm font-bold transition-colors border rounded-lg text-primary border-primary/20 hover:bg-primary/5">
                                View Capacity Reports
                            </button>
                        </div>

                        {/* Recent Activities / Quick Insight */}
                        <div className="p-6 border bg-primary/10 rounded-xl border-primary/20">
                            <div className="flex items-center gap-2 mb-4 text-primary">
                                <MdLightbulb className="text-xl" />
                                <h3 className="font-bold">Eco Insight</h3>
                            </div>
                            <p className="text-sm leading-relaxed text-slate-700">
                                North Depot is nearing full capacity. Consider rerouting
                                incoming electronic scrap to{" "}
                                <strong className="text-slate-900">East Logistics Hub</strong>{" "}
                                to optimize processing times and reduce bottleneck risks.
                            </p>
                            <div className="flex flex-col gap-2 mt-5">
                                <a
                                    className="flex items-center gap-1 text-xs font-bold underline transition-colors text-primary hover:text-primary/80 underline-offset-4"
                                    href="#"
                                >
                                    Optimize routing now
                                    <MdArrowForward className="text-sm" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="px-10 py-6 mt-auto text-center border-t border-primary/10 bg-white">
                <p className="text-xs font-medium text-slate-500">
                    © 2026 EcoWaste Solutions. All rights reserved. Version 2.4.1-stable
                </p>
            </footer>
        </div>
    );
};

export default AdminWareHouseInventory;
