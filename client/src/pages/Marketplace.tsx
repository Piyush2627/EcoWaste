import { useState, useEffect } from "react";
import {

    MdAddCircle,
    MdGridView,
    MdMemory,
    MdVideocam,
    MdSave,
    MdMonitor,
    MdKeyboard,
    MdClose,
    MdShoppingBag,
    MdEnergySavingsLeaf,
    MdLocalOffer
} from "react-icons/md";
import axios from "../utils/axios";
import { useProducts } from "../api/fetchProduct";
import React from "react";
import { toast } from "react-hot-toast";
import { isAuthenticated } from "../utils/auth";
interface EwasteListing {
    _id: string;
    title: string;
    description: string;
    weight_kg: number;
    category: string;
    condition: string;
    points_rewarded: number;
    status: string;
}

interface Category {
    id: string;
    name: string;
    icon: React.ReactNode;
}

// --- Constants ---
const CATEGORIES: Category[] = [
    { id: "all", name: "All Items", icon: <MdGridView size={20} /> },
    { id: "CPU", name: "Processors", icon: <MdMemory size={20} /> },
    { id: "GPU", name: "Graphics Cards", icon: <MdVideocam size={20} /> },
    { id: "Storage", name: "Storage", icon: <MdSave size={20} /> },
    { id: "Monitor", name: "Monitors", icon: <MdMonitor size={20} /> },
    { id: "Peripherals", name: "Peripherals", icon: <MdKeyboard size={20} /> },
];

export default function Marketplace() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<"store" | "my-listings">("store");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Listings/Product sets
    const { data: products = [], refetch: refetchProducts } = useProducts();
    const [myListings, setMyListings] = useState<EwasteListing[]>([]);
    const [userPoints, setUserPoints] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    // Form inputs for selling
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "CPU",
        weight_kg: "",
        condition: "used" as "used" | "refurbished" | "broken"
    });

    useEffect(() => {
        if (isAuthenticated()) {
            fetchUserPoints();
            fetchMyListings();
        }
    }, []);

    const fetchUserPoints = async () => {
        try {
            const res = await axios.get("/users/me");
            setUserPoints(res.data.reward_points || 0);
        } catch (err) {
            console.error(err);
        }
    };


    const fetchMyListings = async () => {
        try {
            const res = await axios.get("/marketplace/ewaste/my-listings");
            setMyListings(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handlePurchase = async (productId: string, points: number) => {
        if (!isAuthenticated()) {
            return toast.error("Please login to make a purchase");
        }

        if (userPoints < points) {
            return toast.error("Insufficient points balance!");
        }

        try {
            await axios.post(`/marketplace/products/${productId}/purchase`);
            toast.success("Purchase successful! Product reserved.");
            fetchUserPoints();
            refetchProducts();
        } catch (err: any) {
            toast.error(err.response?.data?.detail || "Purchase failed");
        }
    };

    const handleListSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated()) {
            return toast.error("Please login to submit recycling requests");
        }

        setLoading(true);

        try {
            if (!formData.title || !formData.weight_kg) {
                toast.error("Please fill required fields");
                setLoading(false);
                return;
            }

            await axios.post("/marketplace/ewaste/list", {
                ...formData,
                weight_kg: parseFloat(formData.weight_kg)
            });

            toast.success("E-waste listing submitted successfully!");
            setIsModalOpen(false);
            setFormData({ title: "", description: "", category: "CPU", weight_kg: "", condition: "used" });
            fetchMyListings();
        } catch (err) {
            toast.error("Failed to submit listing");
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter((p: any) => p.description.toLowerCase().includes(selectedCategory.toLowerCase()) || p.title.toLowerCase().includes(selectedCategory.toLowerCase()));

    const mockStats = { communitySaved: "14 Tons" };

    return (
        <div className="bg-background-light font-sans text-slate-900 min-h-screen">
            <div className="relative flex flex-col overflow-x-hidden">
                <main className="max-w-7xl mx-auto w-full px-4 md:px-10 lg:px-12 py-8">
                    {/* Hero State */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                                Eco Rewards Marketplace
                            </h1>
                            <p className="text-slate-600 mt-1">
                                Exchange old electronics for points, spend on verified green components.
                            </p>
                            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-sm font-bold">
                                🪙 Your Balance: <span className="text-emerald-800 text-base">{userPoints} Points</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setViewMode(viewMode === "store" ? "my-listings" : "store")}
                                className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold px-5 py-3 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
                            >
                                <MdLocalOffer size={22} /> {viewMode === "store" ? "My Listings" : "Browse Store"}
                            </button>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center justify-center gap-2 bg-primary text-slate-900 font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                            >
                                <MdAddCircle size={24} /> Recycle E-waste
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {viewMode === "store" && (
                            <aside className="w-full lg:w-64 shrink-0">
                                <div className="flex flex-col gap-2">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                                        Categories
                                    </p>
                                    {CATEGORIES.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-medium group ${selectedCategory === cat.id
                                                ? "bg-primary text-slate-900 font-semibold shadow-md shadow-primary/20"
                                                : "hover:bg-primary/10 text-slate-600 hover:text-primary"
                                                }`}
                                        >
                                            <span className={`${selectedCategory !== cat.id && "text-slate-400 group-hover:text-primary"} transition-colors`}>
                                                {cat.icon}
                                            </span>
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </aside>
                        )}

                        <div className="flex-1">
                            {viewMode === "store" ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredProducts.map((product: any) => (
                                        <div key={product._id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
                                            <div className="aspect-video w-full bg-slate-200 relative overflow-hidden flex items-center justify-center">
                                                {product.image_url ? (
                                                    <img alt={product.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" src={product.image_url} />
                                                ) : (
                                                    <MdShoppingBag className="text-6xl text-slate-400" />
                                                )}
                                                <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg">
                                                    STOCK: {product.stock}
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">{product.title}</h3>
                                                    <span className="text-lg font-black text-emerald-600">🪙 {product.price_points}</span>
                                                </div>
                                                <p className="text-xs text-slate-500 mb-5 leading-relaxed line-clamp-2">{product.description}</p>
                                                <button
                                                    onClick={() => handlePurchase(product._id, product.price_points)}
                                                    disabled={product.stock <= 0}
                                                    className={`w-full py-3 ${product.stock > 0 ? 'bg-primary hover:bg-primary/90 text-slate-900' : 'bg-slate-300 text-slate-500 cursor-not-allowed'} font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group/btn`}
                                                >
                                                    <MdShoppingBag className="text-lg" />
                                                    {product.stock > 0 ? "Purchase with Points" : "Out of Stock"}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="text-lg font-bold text-slate-900">My Recycling Requests</h2>
                                    </div>

                                    {myListings.length === 0 && <div className="text-center py-12 text-slate-400">No recycling request found. Create one now!</div>}
                                    {myListings.map(listing => (
                                        <div key={listing._id} className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center shadow-sm">
                                            <div>
                                                <h3 className="font-semibold text-slate-800">{listing.title}</h3>
                                                <p className="text-xs text-slate-500 mt-1">{listing.description}</p>
                                                <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 block">{listing.category} | {listing.weight_kg}kg | {listing.condition}</span>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <span className={`px-3 py-1 text-xs rounded-full font-bold ${listing.status === "approved" ? "bg-emerald-100 text-emerald-700" : listing.status === "rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                                                    {listing.status.toUpperCase()}
                                                </span>
                                                <span className="text-xs font-bold text-emerald-600">🪙 +{listing.points_rewarded} Pts</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                <div className="fixed bottom-6 right-6 z-40 hidden md:block">
                    <div className="bg-slate-900 text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-3">
                        <MdEnergySavingsLeaf className="text-primary text-xl" />
                        <span className="text-sm font-bold tracking-tight">Community E-waste Saved: {mockStats.communitySaved}</span>
                    </div>
                </div>

                {/* Form Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-primary/20 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-primary/5">
                                <h2 className="text-lg font-bold text-slate-900">Recycle Your Tech</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-primary transition-colors"><MdClose size={24} /></button>
                            </div>

                            <form className="p-6 flex flex-col gap-4" onSubmit={handleListSubmit}>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Item Name</label>
                                    <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="p-2 rounded-lg border border-slate-200 focus:ring-primary focus:border-primary text-sm outline-none" placeholder="e.g. Broken Laptop, Graphics Card" type="text" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Est. Weight (kg)</label>
                                        <input value={formData.weight_kg} onChange={e => setFormData({ ...formData, weight_kg: e.target.value })} className="p-2 rounded-lg border border-slate-200 focus:ring-primary focus:border-primary text-sm outline-none" placeholder="2.5" type="number" step="0.1" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                                        <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="p-2 rounded-lg border border-slate-200 focus:ring-primary focus:border-primary text-sm outline-none">
                                            <option value="CPU">CPU</option>
                                            <option value="GPU">GPU</option>
                                            <option value="Peripherals">Peripherals</option>
                                            <option value="Monitor">Monitor</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Condition</label>
                                    <div className="flex gap-2">
                                        {["used", "refurbished", "broken"].map(cond => (
                                            <button key={cond} type="button" onClick={() => setFormData({ ...formData, condition: cond as typeof formData.condition })} className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${formData.condition === cond ? 'border-primary bg-primary text-slate-900' : 'border-slate-200 text-slate-500'}`}>{cond.toUpperCase()}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                                    <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="p-2 rounded-lg border border-slate-200 focus:ring-primary focus:border-primary text-sm outline-none" placeholder="Add some details about its condition..." rows={3}></textarea>
                                </div>
                                <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-bold py-3 rounded-xl shadow-lg mt-2 transition-colors">{loading ? "Submitting..." : "Submit for Points Estimation"}</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
