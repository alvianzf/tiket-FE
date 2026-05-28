import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const NoCommitment = () => {
    const { t } = useTranslation();

    // Inline custom SVG Icons
    const ZeroSignupsIcon = () => (
        <svg className="w-10 h-10 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
    );

    const ZeroCommitmentIcon = () => (
        <svg className="w-10 h-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
    );

    const PrivacyFirstIcon = () => (
        <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    );

    const SpamFreeIcon = () => (
        <svg className="w-10 h-10 text-cta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
        </svg>
    );

    const features = [
        {
            title: t('home.no_signups_title'),
            desc: t('home.no_signups_desc'),
            icon: <ZeroSignupsIcon />,
            bgColor: "bg-blue-500/10",
            hoverBorder: "hover:border-primary-light/40"
        },
        {
            title: t('home.zero_commitment_title'),
            desc: t('home.zero_commitment_desc'),
            icon: <ZeroCommitmentIcon />,
            bgColor: "bg-secondary/10",
            hoverBorder: "hover:border-secondary/40"
        },
        {
            title: t('home.privacy_first_title'),
            desc: t('home.privacy_first_desc'),
            icon: <PrivacyFirstIcon />,
            bgColor: "bg-emerald-500/10",
            hoverBorder: "hover:border-emerald-500/40"
        },
        {
            title: t('home.spam_free_title'),
            desc: t('home.spam_free_desc'),
            icon: <SpamFreeIcon />,
            bgColor: "bg-cta/10",
            hoverBorder: "hover:border-cta/40"
        }
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 35 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 } 
        }
    };

    // Simulated typing dots animation properties
    const dotVariants = {
        start: { y: "0%" },
        end: { y: "-40%" }
    };

    const dotTransition = {
        duration: 0.4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
    };

    return (
        <div className="flex justify-center py-20 bg-slate-50 relative overflow-hidden">
            {/* Soft decorative background circles */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -mr-40 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -ml-40 -mb-20"></div>

            <div className="flex flex-col w-full max-w-[1280px] px-6 relative z-10 gap-12">
                
                {/* Upper Section: Values Split View */}
                <div className="flex flex-col lg:flex-row gap-16 items-stretch">
                    
                    {/* Left Side: Bold editorial message card */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 flex flex-col justify-between p-10 bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white rounded-ds-xl shadow-2xl relative overflow-hidden"
                    >
                        {/* Visual pattern overlay */}
                        <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none"></div>
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-xl animate-pulse"></div>

                        <div className="space-y-6 relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-md border border-white/20">
                                ⚡ Fast-Track Booking
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                                {t('home.no_commitment_title')}
                            </h2>
                            <p className="text-white/80 font-light text-lg leading-relaxed max-w-lg">
                                {t('home.no_commitment_subtitle')}
                            </p>
                        </div>

                        <div className="mt-12 lg:mt-24 space-y-6 relative z-10 border-t border-white/10 pt-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/15">
                                    <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-base">Direct Ticket Issuance</h4>
                                    <p className="text-white/70 text-sm">Tickets are sent directly to your email instantly.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/15">
                                    <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-base">Secured & Encrypted</h4>
                                    <p className="text-white/70 text-sm">Payment and transit details are fully protected.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: 2x2 grid of details */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex-[1.3] grid grid-cols-1 md:grid-cols-2 gap-8 self-center"
                    >
                        {features.map((feature, idx) => (
                            <motion.div 
                                key={idx}
                                variants={cardVariants}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className={`glass-card p-8 bg-white border border-slate-100/80 hover:shadow-2xl transition-all duration-300 flex flex-col gap-6 group ${feature.hoverBorder}`}
                            >
                                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm`}>
                                    {feature.icon}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-slate-800 transition-colors duration-200">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed text-sm font-light">
                                        {feature.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>

                {/* Lower Section: Stunning, Combined AI Chatbot Showcase Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-ds-xl p-8 lg:p-10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/5"
                >
                    {/* Glowing radial background accents */}
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Copy and Actions */}
                    <div className="flex-1 space-y-6 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs font-semibold tracking-wide text-secondary">
                            ✨ Smart AI Booking
                        </div>
                        
                        <div className="space-y-3">
                            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">
                                {t('home.ai_integration_title')}
                            </h3>
                            <p className="text-slate-300 leading-relaxed text-base font-light max-w-xl">
                                {t('home.ai_integration_desc')}
                            </p>
                        </div>

                        {/* Interactive examples container */}
                        <div className="flex flex-wrap gap-3 items-center">
                            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block w-full md:w-auto">Try typing:</span>
                            <div className="flex flex-wrap gap-2.5">
                                <span className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-mono text-slate-200 transition-colors shadow-sm select-all cursor-pointer group-hover:scale-105">
                                    &quot;{t('home.ai_integration_example_1')}&quot;
                                </span>
                                <span className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-mono text-slate-200 transition-colors shadow-sm select-all cursor-pointer group-hover:scale-105">
                                    &quot;{t('home.ai_integration_example_2')}&quot;
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Simulated live chat mock component */}
                    <div className="flex-1 max-w-sm w-full relative z-10 shrink-0 lg:ml-8">
                        <div className="glass-card-dark p-5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-xl flex flex-col gap-4">
                            
                            {/* Header status */}
                            <div className="flex items-center justify-between pb-3 border-b border-white/10">
                                <div className="flex items-center gap-2.5">
                                    <div className="relative">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xs">
                                            🤖
                                        </div>
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-xs text-slate-100">TiketQ AI Assistant</h5>
                                        <p className="text-[10px] text-emerald-400">Online & Ready</p>
                                    </div>
                                </div>
                                <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">No Account Required</span>
                            </div>

                            {/* Conversation list mockup */}
                            <div className="space-y-3 pt-1">
                                {/* User message bubble */}
                                <div className="flex flex-col items-end gap-1">
                                    <div className="bg-cta text-white px-3.5 py-2 rounded-2xl rounded-tr-none text-xs max-w-[85%] shadow-md">
                                        Flight from Batam to Jakarta tomorrow
                                    </div>
                                    <span className="text-[9px] text-slate-400 pr-1">15:28</span>
                                </div>

                                {/* Assistant bubble with simulated live typing */}
                                <div className="flex flex-col items-start gap-1">
                                    <div className="bg-white/10 border border-white/5 text-slate-200 px-3.5 py-2.5 rounded-2xl rounded-tl-none text-xs max-w-[85%] shadow-inner flex flex-col gap-2">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[10px] text-slate-400">Processing...</span>
                                            {/* Typing Indicator */}
                                            <div className="flex gap-1 items-center h-2.5">
                                                <motion.span className="w-1 h-1 bg-white/70 rounded-full" variants={dotVariants} animate="end" initial="start" transition={{ ...dotTransition, delay: 0 }} />
                                                <motion.span className="w-1 h-1 bg-white/70 rounded-full" variants={dotVariants} animate="end" initial="start" transition={{ ...dotTransition, delay: 0.12 }} />
                                                <motion.span className="w-1 h-1 bg-white/70 rounded-full" variants={dotVariants} animate="end" initial="start" transition={{ ...dotTransition, delay: 0.24 }} />
                                            </div>
                                        </div>
                                        <p className="text-secondary font-medium">Finding the best flights without signups... ✈️</p>
                                    </div>
                                    <span className="text-[9px] text-slate-400 pl-1">Just now</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </motion.div>

            </div>
        </div>
    );
};

export default NoCommitment;
