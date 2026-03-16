import { useState } from "react";
import { MdLocalShipping, MdVerifiedUser, MdEco, MdCheckCircle } from "react-icons/md";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UpgradeRole() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            await axios.post("/users/upgrade-role");
            setSuccess(true);
            toast.success("Role upgraded successfully!");
        } catch (err: any) {
            toast.error(err.response?.data?.detail || "Failed to upgrade role.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-full text-emerald-600 dark:text-emerald-400 mb-6 animate-bounce">
                    <MdCheckCircle size={50} />
                </div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Congratulations!</h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
                    You are now a Pickup Driver! 🚚 Please **log out and log back in** to refresh your session access and view your driver dashboard.
                </p>
                <button 
                    onClick={() => navigate("/login")} 
                    className="bg-primary hover:bg-primary/90 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-primary/20 hover:scale-105"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
                <span className="text-sm font-bold uppercase tracking-widest text-primary">Onboarding</span>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mt-1 mb-4">Become a Pickup Driver</h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                    Help your community responsibly recycle electronics while earning points & choosing your execution hours!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    {
                        icon: <MdLocalShipping />,
                        title: "Flexible Schedule",
                        desc: "Choose when you work. View local requests and accept what fits your daily travel paths."
                    },
                    {
                        icon: <MdEco />,
                        title: "Greener Planet",
                        desc: "Be the bridge between discarded hardware and high-grade safe industrial recycling grid."
                    },
                    {
                        icon: <MdVerifiedUser />,
                        title: "Earn Extra",
                        desc: "Earn designated high-yield compensation points per successful shipment collected."
                    }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
                        <div className="flex justify-center text-primary text-3xl mb-4">
                            {item.icon}
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900 dark:bg-primary/5 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border border-slate-800 dark:border-primary/10">
                <div className="relative z-10 max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-4">Ready to drive the change?</h2>
                    <p className="text-slate-400 mb-8 text-sm">By clicking below, your profile type switches instantly into a logistics partner.</p>
                    <button 
                        onClick={handleUpgrade}
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                    >
                        {loading ? "Upgrading..." : "Confirm Driver Upgrade"} <MdLocalShipping size={20} />
                    </button>
                    <p className="text-slate-500 text-[11px] mt-4">You will be prompted to re-login after successful trigger processing.</p>
                </div>
            </div>
        </div>
    );
}
