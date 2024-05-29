import Button from "@components/Button";
import { Card, CardBody, Select, SelectItem } from "@nextui-org/react";
import { useTranslation } from "react-i18next"

const TicketFilter = () => {
    const { t } = useTranslation();

    const pricesData = [
        { key: 'high', label: t('tickets.highest_price') },
        { key: 'low', label: t('tickets.lowest_price') },
        { key: 'best', label: t('tickets.best_time') },
    ];

    const airlinesData = [
        { key: 'lion', label: 'Lion Air' },
        { key: 'super', label: 'Super Jet' },
        { key: 'citilink', label: 'Citilink' },
        { key: 'garuda', label: 'Garuda Indonesia' },
    ];

    const transitsData = [
        { key: 'direct', label: t('tickets.direct') },
        { key: 'transit_1', label: t('tickets.transit', { number : 1 }) },
        { key: 'transit_2', label: t('tickets.transit', { number : 2 }) },
    ];

    const luggagesData = [
        { key: 'luggage', label: t('tickets.luggage') },
        { key: 'non_luggage', label: t('tickets.non_luggage') },
    ];

    const classesData = [
        { key: 'economy', label: t('tickets.economy') },
        { key: 'business_class', label: t('tickets.business_class') },
        { key: 'first_class', label: t('tickets.first_class') },
    ];

    return (
        <div className="flex flex-col gap-3">
            <p className="font-medium">{t('tickets.filter')}</p>
            <Card>
                <CardBody>
                    <div className="flex flex-row flex-wrap lg:flex-nowrap md:flex-nowrap gap-3 justify-between">
                        <Select 
                            placeholder={t('tickets.price_placeholder')}
                            className="max-w-xs"
                            variant="bordered"
                            radius="sm" 
                        >
                            {pricesData.map((item) => (
                                <SelectItem key={item.key}>
                                    {item.label}
                                </SelectItem>
                                ))
                            }
                        </Select>
                        <Select 
                            placeholder={t('tickets.airline_placeholder')}
                            className="max-w-xs"
                            variant="bordered"
                            radius="sm" 
                        >
                            {airlinesData.map((item) => (
                                <SelectItem key={item.key}>
                                    {item.label}
                                </SelectItem>
                                ))
                            }
                        </Select>
                        <Select 
                            placeholder={t('tickets.transit_placeholder')}
                            className="max-w-xs"
                            variant="bordered"
                            radius="sm" 
                        >
                            {transitsData.map((item) => (
                                <SelectItem key={item.key}>
                                    {item.label}
                                </SelectItem>
                                ))
                            }
                        </Select>
                        <Select 
                            placeholder={t('tickets.luggage_placeholder')}
                            className="max-w-xs"
                            variant="bordered"
                            radius="sm" 
                        >
                            {luggagesData.map((item) => (
                                <SelectItem key={item.key}>
                                    {item.label}
                                </SelectItem>
                                ))
                            }
                        </Select>
                        <Select 
                            placeholder={t('tickets.class_placeholder')}
                            className="max-w-xs"
                            variant="bordered"
                            radius="sm" 
                        >
                            {classesData.map((item) => (
                                <SelectItem key={item.key}>
                                    {item.label}
                                </SelectItem>
                                ))
                            }
                        </Select>
                        <Button bgColor="blue">
                            {t('tickets.search')}
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default TicketFilter