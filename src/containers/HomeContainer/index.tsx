import AirlinesPartners from "@components/AirlinesPartners"
import PaymentPartners from "@components/PaymentPartners"
import SearchFlight from "@components/SearchFlight";
import WhyBook from "@components/WhyBook";

const HomeContainer = () => {

    return (
        <>
            <div className="flex flex-wrap justify-center min-h-[400px] home-app relative z-30">
                <div className="flex flex-wrap justify-center items-center w-full py-[40px] mx-[40px] lg:mx-0 md:mx-[40px] sm:mx-[40px]">
                    <SearchFlight />
                </div>
            </div>
            
            <div className="flex flex-wrap justify-center -mt-8 relative z-20 px-4 mb-20">
                <div className="glass-card flex flex-wrap w-full gap-8 p-10 max-w-[1280px] bg-white/40 shadow-2xl items-center justify-around border-white/40 backdrop-blur-2xl">
                    <div className="flex-1 min-w-[300px]">
                        <AirlinesPartners />
                    </div>
                    <div className="w-px h-16 bg-slate-300/30 hidden lg:block"></div>
                    <div className="flex-1 min-w-[300px]">
                        <PaymentPartners />
                    </div>
                </div>
            </div>

            <WhyBook />
        </>
    )
}

export default HomeContainer