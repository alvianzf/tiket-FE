import { Image } from "@nextui-org/react"
import { useTranslation } from "react-i18next"

const FlightNotAvailable = () => {

    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-4 justify-center text-center items-center">
            <Image src={"/images/no-flight.png"} alt={"No Flight"} width={"80%"}/>
            <h4 className="text-4xl">{t('tickets.flight_not_found')}</h4>
        </div>
    )
}

export default FlightNotAvailable