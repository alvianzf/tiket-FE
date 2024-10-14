import CarCard from "@components/CarCard"

const CarRentContainer = () => {

    return (
        <div className="flex flex-col gap-8 w-full items-center justify-center">
            <div className="flex gap-2 w-full flex-col relative flex-nowrap items-center max-w-[1024px] py-8 px-6">
                <h1 className="text-center text-2xl font-bold text-orange">
                    Mobil Terbaru, Cek Harga Sewa Mobil di Bali Dengan Driver. Dijamin Nyaman Liburan Bersama Kami
                </h1>
                <p className="text-center text-lg text-gray-700 mt-2">
                    Semua Mobil Dijamin Keluaran Terbaru Tahun 2022-2023, Mobil Terbaik, Bersih, Wangi dan Nyaman.
                </p>
            </div>
            <div className="flex gap-4 w-full flex-row relative flex-wrap items-center max-w-[1280px]">
                <CarCard />
                <CarCard />
                <CarCard />
                <CarCard />
                <CarCard />
                <CarCard />
                <CarCard />
                <CarCard />
            </div>
        </div>
    )
}

export default CarRentContainer