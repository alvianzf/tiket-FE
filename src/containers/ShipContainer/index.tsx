import FerryPartners from "@components/FerryPartners"
import PaymentPartners from "@components/PaymentPartners"
import SearchFerry from "@components/SearchFerry";
import WhyBook from "@components/WhyBook";

const ShipContainer = () => {
    return (
        <>
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-wrap justify-center min-h-[500px] ferry-app relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 z-0"></div>
                <div className="flex flex-wrap justify-center lg:justify-end items-center w-full py-12 px-6 lg:px-20 relative z-10 max-w-[1440px]">
                    <div className="animate-fade-in-up">
                        <SearchFerry />
                    </div>
                </div>
            </div>
            
            <div className="flex flex-wrap justify-center -mt-12 relative z-20 px-4">
                <div className="glass-card flex flex-wrap w-full gap-8 p-8 max-w-[1280px] bg-white/40 shadow-2xl items-center justify-around border-white/40 backdrop-blur-2xl">
                    <div className="flex-1 min-w-[300px]">
                        <FerryPartners />
                    </div>
                    <div className="w-px h-12 bg-slate-300/30 hidden lg:block"></div>
                    <div className="flex-1 min-w-[300px]">
                        <PaymentPartners />
                    </div>
                </div>
            </div>
            
            <WhyBook />
        </div>
        </>
    )
}

export default ShipContainer