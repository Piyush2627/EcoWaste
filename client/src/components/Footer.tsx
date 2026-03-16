function Footer() {
	return (
		<div>
			<footer className="bg-background-light border-t border-neutral-border pt-20 pb-10 px-6 md:px-10 lg:px-40">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
						<div className="space-y-6">
							<div className="flex items-center gap-3">
								<span className="material-symbols-outlined text-primary text-3xl">
									recycling
								</span>
								<h2 className="text-text-main text-xl font-bold tracking-tight">
									EcoWaste
								</h2>
							</div>
							<p className="text-text-muted leading-relaxed">
								Making electronics sustainable for everyone. Recycle, refurbish,
								and reuse with confidence.
							</p>
							<div className="flex gap-4">
								<a
									className="w-10 h-10 rounded-full bg-neutral-soft flex items-center justify-center hover:bg-primary transition-colors"
									href="#"
								>
									<span className="material-symbols-outlined text-text-main">
										public
									</span>
								</a>
								<a
									className="w-10 h-10 rounded-full bg-neutral-soft flex items-center justify-center hover:bg-primary transition-colors"
									href="#"
								>
									<span className="material-symbols-outlined text-text-main">
										share
									</span>
								</a>
								<a
									className="w-10 h-10 rounded-full bg-neutral-soft flex items-center justify-center hover:bg-primary transition-colors"
									href="#"
								>
									<span className="material-symbols-outlined text-text-main">
										alternate_email
									</span>
								</a>
							</div>
						</div>
						<div className="space-y-6">
							<h4 className="text-text-main font-bold uppercase tracking-widest text-xs">
								Platform
							</h4>
							<ul className="space-y-4">
								<li>
									<a
										className="text-text-muted hover:text-primary transition-colors text-sm font-medium"
										href="#"
									>
										Marketplace
									</a>
								</li>
								<li>
									<a
										className="text-text-muted hover:text-primary transition-colors text-sm font-medium"
										href="#"
									>
										Recycling Program
									</a>
								</li>
								<li>
									<a
										className="text-text-muted hover:text-primary transition-colors text-sm font-medium"
										href="#"
									>
										Enterprise Solutions
									</a>
								</li>
								<li>
									<a
										className="text-text-muted hover:text-primary transition-colors text-sm font-medium"
										href="#"
									>
										Certified Refurbishing
									</a>
								</li>
							</ul>
						</div>
						<div className="space-y-6">
							<h4 className="text-text-main font-bold uppercase tracking-widest text-xs">
								Company
							</h4>
							<ul className="space-y-4">
								<li>
									<a
										className="text-text-muted hover:text-primary transition-colors text-sm font-medium"
										href="#"
									>
										About Us
									</a>
								</li>
								<li>
									<a
										className="text-text-muted hover:text-primary transition-colors text-sm font-medium"
										href="#"
									>
										Impact Reports
									</a>
								</li>
								<li>
									<a
										className="text-text-muted hover:text-primary transition-colors text-sm font-medium"
										href="#"
									>
										Careers
									</a>
								</li>
								<li>
									<a
										className="text-text-muted hover:text-primary transition-colors text-sm font-medium"
										href="#"
									>
										Sustainability Pledge
									</a>
								</li>
							</ul>
						</div>
						<div className="space-y-6">
							<h4 className="text-text-main font-bold uppercase tracking-widest text-xs">
								Newsletter
							</h4>
							<p className="text-text-muted text-sm leading-relaxed">
								Stay updated on our impact and new marketplace arrivals.
							</p>
							<div className="flex gap-2">
								<input
									className="bg-neutral-soft border-none rounded-lg focus:ring-1 focus:ring-primary flex-1 text-sm py-3 px-4"
									placeholder="Your email"
									type="email"
								/>
								<button className="bg-primary hover:bg-primary/90 p-3 rounded-lg text-text-main font-bold">
									<span className="material-symbols-outlined">send</span>
								</button>
							</div>
						</div>
					</div>
					<div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-neutral-border gap-6">
						<p className="text-text-muted text-sm">
							© 2024 EcoWaste Platform. All rights reserved.
						</p>
						<div className="flex gap-8">
							<a
								className="text-text-muted hover:text-primary text-xs font-medium transition-colors"
								href="#"
							>
								Privacy Policy
							</a>
							<a
								className="text-text-muted hover:text-primary text-xs font-medium transition-colors"
								href="#"
							>
								Terms of Service
							</a>
							<a
								className="text-text-muted hover:text-primary text-xs font-medium transition-colors"
								href="#"
							>
								Cookies
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default Footer;
