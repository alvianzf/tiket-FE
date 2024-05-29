import TicketFilter from "@components/TicketFilter"

const TicketListContainer = () => {

    return (
        <div className="flex flex-wrap justify-center my-10">
            <div className="flex flex-col w-full max-w-[1024px]">
                <TicketFilter />
            </div>
        </div>
    )
}

export default TicketListContainer