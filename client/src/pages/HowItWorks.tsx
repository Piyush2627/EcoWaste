import React from "react";
import {
	MdRecycling,
	MdSecurity,
	MdBuild,
	MdEco,
	MdVerifiedUser,
	MdInventory,
	MdLoyalty,
	MdCalendarMonth,
	MdLocalShipping,
} from "react-icons/md";

const HowItWorks: React.FC = () => {
	const processSteps = [
		{
			title: "1. Schedule a Pickup",
			desc: "Simply open our app, list your items, and choose a convenient time slot. Our system handles the logistics in seconds.",
			icon: <MdCalendarMonth size={28} />,
			isLeft: false,
		},
		{
			title: "2. Doorstep Collection",
			desc: "A certified EcoWaste driver arrives at your door. We handle the heavy lifting and ensure safe transport to our facility.",
			icon: <MdLocalShipping size={28} />,
			isLeft: true,
		},
		{
			title: "3. Sort & Sanitize",
			desc: "At our facility, every device undergoes military-grade data wiping. Components are then carefully sorted by material type.",
			icon: <MdSecurity size={28} />,
			isLeft: false,
		},
		{
			title: "4. Repair or Recycle",
			desc: "Functioning parts are refurbished and prepared for resale. Non-functional items are processed for raw material extraction.",
			icon: <MdBuild size={28} />,
			isLeft: true,
		},
		{
			title: "5. Marketplace & Impact",
			desc: "Refurbished tech enters our marketplace at accessible prices, while you earn Impact Points for every successful contribution.",
			icon: <MdEco size={28} />,
			isLeft: false,
		},
	];

	const features = [
		{
			title: "Data Security",
			desc: "We provide certified data destruction certificates for every storage device we process.",
			icon: <MdVerifiedUser size={36} className="text-primary" />,
		},
		{
			title: "R2 Certification",
			desc: "Our facilities meet the highest global standards for electronics recycling and worker safety.",
			icon: <MdInventory size={36} className="text-primary" />,
		},
		{
			title: "Impact Rewards",
			desc: "Redeem your points for discounts on the marketplace or donate them to environmental causes.",
			icon: <MdLoyalty size={36} className="text-primary" />,
		},
	];

	return (
		<div className="relative flex flex-col w-full min-h-screen overflow-x-hidden bg-background-light font-display text-slate-900">
			{/* Top Navigation Bar */}

			<main className="flex-1">
				{/* Hero Section */}
				<section className="relative w-full px-6 py-16 lg:px-20">
					<div className="mx-auto max-w-6xl">
						<div
							className="relative flex items-center justify-center p-8 overflow-hidden text-center shadow-2xl bg-slate-900 rounded-3xl min-h-112.5"
							style={{
								backgroundImage:
									'linear-gradient(rgba(16, 34, 22, 0.7) 0%, rgba(16, 34, 22, 0.85) 100%), url("https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=2000")',
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						>
							<div className="relative z-10 max-w-3xl space-y-8">
								<h1 className="text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
									How <span className="text-primary">EcoWaste</span> Works
								</h1>
								<p className="max-w-2xl mx-auto text-lg font-medium text-slate-200 md:text-xl">
									Join the circular economy by responsibly disposing of your
									electronic waste and giving tech a second life.
								</p>
								<div className="pt-6">
									<button className="h-14 px-10 bg-primary text-background-dark rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all">
										Get Started Today
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Process Steps Section */}
				<section className="px-6 py-16 mx-auto max-w-5xl lg:px-20">
					<div className="flex flex-col gap-4 text-center mb-20 md:text-left">
						<h2 className="text-4xl font-black leading-tight text-slate-900">
							The Lifecycle of Your Tech
						</h2>
						<div className="w-24 h-2 rounded-full bg-primary mx-auto md:mx-0"></div>
					</div>

					<div className="relative space-y-16">
						{/* Connecting Line (Desktop) */}
						<div className="absolute hidden w-1 bottom-10 top-10 left-6 md:left-1/2 bg-primary/20 -translate-x-1/2 md:block"></div>

						{processSteps.map((step, index) => (
							<div
								key={index}
								className={`flex flex-col md:flex-row items-center gap-10 relative ${step.isLeft ? "md:flex-row-reverse" : ""}`}
							>
								<div
									className={`w-full md:w-1/2 ${step.isLeft ? "md:text-left" : "md:text-right"}`}
								>
									<div className="p-8 transition-all bg-white border shadow-sm rounded-2xl border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 group">
										<h3 className="mb-3 text-2xl font-bold transition-colors text-slate-900 group-hover:text-primary">
											{step.title}
										</h3>
										<p className="text-lg leading-relaxed text-slate-600">
											{step.desc}
										</p>
									</div>
								</div>

								<div className="z-10 flex items-center justify-center shadow-xl size-16 shrink-0 rounded-full bg-primary text-background-dark ring-8 ring-background-light transition-transform hover:scale-110">
									{step.icon}
								</div>

								<div className="hidden md:block md:w-1/2"></div>
							</div>
						))}
					</div>
				</section>

				{/* Features Grid */}
				<section className="px-6 py-24 mt-12 bg-white border-y border-slate-100 lg:px-20">
					<div className="mx-auto max-w-6xl">
						<h2 className="mb-16 text-4xl font-black text-center text-slate-900">
							Why Choose EcoWaste?
						</h2>
						<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
							{features.map((feature, index) => (
								<div
									key={index}
									className="flex flex-col gap-5 p-8 transition-all border bg-slate-50 rounded-3xl border-slate-100 hover:-translate-y-2 hover:shadow-xl hover:border-primary/20"
								>
									<div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10">
										{feature.icon}
									</div>
									<h3 className="text-xl font-bold text-slate-900">
										{feature.title}
									</h3>
									<p className="text-base leading-relaxed text-slate-600">
										{feature.desc}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Call to Action */}
				<section className="px-6 py-24 text-center bg-primary/5">
					<div className="max-w-3xl mx-auto space-y-8">
						<h2 className="text-4xl font-black leading-tight text-slate-900 md:text-5xl">
							Ready to make a difference?
						</h2>
						<p className="text-xl text-slate-600">
							Start your first pickup today and join thousands of others in
							cleaning up the planet, one device at a time.
						</p>
						<div className="flex flex-col items-center justify-center gap-5 pt-6 sm:flex-row">
							<button className="w-full px-10 py-4 text-lg font-bold transition-all sm:w-auto bg-primary text-background-dark rounded-xl hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1">
								Start Your First Pickup
							</button>
							<button className="w-full px-10 py-4 text-lg font-bold transition-all bg-transparent border-2 sm:w-auto border-primary text-primary rounded-xl hover:bg-primary/10 hover:-translate-y-1">
								Download the App
							</button>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="px-6 py-12 bg-white border-t border-slate-200 lg:px-20">
				<div className="flex flex-col items-center justify-between gap-8 mx-auto max-w-6xl md:flex-row">
					<div className="flex items-center gap-2 text-primary">
						<MdRecycling size={28} />
						<span className="text-xl font-black text-slate-900">EcoWaste</span>
					</div>
					<div className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-slate-500">
						<a className="transition-colors hover:text-primary" href="#">
							Privacy Policy
						</a>
						<a className="transition-colors hover:text-primary" href="#">
							Terms of Service
						</a>
						<a className="transition-colors hover:text-primary" href="#">
							Contact Support
						</a>
					</div>
					<p className="text-sm font-medium text-slate-400">
						© 2026 EcoWaste. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default HowItWorks;
