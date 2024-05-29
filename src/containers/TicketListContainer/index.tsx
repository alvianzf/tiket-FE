import TicketCard from "@components/TicketCard"
import TicketCardSkeleton from "@components/TicketCardSkeleton"
import TicketFilter from "@components/TicketFilter"
import { useEffect, useState } from "react"

const TicketListContainer = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)
        },
        []
    )

    return (
        <div className="flex flex-wrap justify-center my-10">
            <div className="flex flex-col gap-8 w-full max-w-[1024px]">
                <TicketFilter />
                <div className="flex flex-col gap-4">
                    {!isLoading ? (
                        <>
                            <TicketCard />
                            <TicketCard />
                            <TicketCard />
                            <TicketCard />
                            <TicketCard />
                            <TicketCard />
                            <TicketCard />
                        </>
                    ): (
                        <>
                            <TicketCardSkeleton />
                            <TicketCardSkeleton />
                            <TicketCardSkeleton />
                            <TicketCardSkeleton />
                            <TicketCardSkeleton />
                            <TicketCardSkeleton />
                            <TicketCardSkeleton />
                        </>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default TicketListContainer