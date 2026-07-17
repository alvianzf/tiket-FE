import { NextPageWithLayout } from "@interfaces/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import { useState } from "react";
import { Button, Card, CardContent, CircularProgress, InputAdornment, Skeleton, TextField } from "@mui/material";
import { useMutation } from "react-query";
import baseAPI from "@api/baseApi";
import OrderContainer from "@containers/OrderContainer";
import { motion } from "framer-motion";
import { Mail, Search, TicketCheck } from "lucide-react";

const FindBookingPage: NextPageWithLayout = () => {
    const [email, setEmail] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [bookings, setBookings] = useState<any>(null);

    const historyMutation = useMutation({
        mutationFn: async (searchEmail: string) => {
            const response = await baseAPI.get("/api/history", { params: { email: searchEmail } });
            return response.data;
        },
        onSuccess: (data) => {
            setBookings(data);
        },
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            historyMutation.mutate(email.trim());
        }
    };

    const totalBookings = bookings
        ? (bookings.flights?.length ?? 0) + (bookings.ferries?.length ?? 0) + (bookings.cars?.length ?? 0)
        : 0;

    return (
        <div className="min-h-screen py-10 px-5">
            <Head>
                <title>My Bookings — TiketQ</title>
            </Head>

            <div className="max-w-[1024px] mx-auto">
                {!bookings ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
                    >
                        {/* UVP badge */}
                        <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full">
                            <TicketCheck size={16} className="text-[#ff5a00]" />
                            <span className="text-sm font-bold text-[#ff5a00]">No account needed — just your email</span>
                        </div>

                        <Card className="w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-3xl">
                            <CardContent className="flex flex-col gap-8 p-8">
                                <div className="text-center space-y-3">
                                    <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto">
                                        <Mail size={28} className="text-[#ff5a00]" />
                                    </div>
                                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">My Booking History</h1>
                                    <p className="text-slate-500 font-medium text-sm leading-relaxed">
                                        Enter the email you used at checkout. We&apos;ll show all your flights, ferries, and car rentals — no login required.
                                    </p>
                                </div>

                                <form onSubmit={handleSearch} className="flex flex-col gap-4">
                                    <TextField
                                        type="email"
                                        label="Email Address"
                                        placeholder="your@email.com"
                                        variant="standard"
                                        size="medium"
                                        color="warning"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Mail size={16} className="text-slate-400 mb-0.5" />
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="warning"
                                        size="large"
                                        className="h-14 text-base font-bold shadow-xl shadow-orange-500/40 rounded-2xl button-orange gap-2"
                                        disabled={historyMutation.isLoading}
                                        startIcon={historyMutation.isLoading ? <CircularProgress size={16} color="inherit" /> : undefined}
                                    >
                                        <Search size={18} />
                                        Find My Bookings
                                    </Button>
                                    {historyMutation.isError && (
                                        <p className="text-red-500 text-sm text-center font-medium">
                                            Something went wrong. Please try again.
                                        </p>
                                    )}
                                </form>
                            </CardContent>
                        </Card>

                        <div className="flex flex-wrap justify-center gap-6 text-center max-w-md">
                            {[
                                { icon: "✈️", label: "Flights" },
                                { icon: "🚢", label: "Ferry" },
                                { icon: "🚗", label: "Car Rental" },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <div className="space-y-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-2xl font-extrabold text-slate-800">
                                    Booking history for{" "}
                                    <span className="text-[#ff5a00] bg-orange-500/10 px-2 py-0.5 rounded-lg">{email}</span>
                                </h1>
                                <p className="text-slate-400 text-sm mt-1 font-medium">
                                    {totalBookings > 0
                                        ? `${totalBookings} booking${totalBookings > 1 ? 's' : ''} found`
                                        : "No bookings found for this email"}
                                </p>
                            </div>
                            <Button
                                variant="text"
                                color="warning"
                                className="bg-orange-500/10 text-[#ff5a00] hover:bg-orange-500/20 font-bold px-5 py-2 h-10 rounded-xl text-sm"
                                onClick={() => { setBookings(null); setEmail(""); }}
                            >
                                Search again
                            </Button>
                        </div>

                        {historyMutation.isLoading ? (
                            <div className="space-y-4">
                                <Skeleton variant="rounded" className="w-full h-20 rounded-2xl" />
                                <Skeleton variant="rounded" className="w-full h-20 rounded-2xl" />
                                <Skeleton variant="rounded" className="w-full h-20 rounded-2xl" />
                            </div>
                        ) : (
                            <OrderContainer
                                flightData={bookings?.flights}
                                ferryData={bookings?.ferries}
                                carData={bookings?.cars}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

FindBookingPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default FindBookingPage;
