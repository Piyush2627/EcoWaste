import {
	MdRecycling,
	MdTrendingUp,
	MdCloud,
	MdPark,
	MdWaterDrop,
	MdWarning,
	MdWorkspacePremium,
	MdOpenInNew,
	MdAddCircle,
	MdPublic,
	MdMail,
	MdDescription,
	MdHistory,
	MdLightbulbOutline,
	MdCheckCircle,
} from "react-icons/md";

// --- Mock Data ---
const METRICS = [
	{
		id: 1,
		label: "CO2 Saved",
		value: "450 Tons",
		icon: <MdCloud size={24} />,
		bg: "bg-blue-100",
		text: "text-blue-600",
	},
	{
		id: 2,
		label: "Trees Eqv.",
		value: "18,400",
		icon: <MdPark size={24} />,
		bg: "bg-primary/10",
		text: "text-primary",
	},
	{
		id: 3,
		label: "Water Saved",
		value: "2.4M Gal",
		icon: <MdWaterDrop size={24} />,
		bg: "bg-cyan-100",
		text: "text-cyan-600",
	},
	{
		id: 4,
		label: "Toxic Diverted",
		value: "12.5 Tons",
		icon: <MdWarning size={24} />,
		bg: "bg-red-100",
		text: "text-red-600",
	},
];

const MATERIALS = [
	{ id: 1, name: "Plastic", percentage: 42, color: "#11d452" },
	{ id: 2, name: "Copper", percentage: 28, color: "#fb923c" },
	{ id: 3, name: "Aluminum", percentage: 15, color: "#94a3b8" },
	{ id: 4, name: "Gold & Precious Metals", percentage: 5, color: "#facc15" },
];

const LEADERBOARD = [
	{
		id: 1,
		name: "TechCorp Inc.",
		type: "Organization",
		points: "12,450",
		avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=Tech",
	},
	{
		id: 2,
		name: "Sarah Jenkins",
		type: "Individual",
		points: "9,820",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
	},
	{
		id: 3,
		name: "Green School",
		type: "Education",
		points: "8,100",
		avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=School",
	},
];

// NEW CONTENT: Recent Activity
const RECENT_ACTIVITY = [
	{
		id: 1,
		title: "Laptops & Tablets Pickup",
		date: "Today, 10:30 AM",
		weight: "+4.2 kg",
		points: "+120 pts",
	},
	{
		id: 2,
		title: "Cable & Wires Drop-off",
		date: "Oct 12, 2023",
		weight: "+1.5 kg",
		points: "+45 pts",
	},
	{
		id: 3,
		title: "Old Monitors Recycled",
		date: "Oct 05, 2023",
		weight: "+12.0 kg",
		points: "+350 pts",
	},
];

// NEW CONTENT: Eco Tips
const ECO_TIPS = [
	{
		id: 1,
		title: "Battery Disposal",
		desc: "Tape the ends of old batteries before recycling to prevent sparks.",
	},
	{
		id: 2,
		title: "Data Security",
		desc: "Always wipe your hard drives completely before handing over old PCs.",
	},
];

export default function ImpactPage() {
	return (
		<div className="bg-background-light text-slate-900 font-display transition-colors duration-300 min-h-screen">
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<section className="mb-12">
					<div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 md:p-12 text-center shadow-2xl">
						<div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#11d452_0%,transparent_50%)]"></div>
						<div className="relative z-10">
							<span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-primary/20 text-primary rounded-full">
								Global Achievement
							</span>
							<h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
								125,000+ KG
							</h1>
							<p className="text-xl md:text-2xl font-medium text-slate-300 max-w-2xl mx-auto">
								Total E-Waste diverted from landfills through the EcoWaste
								network.
							</p>
							<div className="mt-8 flex flex-wrap justify-center gap-4">
								<div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
									<MdTrendingUp className="text-primary" size={20} />
									<span className="text-white font-semibold">
										+12.5% vs last month
									</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left & Middle Content */}
					<div className="lg:col-span-2 space-y-8">
						{/* Key Metrics Grid */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{METRICS.map(metric => (
								<div
									key={metric.id}
									className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
								>
									<div
										className={`${metric.bg} ${metric.text} p-2 rounded-lg w-fit mb-4`}
									>
										{metric.icon}
									</div>
									<p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
										{metric.label}
									</p>
									<h3 className="text-xl font-bold">{metric.value}</h3>
								</div>
							))}
						</div>

						{/* Chart: Waste Diversion Over Time */}
						<div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
							<div className="flex items-center justify-between mb-8">
								<div>
									<h3 className="text-lg font-bold">Waste Diversion Growth</h3>
									<p className="text-sm text-slate-500">
										Monthly recovery statistics (kg)
									</p>
								</div>
								<select className="bg-slate-50 border-none rounded-lg text-sm font-medium focus:ring-primary outline-none p-2">
									<option>Last 12 Months</option>
									<option>Last 6 Months</option>
								</select>
							</div>
							<div className="h-64 flex items-end justify-between gap-2 px-2">
								{[24, 32, 28, 44, 52, 64, 56, 60, 100].map((height, i) => (
									<div
										key={i}
										className={`w-full rounded-t-lg transition-all duration-500 hover:opacity-80`}
										style={{
											height: `${height}%`,
											backgroundColor: i === 8 ? "#11d452" : "#11d45250",
										}}
									></div>
								))}
							</div>
							<div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
								<span>Jan</span>
								<span>Feb</span>
								<span>Mar</span>
								<span>Apr</span>
								<span>May</span>
								<span>Jun</span>
								<span>Jul</span>
								<span>Aug</span>
								<span>Sep</span>
							</div>
						</div>

						{/* Material Composition Section */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
								<h3 className="text-lg font-bold mb-4">Material Breakdown</h3>
								<div className="space-y-4">
									{MATERIALS.map(mat => (
										<div key={mat.id}>
											<div className="flex justify-between text-sm mb-1.5">
												<span className="font-medium">{mat.name}</span>
												<span className="font-bold">{mat.percentage}%</span>
											</div>
											<div className="w-full bg-slate-100 rounded-full h-2">
												<div
													className="h-2 rounded-full"
													style={{
														width: `${mat.percentage}%`,
														backgroundColor: mat.color,
													}}
												></div>
											</div>
										</div>
									))}
								</div>
							</div>

							<div className="bg-primary/5 p-6 rounded-3xl border border-primary/20 flex flex-col items-center justify-center text-center">
								<MdWorkspacePremium className="text-5xl text-primary mb-4" />
								<h4 className="text-xl font-bold mb-2">Resource Recovery</h4>
								<p className="text-sm text-slate-600">
									Over{" "}
									<span className="text-primary font-bold">
										1.2 kg of pure gold
									</span>{" "}
									has been recovered from microchips this year alone.
								</p>
							</div>
						</div>

						{/* NEW CONTENT SECTION: Recent Activity & Tips */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
								<div className="flex items-center gap-2 mb-4">
									<MdHistory className="text-primary text-xl" />
									<h3 className="text-lg font-bold">Recent Activity</h3>
								</div>
								<div className="space-y-4">
									{RECENT_ACTIVITY.map(activity => (
										<div
											key={activity.id}
											className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 transition-colors border border-slate-50"
										>
											<div className="flex items-center gap-3">
												<MdCheckCircle className="text-primary text-xl" />
												<div>
													<p className="text-sm font-bold text-slate-900">
														{activity.title}
													</p>
													<p className="text-xs text-slate-500">
														{activity.date}
													</p>
												</div>
											</div>
											<div className="text-right">
												<p className="text-sm font-bold text-primary">
													{activity.points}
												</p>
												<p className="text-xs text-slate-500">
													{activity.weight}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>

							<div className="bg-slate-900 text-white p-6 rounded-3xl shadow-sm">
								<div className="flex items-center gap-2 mb-4">
									<MdLightbulbOutline className="text-yellow-400 text-xl" />
									<h3 className="text-lg font-bold">Eco Tips</h3>
								</div>
								<div className="space-y-4">
									{ECO_TIPS.map(tip => (
										<div
											key={tip.id}
											className="bg-white/10 p-4 rounded-xl border border-white/5"
										>
											<p className="text-sm font-bold text-primary mb-1">
												{tip.title}
											</p>
											<p className="text-xs text-slate-300 leading-relaxed">
												{tip.desc}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Right Sidebar (Leaderboard & Personal Impact) */}
					<div className="space-y-8">
						{/* Personal Impact Summary */}
						<div className="bg-primary rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
							<div className="absolute -right-4 -top-4 bg-white/10 w-24 h-24 rounded-full blur-2xl"></div>
							<div className="relative z-10">
								<div className="flex items-center gap-3 mb-6">
									<div className="h-12 w-12 rounded-full border-2 border-white/30 p-0.5 overflow-hidden">
										<img
											alt="Profile"
											className="h-full w-full object-cover rounded-full"
											src="https://api.dicebear.com/7.x/avataaars/svg?seed=User14"
										/>
									</div>
									<div>
										<h4 className="font-bold leading-none">Your Impact</h4>
										<p className="text-xs text-white/70 mt-1">
											Green Member since 2023
										</p>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-4 mb-6">
									<div>
										<p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">
											Diverted
										</p>
										<p className="text-2xl font-black">142 kg</p>
									</div>
									<div>
										<p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">
											Points
										</p>
										<p className="text-2xl font-black">2,850</p>
									</div>
								</div>
								<button className="w-full py-3 bg-white text-primary font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
									View Certificates <MdOpenInNew size={18} />
								</button>
							</div>
						</div>

						{/* Community Leaderboard */}
						<div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
							<div className="p-6 border-b border-slate-100 flex justify-between items-center">
								<h3 className="font-bold">Eco Champions</h3>
								<span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded">
									Monthly
								</span>
							</div>
							<div className="divide-y divide-slate-50">
								{LEADERBOARD.map((user, index) => (
									<div
										key={user.id}
										className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
									>
										<div className="flex items-center gap-3">
											<span className="text-xs font-black text-slate-400 w-4">
												{index + 1}
											</span>
											<div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden">
												<img
													alt={`Rank ${index + 1}`}
													className="object-cover h-full w-full"
													src={user.avatar}
												/>
											</div>
											<div>
												<p className="text-sm font-bold">{user.name}</p>
												<p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
													{user.type}
												</p>
											</div>
										</div>
										<div className="text-right">
											<p className="text-sm font-black text-primary">
												{user.points}
											</p>
											<p className="text-[10px] text-slate-400 font-bold uppercase">
												Pts
											</p>
										</div>
									</div>
								))}
							</div>
							<div className="p-4 bg-slate-50 text-center">
								<button className="text-xs font-bold text-slate-600 hover:text-primary transition-colors">
									View All Leaderboard
								</button>
							</div>
						</div>

						{/* Call to Action */}
						<div className="bg-white p-6 rounded-3xl border-2 border-dashed border-primary/30 flex flex-col items-center text-center">
							<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
								<MdAddCircle size={24} />
							</div>
							<h4 className="font-bold mb-2">Boost your impact?</h4>
							<p className="text-sm text-slate-500 mb-4">
								Schedule your next pickup today and earn double points!
							</p>
							<button className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-primary/20">
								Schedule Now
							</button>
						</div>
					</div>
				</div>
			</main>

			<footer className="bg-white border-t border-slate-100 mt-20 py-12">
				<div className="max-w-7xl mx-auto px-4 text-center">
					<div className="flex items-center justify-center gap-2 mb-6 opacity-50">
						<MdRecycling className="text-primary text-2xl" />
						<span className="text-lg font-bold">EcoWaste</span>
					</div>
					<p className="text-slate-500 text-sm">
						© 2026 EcoWaste Environmental Systems. All rights reserved.
					</p>
					<div className="flex justify-center gap-6 mt-6">
						<a
							className="text-slate-400 hover:text-primary transition-colors"
							href="#public"
						>
							<MdPublic size={20} />
						</a>
						<a
							className="text-slate-400 hover:text-primary transition-colors"
							href="#mail"
						>
							<MdMail size={20} />
						</a>
						<a
							className="text-slate-400 hover:text-primary transition-colors"
							href="#docs"
						>
							<MdDescription size={20} />
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
