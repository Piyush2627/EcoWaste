import React from "react";
import { Link } from "react-router-dom";
import {
    HiOutlineEye,
    HiOutlineLightBulb,
    HiOutlineUserGroup,
    HiOutlineGlobeAlt,
    HiOutlineEnvelope,
    HiOutlineShare,
} from "react-icons/hi2";
import { FaLeaf } from "react-icons/fa6";

const AboutPage: React.FC = () => {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-slate-100">
            {/* Navigation Header */}

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative flex h-125 items-center justify-center overflow-hidden lg:h-150">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 z-10 bg-linear-to-b from-background-dark/70 via-background-dark/50 to-background-dark/90"></div>
                        <img
                            className="h-full w-full object-cover transform scale-105 motion-safe:animate-pulse-slow"
                            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80"
                            alt="Lush green forest"
                        />
                    </div>
                    <div className="relative z-20 mx-auto max-w-4xl px-4 text-center">
                        <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
                            Our Mission for a <span className="text-primary">Greener</span>{" "}
                            Future
                        </h1>
                        <p className="mx-auto mb-10 max-w-2xl text-lg font-normal text-white/90 md:text-xl">
                            Revolutionizing e-waste management through sustainable recycling
                            and a circular marketplace for a cleaner tomorrow.
                        </p>
                        <button className="transform rounded-xl bg-primary px-10 py-4 text-lg font-bold text-background-dark transition-all hover:scale-105 hover:bg-primary/90 active:scale-95">
                            Discover Our Impact
                        </button>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="bg-background-light py-24 px-6 dark:bg-background-dark lg:px-40">
                    <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 items-center">
                        <div className="space-y-6">
                            <span className="text-sm font-bold uppercase tracking-widest text-primary">
                                Founded in 2023
                            </span>
                            <h2 className="text-3xl font-bold md:text-4xl">
                                How It All Started
                            </h2>
                            <div className="space-y-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                                <p>
                                    EcoWaste was born from a simple but urgent realization: the
                                    digital age is leaving behind a toxic legacy. As technology
                                    advances at an unprecedented pace, the mountain of discarded
                                    electronics continues to grow.
                                </p>
                                <p>
                                    We set out to bridge the gap between discarded electronics and
                                    environmental preservation. Our founders envisioned a world
                                    where no gadget ends up in a landfill, but instead finds a
                                    second life.
                                </p>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="aspect-video overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                                <img
                                    className="h-full w-full object-cover"
                                    src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80"
                                    alt="E-waste recycling process"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-primary p-8 shadow-xl lg:block transform transition-transform group-hover:-translate-y-2">
                                <p className="text-4xl font-black text-background-dark">50k+</p>
                                <p className="font-bold text-background-dark/80">
                                    Devices Diverted
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className="bg-primary/5 py-24 px-6 lg:px-40">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                                Our Core Values
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                The principles that guide every decision we make.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    icon: <FaLeaf />,
                                    title: "Sustainability",
                                    desc: "Prioritizing the planet in every part of our operations and logistics.",
                                },
                                {
                                    icon: <HiOutlineEye />,
                                    title: "Transparency",
                                    desc: "Full visibility into where your recycled tech goes and how it's processed.",
                                },
                                {
                                    icon: <HiOutlineLightBulb />,
                                    title: "Innovation",
                                    desc: "Using cutting-edge tech to track and optimize the e-waste lifecycle.",
                                },
                                {
                                    icon: <HiOutlineUserGroup />,
                                    title: "Community",
                                    desc: "Empowering local communities with affordable, refurbished technology.",
                                },
                            ].map((value, idx) => (
                                <div
                                    key={idx}
                                    className="group rounded-2xl border border-primary/10 bg-background-light p-8 transition-all hover:border-primary/50 hover:shadow-xl dark:bg-background-dark"
                                >
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-background-dark">
                                        <span className="text-3xl">{value.icon}</span>
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
                                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                        {value.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Leadership Team */}
                <section className="bg-background-light py-24 px-6 dark:bg-background-dark lg:px-40">
                    <div className="mx-auto mb-16 max-w-7xl text-center">
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                            Our Leadership
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            The minds behind the green revolution.
                        </p>
                    </div>
                    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-12 sm:grid-cols-2">
                        {[
                            {
                                name: "Pooja Rathod",
                                role: "CEO & Founder",
                                img: "/team/founder_0.jpg",
                            },
                            {
                                name: "Piyush",
                                role: "Co-Founder",
                                img: "/team/founder_1.jpg",
                            },
                        ].map((member, idx) => (
                            <div key={idx} className="flex flex-col items-center group">
                                <div className="mb-6 h-48 w-48 overflow-hidden rounded-full ring-4 ring-primary/20 transition-all group-hover:ring-primary">
                                    <img
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        src={member.img}
                                        alt={member.name}
                                    />
                                </div>
                                <h4 className="text-xl font-bold">{member.name}</h4>
                                <p className="text-sm font-medium text-primary">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-6 lg:px-40">
                    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-background-dark p-12 text-center md:p-20">
                        <div className="pointer-events-none absolute inset-0 opacity-20">
                            <div className="absolute top-0 left-0 h-64 w-64 bg-primary blur-[120px]"></div>
                            <div className="absolute bottom-0 right-0 h-64 w-64 bg-primary blur-[120px]"></div>
                        </div>
                        <div className="relative z-10">
                            <h2 className="mb-8 text-4xl font-black text-white md:text-5xl">
                                Ready to Make an Impact?
                            </h2>
                            <p className="mx-auto mb-12 max-w-2xl text-lg text-white/70 md:text-xl">
                                Join thousands of eco-conscious users today and help us
                                transition the world to a circular economy.
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <Link to="/become-driver" className="rounded-xl bg-primary px-10 py-4 text-lg font-bold text-background-dark transition-all hover:bg-primary/90 hover:scale-105 flex items-center justify-center">
                                    Be a pickup driver
                                </Link>
                                <button className="rounded-xl border border-white/20 px-10 py-4 text-lg font-bold text-white transition-all hover:bg-white/10">
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-primary/10 bg-background-light py-20 px-6 dark:bg-background-dark lg:px-40">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-2 text-primary">
                                <h2 className="text-xl font-bold">EcoWaste</h2>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Pioneering the future of electronics recycling and sustainable
                                technology management.
                            </p>
                            <div className="flex gap-4">
                                {[HiOutlineGlobeAlt, HiOutlineEnvelope, HiOutlineShare].map(
                                    (Icon, i) => (
                                        <a
                                            key={i}
                                            href="#"
                                            className="text-slate-400 transition-colors hover:text-primary text-xl"
                                        >
                                            <Icon />
                                        </a>
                                    ),
                                )}
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-6 font-bold">Marketplace</h4>
                            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                                <li>
                                    <a className="hover:text-primary transition-colors" href="#">
                                        Shop Refurbished
                                    </a>
                                </li>
                                <li>
                                    <a className="hover:text-primary transition-colors" href="#">
                                        Sell Your Tech
                                    </a>
                                </li>
                                <li>
                                    <a className="hover:text-primary transition-colors" href="#">
                                        Trade-in Program
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-6 font-bold">Company</h4>
                            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                                <li>
                                    <a className="font-bold text-primary" href="#">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a className="hover:text-primary transition-colors" href="#">
                                        Impact Report
                                    </a>
                                </li>
                                <li>
                                    <a className="hover:text-primary transition-colors" href="#">
                                        Careers
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-6 font-bold">Newsletter</h4>
                            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                                Stay updated on our initiatives.
                            </p>
                            <div className="flex flex-col gap-2">
                                <input
                                    className="rounded-lg border-primary/20 bg-primary/5 px-4 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    placeholder="Your email"
                                    type="email"
                                />
                                <button className="rounded-lg bg-primary py-2 text-sm font-bold text-background-dark hover:bg-primary/90 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between gap-4 border-t border-primary/10 pt-8 text-xs text-slate-500 md:flex-row">
                        <p>
                            © {new Date().getFullYear()} EcoWaste Inc. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a className="hover:text-primary transition-colors" href="#">
                                Privacy Policy
                            </a>
                            <a className="hover:text-primary transition-colors" href="#">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutPage;
