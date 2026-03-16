import { useState, useEffect } from "react";
import { MdRecycling, MdLocalShipping, MdVerifiedUser, MdEco, MdLocationOn, MdFormatListBulleted } from "react-icons/md";
import axios from "../utils/axios";
import toast from "react-hot-toast";

function DirectPickup() {
    const [viewMode, setViewMode] = useState<"request" | "my-pickups">("request");
    const [category, setCategory] = useState("");
    const [weight, setWeight] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("Morning (9:00 - 12:00)");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [myPickups, setMyPickups] = useState<any[]>([]);
    const [loadingPickups, setLoadingPickups] = useState(false);

    useEffect(() => {
        if (viewMode === "my-pickups") {
            fetchMyPickups();
        }
    }, [viewMode]);

    const fetchMyPickups = async () => {
        setLoadingPickups(true);
        try {
            const res = await axios.get("/pickup-request/my-requests");
            setMyPickups(res.data);
        } catch (err) {
            toast.error("Failed to load pickup requests.");
        } finally {
            setLoadingPickups(false);
        }
    };

    const handleRequestPickup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!category || !weight || !address || !date) {
            return toast.error("Please fill in all required fields!");
        }

        setLoading(true);
        try {
            await axios.post("/pickup-request/create", {
                item_type: category,
                weight_kg: parseFloat(weight),
                estimated_points: 0, // Admin will add later
                address: address,
                preferred_date: date,
                preferred_time: time,
                notes: notes
            });

            toast.success("Pickup Requested Successfully!");
            // Reset form
            setCategory("");
            setWeight("");
            setAddress("");
            setDate("");
            setNotes("");
            setViewMode("my-pickups");
        } catch (err: any) {
            if (err.response?.status === 401) {
                toast.error("Please log in to schedule a pickup!");
            } else {
                const errorMsg = err.response?.data?.detail || "Failed to place pickup request.";
                toast.error(errorMsg);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="max-w-[1200px] mx-auto px-6 py-10 w-full animate-fadeIn">
            <div className="mb-10">
                <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Schedule a Pickup</h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg mt-2 font-medium">Responsibly dispose of your electronics. We'll handle the rest.</p>
            </div>

            <div className="flex gap-4 mb-8">
                <button 
                    onClick={() => setViewMode("request")} 
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold border transition-all ${viewMode === 'request' ? 'bg-primary text-slate-900 border-primary shadow-lg shadow-primary/20' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50'}`}
                >
                    <MdLocalShipping size={20} /> Request Pickup
                </button>
                <button 
                    onClick={() => setViewMode("my-pickups")} 
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold border transition-all ${viewMode === 'my-pickups' ? 'bg-primary text-slate-900 border-primary shadow-lg shadow-primary/20' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50'}`}
                >
                    <MdFormatListBulleted size={20} /> My Pickups
                </button>
            </div>

            {viewMode === "request" ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Form Section */}
                <form onSubmit={handleRequestPickup} className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <MdRecycling className="text-primary text-2xl" />
                            Item Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Item Category *</label>
                                <select 
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="form-select w-full rounded-lg border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 focus:ring-primary focus:border-primary text-slate-700 dark:text-slate-200 h-12"
                                    required
                                >
                                    <option value="" disabled>Select category</option>
                                    <option value="Computing (Laptops, PCs, Tablets)">Computing (Laptops, PCs, Tablets)</option>
                                    <option value="Mobile (Smartphones, Wearables)">Mobile (Smartphones, Wearables)</option>
                                    <option value="Home Appliances (Microwaves, Fans)">Home Appliances (Microwaves, Fans)</option>
                                    <option value="Entertainment (TVs, Consoles, Speakers)">Entertainment (TVs, Consoles, Speakers)</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Estimated Weight (kg) *</label>
                                <input 
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="e.g. 5"
                                    className="form-input w-full rounded-lg border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 focus:ring-primary focus:border-primary text-slate-700 dark:text-slate-200 h-12"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Pickup Address *</label>
                                <textarea 
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Street name, building number, apartment/suite..."
                                    rows={3}
                                    className="form-textarea w-full rounded-lg border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 focus:ring-primary focus:border-primary text-slate-700 dark:text-slate-200"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Preferred Date *</label>
                                <input 
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="form-input w-full rounded-lg border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 focus:ring-primary focus:border-primary text-slate-700 dark:text-slate-200 h-12"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Preferred Time</label>
                                <select 
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="form-select w-full rounded-lg border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 focus:ring-primary focus:border-primary text-slate-700 dark:text-slate-200 h-12"
                                >
                                    <option value="Morning (9:00 - 12:00)">Morning (9:00 - 12:00)</option>
                                    <option value="Afternoon (12:00 - 17:00)">Afternoon (12:00 - 17:00)</option>
                                    <option value="Evening (17:00 - 20:00)">Evening (17:00 - 20:00)</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Additional Notes (Optional)</label>
                                <textarea 
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Any gate codes or specific instructions for the driver?"
                                    rows={2}
                                    className="form-textarea w-full rounded-lg border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 focus:ring-primary focus:border-primary text-slate-700 dark:text-slate-200"
                                />
                            </div>
                        </div>

                        <div className="mt-8">
                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-slate-900 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary/20"
                            >
                                <MdLocalShipping className="text-xl" />
                                {loading ? "Requesting..." : "Request Pickup"}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Side Info Panels */}
                <div className="space-y-6">
                    {/* Safety Checklist */}
                    <div className="bg-primary/10 dark:bg-primary/5 rounded-xl border border-primary/20 p-6">
                        <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <MdVerifiedUser className="text-primary text-xl" />
                            Safety Checklist
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="mt-1">
                                    <MdRecycling className="text-primary text-lg" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">Remove Batteries</p>
                                    <p className="text-xs text-slate-500">Ensure all removable batteries are taken out for safe transport.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="mt-1">
                                    <MdRecycling className="text-primary text-lg" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">Wipe Personal Data</p>
                                    <p className="text-xs text-slate-500">Perform a factory reset or wipe drives to protect your privacy.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="mt-1">
                                    <MdRecycling className="text-primary text-lg" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">Pack Securely</p>
                                    <p className="text-xs text-slate-500">Use a box if possible to prevent breakage during transit.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Why it Matters */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 overflow-hidden relative">
                        <div className="relative z-10">
                            <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-3 flex items-center gap-2">
                                <MdEco className="text-primary text-xl" />
                                Why it Matters
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                By recycling your e-waste, you prevent heavy metals from leaching into the soil and enable the recovery of precious materials like gold and copper.
                            </p>
                            <div className="flex items-center gap-4 py-3 border-y border-slate-100 dark:border-slate-800">
                                <div className="flex-1 text-center">
                                    <p className="text-2xl font-black text-primary">95%</p>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Recyclable</p>
                                </div>
                                <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
                                <div className="flex-1 text-center">
                                    <p className="text-2xl font-black text-primary">12kg</p>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">CO2 Saved</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map/Location Context */}
                    <div className="rounded-xl overflow-hidden h-40 relative group border border-slate-200 dark:border-slate-800">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{backgroundImage: "url('https://images.unsplash.com/photo-1526778545894-db880049f392?q=80&w=400&auto=format&fit=crop')"}}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-3 left-4 flex items-center gap-1 text-white">
                            <MdLocationOn className="text-sm" />
                            <span className="text-xs font-bold uppercase tracking-widest">Active in your area</span>
                        </div>
                    </div>
                </div>
            </div>
            ) : (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Pickup History</h2>
                    {loadingPickups ? (
                         <div className="text-center py-12 text-slate-400">Loading pickups...</div>
                    ) : myPickups.length === 0 ? (
                         <div className="text-center py-12 text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">No pickup requests found. Request one now!</div>
                    ) : (
                         <div className="space-y-3">
                             {myPickups.map((pickup: any) => (
                                 <div key={pickup._id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center shadow-sm">
                                     <div>
                                         <h3 className="font-bold text-slate-900 dark:text-white text-lg">{pickup.item_type}</h3>
                                         <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                                             <MdLocationOn className="text-slate-400" /> {pickup.address}
                                         </p>
                                         <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 mt-3 font-medium bg-slate-50 dark:bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-100 dark:border-slate-800 inline-flex">
                                             <span>📅 {pickup.preferred_date}</span>
                                             <span>⏰ {pickup.preferred_time}</span>
                                             <span>⚖️ {pickup.weight_kg}kg</span>
                                         </div>
                                         {pickup.notes && <p className="text-xs italic text-slate-400 mt-2 p-2 bg-slate-50/80 dark:bg-slate-800/80 rounded border border-slate-100/50 dark:border-slate-800/50">Note: {pickup.notes}</p>}
                                     </div>
                                     <div className="flex flex-col items-end gap-2">
                                         <span className={`px-3 py-1 text-xs rounded-full font-bold shadow-sm ${pickup.status === "Approved" || pickup.status === "approved" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : pickup.status === "Rejected" || pickup.status === "rejected" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>
                                             {pickup.status.toUpperCase()}
                                         </span>
                                         {pickup.estimated_points > 0 && <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">🪙 +{pickup.estimated_points} Pts</span>}
                                     </div>
                                 </div>
                             ))}
                         </div>
                    )}
                </div>
            )}
        </main>
    );
}

export default DirectPickup;
