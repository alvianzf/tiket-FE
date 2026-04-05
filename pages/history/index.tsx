import { NextPageWithLayout } from "@interfaces/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Input, Button, Card, CardBody, Skeleton } from "@nextui-org/react";
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
                        <Card className="glass-card max-md w-full p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-3xl border border-white/20 bg-white/10 rounded-3xl">
                            <CardBody className="flex flex-col gap-6">
                                <div className="text-center space-y-3">
                                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                                        {t('find_booking', 'Find My Booking')}
                                    </h1>
                                    <p className="text-slate-600/80 font-medium">
                                        Enter the email used during checkout to view your booking history.
                                    </p>
                                </div>

                                <form onSubmit={handleSearch} className="flex flex-col gap-6">
                                    <Input 
                                        type="email" 
                                        label="Email Address" 
                                        placeholder="your@email.com" 
                                        variant="underlined"
                                        size="lg"
                                        color="warning"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="text-lg"
                                    />
                                    <Button 
                                        type="submit" 
                                        color="primary" 
                                        size="lg" 
                                        className="h-16 text-lg font-bold shadow-xl shadow-orange-500/40 rounded-2xl button-orange"
                                        isLoading={historyMutation.isLoading}
                                    >
                                        {t('submit', 'Search History')}
                                    </Button>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <h1 className="text-3xl font-extrabold text-slate-800">
                                Results for <span className="text-[#ff5a00] bg-orange-500/10 px-3 py-1 rounded-lg">{email}</span>
                            </h1>
                            <Button 
                                variant="flat" 
                                className="bg-orange-500/10 text-[#ff5a00] hover:bg-orange-500/20 font-bold px-6 py-2 rounded-xl"
                                onClick={() => {
                                    setBookings(null);
                                    setEmail("");
                                }}
                            >
                                New Search
                            </Button>
                        </div>
                        
                        {historyMutation.isLoading ? (
                            <div className="space-y-6">
                                <Skeleton className="w-full h-12 rounded-xl" />
                                <Skeleton className="w-full h-64 rounded-2xl" />
                                <Skeleton className="w-full h-12 rounded-xl" />
                                <Skeleton className="w-full h-64 rounded-2xl" />
                            </div>
                        ) : (
                            <OrderContainer 
                                flightData={bookings?.flights} 
                                ferryData={bookings?.ferries} 
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

FindBookingPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default FindBookingPage;
