import { Card, CardBody, CardHeader, Input, Select, SelectItem } from "@nextui-org/react"
import { useTranslation } from "react-i18next"

const FerryPassenger = () => {

    const { t } = useTranslation();

    const options = [
        { key: 'Mr', label: t('checkout.mr') },
        { key: 'Mrs', label: t('checkout.mrs') },
        { key: 'Ms', label: t('checkout.ms') },
    ];

    return (
        <Card className="p-4 w-full">
            <CardHeader>
                <div className="flex flex-row gap-2">
                    <span className="text-[24px] text-orange font-bold">Passanger 1</span>
                    <span className="text-[24px]">Adult</span>
                </div>
            </CardHeader>
            <CardBody>
                <div className="flex flex-col gap-2 p-4 bg-red-100 mb-10">
                    <p className="text-red-500 text-center">Please ensure that you are holding a valid travel document before you proceed. Please ensure that additional supporting documents (such as Entry visas, permits, vaccine certificates, etc) are presented to our check-in counter for verification prior to issuance of the boarding pass. However, Batamfast does not guarantee your entry/exit despite assessment of your travel documents on the ground. TiketQ is not responsible for any consequences imposed by the applicable/governing authorities (Immigration) for any inaccurate, wrong, incomplete details documents.</p>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col gap-2 w-[50%]">
                        <div className="flex flex-col gap-2">
                            <p>{'Passport No.'}</p>
                            <Input
                                type="text"
                                variant="bordered"
                                classNames={{
                                    inputWrapper: "rounded-none",
                                    mainWrapper: "w-full"
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p>{'Name ( As in a Passport )'}</p>
                            <div className="flex flex-row gap-2 w-full">
                                <Select
                                    className="w-[20%]"
                                    variant="bordered"
                                    radius="sm"
                                    selectionMode="single"
                                    placeholder={t('checkout.choose')}
                                >
                                    {options.map((item) => (
                                            <SelectItem key={item.key}>
                                                {item.label}
                                            </SelectItem>
                                        ))
                                    }
                                </Select>
                                <Input
                                    type="text"
                                    variant="bordered"
                                    classNames={{
                                        inputWrapper: "rounded-none",
                                        mainWrapper: "w-full"
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>{'Nationality'}</p>
                            <Select
                                className="w-full"
                                variant="bordered"
                                radius="sm"
                                selectionMode="single"
                                placeholder={t('checkout.choose')}
                            >
                                <SelectItem key={'id'}>
                                    {'Indonesia'}
                                </SelectItem>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>{'Issuing Country'}</p>
                            <Select
                                className="w-full"
                                variant="bordered"
                                radius="sm"
                                selectionMode="single"
                                placeholder={t('checkout.choose')}
                            >
                                <SelectItem key={'id'}>
                                    {'Indonesia'}
                                </SelectItem>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-[50%]">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <p>{'Date Of Birth'}</p>
                                <div className="flex flex-row gap-1">
                                    <Select
                                        className="w-full"
                                        variant="bordered"
                                        radius="sm"
                                        selectionMode="single"
                                        placeholder={'Day'}
                                    >
                                        <SelectItem key={'1'}>
                                            {'01'}
                                        </SelectItem>
                                    </Select>
                                    <Select
                                        className="w-full"
                                        variant="bordered"
                                        radius="sm"
                                        selectionMode="single"
                                        placeholder={'Month'}
                                    >
                                        <SelectItem key={'1'}>
                                            {'Januari'}
                                        </SelectItem>
                                    </Select>
                                    <Select
                                        className="w-full"
                                        variant="bordered"
                                        radius="sm"
                                        selectionMode="single"
                                        placeholder={'Year'}
                                    >
                                        <SelectItem key={'2000'}>
                                            {'2000'}
                                        </SelectItem>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-2">
                                    <p>{'Passport Expiry'}</p>
                                    <div className="flex flex-row gap-1">
                                        <Select
                                            className="w-full"
                                            variant="bordered"
                                            radius="sm"
                                            selectionMode="single"
                                            placeholder={'Day'}
                                        >
                                            <SelectItem key={'1'}>
                                                {'01'}
                                            </SelectItem>
                                        </Select>
                                        <Select
                                            className="w-full"
                                            variant="bordered"
                                            radius="sm"
                                            selectionMode="single"
                                            placeholder={'Month'}
                                        >
                                            <SelectItem key={'1'}>
                                                {'Januari'}
                                            </SelectItem>
                                        </Select>
                                        <Select
                                            className="w-full"
                                            variant="bordered"
                                            radius="sm"
                                            selectionMode="single"
                                            placeholder={'Year'}
                                        >
                                            <SelectItem key={'2000'}>
                                                {'2000'}
                                            </SelectItem>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p>{'Passport Issue Date'}</p>
                                    <div className="flex flex-row gap-1">
                                        <Select
                                            className="w-full"
                                            variant="bordered"
                                            radius="sm"
                                            selectionMode="single"
                                            placeholder={'Day'}
                                        >
                                            <SelectItem key={'1'}>
                                                {'01'}
                                            </SelectItem>
                                        </Select>
                                        <Select
                                            className="w-full"
                                            variant="bordered"
                                            radius="sm"
                                            selectionMode="single"
                                            placeholder={'Month'}
                                        >
                                            <SelectItem key={'1'}>
                                                {'Januari'}
                                            </SelectItem>
                                        </Select>
                                        <Select
                                            className="w-full"
                                            variant="bordered"
                                            radius="sm"
                                            selectionMode="single"
                                            placeholder={'Year'}
                                        >
                                            <SelectItem key={'2000'}>
                                                {'2000'}
                                            </SelectItem>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default FerryPassenger