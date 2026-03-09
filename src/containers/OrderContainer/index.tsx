
import { Button, Image, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import moment from "moment";

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
            <div className="flex flex-wrap justify-center my-10 min-h-[60vh] items-center">
                <div className="flex flex-col gap-8 w-full px-5 max-w-[1024px]">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        {t('profile.order_title')}
                    </h1>
                    
                    <div className="glass-card overflow-hidden bg-white/10 p-8 md:p-12 shadow-2xl relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
                        
                        <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                            <div className="w-full md:w-1/2 flex justify-center">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-2xl group-hover:bg-blue-400/30 transition-all duration-500"></div>
                                    <Image 
                                        src="/images/no-orders.png" 
                                        width={350} 
                                        height={350} 
                                        alt="No orders"
                                        className="relative z-10 drop-shadow-2xl animate-float"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-6 text-center md:text-left md:w-1/2">
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-bold text-slate-800">
                                        {t('profile.no_orders_yet_title')}
                                    </h2>
                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {t('profile.no_orders_yet_description')}
                                    </p>
                                </div>
                                
                                <div className="pt-4">
                                    <Button 
                                        color="primary" 
                                        size="lg"
                                        className="button-orange px-8 font-bold shadow-lg shadow-orange-500/30 hover:scale-105 transition-all"
                                        onClick={() => window.location.href = '/'}
                                    >
                                        {t('profile.home')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-10 w-full">
            {flightData.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-800">Flight Bookings</h3>
                    <Table aria-label="Flight bookings table" className="glass-card">
                        <TableHeader>
                            <TableColumn>BOOKING CODE</TableColumn>
                            <TableColumn>ROUTE</TableColumn>
                            <TableColumn>DATE</TableColumn>
                            <TableColumn>TOTAL</TableColumn>
                            <TableColumn>STATUS</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {flightData.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-mono font-bold text-primary">{order.bookingCode}</TableCell>
                                    <TableCell>{order.origin} → {order.destination}</TableCell>
                                    <TableCell>{moment(order.book_date).format("DD MMM YYYY")}</TableCell>
                                    <TableCell>IDR {parseFloat(order.nominal || "0").toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Chip color={order.payment_status ? "success" : "warning"} variant="flat" size="sm">
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
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-800">Ferry Bookings</h3>
                    <Table aria-label="Ferry bookings table" className="glass-card">
                        <TableHeader>
                            <TableColumn>BOOKING NO</TableColumn>
                            <TableColumn>TERMINAL</TableColumn>
                            <TableColumn>DATE</TableColumn>
                            <TableColumn>TOTAL</TableColumn>
                            <TableColumn>STATUS</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {ferryData.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-mono font-bold text-primary">{order.bookingNo}</TableCell>
                                    <TableCell>{order.origin?.name || "N/A"} → {order.destination?.name || "N/A"}</TableCell>
                                    <TableCell>{moment(order.book_date).format("DD MMM YYYY")}</TableCell>
                                    <TableCell>IDR {parseFloat(order.nominal || "0").toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Chip color={order.payment_status ? "success" : "warning"} variant="flat" size="sm">
                                            {order.status || "Pending"}
                                        </Chip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}

export default OrderContainer