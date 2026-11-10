import FerryPassenger from "@components/FerryPassenger";
import { Button, CircularProgress, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { reserveFerryBooking, submitFerryBooking } from "@api/ferry";
import FerryStepper from "@components/FerryStepper";

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

const defaultPassenger = (): PassengerData => ({
    title: '',
    firstName: '',
    lastName: '',
    passportNumber: '',
    passportExpiry: '',
    nationality: '',
    issuingCountry: '',
    dateOfBirth: '',
});

const FerryPassengerContainer = () => {

    const { push, query, isReady } = useRouter();

    const tripID = query?.tripID as string ?? '';
    const returnTripID = query?.returnTripID as string ?? '';
    const embarkation = query?.embarkation as string ?? '';
    const destination = query?.destination as string ?? '';
    const tripdate = query?.tripdate as string ?? '';
    const returndate = query?.returndate as string ?? '';
    const vesselName = query?.vesselName as string ?? '';
    const price = query?.price as string ?? '0';
    // How many tickets were chosen on the search form (defaults to 1, clamped 1-9).
    const passengerCount = Math.min(9, Math.max(1, parseInt(query?.adult as string, 10) || 1));

    const [passengers, setPassengers] = useState<PassengerData[]>([defaultPassenger(), defaultPassenger()]);
    const [contactEmail, setContactEmail] = useState('');
    const [confirmationEmail, setConfirmationEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // router.query is empty until isReady - (re)build the passenger form list
    // to match the ticket count chosen on the search form, not a hardcoded 2.
    useEffect(() => {
        if (!isReady) return;
        setPassengers(Array.from({ length: passengerCount }, defaultPassenger));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReady, passengerCount]);

    const handlePassengerChange = (index: number, data: PassengerData) => {
        setPassengers(prev => {
            const updated = [...prev];
            updated[index] = data;
            return updated;
        });
    };

    const handleNext = async () => {
        if (!contactEmail || !mobileNumber) {
            toast.error('Please fill in email and mobile number.');
            return;
        }
        if (passengers.some(p => !p.firstName || !p.lastName || !p.passportNumber)) {
            toast.error('Please fill in all required passenger fields (First Name, Last Name, Passport No.).');
            return;
        }

        setIsSubmitting(true);
        try {
            const departureDateFormatted = tripdate.length === 8
                ? `${tripdate.substring(0, 4)}-${tripdate.substring(4, 6)}-${tripdate.substring(6, 8)}`
                : tripdate;
            const returnDateFormatted = returndate.length === 8
                ? `${returndate.substring(0, 4)}-${returndate.substring(4, 6)}-${returndate.substring(6, 8)}`
                : returndate || null;

            const payload = {
                tripID,
                ...(returnTripID ? { returnTripID } : {}),
                contactEmail,
                contactMobileNumber: mobileNumber,
                whatsappMobileNumber: whatsappNumber || mobileNumber,
                departureDate: departureDateFormatted,
                ...(returnDateFormatted ? { returnDate: returnDateFormatted } : {}),
                // Terminal codes — the backend expects these from the trip selection
                originTerminalCode: embarkation,
                destinationTerminalCode: destination,
                passengers: passengers.map(p => ({
                    title: p.title,
                    firstName: p.firstName,
                    lastName: p.lastName,
                    passportNumber: p.passportNumber,
                    passportExpiry: p.passportExpiry,
                    nationality: p.nationality,
                    issuingCountry: p.issuingCountry,
                    dateOfBirth: p.dateOfBirth,
                })),
            };

            const booking = await reserveFerryBooking(payload);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const bookingNo = (booking as any)?.bookingNo ?? (booking as any)?.id;

            // Submit the booking immediately after reservation (backend flow requirement)
            await submitFerryBooking({
                id: bookingNo,
                emailConfirmation: contactEmail,
            });

            push({
                pathname: '/ferry/payment',
                query: {
                    bookingNo,
                    price,
                    embarkation,
                    destination,
                    tripdate,
                    ...(returndate ? { returndate } : {}),
                    vesselName,
                    contactEmail,
                }
            });
        } catch (err) {
            console.error('Ferry booking error:', err);
            toast.error('Failed to create ferry booking. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 w-full items-center justify-center py-10">
            <div className="flex gap-2 w-full flex-col relative flex-nowrap items-center max-w-[1024px] px-4">
                <FerryStepper activeStep={2} />
            </div>
            <div className="flex gap-4 w-full flex-col relative flex-nowrap items-center max-w-[1280px]">
                {passengers.map((p, i) => (
                    <FerryPassenger
                        key={i}
                        index={i}
                        data={p}
                        onChange={handlePassengerChange}
                    />
                ))}
                <div className="surface-card p-6 md:p-8 w-full">
                    <p className="text-xl font-bold text-slate-800 mb-5">Booking Requirements</p>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col gap-4 w-full md:w-1/2">
                            <div className="flex flex-col gap-1.5">
                                <p className="text-sm font-semibold text-slate-600">Email Address</p>
                                <TextField type="email" variant="standard" fullWidth
                                    value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <p className="text-sm font-semibold text-slate-600">Mobile Phone</p>
                                <TextField type="tel" variant="standard" fullWidth
                                    value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-full md:w-1/2">
                            <div className="flex flex-col gap-1.5">
                                <p className="text-sm font-semibold text-slate-600">Confirmation Email Address</p>
                                <TextField type="email" variant="standard" fullWidth
                                    value={confirmationEmail} onChange={(e) => setConfirmationEmail(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <p className="text-sm font-semibold text-slate-600">WhatsApp No.</p>
                                <TextField type="tel" variant="standard" fullWidth
                                    value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between w-full">
                    <Button variant="outlined" color="primary" component={Link} href="/ferry/list">
                        {'Back'}
                    </Button>
                    <Button variant="contained" color="warning" disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : undefined}
                        onClick={handleNext}>
                        {'Next'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FerryPassengerContainer