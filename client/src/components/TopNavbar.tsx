import { MdRecycling, MdLogout, MdDashboard } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, removeAuthToken, getUserRole, decodeToken, getAuthToken } from "../utils/auth";
import { useState, useEffect } from "react";
import logo from "../assets/logo_ecowaste.png";


function TopNavbar() {
	const navigate = useNavigate();
	const location = useLocation();
	const [isAuth, setIsAuth] = useState(isAuthenticated());
	const [showDropdown, setShowDropdown] = useState(false);
	const role = getUserRole();
	
	const token = getAuthToken();
	const decoded = token ? decodeToken(token) : null;
	const userEmail = decoded?.sub || "User";

	useEffect(() => {
		setIsAuth(isAuthenticated());
		setShowDropdown(false); // Close dropdown on route change
	}, [location]);

	const handleLogout = () => {
		removeAuthToken();
		setIsAuth(false);
		setShowDropdown(false);
		navigate("/login");
	};

	return (
		<div>
			<header className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-md border-b border-neutral-border px-6 md:px-10 lg:px-40 py-4">
				<div className="max-w-7xl mx-auto flex items-center justify-between">
					<div className="flex items-center gap-8">
						<Link to={"/"}>
							<div className="flex items-center gap-3">
								<img src={logo} className="w-8 h-8 object-contain" alt="EcoWaste Logo" />
								<h2 className="text-text-main text-xl font-bold tracking-tight">

									EcoWaste
								</h2>
							</div>
						</Link>

						<nav className="hidden md:flex items-center gap-8">
							<Link
								className="text-text-main text-sm font-medium hover:text-primary transition-colors"
								to="/marketplace"
							>
								Marketplace
							</Link>

							{isAuth && (
								<>
									<Link
										className="text-text-main text-sm font-medium hover:text-primary transition-colors"
										to="/ai-analyzer"
									>
										AI Analyzer
									</Link>

									<Link
										className="text-text-main text-sm font-medium hover:text-primary transition-colors"
										to="/schedule-pickup"
									>
										Schedule Pickup
									</Link>
								</>
							)}

							<Link
								className="text-text-main text-sm font-medium hover:text-primary transition-colors"
								to="/how-it-work"
							>
								How it Works
							</Link>

							<Link
								className="text-text-main text-sm font-medium hover:text-primary transition-colors"
								to="/impact"
							>
								Impact
							</Link>

							<Link
								className="text-text-main text-sm font-medium hover:text-primary transition-colors"
								to="/about"
							>
								About
							</Link>
						</nav>
					</div>
					<div className="flex items-center gap-4 lg:gap-6">
						{!isAuth ? (
							<Link to="/login">
								<button className="bg-primary hover:bg-primary/90 text-text-main text-sm font-bold px-5 py-2.5 rounded-lg transition-all">
									Get Started
								</button>
							</Link>
						) : (
							<div className="relative">
								<button 
									onClick={() => setShowDropdown(!showDropdown)}
									className="w-10 h-10 rounded-full bg-neutral-soft flex items-center justify-center overflow-hidden border border-neutral-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all hover:opacity-90"
								>
									<img
										className="w-full h-full object-cover"
										alt="User Profile"
										src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
									/>
								</button>

								{/* Dropdown Menu */}
								{showDropdown && (
									<div className="absolute right-0 mt-2 w-56 bg-background-light dark:bg-slate-900 rounded-xl border border-neutral-border shadow-xl backdrop-blur-md overflow-hidden z-[100] animate-fadeIn">
										<div className="p-4 border-b border-neutral-border">
											<p className="text-xs text-slate-400 font-bold">Logged in as</p>
											<p className="text-sm font-black text-text-main truncate max-w-full">{userEmail}</p>
											<span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase">
												{role || "User"}
											</span>
										</div>
										
										<div className="py-1">
											{role === "admin" && (
												<Link 
													to="/adminDashboard" 
													className="flex items-center gap-2 px-4 py-2 text-sm text-text-main hover:bg-neutral-soft transition-all"
												>
													<MdDashboard className="text-lg text-primary" />
													Admin Dashboard
												</Link>
											)}
											{role === "pickuppatner" && (
												<Link 
													to="/driverDashboard" 
													className="flex items-center gap-2 px-4 py-2 text-sm text-text-main hover:bg-neutral-soft transition-all"
												>
													<MdDashboard className="text-lg text-primary" />
													Driver Dashboard
												</Link>
											)}
											<Link 
												to="/ai-analyzer" 
												className="flex items-center gap-2 px-4 py-2 text-sm text-text-main hover:bg-neutral-soft transition-all md:hidden"
											>
												<MdRecycling className="text-lg text-primary" />
												AI Analyzer
											</Link>
										</div>

										<div className="border-t border-neutral-border py-1">
											<button 
												onClick={handleLogout}
												className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-500/5 transition-all text-left"
											>
												<MdLogout className="text-lg" />
												Logout
											</button>
										</div>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</header>
		</div>
	);
}

export default TopNavbar;
