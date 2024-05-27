import AirlinesPartners from "@components/AirlinesPartners"
import PaymentPartners from "@components/PaymentPartners"

const HomeContainer = () => {

    return (
        <>
            <div className="flex flex-wrap justify-center my-10">
                <div className="flex flex-wrap w-full gap-4 lg:gap-0 md:gap-0 sm:gap-0 max-w-[1024px]">
                    <AirlinesPartners />
                    <PaymentPartners />
                </div>
            </div>
        </>
    )
}

export default HomeContainer