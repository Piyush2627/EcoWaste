import { useState, useEffect } from "react";
import { MdLocalShipping, MdCheckCircle, MdTrendingUp } from "react-icons/md";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

export default function DriverDashboard() {
    const [stats, setStats] = useState({ active: 0, completed: 0, points: 0 });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/pickup-request/all");
            const all = res.data;
            const active = all.filter((p: any) => p.status.toLowerCase() === "accepted").length;
            const completed = all.filter((p: any) => p.status.toLowerCase() === "pickedup").length;
            const points = all.filter((p: any) => p.status.toLowerCase() === "pickedup").reduce((sum: number, p: any) => sum + p.estimated_points, 0);
            
            setStats({ active, completed, points });
        } catch (err) {
            toast.error("Failed to load driver stats.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">Driver Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Overview of your pickup log performance benchmarks.</p>
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-400">Loading stats...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <MdLocalShipping />,
                                label: "Active Pickups",
                                value: stats.active,
                                color: "bg-blue-500"
                            },
                            {
                                icon: <MdCheckCircle />,
                                label: "Completed",
                                value: stats.completed,
                                color: "bg-emerald-500"
                            },
                            {
                                icon: <MdTrendingUp />,
                                label: "Points Generated",
                                value: `${stats.points} pts`,
                                color: "bg-purple-500"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-sm">
                                <div className="space-y-1">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white">{item.value}</p>
                                </div>
                                <div className={`p-3 rounded-xl text-white ${item.color} shadow-lg shadow-current/20 text-xl`}>
                                    {item.icon}
                                    {item.icon}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm text-center py-16">
                         <p className="text-slate-400 text-sm">Select 'Pickup Requests' from sidebar to accept driving tasks!</p>
                    </div>
                </>
            )}
        </div>
    );
}
