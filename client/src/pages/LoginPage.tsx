import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { setAuthToken, getUserRole } from "../utils/auth";
import { toast } from "react-hot-toast";
import {
    MdBarChart,
    MdExplore,
    MdSettingsSuggest,
    MdMailOutline,


    MdLockOutline,
    MdArrowForward,
    MdArrowBack,
} from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../assets/logo_ecowaste.png";


function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            setAuthToken(response.data.access_token);
            const role = getUserRole();
            toast.success("Login successful!");

            if (role === "admin") {
                navigate("/adminDashboard");
            } else {
                navigate("/");
            }
        } catch (err: any) {
            console.error(err);
            const errorMsg = err.response?.data?.detail || "Incorrect email or password";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        // Clean, light background with a subtle subtle pattern or gradient
        <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans antialiased text-slate-900 relative">
            {/* Floating Back Button */}
            <Link to="/" className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all">
                <MdArrowBack className="text-lg text-slate-700" />
                Back to Home
            </Link>

            <main className="flex-1 flex flex-col lg:flex-row items-stretch justify-center  mx-auto w-full">
                {/* Left Side: Brand & Value Prop Section */}
                <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative overflow-hidden bg-slate-50 border-r border-slate-100">
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-16">
                            <img src={logo} className="w-10 h-10 object-contain" alt="EcoWaste Logo" />

                            <span className="text-xl font-bold tracking-tight">EcoWaste</span>
                        </div>

                        <div className="max-w-md">
                            <h2 className="text-5xl font-extrabold leading-[1.1] mb-6 text-slate-900">
                                Better for the <span className="text-emerald-600">Planet</span>,
                                simpler for you.
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-10">
                                Join the circular economy. Manage your e-waste collections,
                                track your environmental footprint, and trade in the
                                marketplace.
                            </p>
                        </div>
                    </div>

                    {/* Stats/Features Grid */}
                    <div className="grid grid-cols-2 gap-6 relative z-10">
                        {[
                            {
                                icon: <MdExplore />,
                                title: "Sustainable",
                                desc: "Eco-friendly disposal",
                            },
                            {
                                icon: <MdSettingsSuggest />,
                                title: "Effortless",
                                desc: "Automated logistics",
                            },
                            {
                                icon: <MdBarChart />,
                                title: "Analytical",
                                desc: "Real-time impact data",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex gap-4 items-start p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white shadow-sm"
                            >
                                <div className="text-emerald-600 bg-emerald-50 p-2 rounded-xl">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">{item.title}</h4>
                                    <p className="text-xs text-slate-500">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Login Form Section */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
                    <div className="w-full max-w-md">
                        {/* Mobile Logo (Visible only on small screens) */}
                        <div className="lg:hidden flex items-center gap-2 mb-12">
                            <img src={logo} className="w-8 h-8 object-contain" alt="EcoWaste Logo" />

                            <span className="text-lg font-bold">EcoWaste</span>
                        </div>

                        <div className="mb-10">
                            <h1 className="text-3xl font-bold text-slate-900 mb-3">
                                Welcome back
                            </h1>
                            <p className="text-slate-500 font-medium">
                                Please enter your details to sign in.
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    className="block text-sm font-semibold text-slate-700 mb-2"
                                    htmlFor="email"
                                >
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <MdMailOutline
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors"
                                        size={20}
                                    />
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@company.com"
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label
                                        className="text-sm font-semibold text-slate-700"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <a
                                        href="#"
                                        className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                                    >
                                        Forgot?
                                    </a>
                                </div>
                                <div className="relative group">
                                    <MdLockOutline
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors"
                                        size={20}
                                    />
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold rounded-xl shadow-lg shadow-slate-200 transition-all flex items-center justify-center gap-2 group"
                            >
                                {loading ? "Signing in..." : "Sign In"}
                                {!loading && <MdArrowForward className="group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>

                        <p className="mt-10 text-center text-slate-500 text-sm font-medium">
                            Don't have an account?{" "}
                            <Link
                                to={"/signup"}
                                className="text-emerald-600 font-bold hover:underline"
                            >
                                Start for free
                            </Link>
                        </p>

                        <p className="mt-4 text-center text-slate-500 text-sm font-medium border-t border-slate-100 pt-4">
                            Are you an administrator?{" "}
                            <Link
                                to={"/admin/login"}
                                className="text-emerald-600 font-bold hover:underline"
                            >
                                Admin Login
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default LoginPage;
