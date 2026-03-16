import HomePageHeader from "../assets/images/HomePageHeroSection1.png";
import { 
  MdEco, 
  MdCalendarToday, 
  MdVerifiedUser, 
  MdPublishedWithChanges, 
  MdArrowForward,
  MdShoppingCart,
  MdNature,
  MdHub,
  MdSpa,
  MdBolt,
  MdInventory2,
  MdToken
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useProducts } from "../api/fetchProduct";

function Homepage() {
    const { data: products = [], isLoading: loading } = useProducts();

	return (
		<div>
			<main>
				<section className="px-6 md:px-10  py-12 md:py-12 max-w-7xl mx-auto ">
					<div className="flex flex-col lg:flex-row gap-12 items-center">
						<div className="flex-1 flex flex-col gap-8">
							<div className="space-y-4">
								<span className="inline-block px-3 py-1 bg-primary/20 text-text-main text-xs font-bold uppercase tracking-widest rounded-full">
									Sustainable Tech Solutions
								</span>
								<h1 className="text-text-main text-4xl md:text-6xl font-black leading-[1.1] tracking-tight">
									Give your tech a{" "}
									<span className="text-primary">second life</span>
								</h1>
								<p className="text-text-muted text-lg md:text-xl leading-relaxed max-w-lg">
									The most trusted marketplace and management platform for
									e-waste. Recycle responsibly or find premium refurbished
									components.
								</p>
							</div>
							<div className="flex flex-wrap gap-4">
								<Link to="/schedule-pickup">
									<button className="bg-primary hover:bg-primary/90 text-text-main text-base font-bold px-8 py-4 rounded-xl shadow-lg shadow-primary/20 transition-all">
										Start Recycling
									</button>
								</Link>
								<Link to="/marketplace">
									<button className="bg-neutral-soft hover:bg-neutral-border text-text-main text-base font-bold px-8 py-4 rounded-xl transition-all">
										Browse Marketplace
									</button>
								</Link>
							</div>
							<div className="flex items-center gap-4 pt-4">
								<div className="flex -space-x-3">
									<img
										className="w-10 h-10 rounded-full border-2 border-background-light"
										data-alt="Satisfied customer headshot"
										src="https://lh3.googleusercontent.com/aida-public/AB6AXuAendbm5GyqIYynhlMmQputXaANhbShDM0bZuexwYqqg7aCM-WJfD62_Dk_rHwgTEs_VbqAa7Vg-jmtennm6fu5N_BRRwyJhqn9IK5q4g30XndXzuQAd-pTNEiQrG_pz0sCKXdz5ZCF0SnRikszqOgwYc92mxqqShAtONfp_bB2cUk4GjevNXMoqM_05se8BiNsnGv7dIj3_bbnV-CEjx7oKmzjdndyqbggsFoc612LBnk_xcb4iVlnBkbE7eIp-FGH5uLQ2CWJpQ"
									/>
									<img
										className="w-10 h-10 rounded-full border-2 border-background-light"
										data-alt="Eco-friendly tech enthusiast"
										src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjd7TbZCIFnuT9G8A5n_b7bWM4NrTWxhlPVzkjG1xvP7AjMQsawFxzBDO0D54t6zeg9ex_DOsq-ko9sei02Sd312bhWOaOPQlJ6pGHuCl9aVqp7Ma-abKI2di5rPT8yDSZrl7SmJuUR1226fTkFVc1v9qLUN-YrKKDjbztAnbtcCGmLt5vgEnppxkBqmmZa5o-NviUjzB4nWjs1ex9QWQFu_TFhKZlSCvWuICsusfmE7pOCem_mnsJ-oTNVpk4bmX8Y3-x_r4ucw"
									/>
									<img
										className="w-10 h-10 rounded-full border-2 border-background-light"
										data-alt="Community member profile photo"
										src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxJbeuYVvxk7be5d2i1OEf0725KQAg_R-coUpsJFrhJMswu1GpXmatqNh5iLjvwhNISookf24P3k6TptTdpZkhdlshvjI0b0XYbUua6HK9uRe5O3ML7-upmPxPJJRjcbetlHqR-VAbWpgvX_srLyZgGEX_SJXEwir9jQcoJn1rDC7mzLVCRMIznQWU7gTVPak-_DFv3R_6OrpEyyQV4gY6rYBlhuKka2gCeMgmp6zFZHA6Vtb8st2wRAyxJB7-wqekloEUREnQ6g"
									/>
								</div>
								<p className="text-text-muted text-sm font-medium">
									Joined by{" "}
									<span className="text-text-main font-bold">10k+</span> green
									tech advocates
								</p>
							</div>
						</div>
						<div className="flex-1 w-full relative">
							<div className="aspect-square rounded-4xl overflow-hidden relative z-10">
								<img
									className="w-full h-full object-cover "
									data-alt="Close up of high quality electronic circuit components"
									src={HomePageHeader}
								/>
							</div>
							<div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 border border-neutral-border hidden sm:block">
								<div className="flex items-center gap-4">
									<div className="p-3 bg-primary/20 rounded-lg">
										<MdEco className="text-primary text-2xl" />
									</div>
									<div>
										<p className="text-text-main font-bold text-xl">4.2 Tons</p>
										<p className="text-text-muted text-xs uppercase font-bold tracking-wider">
											E-Waste Diverted
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="bg-neutral-soft/30 py-20 px-6 md:px-10 lg:px-40">
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-16">
							<h2 className="text-text-main text-3xl md:text-4xl font-black mb-4">
								How it Works
							</h2>
							<p className="text-text-muted max-w-2xl mx-auto text-lg">
								We make electronic waste management simple, transparent, and
								rewarding for everyone.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="flex flex-col gap-6 p-8 rounded-2xl bg-white border border-neutral-border hover:shadow-xl transition-shadow group">
								<div className="w-14 h-14 bg-neutral-soft rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
									<MdCalendarToday className="text-text-main text-3xl" />
								</div>
								<div className="space-y-3">
									<h3 className="text-text-main text-xl font-bold">
										1. Schedule Pickup
									</h3>
									<p className="text-text-muted leading-relaxed">
										Book a convenient time through our app for us to collect
										your old or broken devices right from your doorstep.
									</p>
								</div>
							</div>
							<div className="flex flex-col gap-6 p-8 rounded-2xl bg-white border border-neutral-border hover:shadow-xl transition-shadow group">
								<div className="w-14 h-14 bg-neutral-soft rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
									<MdVerifiedUser className="text-text-main text-3xl" />
								</div>
								<div className="space-y-3">
									<h3 className="text-text-main text-xl font-bold">
										2. Eco-Friendly Processing
									</h3>
									<p className="text-text-muted leading-relaxed">
										Our certified partner facilities ensure zero-landfill
										processing with secure data destruction for all recycled
										devices.
									</p>
								</div>
							</div>
							<div className="flex flex-col gap-6 p-8 rounded-2xl bg-white border border-neutral-border hover:shadow-xl transition-shadow group">
								<div className="w-14 h-14 bg-neutral-soft rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
									<MdPublishedWithChanges className="text-text-main text-3xl" />
								</div>
								<div className="space-y-3">
									<h3 className="text-text-main text-xl font-bold">
										3. Re-sell or Recycle
									</h3>
									<p className="text-text-muted leading-relaxed">
										Devices are either refurbished for our secondary marketplace
										or carefully dismantled to extract valuable raw materials.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="py-20 px-6 md:px-10 lg:px-40 max-w-7xl mx-auto">
					<div className="flex items-end justify-between mb-12">
						<div className="space-y-2">
							<h2 className="text-text-main text-3xl md:text-4xl font-black">
								Featured Tech
							</h2>
							<p className="text-text-muted">
								Save up to 60% on high-quality refurbished components.
							</p>
						</div>
						<Link
							className="text-primary font-bold flex items-center gap-2 hover:underline"
							to="/marketplace"
						>
							View Marketplace{" "}
							<MdArrowForward className="text-xl" />
						</Link>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loading ? (
                            <div className="col-span-4 text-center py-20 text-slate-400 font-bold">Loading featured components...</div>
                        ) : products.length === 0 ? (
                            <div className="col-span-4 text-center py-20 text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-neutral-border">No products available.</div>
                        ) : products.slice(0, 4).map((product: any) => (
                            <div key={product._id} className="rounded-2xl border border-neutral-border overflow-hidden bg-white hover:border-primary hover:shadow-xl transition-all duration-300 group flex flex-col">
                                <div className="aspect-[4/3] relative overflow-hidden bg-neutral-soft flex-shrink-0">
                                    <img
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt={product.title}
                                        src={product.image_url || "https://images.unsplash.com/photo-1540959733332-e94e2708f08d?auto=format&fit=crop&q=80"}
                                    />
                                    <span className="absolute top-3 left-3 bg-primary text-text-main text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">
                                        Verified
                                    </span>
                                </div>
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div className="space-y-1">
                                        <h4 className="text-text-main font-black text-base truncate group-hover:text-primary transition-colors">
                                            {product.title}
                                        </h4>
                                        <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                                            {product.description}
                                        </p>
                                    </div>
                                    <div className="space-y-3 mt-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-emerald-500 font-extrabold text-lg">
                                                🪙 {product.price_points}
                                            </span>
                                            <span className="text-[11px] font-bold text-text-muted bg-neutral-soft px-2 py-0.5 rounded-full">
                                                Stock: {product.stock}
                                            </span>
                                        </div>
                                        <button className="w-full py-2.5 bg-neutral-soft hover:bg-primary hover:text-text-main text-text-main font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-sm group-hover:shadow-md">
                                            <MdShoppingCart className="text-lg" /> Buy now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
					</div>
				</section>
				<section className="py-20 px-6 md:px-10 lg:px-40 bg-background-dark text-slate-100 overflow-hidden relative">
					<div className="max-w-7xl mx-auto relative z-10">
						<div className="flex flex-col lg:flex-row gap-16 items-center">
							<div className="flex-1 space-y-8">
								<h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
									Our{" "}
									<span className="text-primary text-glow">
										Environmental Impact
									</span>{" "}
									since 2022
								</h2>
								<p className="text-slate-400 text-lg leading-relaxed max-w-xl">
									Every device we recycle or re-sell contributes directly to a
									healthier planet. We track every gram of material saved from
									landfills.
								</p>
								<div className="grid grid-cols-2 gap-8">
									<div className="space-y-2">
										<h4 className="text-3xl font-black text-primary">
											125,000+
										</h4>
										<p className="text-slate-400 font-medium uppercase tracking-widest text-xs">
											Devices Recycled
										</p>
									</div>
									<div className="space-y-2">
										<h4 className="text-3xl font-black text-primary">8,400</h4>
										<p className="text-slate-400 font-medium uppercase tracking-widest text-xs">
											Trees Equivalent Saved
										</p>
									</div>
									<div className="space-y-2">
										<h4 className="text-3xl font-black text-primary">15.2M</h4>
										<p className="text-slate-400 font-medium uppercase tracking-widest text-xs">
											Litres Water Saved
										</p>
									</div>
									<div className="space-y-2">
										<h4 className="text-3xl font-black text-primary">
											450 tons
										</h4>
										<p className="text-slate-400 font-medium uppercase tracking-widest text-xs">
											CO2 Emissions Diverted
										</p>
									</div>
								</div>
							</div>
							<div className="flex-1 w-full flex justify-center">
								<div className="w-full max-w-md aspect-square rounded-full border border-primary/30 flex items-center justify-center relative">
									<div className="w-[85%] h-[85%] rounded-full border border-primary/50 flex items-center justify-center">
										<div className="w-[70%] h-[70%] rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
											<MdNature className="text-primary text-8xl" />
										</div>
									</div>
									<div className="absolute top-10 left-10 w-12 h-12 bg-primary rounded-full blur-xl opacity-20"></div>
									<div className="absolute bottom-10 right-10 w-20 h-20 bg-primary rounded-full blur-2xl opacity-10"></div>
								</div>
							</div>
						</div>
					</div>
					<div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-primary/5 to-transparent"></div>
				</section>
				<section className="py-16 px-6 md:px-10 lg:px-40 border-b border-neutral-border">
					<div className="max-w-7xl mx-auto">
						<p className="text-center text-text-muted font-bold uppercase tracking-[0.2em] text-xs mb-10">
							Trusted by sustainable leaders
						</p>
						<div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
							<div className="flex items-center gap-2">
								<MdHub className="text-3xl" />
								<span className="font-black text-xl">TECHCORP</span>
							</div>
							<div className="flex items-center gap-2">
								<MdSpa className="text-3xl" />
								<span className="font-black text-xl">ECOGREEN</span>
							</div>
							<div className="flex items-center gap-2">
								<MdBolt className="text-3xl" />
								<span className="font-black text-xl">CIRCUIT</span>
							</div>
							<div className="flex items-center gap-2">
								<MdInventory2 className="text-3xl" />
								<span className="font-black text-xl">RELOGIC</span>
							</div>
							<div className="flex items-center gap-2">
								<MdToken className="text-3xl" />
								<span className="font-black text-xl">FUTURE</span>
							</div>
						</div>
					</div>
				</section>
				<section className="py-24 px-6 md:px-10 lg:px-40 max-w-7xl mx-auto text-center">
					<div className="bg-primary rounded-[3rem] p-12 md:p-20 relative overflow-hidden group">
						<div className="relative z-10 max-w-2xl mx-auto space-y-8">
							<h2 className="text-text-main text-4xl md:text-5xl font-black tracking-tight leading-tight">
								Ready to clean up your tech drawer?
							</h2>
							<p className="text-text-main/80 text-lg font-medium">
								Join thousands of others in the fight against e-waste while
								getting paid or finding great deals.
							</p>
							<div className="flex flex-wrap justify-center gap-4">
								<button className="bg-text-main text-white hover:bg-black px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl">
									Get Started Now
								</button>
								<button className="bg-white/30 text-text-main hover:bg-white/50 px-10 py-5 rounded-2xl font-bold text-lg transition-all">
									Learn More
								</button>
							</div>
						</div>
						<div className="absolute -top-24 -left-24 w-64 h-64 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-colors"></div>
						<div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors"></div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default Homepage;
