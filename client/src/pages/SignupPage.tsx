import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";
import {
	MdExplore,
	MdMailOutline,
	MdLockOutline,
	MdPersonOutline,
	MdArrowForward,
	MdCheckCircle,
	MdArrowBack,
} from "react-icons/md";
import { Link } from "react-router-dom";

function SignupPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			await axios.post("/users/register", {
				full_name: name,
				email: email,
				password: password,
				role: "user", // Default
			});

			toast.success("Account created successfully!");
			navigate("/login");
		} catch (err: any) {
			console.error(err);
			const errorMsg = err.response?.data?.detail || "Registration failed. Try again.";
			toast.error(errorMsg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans antialiased text-slate-900 relative">
			{/* Floating Back Button */}
			<Link to="/" className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all">
				<MdArrowBack className="text-lg text-slate-700" />
				Back to Home
			</Link>

			<main className="flex-1 flex flex-col lg:flex-row items-stretch justify-center  mx-auto w-full">
				{/* Left Side: Onboarding Value Prop */}
				<div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative overflow-hidden bg-emerald-50 border-r border-slate-100">
					<div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
						<div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
					</div>

					<div className="relative z-10">
						<div className="flex items-center gap-2 mb-16">
							<div className="bg-emerald-600 p-2 rounded-lg text-white">
								<MdExplore size={24} />
							</div>
							<span className="text-xl font-bold tracking-tight">EcoWaste</span>
						</div>

						<div className="max-w-md">
							<h2 className="text-5xl font-extrabold leading-[1.1] mb-6 text-slate-900">
								Join the <span className="text-emerald-600">Future</span> of
								Recycling.
							</h2>
							<p className="text-lg text-slate-600 leading-relaxed mb-8">
								Create an account in less than two minutes and start making a
								measurable impact on the environment today.
							</p>

							{/* Trust Indicators */}
							<ul className="space-y-4">
								{[
									"No hidden fees",
									"Real-time impact tracking",
									"Verified recycling partners",
								].map((text, i) => (
									<li
										key={i}
										className="flex items-center gap-3 text-slate-700 font-medium"
									>
										<MdCheckCircle className="text-emerald-600" size={20} />
										{text}
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-6 relative z-10">
						<div className="col-span-2 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-sm italic text-slate-600">
							"EcoWaste transformed how our business handles hardware
							retirement. It's fast, ethical, and the data reports are
							incredible."
							<div className="mt-4 flex items-center gap-3 not-italic">
								<div className="w-10 h-10 rounded-full bg-emerald-200"></div>
								<div>
									<p className="text-sm font-bold text-slate-900">
										Sarah Jenkins
									</p>
									<p className="text-xs text-slate-500">COO at TechFlow</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Right Side: Signup Form */}
				<div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
					<div className="w-full max-w-md">
						<div className="lg:hidden flex items-center gap-2 mb-12">
							<div className="bg-emerald-600 p-1.5 rounded-lg text-white">
								<MdExplore size={20} />
							</div>
							<span className="text-lg font-bold">EcoWaste</span>
						</div>

						<div className="mb-8">
							<h1 className="text-3xl font-bold text-slate-900 mb-3">
								Create an account
							</h1>
							<p className="text-slate-500 font-medium">
								Start your journey toward zero e-waste.
							</p>
						</div>

						<form className="space-y-5" onSubmit={handleSubmit}>
							{/* Full Name */}
							<div>
								<label
									className="block text-sm font-semibold text-slate-700 mb-2"
									htmlFor="name"
								>
									Full Name
								</label>
								<div className="relative group">
									<MdPersonOutline
										className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors"
										size={20}
									/>
									<input
										id="name"
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder="John Doe"
										required
										className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
									/>
								</div>
							</div>

							{/* Email */}
							<div>
								<label
									className="block text-sm font-semibold text-slate-700 mb-2"
									htmlFor="email"
								>
									Work Email
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

							{/* Password */}
							<div>
								<label
									className="block text-sm font-semibold text-slate-700 mb-2"
									htmlFor="password"
								>
									Password
								</label>
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
										placeholder="Min. 8 characters"
										required
										className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
									/>
								</div>
								<p className="mt-2 text-[12px] text-slate-500 ml-1">
									Must include at least one symbol or number.
								</p>
							</div>

							<button 
								type="submit"
								disabled={loading}
								className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2 group mt-4"
							>
								{loading ? "Creating account..." : "Create Account"}
								{!loading && <MdArrowForward className="group-hover:translate-x-1 transition-transform" />}
							</button>
						</form>

						<div className="mt-10 text-center">
							<p className="text-slate-500 text-sm font-medium">
								Already have an account?{" "}
								<Link
									to={"/login"}
									className="text-emerald-600 font-bold hover:underline"
								>
									Log in
								</Link>
							</p>
							<p className="mt-6 text-[11px] text-slate-400 leading-relaxed">
								By clicking "Create Account", you agree to our{" "}
								<a href="#" className="underline">
									Terms of Service
								</a>{" "}
								and{" "}
								<a href="#" className="underline">
									Privacy Policy
								</a>
								.
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default SignupPage;
