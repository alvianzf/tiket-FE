import { Card, CardContent, CardHeader, MenuItem, TextField } from "@mui/material"
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
            <CardHeader
                disableTypography
                title={
                    <div className="flex flex-row gap-2">
                        <span className="text-[24px] text-orange font-bold">Passenger {index + 1}</span>
                        <span className="text-[24px]">Adult</span>
                    </div>
                }
            />
            <CardContent>
                <div className="flex flex-col gap-2 p-4 bg-red-100 mb-6">
                    <p className="text-red-500 text-center text-sm">Please ensure that you are holding a valid travel document before you proceed. TiketQ is not responsible for any consequences imposed by authorities for inaccurate or incomplete documents.</p>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col gap-4 w-[50%]">
                        <div className="flex flex-col gap-2">
                            <p>Passport No.</p>
                            <TextField
                                type="text"
                                variant="standard"
                                placeholder="Enter Passport No."
                                fullWidth
                                value={data.passportNumber}
                                onChange={(e) => update('passportNumber', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p>Name (As in Passport)</p>
                            <div className="flex flex-row gap-2 w-full">
                                <TextField
                                    select
                                    className="w-[25%]"
                                    variant="standard"
                                    value={data.title}
                                    onChange={(e) => update('title', e.target.value)}
                                    slotProps={{ select: { displayEmpty: true } }}
                                >
                                    <MenuItem value="" disabled>
                                        <span className="text-slate-400">{t('checkout.choose')}</span>
                                    </MenuItem>
                                    {titleOptions.map((item) => (
                                        <MenuItem key={item.key} value={item.key}>{item.label}</MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    type="text"
                                    variant="standard"
                                    placeholder="First Name"
                                    className="grow"
                                    value={data.firstName}
                                    onChange={(e) => update('firstName', e.target.value)}
                                />
                                <TextField
                                    type="text"
                                    variant="standard"
                                    placeholder="Last Name"
                                    className="grow"
                                    value={data.lastName}
                                    onChange={(e) => update('lastName', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Nationality</p>
                            <TextField
                                type="text"
                                variant="standard"
                                placeholder="e.g. Indonesian"
                                fullWidth
                                value={data.nationality}
                                onChange={(e) => update('nationality', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Issuing Country</p>
                            <TextField
                                type="text"
                                variant="standard"
                                placeholder="e.g. Indonesia"
                                fullWidth
                                value={data.issuingCountry}
                                onChange={(e) => update('issuingCountry', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-[50%]">
                        <div className="flex flex-col gap-2">
                            <p>Date of Birth</p>
                            <div className="flex flex-row gap-1">
                                <TextField select variant="standard" fullWidth
                                    value={parseDatePart(data.dateOfBirth, 'day')}
                                    onChange={(e) => updateDob('day', e.target.value)}
                                    slotProps={{ select: { displayEmpty: true } }}>
                                    <MenuItem value="" disabled><span className="text-slate-400">Day</span></MenuItem>
                                    {DAYS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                                </TextField>
                                <TextField select variant="standard" fullWidth
                                    value={parseDatePart(data.dateOfBirth, 'month')}
                                    onChange={(e) => updateDob('month', e.target.value)}
                                    slotProps={{ select: { displayEmpty: true } }}>
                                    <MenuItem value="" disabled><span className="text-slate-400">Month</span></MenuItem>
                                    {MONTHS.map(m => <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>)}
                                </TextField>
                                <TextField select variant="standard" fullWidth
                                    value={parseDatePart(data.dateOfBirth, 'year')}
                                    onChange={(e) => updateDob('year', e.target.value)}
                                    slotProps={{ select: { displayEmpty: true } }}>
                                    <MenuItem value="" disabled><span className="text-slate-400">Year</span></MenuItem>
                                    {DOB_YEARS.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                                </TextField>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Passport Expiry Date</p>
                            <div className="flex flex-row gap-1">
                                <TextField select variant="standard" fullWidth
                                    value={parseDatePart(data.passportExpiry, 'day')}
                                    onChange={(e) => updateExpiry('day', e.target.value)}
                                    slotProps={{ select: { displayEmpty: true } }}>
                                    <MenuItem value="" disabled><span className="text-slate-400">Day</span></MenuItem>
                                    {DAYS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                                </TextField>
                                <TextField select variant="standard" fullWidth
                                    value={parseDatePart(data.passportExpiry, 'month')}
                                    onChange={(e) => updateExpiry('month', e.target.value)}
                                    slotProps={{ select: { displayEmpty: true } }}>
                                    <MenuItem value="" disabled><span className="text-slate-400">Month</span></MenuItem>
                                    {MONTHS.map(m => <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>)}
                                </TextField>
                                <TextField select variant="standard" fullWidth
                                    value={parseDatePart(data.passportExpiry, 'year')}
                                    onChange={(e) => updateExpiry('year', e.target.value)}
                                    slotProps={{ select: { displayEmpty: true } }}>
                                    <MenuItem value="" disabled><span className="text-slate-400">Year</span></MenuItem>
                                    {EXP_YEARS.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                                </TextField>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default FerryPassenger
