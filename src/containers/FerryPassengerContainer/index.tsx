import FerryPassenger from "@components/FerryPassenger";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "react-toastify";
import { reserveFerryBooking } from "@api/ferry";

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

    const { t } = useTranslation();
    const { push, query } = useRouter();

    const tripID = query?.tripID as string ?? '';
    const embarkation = query?.embarkation as string ?? '';
    const destination = query?.destination as string ?? '';
    const tripdate = query?.tripdate as string ?? '';
    const vesselName = query?.vesselName as string ?? '';
    const price = query?.price as string ?? '0';

    const [passengers, setPassengers] = useState<PassengerData[]>([defaultPassenger(), defaultPassenger()]);
    const [contactEmail, setContactEmail] = useState('');
    const [confirmationEmail, setConfirmationEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            const payload = {
                tripID,
                contactEmail,
                contactMobileNumber: mobileNumber,
                whatsappMobileNumber: whatsappNumber || mobileNumber,
                departureDate: tripdate,
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

            push({
                pathname: '/ferry/payment',
                query: {
                    bookingNo,
                    price,
                    embarkation,
                    destination,
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
        <div className="flex flex-col gap-8 w-full items-center justify-center">
            <div className="flex gap-2 w-full flex-col relative flex-nowrap items-center max-w-[1024px]">
                <Card className="px-4 w-full mt-[40px]">
                    <CardBody>
                        <div className="flex flex-row items-center w-full gap-2">
                            <div className="flex flex-col items-center gap-1 w-[20%]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#4267b2" width="20px" height="20px" viewBox="0 0 512 512" stroke="#4267b2">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"/>
                                    </g>
                                </svg>
                                <span>{t('tickets.select_schedule')}</span>
                            </div>
                            <div className="flex flex-col items-center w-[20%]">
                                <hr className="border-1 border-black w-[50%]" />
                            </div>
                            <div className="flex flex-col items-center w-[20%]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#4267b2" width="20px" height="20px" viewBox="0 0 512 512" stroke="#4267b2">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"/>
                                    </g>
                                </svg>
                                <span>{t('tickets.ordering_details')}</span>
                            </div>
                            <div className="flex flex-col items-center w-[20%]">
                                <hr className="border-1 border-black w-[50%]" />
                            </div>
                            <div className="flex flex-col items-center w-[20%] opacity-55">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#4267b2" width="20px" height="20px" viewBox="0 0 512 512" stroke="#4267b2">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"/>
                                    </g>
                                </svg>
                                <span>{t('tickets.payment')}</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
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
                <Card className="p-4 w-full">
                    <CardBody>
                        <span className="text-[24px] font-bold mb-4">Booking Requirements</span>
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col gap-4 w-[50%]">
                                <div className="flex flex-col gap-2">
                                    <p>Email Address</p>
                                    <Input type="email" variant="bordered" classNames={{ inputWrapper: "rounded-none" }}
                                        value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p>Mobile Phone</p>
                                    <Input type="tel" variant="bordered" classNames={{ inputWrapper: "rounded-none" }}
                                        value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 w-[50%]">
                                <div className="flex flex-col gap-2">
                                    <p>Confirmation Email Address</p>
                                    <Input type="email" variant="bordered" classNames={{ inputWrapper: "rounded-none" }}
                                        value={confirmationEmail} onChange={(e) => setConfirmationEmail(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p>WhatsApp No.</p>
                                    <Input type="tel" variant="bordered" classNames={{ inputWrapper: "rounded-none" }}
                                        value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <div className="flex flex-row justify-between w-full">
                    <Button className={'button-grey'} onClick={() => push('/ferry/list')}>
                        {'Back'}
                    </Button>
                    <Button className={'button-orange'} isLoading={isSubmitting} onClick={handleNext}>
                        {'Next'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FerryPassengerContainer