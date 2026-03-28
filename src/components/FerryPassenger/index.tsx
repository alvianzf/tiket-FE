import { Card, CardBody, CardHeader, Input, Select, SelectItem } from "@nextui-org/react"
import { useTranslation } from "react-i18next"

interface PassengerData {
    title: string;
    firstName: string;
    lastName: string;
    passportNumber: string;
    passportExpiry: string;
    nationality: string;
    issuingCountry: string;
    dateOfBirth: string;
}

interface Props {
    index: number;
    data: PassengerData;
    onChange: (index: number, data: PassengerData) => void;
}

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const MONTHS = [
    { value: '01', label: 'January' }, { value: '02', label: 'February' },
    { value: '03', label: 'March' }, { value: '04', label: 'April' },
    { value: '05', label: 'May' }, { value: '06', label: 'June' },
    { value: '07', label: 'July' }, { value: '08', label: 'August' },
    { value: '09', label: 'September' }, { value: '10', label: 'October' },
    { value: '11', label: 'November' }, { value: '12', label: 'December' },
];
const DOB_YEARS = Array.from({ length: 70 }, (_, i) => String(new Date().getFullYear() - 5 - i));
const EXP_YEARS = Array.from({ length: 20 }, (_, i) => String(new Date().getFullYear() + i));

const parseDatePart = (dateStr: string, part: 'day' | 'month' | 'year') => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (part === 'year') return parts[0] ?? '';
    if (part === 'month') return parts[1] ?? '';
    if (part === 'day') return parts[2] ?? '';
    return '';
};

const buildDate = (year: string, month: string, day: string) => {
    if (!year || !month || !day) return '';
    return `${year}-${month}-${day}`;
};

const FerryPassenger = ({ index, data, onChange }: Props) => {
    const { t } = useTranslation();

    const update = (field: keyof PassengerData, value: string) => {
        onChange(index, { ...data, [field]: value });
    };

    const updateDob = (part: 'day' | 'month' | 'year', value: string) => {
        const d = parseDatePart(data.dateOfBirth, 'day');
        const m = parseDatePart(data.dateOfBirth, 'month');
        const y = parseDatePart(data.dateOfBirth, 'year');
        const newDate = buildDate(
            part === 'year' ? value : y,
            part === 'month' ? value : m,
            part === 'day' ? value : d,
        );
        update('dateOfBirth', newDate);
    };

    const updateExpiry = (part: 'day' | 'month' | 'year', value: string) => {
        const d = parseDatePart(data.passportExpiry, 'day');
        const m = parseDatePart(data.passportExpiry, 'month');
        const y = parseDatePart(data.passportExpiry, 'year');
        const newDate = buildDate(
            part === 'year' ? value : y,
            part === 'month' ? value : m,
            part === 'day' ? value : d,
        );
        update('passportExpiry', newDate);
    };

    const titleOptions = [
        { key: 'Mr', label: t('checkout.mr') },
        { key: 'Mrs', label: t('checkout.mrs') },
        { key: 'Ms', label: t('checkout.ms') },
    ];

    return (
        <Card className="p-4 w-full">
            <CardHeader>
                <div className="flex flex-row gap-2">
                    <span className="text-[24px] text-orange font-bold">Passenger {index + 1}</span>
                    <span className="text-[24px]">Adult</span>
                </div>
            </CardHeader>
            <CardBody>
                <div className="flex flex-col gap-2 p-4 bg-red-100 mb-6">
                    <p className="text-red-500 text-center text-sm">Please ensure that you are holding a valid travel document before you proceed. TiketQ is not responsible for any consequences imposed by authorities for inaccurate or incomplete documents.</p>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col gap-4 w-[50%]">
                        <div className="flex flex-col gap-2">
                            <p>Passport No.</p>
                            <Input
                                type="text"
                                variant="underlined"
                                placeholder="Enter Passport No."
                                value={data.passportNumber}
                                onChange={(e) => update('passportNumber', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p>Name (As in Passport)</p>
                            <div className="flex flex-row gap-2 w-full">
                                <Select
                                    className="w-[25%]"
                                    variant="underlined"
                                    selectionMode="single"
                                    placeholder={t('checkout.choose')}
                                    selectedKeys={data.title ? [data.title] : []}
                                    onSelectionChange={(keys) => update('title', Array.from(keys)[0] as string)}
                                >
                                    {titleOptions.map((item) => (
                                        <SelectItem key={item.key}>{item.label}</SelectItem>
                                    ))}
                                </Select>
                                <Input
                                    type="text"
                                    variant="underlined"
                                    placeholder="First Name"
                                    className="grow"
                                    value={data.firstName}
                                    onChange={(e) => update('firstName', e.target.value)}
                                />
                                <Input
                                    type="text"
                                    variant="underlined"
                                    placeholder="Last Name"
                                    className="grow"
                                    value={data.lastName}
                                    onChange={(e) => update('lastName', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Nationality</p>
                            <Input
                                type="text"
                                variant="underlined"
                                placeholder="e.g. Indonesian"
                                value={data.nationality}
                                onChange={(e) => update('nationality', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Issuing Country</p>
                            <Input
                                type="text"
                                variant="underlined"
                                placeholder="e.g. Indonesia"
                                value={data.issuingCountry}
                                onChange={(e) => update('issuingCountry', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-[50%]">
                        <div className="flex flex-col gap-2">
                            <p>Date of Birth</p>
                            <div className="flex flex-row gap-1">
                                <Select variant="underlined" placeholder="Day" selectionMode="single"
                                    selectedKeys={parseDatePart(data.dateOfBirth, 'day') ? [parseDatePart(data.dateOfBirth, 'day')] : []}
                                    onSelectionChange={(k) => updateDob('day', Array.from(k)[0] as string)}>
                                    {DAYS.map(d => <SelectItem key={d}>{d}</SelectItem>)}
                                </Select>
                                <Select variant="underlined" placeholder="Month" selectionMode="single"
                                    selectedKeys={parseDatePart(data.dateOfBirth, 'month') ? [parseDatePart(data.dateOfBirth, 'month')] : []}
                                    onSelectionChange={(k) => updateDob('month', Array.from(k)[0] as string)}>
                                    {MONTHS.map(m => <SelectItem key={m.value}>{m.label}</SelectItem>)}
                                </Select>
                                <Select variant="underlined" placeholder="Year" selectionMode="single"
                                    selectedKeys={parseDatePart(data.dateOfBirth, 'year') ? [parseDatePart(data.dateOfBirth, 'year')] : []}
                                    onSelectionChange={(k) => updateDob('year', Array.from(k)[0] as string)}>
                                    {DOB_YEARS.map(y => <SelectItem key={y}>{y}</SelectItem>)}
                                </Select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Passport Expiry Date</p>
                            <div className="flex flex-row gap-1">
                                <Select variant="underlined" placeholder="Day" selectionMode="single"
                                    selectedKeys={parseDatePart(data.passportExpiry, 'day') ? [parseDatePart(data.passportExpiry, 'day')] : []}
                                    onSelectionChange={(k) => updateExpiry('day', Array.from(k)[0] as string)}>
                                    {DAYS.map(d => <SelectItem key={d}>{d}</SelectItem>)}
                                </Select>
                                <Select variant="underlined" placeholder="Month" selectionMode="single"
                                    selectedKeys={parseDatePart(data.passportExpiry, 'month') ? [parseDatePart(data.passportExpiry, 'month')] : []}
                                    onSelectionChange={(k) => updateExpiry('month', Array.from(k)[0] as string)}>
                                    {MONTHS.map(m => <SelectItem key={m.value}>{m.label}</SelectItem>)}
                                </Select>
                                <Select variant="underlined" placeholder="Year" selectionMode="single"
                                    selectedKeys={parseDatePart(data.passportExpiry, 'year') ? [parseDatePart(data.passportExpiry, 'year')] : []}
                                    onSelectionChange={(k) => updateExpiry('year', Array.from(k)[0] as string)}>
                                    {EXP_YEARS.map(y => <SelectItem key={y}>{y}</SelectItem>)}
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default FerryPassenger