import { Chip } from "@nextui-org/react";
import Button from "@components/Button";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plane, Ship, Car, Calendar, MapPin, Users, CreditCard, ExternalLink } from "lucide-react";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    flightData?: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ferryData?: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    carData?: any[];
}

const statusColor = (paid: boolean, status?: string) => {
    if (paid || status === "PAID") return "success";
    if (status === "FAILED" || status === "CANCELLED") return "danger";
    return "warning";
};

const statusLabel = (paid: boolean, status?: string) => {
    if (paid || status === "PAID") return "Paid";
    if (status === "FAILED" || status === "CANCELLED") return "Failed";
    return "Pending";
};

const OrderContainer = ({ flightData = [], ferryData = [], carData = [] }: Props) => {
    const { t } = useTranslation();
    const hasOrders = flightData.length > 0 || ferryData.length > 0 || carData.length > 0;

    if (!hasOrders) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 gap-6 text-center"
            >
                <div className="w-24 h-24 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Plane size={40} className="text-[#ff5a00]" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-800 mb-2">{t('profile.no_orders_yet_title')}</h2>
                    <p className="text-slate-500 max-w-sm">{t('profile.no_orders_yet_description')}</p>
                </div>
                <Button dsVariant="primary" size="lg" className="h-14 px-10 rounded-ds-sm" onClick={() => window.location.href = '/'}>
                    {t('profile.home')}
                </Button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-10 w-full pb-20"
        >
            {flightData.length > 0 && (
                <section className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                            <Plane size={20} className="text-[#ff5a00]" />
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-800">Flight Bookings</h3>
                        <span className="text-sm text-slate-400 font-medium">({flightData.length})</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        {flightData.map((order) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-card bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex flex-col gap-3 flex-1">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="font-mono font-black text-[#ff5a00] text-lg tracking-wider">{order.bookingCode}</span>
                                            <Chip
                                                color={statusColor(order.payment_status, order.transactionStatus)}
                                                variant="flat"
                                                size="sm"
                                                className="font-bold uppercase tracking-wider"
                                            >
                                                {statusLabel(order.payment_status, order.transactionStatus)}
                                            </Chip>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                                            <span className="flex items-center gap-1.5">
                                                <MapPin size={14} className="text-slate-400" />
                                                <span className="font-semibold">{order.origin} → {order.destination}</span>
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={14} className="text-slate-400" />
                                                <span>{order.departureDate ? moment(order.departureDate).format("DD MMM YYYY") : moment(order.book_date).format("DD MMM YYYY")}</span>
                                            </span>
                                            {order.passengers?.length > 0 && (
                                                <span className="flex items-center gap-1.5">
                                                    <Users size={14} className="text-slate-400" />
                                                    <span>{order.passengers.length} passenger{order.passengers.length > 1 ? 's' : ''}</span>
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1.5">
                                                <CreditCard size={14} className="text-slate-400" />
                                                <span className="font-bold text-slate-800">
                                                    IDR {parseFloat(order.totalSales || order.nominal || "0").toLocaleString("id-ID")}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        as={Link}
                                        href={`/eticket?bookingno=${order.bookingCode}`}
                                        dsVariant="cta"
                                        className="h-11 px-6 rounded-xl font-bold shadow-sm shrink-0 flex items-center gap-2"
                                    >
                                        <ExternalLink size={15} />
                                        View E-Ticket
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {ferryData.length > 0 && (
                <section className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <Ship size={20} className="text-blue-600" />
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-800">Ferry Bookings</h3>
                        <span className="text-sm text-slate-400 font-medium">({ferryData.length})</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        {ferryData.map((order) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-card bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex flex-col gap-3 flex-1">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="font-mono font-black text-blue-600 text-lg tracking-wider">{order.bookingNo}</span>
                                            <Chip
                                                color={statusColor(order.payment_status, order.transactionStatus)}
                                                variant="flat"
                                                size="sm"
                                                className="font-bold uppercase tracking-wider"
                                            >
                                                {statusLabel(order.payment_status, order.transactionStatus)}
                                            </Chip>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                                            <span className="flex items-center gap-1.5">
                                                <MapPin size={14} className="text-slate-400" />
                                                <span className="font-semibold">
                                                    {order.origin?.name || order.origin?.code || "—"} → {order.destination?.name || order.destination?.code || "—"}
                                                </span>
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={14} className="text-slate-400" />
                                                <span>{order.departureDate ? moment(order.departureDate).format("DD MMM YYYY") : moment(order.book_date).format("DD MMM YYYY")}</span>
                                            </span>
                                            {order.returnDate && (
                                                <span className="flex items-center gap-1.5 text-blue-600">
                                                    <Calendar size={14} />
                                                    <span>Return: {moment(order.returnDate).format("DD MMM YYYY")}</span>
                                                </span>
                                            )}
                                            {order.passengers?.length > 0 && (
                                                <span className="flex items-center gap-1.5">
                                                    <Users size={14} className="text-slate-400" />
                                                    <span>{order.passengers.length} passenger{order.passengers.length > 1 ? 's' : ''}</span>
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1.5">
                                                <CreditCard size={14} className="text-slate-400" />
                                                <span className="font-bold text-slate-800">
                                                    IDR {parseFloat(order.totalSales || order.nominal || "0").toLocaleString("id-ID")}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    {order.bookingNo && (
                                        <Button
                                            as={Link}
                                            href={`/ferry/payment?bookingNo=${order.bookingNo}`}
                                            dsVariant="primary"
                                            className="h-11 px-6 rounded-xl font-bold shadow-sm shrink-0 flex items-center gap-2"
                                        >
                                            <ExternalLink size={15} />
                                            View Booking
                                        </Button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {carData.length > 0 && (
                <section className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <Car size={20} className="text-green-600" />
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-800">Car Rentals</h3>
                        <span className="text-sm text-slate-400 font-medium">({carData.length})</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        {carData.map((order) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-card bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex flex-col gap-3 flex-1">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="font-bold text-green-700 text-base">{order.car?.name || "Car Rental"}</span>
                                            <Chip
                                                color={order.status === "APPROVED" ? "success" : order.status === "REJECTED" ? "danger" : "warning"}
                                                variant="flat"
                                                size="sm"
                                                className="font-bold uppercase tracking-wider"
                                            >
                                                {order.status || "Pending"}
                                            </Chip>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                                            {order.car?.type && (
                                                <span className="flex items-center gap-1.5">
                                                    <Car size={14} className="text-slate-400" />
                                                    <span>{order.car.type}</span>
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={14} className="text-slate-400" />
                                                <span>{order.date}</span>
                                            </span>
                                            {order.totalSales && (
                                                <span className="flex items-center gap-1.5">
                                                    <CreditCard size={14} className="text-slate-400" />
                                                    <span className="font-bold text-slate-800">
                                                        IDR {parseFloat(String(order.totalSales)).toLocaleString("id-ID")}
                                                    </span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {order.car?.id && (
                                        <Button
                                            as={Link}
                                            href={`/car-rental/${order.car.id}`}
                                            dsVariant="primary"
                                            className="h-11 px-6 rounded-xl font-bold shadow-sm shrink-0 flex items-center gap-2"
                                        >
                                            <ExternalLink size={15} />
                                            View Details
                                        </Button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}
        </motion.div>
    );
};

export default OrderContainer;
