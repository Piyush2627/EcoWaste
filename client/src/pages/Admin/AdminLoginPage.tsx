import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdVerifiedUser, MdBarChart, MdMailOutline, MdLockOutline, MdVisibility, MdVisibilityOff, MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import { setAuthToken, getUserRole } from "../../utils/auth";
import { toast } from "react-hot-toast";

function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new URLSearchParams();
            formData.append("username", email);
            formData.append("password", password);

            const response = await axios.post("/auth/login", formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });

            setAuthToken(response.data.access_token);
            const role = getUserRole();

            if (role !== "admin") {
                toast.error("Access denied. Admin privileges required.");
                return;
            }

            toast.success("Admin Authentication Successful!");
            navigate("/adminDashboard");
        } catch (err: any) {
            console.error(err);
            toast.error(err.response?.data?.detail || "Invalid Admin Credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f6f8f6] dark:bg-[#102216] font-sans text-slate-900 dark:text-slate-100 min-h-screen flex flex-col relative">
            {/* Floating Back Button */}
            <Link to="/" className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all text-slate-700 dark:text-slate-200">
                <MdArrowBack className="text-lg text-slate-700 dark:text-slate-300" />
                Back to Home
            </Link>

            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Top Navigation Bar */}


                    <main className="flex-1 flex items-center justify-center p-4 md:p-8">
                        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-emerald-500/10">
                            {/* Left Side: Visual/Branding */}
                            <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-wider mb-6">
                                        <MdVerifiedUser size={14} />
                                        Secure Environment
                                    </div>
                                    <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white mb-4">
                                        Central Management System
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md">
                                        Monitor real-time waste processing metrics and manage facility operations across the global network.
                                    </p>
                                </div>
                                <div className="relative z-10 mt-auto">
                                    <div className="flex items-center gap-4 p-4 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-emerald-500/20 backdrop-blur-sm shadow-sm">
                                        <div className="p-2 bg-emerald-500/20 rounded text-emerald-500">
                                            <MdBarChart size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">System Status: Optimal</p>
                                            <p className="text-xs text-slate-500">All nodes operational</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Background Image/Pattern Overlay */}
                                <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent"></div>
                                    <div className="h-full w-full bg-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCDkHn2XNCHCEOEaO17Ibfe2iK2R7EgzSTyGf5FKRWShIFuTlc-SLJSeJg9wq27jhqqq_PRIg8-o98EKQ6YDpzKW_84yWStm4a54RKDrZqXQLGZT3kk2ho9nrQFGxdHB_D9NKkkWxqDoh1Os5vJlCfpuNzof8dhHGKdwScUurOJT8L0JnNd5Y-oo_ZN-Fu_2DhhNJ9PejPpuYmQCOBWanpUHzc77aaFX3BwWDWVHc8EnfVpgcXSd3m5KWIyP6XXYgJKifqB9PNy_A")' }}></div>
                                </div>
                            </div>

                            {/* Right Side: Login Form */}
                            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                                <div className="mb-10 text-center lg:text-left">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Admin Authentication</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Please enter your credentials to access the console</p>
                                </div>
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                            <MdMailOutline size={16} />
                                            Admin Email
                                        </label>
                                        <input
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                                            placeholder="admin@ecowaste.tech"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                                <MdLockOutline size={16} />
                                                Security Key / Password
                                            </label>
                                            <a className="text-xs font-medium text-emerald-500 hover:underline" href="#">Reset Key?</a>
                                        </div>
                                        <div className="relative group">
                                            <input
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                                                placeholder="••••••••••••"
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <button
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        className="w-full bg-emerald-500 hover:bg-emerald-500/90 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:bg-slate-400"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        <MdLockOutline size={20} />
                                        {loading ? "Verifying..." : "Access Control Panel"}
                                    </button>
                                </form>
                                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center justify-center gap-4 text-slate-400">
                                        <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold">
                                            <span className="material-symbols-outlined text-xs">encrypted</span>
                                            256-bit AES
                                        </div>
                                        <div className="w-px h-3 bg-slate-200 dark:bg-slate-700"></div>
                                        <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold">
                                            <span className="material-symbols-outlined text-xs">policy</span>
                                            HIPAA Ready
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    {/* Footer */}
                    <footer className="p-6 text-center text-slate-500 dark:text-slate-500 text-xs">
                        © 2024 EcoWaste Technologies Inc. All Rights Reserved. Authorized personnel only.
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default AdminLoginPage;
