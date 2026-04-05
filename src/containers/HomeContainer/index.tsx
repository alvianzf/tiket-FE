import AirlinesPartners from "@components/AirlinesPartners"
import PaymentPartners from "@components/PaymentPartners"
import SearchFlight from "@components/SearchFlight";
import WhyBook from "@components/WhyBook";
import { motion } from "framer-motion";

const HomeContainer = () => {

    return (
        <>
            <div className="flex flex-wrap justify-center min-h-[500px] home-app relative z-30 pt-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-wrap justify-center items-center w-full py-[40px] mx-[40px] lg:mx-0 md:mx-[40px] sm:mx-[40px]"
                >
                    <SearchFlight />
                </motion.div>
            </div>
            
            <div className="flex flex-wrap justify-center -mt-16 relative z-40 px-4 mb-20">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-card flex flex-wrap w-full gap-8 p-10 max-w-[1280px] bg-white/20 shadow-2xl items-center justify-around border-white/30 backdrop-blur-3xl"
                >
                    <div className="flex-1 min-w-[300px]">
                        <AirlinesPartners />
                    </div>
                    <div className="w-px h-16 bg-white/20 hidden lg:block"></div>
                    <div className="flex-1 min-w-[300px]">
                        <PaymentPartners />
                    </div>
                </motion.div>
            </div>

            <WhyBook />
        </>
    )
}

export default HomeContainer