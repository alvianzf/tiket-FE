import { NextPageWithLayout } from "@interfaces/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { useMutation } from "react-query";
import axios from "axios";
import OrderContainer from "@containers/OrderContainer";

const FindBookingPage: NextPageWithLayout = () => {
    const { t } = useTranslation('common');
    const [email, setEmail] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [bookings, setBookings] = useState<any>(null);

    const historyMutation = useMutation({
        mutationFn: async (searchEmail: string) => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/history?email=${searchEmail}`);
            return response.data;
        },
        onSuccess: (data) => {
            setBookings(data);
        }
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            historyMutation.mutate(email);
        }
    };

    return (
        <div className="min-h-screen py-10 px-5">
            <Head>
                <title>{t('find_booking', 'Find My Booking')} | TiketQ</title>
            </Head>

            <div className="max-w-[1024px] mx-auto">
                {!bookings ? (
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <Card className="glass-card max-w-md w-full p-6 shadow-2xl">
                            <CardBody className="flex flex-col gap-6">
                                <div className="text-center space-y-2">
                                    <h1 className="text-3xl font-bold text-slate-800">
                                        {t('find_booking', 'Find My Booking')}
                                    </h1>
                                    <p className="text-slate-600">
                                        Enter the email used during checkout to view your booking history.
                                    </p>
                                </div>

                                <form onSubmit={handleSearch} className="flex flex-col gap-4">
                                    <Input 
                                        type="email" 
                                        label="Email Address" 
                                        placeholder="your@email.com" 
                                        variant="bordered"
                                        size="lg"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        classNames={{
                                            inputWrapper: "border-slate-200 focus-within:border-primary"
                                        }}
                                    />
                                    <Button 
                                        type="submit" 
                                        color="primary" 
                                        size="lg" 
                                        isLoading={historyMutation.isLoading}
                                    >
                                        {t('submit', 'Search History')}
                                    </Button>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-bold text-slate-800">
                                Results for <span className="text-primary">{email}</span>
                            </h1>
                            <Button 
                                variant="flat" 
                                color="primary" 
                                onClick={() => {
                                    setBookings(null);
                                    setEmail("");
                                }}
                            >
                                New Search
                            </Button>
                        </div>
                        
                        <OrderContainer 
                            flightData={bookings.flights} 
                            ferryData={bookings.ferries} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

FindBookingPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default FindBookingPage;
