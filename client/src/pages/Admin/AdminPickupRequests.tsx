import { useState, useEffect } from "react";
import { MdLocalShipping, MdLocationOn, MdCheck, MdClose, MdRefresh } from "react-icons/md";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

interface PickupRequest {
    _id: string;
    item_type: string;
    weight_kg: number;
    estimated_points: number;
    address: string;
    preferred_date?: string;
    preferred_time?: string;
    notes?: string;
    status: string;
    user_id: string;
}

export default function AdminPickupRequests() {
    const [pickups, setPickups] = useState<PickupRequest[]>([]);
    const [loading, setLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [adjustPoints, setAdjustPoints] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        fetchPickups();
    }, []);

    const fetchPickups = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/pickup-request/all");
            setPickups(res.data);
        } catch (err) {
            toast.error("Failed to load pickup requests.");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (pickupId: string, status: string) => {
        setUpdatingId(pickupId);
        const pointsStr = adjustPoints[pickupId];
        const points = pointsStr ? parseInt(pointsStr) : undefined;

        try {
            await axios.post(`/pickup-request/${pickupId}/status?status=${status}${points !== undefined ? `&points=${points}` : ''}`);
            toast.success(`Request ${status} successfully!`);
            fetchPickups(); // Refresh list
        } catch (err: any) {
            toast.error(err.response?.data?.detail || "Failed to update status.");
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">User Pickup Requests</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage and update statuses for users recycling pickups.</p>
                </div>
                <button 
                    onClick={fetchPickups} 
                    disabled={loading}
                    className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-200 flex items-center gap-2 text-sm font-bold"
                >
                    <MdRefresh className={`${loading && 'animate-spin'}`} size={18} /> Refresh
                </button>
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-400">Loading requests...</div>
            ) : pickups.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400">
                    No pickup requests found.
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {pickups.map(pickup => (
                        <div key={pickup._id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-start shadow-sm transition-all hover:border-slate-200 dark:hover:border-slate-700">
                            <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="p-1.5 bg-primary/10 rounded-lg text-primary">
                                        <MdLocalShipping size={20} />
                                    </span>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{pickup.item_type}</h3>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-1">
                                    <MdLocationOn className="text-slate-400 shrink-0 mt-0.5" /> {pickup.address}
                                </p>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
                                    {pickup.preferred_date && <span>📅 {pickup.preferred_date}</span>}
                                    {pickup.preferred_time && <span>⏰ {pickup.preferred_time}</span>}
                                    <span>⚖️ {pickup.weight_kg}kg</span>
                                    <span className="text-emerald-600">🪙 Allocated: {pickup.estimated_points} pts</span>
                                </div>
                                {pickup.notes && <p className="text-xs italic text-slate-400 mt-2 bg-slate-50 dark:bg-slate-800/50 p-2 rounded border border-slate-100 dark:border-slate-800">Note: {pickup.notes}</p>}
                                <p className="text-[10px] text-slate-400">User ID: {pickup.user_id}</p>
                            </div>

                            <div className="flex flex-col items-end gap-4 ml-4">
                                <span className={`px-3 py-1 text-xs rounded-full font-bold shadow-sm ${
                                    pickup.status.toLowerCase() === "approved" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                                    pickup.status.toLowerCase() === "rejected" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                                    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                }`}>
                                    {pickup.status.toUpperCase()}
                                </span>

                                {pickup.status.toLowerCase() === "pending" && (
                                    <div className="flex flex-col gap-2 items-end w-48">
                                        <div className="flex gap-1 w-full">
                                            <input 
                                                type="number"
                                                placeholder="Set Points"
                                                value={adjustPoints[pickup._id] || ""}
                                                onChange={(e) => setAdjustPoints({ ...adjustPoints, [pickup._id]: e.target.value })}
                                                className="w-full text-xs p-2 rounded border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 text-slate-700 dark:text-white focus:outline-none h-9"
                                            />
                                        </div>
                                        <div className="inline-flex gap-2">
                                            <button 
                                                onClick={() => handleStatusUpdate(pickup._id, "Approved")}
                                                disabled={updatingId === pickup._id}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded-lg text-sm flex items-center justify-center gap-1 font-bold disabled:opacity-50"
                                            >
                                                <MdCheck /> Approve
                                            </button>
                                            <button 
                                                onClick={() => handleStatusUpdate(pickup._id, "Rejected")}
                                                disabled={updatingId === pickup._id}
                                                className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg text-sm flex items-center justify-center gap-1 font-bold disabled:opacity-50"
                                            >
                                                <MdClose /> Reject
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
