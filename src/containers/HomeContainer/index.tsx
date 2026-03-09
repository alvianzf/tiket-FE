import AirlinesPartners from "@components/AirlinesPartners"
import PaymentPartners from "@components/PaymentPartners"
import SearchFlight from "@components/SearchFlight";
import WhyBook from "@components/WhyBook";

const HomeContainer = () => {

    return (
        <>
            <div className="flex flex-wrap justify-center min-h-[400px] home-app">
                <div className="flex flex-wrap justify-center items-center w-full py-[40px] mx-[40px] lg:mx-0 md:mx-[40px] sm:mx-[40px]">
                    <SearchFlight />
                </div>
            </div>
            <div className="flex flex-wrap justify-center my-10 mx-[40px] lg:mx-0 md:mx-[40px]">
                <div className="flex flex-wrap w-full gap-4 lg:gap-0 md:gap-0 sm:gap-0 max-w-[1368px]">
                    <AirlinesPartners />
                    <PaymentPartners />
                </div>
            </div>
            <WhyBook />
        </>
    )
}

export default HomeContainer