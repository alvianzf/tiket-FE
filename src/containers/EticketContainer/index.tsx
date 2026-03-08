import { PassengerResponse } from "@api/bookFlight/types";
import LionAir from "@icons/LionAir"
import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { useQueryCheckBookFlight } from "@queries/bookFlight";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from '@components/Button';
import { useTranslation } from "react-i18next";

const EticketContainer = () => {

    const { query, isReady, push } = useRouter();

    const bookingno = query?.bookingno as unknown as string;

    const { t } = useTranslation();

    useEffect(
        () => {
            if(!bookingno && isReady) {
                push('/');
                return
            }
        },
    )

    const { data, isFetching } = useQueryCheckBookFlight({
        enabled: !!bookingno,
        request: bookingno
    });

    const passengers: PassengerResponse[] = [];

    data?.data.passengers.adults?.flatMap((passenger) => passengers.push(passenger))
    data?.data.passengers.children?.flatMap((passenger) => passengers.push(passenger))
    data?.data.passengers.infants?.flatMap((passenger) => passengers.push(passenger))

    const base64toBlob = (base64Data: string) => {
        const sliceSize = 1024;
        const byteCharacters = atob(base64Data);
        const bytesLength = byteCharacters.length;
        const slicesCount = Math.ceil(bytesLength / sliceSize);
        const byteArrays = new Array(slicesCount);

        for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            const begin = sliceIndex * sliceSize;
            const end = Math.min(begin + sliceSize, bytesLength);

            const bytes = new Array(end - begin);
            for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: "application/pdf" });
    };

    const openBase64NewTab = (base64Pdf: string) => {
        const blob = base64toBlob(base64Pdf);
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl);
      }
    
    return (
        isFetching ? (
            <div className="flex justify-center">
                <Spinner />
            </div>
        ) : (

            <div className="p-6 md:p-12 flex flex-col gap-10 max-w-[1200px] mx-auto min-h-screen">
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        {t('meta.order_title') || 'Flight E-Ticket'}
                    </h1>
                    <div className="w-20 h-1.5 bg-orange-500 rounded-full"></div>
                </div>

                <div className="glass-card bg-white/40 p-8 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-3xl border-white/40">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10 border-b border-slate-200/40 pb-8 mb-8">
                        <div className="space-y-1">
                            <p className="text-slate-500 font-medium uppercase tracking-wider text-xs">Booking Code & Status</p>
                            <div className="flex items-center gap-4">
                                <p className="text-3xl font-black text-slate-800">{data?.data.bookingCode}</p>
                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${data?.data.status === 'ISSUED' ? 'bg-green-100 text-green-700 shadow-sm shadow-green-100/50' : 'bg-orange-100 text-orange-700 shadow-sm shadow-orange-100/50'}`}>
                                    {data?.data.status}
                                </span>
                            </div>
                        </div>
                        
                        {data?.data.status === 'ISSUED' && (
                            <Button className="button-orange rounded-2xl px-10 h-14 font-bold text-lg shadow-xl shadow-orange-500/40 hover:scale-105 transition-all w-full md:w-auto" onClick={() => openBase64NewTab(data?.data.tiket_pdf ?? '')}>
                                <span className="mr-2">📄</span> {t('checkout.get_eticket')}
                            </Button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-blue-50/40 p-6 rounded-2xl border border-blue-100/30 mb-10">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl bg-white/60 w-10 h-10 flex items-center justify-center rounded-xl shadow-sm">🆔</span>
                            <p className="text-sm font-medium text-slate-700">Perlihatkan E-ticket & identitas saat check-in</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl bg-white/60 w-10 h-10 flex items-center justify-center rounded-xl shadow-sm">🕒</span>
                            <p className="text-sm font-medium text-slate-700">Check-in paling lambat 90 menit sebelum keberangkatan</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl bg-white/60 w-10 h-10 flex items-center justify-center rounded-xl shadow-sm">🌍</span>
                            <p className="text-sm font-medium text-slate-700">Waktu tertera merupakan waktu bandara setempat</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-12 py-6 bg-white/20 rounded-3xl p-8 border border-white/20 mb-10">
                        <div className="bg-white/80 p-6 rounded-2xl shadow-inner">
                            <LionAir width={120} height={40}/>
                        </div>
                        
                        <div className="flex-1 w-full space-y-12">
                            {data?.data.flightdetail.map((route, index) => (
                                <div key={index} className="relative">
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex flex-col items-center">
                                            <p className="text-3xl font-black text-slate-800">{route.depart}</p>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mt-1">{route.origin}</p>
                                        </div>
                                        
                                        <div className="flex-1 mx-8 relative flex flex-col items-center">
                                            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent relative">
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 w-2 h-2 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-blue-500 font-bold">✈</div>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase mt-4 bg-slate-100 px-3 py-1 rounded-full">{route.durationDetail}</p>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <p className="text-3xl font-black text-slate-800">{route.arrival}</p>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mt-1">{route.destination}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-8 grid grid-cols-2 gap-8 text-center md:text-left">
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-slate-400 uppercase">{route.originName}</p>
                                            <p className="text-sm font-semibold text-slate-600">Terminal -</p>
                                        </div>
                                        <div className="space-y-1 text-right md:text-left">
                                            <p className="text-xs font-bold text-slate-400 uppercase">{route.destinationName}</p>
                                            <p className="text-sm font-semibold text-slate-600">Terminal -</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 pt-4 border-t border-dashed border-slate-200 flex justify-center">
                                        <p className="text-sm font-bold text-blue-600 tracking-widest">{route.flightCode}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <h3 className="text-2xl font-bold text-slate-800">Detail Penumpang</h3>
                            <div className="flex-1 h-px bg-slate-200/50"></div>
                        </div>
                        
                        <Table 
                            aria-label="Passenger Details"
                            classNames={{
                                base: "shadow-none",
                                table: "min-w-full bg-transparent",
                                thead: "bg-slate-50/50 border-b border-slate-100",
                                th: "text-slate-500 font-bold uppercase text-xs p-4",
                                td: "p-4 font-medium text-slate-700 border-b border-slate-50"
                            }}
                        >
                            <TableHeader>
                                <TableColumn width={80}>NO.</TableColumn>
                                <TableColumn>NAMA PENUMPANG</TableColumn>
                                <TableColumn>NO. PENERBANGAN</TableColumn>
                                <TableColumn>FASILITAS</TableColumn>
                            </TableHeader>
                            
                            <TableBody items={passengers ?? []}>
                                {(item) => (
                                    <TableRow key={item.date_of_birth}>
                                        <TableCell>1</TableCell>
                                        <TableCell className="font-bold flex items-center gap-2">
                                            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">👤</span>
                                            {`${item.title} ${item.first_name} ${item.last_name}`}
                                        </TableCell>
                                        <TableCell>{data?.data.flightdetail?.[0]?.flightCode}</TableCell>
                                        <TableCell>
                                            <span className="bg-slate-100 text-slate-400 px-3 py-1 rounded-full text-[10px] font-bold">Default</span>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className="glass-card bg-slate-900 text-slate-300 p-10 md:p-12 shadow-2xl space-y-12">
                    <div className="space-y-6">
                        <h4 className="text-xl font-bold text-white flex items-center gap-3">
                            <span className="bg-white/10 p-2 rounded-lg">💡</span> Catatan Penting:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-slate-400">
                             <div className="space-y-4">
                                <p>• Penumpang wajib memperhatikan persyaratan perjalanan internasional.</p>
                                <p>• Tiba di terminal 4 jam sebelum keberangkatan.</p>
                                <p>• Check-in ditutup 60 menit sebelum keberangkatan.</p>
                             </div>
                             <div className="space-y-4">
                                <p>• Nama tiket harus sesuai dengan identitas resmi.</p>
                                <p>• Masa berlaku paspor minimal 6 bulan.</p>
                                <p>• Dilarang membawa barang berbahaya (gas, korosif, peledak).</p>
                             </div>
                        </div>
                    </div>
                    
                    <div className="h-px bg-white/10"></div>
                    
                    <div className="space-y-6">
                        <h4 className="text-xl font-bold text-white flex items-center gap-3">
                            <span className="bg-white/10 p-2 rounded-lg">🔄</span> Pembatalan & Perubahan:
                        </h4>
                        <div className="text-sm leading-relaxed text-slate-400 space-y-4">
                             <p>Permintaan perubahan mengacu pada regulasi maskapai. Hubungi Customer Care di 0804 1500 777 untuk bantuan lebih lanjut.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default EticketContainer