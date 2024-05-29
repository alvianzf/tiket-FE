import Button from "@components/Button";
import LionAir from "@icons/LionAir";
import { Card, CardBody, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const TicketCard = () => {

    const { t } = useTranslation();
    const [extended, setExtended] = useState<boolean>(false);

    const handleExtended = () => {
        setExtended((prevState) => !prevState);
    };

    const classesData = [
        { key: 'economy', label: t('tickets.economy') },
        { key: 'business_class', label: t('tickets.business_class') },
        { key: 'first_class', label: t('tickets.first_class') },
    ];

    return (
        <Card className="px-4 flex flex-wrap lg:flex-nowrap md:flex-nowrap">
            <CardBody onClick={handleExtended}>
                <div className="flex flex-col gap-8 flex-wrap lg:flex-nowrap md:flex-nowrap">
                    <div className="flex flex-row justify-between gap-5 items-center">
                        <LionAir width={80} height={80}/>
                        <div className="flex flex-col gap-3">
                            <p className="text-xl font-medium">{'Lion Air'}</p>
                            <div className="flex flex-row gap-3">
                                <div className="luggage-badge">
                                    <p className="text-sm">{'20 kg'}</p>
                                </div>
                                <div className="luggage-reschedule">
                                    <p className="text-sm">{'Reschedule'}</p>
                                </div>
                            </div>
                            <p className="text-xl text-orange font-medium">{'Rp 1.920.000 / Org'}</p>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                            <div className="flex flex-col text-center">
                                <p className="font-medium text-2xl">{'08.25'}</p>
                                <p className="text-lg text-gray-400">{'BTH'}</p>
                            </div>
                            <div className="flex flex-col text-center">
                                <p className="text-sm text-gray-400">{'1j 35m'}</p>
                                <hr />
                                <p className="text-sm text-gray-400">{'Langsung'}</p>
                            </div>
                            <div className="flex flex-col text-center">
                                <p className="font-medium text-2xl">{'10.00'}</p>
                                <p className="text-lg text-gray-400">{'CGK'}</p>
                            </div>
                        </div>
                        <Button bgColor={"orange"} className="min-w-40">
                            {t('tickets.choose')}
                        </Button>
                    </div>
                    {extended && (
                        <div className="flex flex-row justify-between items-start">
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-row gap-20">
                                    <p className="text-lg font-medium">{'08.25'}</p>
                                    <div className="flex flex-col">
                                        <p className="text-lg font-medium">{'Batam (BTH)'}</p>
                                        <p className="text-gray-400">{'Hang Nadim'}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-20">
                                    <p className="text-gray-400">{'1j 35m'}</p>
                                    <div className="flex flex-col">
                                        <p className="text-lg font-medium">{'QG-945'}</p>
                                        <p>{'Airbus A320'}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-20">
                                    <p className="text-lg font-medium">{'10.00'}</p>
                                    <div className="flex flex-col">
                                        <p className="text-lg font-medium">{'Jakarta (CGK)'}</p>
                                        <p className="text-gray-400">{'Soekarno Hatta Internation Airport'}</p>
                                    </div>
                                </div>
                            </div>
                            <Select 
                                placeholder={t('tickets.class_placeholder')}
                                className="max-w-xs"
                                variant="bordered"
                                radius="sm" 
                                selectionMode="single"
                                selectedKeys={["economy"]}
                            >
                                {classesData.map((item) => (
                                    <SelectItem key={item.key}>
                                        {item.label}
                                    </SelectItem>
                                    ))
                                }
                            </Select>
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    )
}

export default TicketCard