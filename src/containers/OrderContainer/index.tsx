import { Image, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import Button from "@components/Button";
import NextImage from "next/image";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { motion } from "framer-motion";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    flightData?: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ferryData?: any[];
}

const OrderContainer = ({ flightData = [], ferryData = [] } : Props) => {
    const { t } = useTranslation();
    const hasOrders = flightData.length > 0 || ferryData.length > 0;

    if (!hasOrders) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-wrap justify-center my-10 min-h-[50vh] items-center"
            >
                <div className="flex flex-col gap-8 w-full px-5 max-w-[1024px]">
                    <div className="glass-card overflow-hidden bg-white/85 p-8 md:p-12 shadow-lg relative border-white/75">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cta/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
                        
                        <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                            <div className="w-full md:w-1/2 flex justify-center">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>
                                    <Image 
                                        as={NextImage}
                                        src="/images/no-orders.png" 
                                        width={300} 
                                        height={300} 
                                        alt="No orders"
                                        className="relative z-10 drop-shadow-2xl brightness-110"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-6 text-center md:text-left md:w-1/2">
                                <div className="space-y-4">
                                    <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                                        {t('profile.no_orders_yet_title')}
                                    </h2>
                                    <p className="text-lg text-slate-600/80 leading-relaxed font-medium">
                                        {t('profile.no_orders_yet_description')}
                                    </p>
                                </div>
                                
                                <div className="pt-4">
                                    <Button 
                                        dsVariant="primary"
                                        size="lg"
                                        className="h-14 px-10 rounded-ds-sm shadow-md"
                                        onClick={() => window.location.href = '/'}
                                    >
                                        {t('profile.home')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-12 w-full pb-20"
        >
            {flightData.length > 0 && (
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                        <h3 className="text-2xl font-extrabold text-dark tracking-tight font-sans">Flight Bookings</h3>
                    </div>
                    <Table aria-label="Flight bookings table" className="glass-card border-none shadow-md overflow-hidden">
                        <TableHeader>
                            <TableColumn className="bg-primary/5 text-primary font-bold py-5">BOOKING CODE</TableColumn>
                            <TableColumn className="bg-primary/5 text-primary font-bold py-5">ROUTE</TableColumn>
                            <TableColumn className="bg-primary/5 text-primary font-bold py-5">DATE</TableColumn>
                            <TableColumn className="bg-primary/5 text-primary font-bold py-5">TOTAL</TableColumn>
                            <TableColumn className="bg-primary/5 text-primary font-bold py-5 text-center">STATUS</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {flightData.map((order) => (
                                <TableRow key={order.id} className="border-b border-white/10 last:border-0 hover:bg-white/10 transition-colors">
                                    <TableCell className="font-mono font-extrabold text-[#ff5a00] bg-orange-500/5 py-6">{order.bookingCode}</TableCell>
                                    <TableCell className="font-semibold text-slate-700">{order.origin} → {order.destination}</TableCell>
                                    <TableCell className="text-slate-600 font-medium">{moment(order.book_date).format("DD MMM YYYY")}</TableCell>
                                    <TableCell className="font-bold text-slate-800">IDR {parseFloat(order.nominal || "0").toLocaleString()}</TableCell>
                                    <TableCell className="text-center">
                                        <Chip color={order.payment_status ? "success" : "warning"} variant="flat" size="md" className="font-bold uppercase tracking-wider">
                                            {order.payment_status ? "Paid" : "Pending"}
                                        </Chip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {ferryData.length > 0 && (
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-1.5 h-8 bg-secondary rounded-full"></div>
                        <h3 className="text-2xl font-extrabold text-dark tracking-tight font-sans">Ferry Bookings</h3>
                    </div>
                    <Table aria-label="Ferry bookings table" className="glass-card border-none shadow-md overflow-hidden">
                        <TableHeader>
                            <TableColumn className="bg-secondary/10 text-secondary-dark font-bold py-5">BOOKING NO</TableColumn>
                            <TableColumn className="bg-secondary/10 text-secondary-dark font-bold py-5">TERMINAL</TableColumn>
                            <TableColumn className="bg-secondary/10 text-secondary-dark font-bold py-5">DATE</TableColumn>
                            <TableColumn className="bg-secondary/10 text-secondary-dark font-bold py-5">TOTAL</TableColumn>
                            <TableColumn className="bg-secondary/10 text-secondary-dark font-bold py-5 text-center">STATUS</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {ferryData.map((order) => (
                                <TableRow key={order.id} className="border-b border-white/10 last:border-0 hover:bg-white/10 transition-colors">
                                    <TableCell className="font-mono font-extrabold text-blue-600 bg-blue-500/5 py-6">{order.bookingNo}</TableCell>
                                    <TableCell className="font-semibold text-slate-700">{order.origin?.name || "N/A"} → {order.destination?.name || "N/A"}</TableCell>
                                    <TableCell className="text-slate-600 font-medium">{moment(order.book_date).format("DD MMM YYYY")}</TableCell>
                                    <TableCell className="font-bold text-slate-800">IDR {parseFloat(order.nominal || "0").toLocaleString()}</TableCell>
                                    <TableCell className="text-center">
                                        <Chip color={order.payment_status ? "success" : "warning"} variant="flat" size="md" className="font-bold uppercase tracking-wider">
                                            {order.status || "Pending"}
                                        </Chip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </motion.div>
    )
}

export default OrderContainer