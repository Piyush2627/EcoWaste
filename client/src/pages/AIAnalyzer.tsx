import React, { useState } from "react";
import {
    MdCloudUpload,
    MdInsights,
    MdMemory,
    MdDeveloperBoard,
    MdCheckCircle,
    MdWarning,

    MdAutoAwesome
} from "react-icons/md";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";

interface DisposalGuide {
    bin_color: string;
    description: string;
}

interface AnalysisResult {
    item_type: string;
    recommendations: string[];
    disposal_guide: DisposalGuide;
    reword_points?: number;
}

export default function AIAnalyzer() {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [weight, setWeight] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);

    // Pickup Modal States
    const [showPickupModal, setShowPickupModal] = useState<boolean>(false);
    const [address, setAddress] = useState<string>("");
    const [placingPickup, setPlacingPickup] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleAnalyze = async () => {
        if (!image || !weight) {
            return toast.error("Please upload an image and Enter estimated weight!");
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("image", image);
        formData.append("weight_kg", weight);

        try {
            const res = await axios.post("/analyzer/analyze", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setResult(res.data);
            toast.success("Analysis Complete!");
        } catch (err) {
            toast.error("Analysis failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSchedulePickup = async () => {
        if (!address) {
            return toast.error("Please enter a pickup address!");
        }

        setPlacingPickup(true);
        try {
            await axios.post("/pickup-request/create", {
                item_type: result?.item_type || "General E-Waste",
                weight_kg: parseFloat(weight) || 0.0,
                estimated_points: result?.reword_points || 0,
                address: address
            });
            toast.success("Pickup Requested Successfully!");
            setShowPickupModal(false);
            setAddress("");
        } catch (err: any) {
            if (err.response?.status === 401) {
                toast.error("Please log in to schedule a pickup!");
            } else {
                const errorMsg = err.response?.data?.detail || "Failed to place pickup request.";
                toast.error(errorMsg);
            }
        } finally {
            setPlacingPickup(false);
        }
    };

    return (
        <main className="max-w-5xl mx-auto px-4 py-8 md:py-12 font-sans">
            {/* Hero Section */}
            <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 mb-3 tracking-tight">AI E-Waste Analyzer</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">Use our advanced computer vision to identify components and get the best ecological disposal path for your old electronics.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Input Column */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Upload Area */}
                    <div
                        onClick={() => document.getElementById("fileInput")?.click()}
                        className="bg-white dark:bg-slate-900 rounded-xl p-8 border-2 border-dashed border-primary/20 flex flex-col items-center justify-center text-center group hover:border-primary transition-all cursor-pointer relative overflow-hidden h-64"
                    >
                        <input type="file" id="fileInput" className="hidden" accept="image/*" onChange={handleFileChange} />

                        {preview ? (
                            <img src={preview} alt="Upload Preview" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
                        ) : (
                            <>
                                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <MdCloudUpload className="text-4xl text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Upload Device Image</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-xs">Drag and drop or click to browse JPG/PNG files of your component.</p>
                                <button type="button" className="bg-primary text-slate-900 px-6 py-2 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-xl transition-all">
                                    Browse Files
                                </button>
                            </>
                        )}
                    </div>

                    {/* Weight Input */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-primary/10">
                        <label className="block mb-4">
                            <span className="text-slate-900 dark:text-slate-100 font-bold block mb-2">Estimated Weight (kg)</span>
                            <div className="relative">
                                <input
                                    value={weight}
                                    onChange={e => setWeight(e.target.value)}
                                    className="w-full bg-background-light dark:bg-slate-800 border border-primary/20 rounded-lg px-4 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-lg"
                                    placeholder="e.g. 1.5"
                                    step="0.1"
                                    type="number"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">kg</span>
                            </div>
                        </label>
                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-black py-4 rounded-xl flex items-center justify-center gap-2 text-lg shadow-xl shadow-primary/20 transition-all"
                        >
                            <MdAutoAwesome className="text-xl" />
                            {loading ? "Analyzing Device..." : "Analyze Waste"}
                        </button>

                        <div className="relative flex py-3 items-center">
                            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                            <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-wider">OR</span>
                            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                        </div>

                        <button
                            onClick={() => setShowPickupModal(true)}
                            className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm shadow-sm transition-all border border-slate-200 dark:border-slate-700"
                        >
                            Schedule Direct Pickup
                        </button>
                    </div>
                </div>

                {/* AI Insights Panel */}
                <div className="lg:col-span-5">
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 h-full flex flex-col overflow-hidden">
                        <div className="bg-primary/10 px-6 py-4 border-b border-primary/10 flex items-center justify-between">
                            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                <MdInsights className="text-primary text-xl" />
                                AI Analysis Result
                            </h3>
                            <span className="px-2 py-1 rounded bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">{result ? "Processed" : "Ready"}</span>
                        </div>

                        <div className="p-6 flex-grow">
                            {!result ? (
                                <div className="flex flex-col items-center justify-center h-full text-center py-10 opacity-60">
                                    <div className="w-24 h-24 mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                        <MdMemory className="text-5xl text-slate-400" />
                                    </div>
                                    <p className="text-slate-500 font-medium italic">Upload an image and weight to see identification and disposal recommendations.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Identified Item */}
                                    <div className="flex items-start gap-4 p-4 bg-background-light dark:bg-slate-800 rounded-lg border-l-4 border-primary">
                                        <div className="w-12 h-12 rounded bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                                            <MdDeveloperBoard className="text-primary text-2xl" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Identified Type</p>
                                            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">{result.item_type}</h4>
                                        </div>
                                    </div>

                                    {/* Recommendations */}
                                    <div>
                                        <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                                            Tips & Recommendations
                                        </h5>
                                        <ul className="space-y-3">
                                            {result.recommendations.map((rec, idx) => (
                                                <li key={idx} className="flex gap-3 items-start text-sm">
                                                    {idx % 2 === 0 ? <MdCheckCircle className="text-primary text-base" /> : <MdWarning className="text-amber-500 text-base" />}
                                                    <span className="text-slate-600 dark:text-slate-400">{rec}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Disposal Guide */}
                                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">Disposal Guide</h5>
                                        <div className="flex items-center gap-6">
                                            <div className="relative group">
                                                <div
                                                    className={`w-16 h-20 rounded-t-lg relative flex flex-col items-center justify-center text-white overflow-hidden`}
                                                    style={{ backgroundColor: result.disposal_guide.bin_color.toLowerCase() === 'red' ? '#dc2626' : result.disposal_guide.bin_color.toLowerCase() === 'blue' ? '#2563eb' : '#eab308' }}
                                                >
                                                    <MdMemory className="text-3xl" />
                                                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/20"></div>
                                                </div>
                                                <p className="text-[10px] text-center mt-2 font-bold uppercase text-slate-500">{result.disposal_guide.bin_color} Bin</p>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Sort into {result.disposal_guide.bin_color} Bin</p>
                                                <p className="text-xs text-slate-500">{result.disposal_guide.description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Points and Schedule Button */}
                                    {result.reword_points !== undefined && (
                                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                            <div className="flex items-center justify-between bg-primary/5 p-4 rounded-lg border border-primary/10">
                                                <div>
                                                    <p className="text-xs text-slate-500 font-bold uppercase">Estimated Value</p>
                                                    <p className="text-xl font-black text-primary">{result.reword_points} Points</p>
                                                </div>
                                                <button
                                                    onClick={() => setShowPickupModal(true)}
                                                    className="bg-primary text-slate-900 px-4 py-2 rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all"
                                                >
                                                    Schedule Pickup
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pickup Modal */}
            {showPickupModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-xl w-full max-w-md p-6 border border-primary/20 shadow-2xl">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Schedule E-Waste Pickup</h3>
                        <p className="text-slate-500 text-sm mb-4">Our collection partner will come to get your item and verify points layout shortly.</p>

                        <label className="block mb-4">
                            <span className="text-slate-700 dark:text-slate-300 font-bold text-sm block mb-1">Pickup Address</span>
                            <textarea
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none h-24"
                                placeholder="Enter full address where agent can collect your waste..."
                            />
                        </label>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowPickupModal(false)}
                                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-lg text-sm hover:bg-slate-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSchedulePickup}
                                disabled={placingPickup}
                                className="flex-1 bg-primary text-slate-900 font-bold py-3 rounded-lg text-sm shadow-lg shadow-primary/20 hover:bg-primary/90"
                            >
                                {placingPickup ? "Scheduling..." : "Confirm Pickup"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Recent Processing Footer */}
            <section className="mt-16 border-t border-primary/10 pt-12">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-8">Recent E-Waste Processing</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-primary/5 shadow-sm flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=100')" }}></div>
                        <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Motherboard v2</p>
                            <p className="text-xs text-primary">Recycled • 0.8kg</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
