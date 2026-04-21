import AirlinesPartners from "@components/AirlinesPartners"
import PaymentPartners from "@components/PaymentPartners"
import SearchFlight from "@components/SearchFlight";
import WhyBook from "@components/WhyBook";
import { motion } from "framer-motion";

const HomeContainer = () => {

    return (
        <>
        <div className="relative">
            <div className="flex flex-wrap justify-center min-h-[500px] bg-pattern home-app relative z-30 pt-24 pb-32">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="flex flex-wrap justify-center items-center w-full max-w-[1200px] px-6"
                >
                    <SearchFlight />
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f0f4f8] to-transparent z-10" />
            </div>
            
            <div className="flex flex-wrap justify-center -mt-16 relative z-40 px-6 mb-24">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="glass-card flex flex-wrap w-full gap-12 p-8 lg:p-12 max-w-[1200px] shadow-lg items-center justify-around border-white/40"
                >
                    <div className="flex-1 min-w-[300px]">
                        <AirlinesPartners />
                    </div>
                    <div className="w-px h-20 bg-slate-200/50 hidden lg:block"></div>
                    <div className="flex-1 min-w-[300px]">
                        <PaymentPartners />
                    </div>
                </motion.div>
            </div>
        </div>

            <WhyBook />
        </>
    )
}

export default HomeContainer