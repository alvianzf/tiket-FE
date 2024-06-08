import { Tab, Tabs } from "@nextui-org/react"

const CheckoutTab = () => {

    const tabs = [
        {
            id: "order",
            label: "Order"
        },
        {
            id: "review",
            label: "Review"
        },
        {
            id: "payment",
            label: "Payment"
        },
        {
            id: "eticket",
            label: "E-Ticket"
        }
    ];

    return (
        <div className="flex flex-row justify-center">
            <Tabs items={tabs} variant="underlined" classNames={{
                cursor:"bg-[#ff5a00]"
            }}>
                {(item) => (
                    <Tab key={item.id} title={
                        <p className="font-medium">{item.label}</p>
                    }>

                    </Tab>
                )}
            </Tabs>
        </div>
    )
}

export default CheckoutTab