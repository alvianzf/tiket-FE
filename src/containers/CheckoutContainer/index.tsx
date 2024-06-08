import Checkout from "@components/Checkout"

const CheckoutContainer = () => {

    return (
        <div className="flex flex-wrap justify-center my-10">
            <div className="flex flex-col gap-8 w-full max-w-[1024px]">
                <Checkout />
            </div>
        </div>
    )
}

export default CheckoutContainer