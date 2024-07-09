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

            <div className="p-10 flex flex-col gap-4">
                <p className="text-xl font-medium">Flight E-Ticket</p>
                <p className="text-xl font-medium">Penerbangan Pergi</p>
                <div className="flex flex-row justify-between p-2 gap-[60px] text-center">
                    <p className="text-2xl font-medium text-orange">{`${data?.data.bookingCode} (${data?.data.status})`}</p>
                    {data?.data.status === 'ISSUED' && (
                        <Button bgColor={"orange"} isLoading={isFetching} disabled={isFetching} onClick={() => openBase64NewTab(data?.data.tiket_pdf ?? '')}>
                            {t('checkout.get_eticket')}
                        </Button>
                    )}
                </div>
                <div className="flex flex-row justify-between rounded border-2 p-2 gap-[60px] text-center">
                    <p>Perlihatkan E-ticket dan identitas diri saat check-in</p>
                    <p>Check-in paling lambat 90 menit sebelum keberangkatan</p>
                    <p>Waktu tertera merupakan waktu bandara setempat</p>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <LionAir width={100} height={100}/>
                    {data?.data.flightdetail.map((route, index) => (
                        <div key={index} className="flex flex-col gap-8">
                            <div className="flex flex-row gap-20">
                                <p className="text-lg font-medium">{route.depart}</p>
                                <div className="flex flex-col">
                                    <p className="text-lg font-medium">
                                        {`${route.originName} (${route.origin})`}
                                    </p>
                                    <p className="text-gray-400">{'Hang Nadim'}</p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-20">
                                <p className="text-gray-400 w-[40px]">{route.durationDetail}</p>
                                <div className="flex flex-col">
                                    <p className="text-lg font-medium">{route.flightCode}</p>
                                    {/* <p>{'Airbus A320'}</p> */}
                                </div>
                            </div>
                            <div className="flex flex-row gap-20">
                                <p className="text-lg font-medium">{route.arrival}</p>
                                <div className="flex flex-col">
                                    <p className="text-lg font-medium">
                                        {`${route.destinationName} (${route.destination})`}
                                    </p>
                                    <p className="text-gray-400">{'Soekarno Hatta Internation Airport'}</p>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
                <p>Detail Penumpang</p>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>No.</TableColumn>
                        <TableColumn>Nama Penumpang</TableColumn>
                        <TableColumn>No. Penerbangan</TableColumn>
                        <TableColumn>Fasilitas</TableColumn>
                    </TableHeader>
                    
                    <TableBody items={passengers ?? []}>
                        {(item) => (
                            <TableRow key={item.date_of_birth}>
                                <TableCell>{1}</TableCell>
                                <TableCell>{`${item.title} ${item.first_name} ${item.last_name}`}</TableCell>
                                <TableCell>{data?.data.flightdetail?.[0]?.flightCode}</TableCell>
                                <TableCell>{'-'}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    
                </Table>
                <div className="flex flex-col gap-4">
                    <p>Catatan Penting:</p>
                    <div className="flex flex-col text-sm">
                        <p>• Untuk penerbangan domestik dan internasional, penumpang wajib memperhatikan dan melengkapi persyaratan perjalanan, seperti dokumen kesehatan terkait COVID-19, ketentuan paspor & visa, kartu identitas, ketentuan karantina, dan ketentuan transit/koneksi. Ketentuan regulasi tiap negara dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Penumpang sepenuhnya bertanggung jawab terhadap pemenuhan kelengkapan persyaratan perjalanan yang dibutuhkan pada saat keberangkatan dan/atau saat kedatangan. Untuk informasi lebih lanjut, silakan cek https://tikecare.com/.</p>
                        <p>• Penumpang diharapkan tiba di terminal keberangkatan selambat-lambatnya 4 (empat) jam sebelum waktu keberangkatan pada penerbangan domestik dan internasional untuk melakukan check-in.</p>
                        <p>• Check-in ditutup 60 menit sebelum waktu keberangkatan.</p>
                        <p>• Penumpang diharapkan tiba di gerbang keberangkatan (Boarding Gate) 45 menit sebelum waktu keberangkatan.</p>
                        <p>• Penumpang wajib membawa KTP atau Kartu Keluarga (hard/soft copy untuk penumpang anak dan bayi ).</p>
                        <p>• Nama pemilik tiket harus sesuai dengan nama yang terdapat di KTP (penerbangan domestik) dan paspor (penerbangan internasional). Jika terdapat perbedaan pada nama pemilik tiket dengan KTP atau paspor maka akan mengikuti ketentuan dan/atau regulasi maskapai yang berlaku.</p>
                        <p>• Untuk penerbangan ke luar negeri, masa berlaku identitas paspor wajib di atas 6 (enam) bulan.</p>
                        <p>• Untuk alasan keamanan, penumpang dilarang membawa barang berbahaya seperti gas yang didinginkan (seperti gas padat yang mudah dan tidak mudah terbakar, atau yang beracun seperti butana, oksigen, nitrogen cair, tabung aqualung, dan tabung gas padat), zat Korosif (seperti asam, alkali, merkuri dan sel baterai cair), bahan peledak (amunisi, kembang api dan pistol api), zat cair serta padat yang mudah terbakar (seperti refill pemantik, bahan bakar pemantik, korek api), zat radioaktif, zat beracun dan benda yang dapat menimbulkan infeksi (seperti insektisida, pembunuh ilalang dan materi virus hidup), benda-benda berbahaya lainnya (seperti materi yang dimagnetisasi, yang dapat melukai atau membuat iritasi), agen etiologis (bakteri, virus, dll.), dan zatzat yang mengandung merkuri.</p>
                        <p>• Untuk Informasi jatah bagasi gratis dapat menghubungi Call Center maskapai yang bersangkutan.</p>
                        <p>• Silakan merujuk pada Syarat dan Ketentuan maskapai untuk informasi lebih lanjut. Penumpang/pemilik tiket ini tunduk pada syarat dan ketentuan penerbangan yang ditetapkan oleh maskapai.</p>
                    </div>
                    <p>Syarat atau ketentuan pembatalan dan perubahan data tiket penerbangan :</p>
                    <div className="flex flex-col text-sm">
                        <p>• Permintaan perubahan dan/atau pembatalan tiket mengacu kepada peraturan maskapai penerbangan yang berlaku, silakan menghubungi Customer Care tiket.com untuk informasi lebih lanjut.</p>
                        <p>• Jika terdapat pembatalan penerbangan dari pihak maskapai, pelanggan dapat menghubungi Customer Care tiket.com di 0804 1500 777 dan email ke cs@tiketq.com dengan mencantumkan:</p>
                        <p>- Nama penumpang yang batal terbang.</p>
                        <p>- Order ID/Kode booking.</p>
                        <p>• Penyediaan fasilitas ekstra seperti asuransi, bagasi tambahan, tempat duduk, makanan tergantung pada ketersediaan. Fasilitas ekstra tidak dapat dikembalikan dan tidak dapat dipindahtangankan setelah dibeli sesuai dengan aturan penyedia layanan.</p>
                        <p>• Pihak tiket.com berhak membatalkan tiket hasil reschedule yang sudah diajukan ke tiket.com jika tiket tersebut pernah melakukan web check-in, reschedule, sudah digunakan (flown), dan pernah mengajukan pembatalan/refund melalui situs resmi maskapai atau brand office.</p>
                        <p>• Dalam hal terdapat permohonan pengembalian dana, maka proses pengembalian dana tersebut dapat memakan waktu kurang lebih 14 (empat belas) hari kerja dengan mengacu kepada peraturan maskapai penerbangan yang berlaku, terhitung sejak pengajuan tanggal pembatalan diterima oleh Customer Care tiket.com disertai dengan kelengkapan data dan dokumen yang disyaratkan dan dapat dikenakan biaya dengan mengacu pada ketentuan dari maskapai. Proses pengembalian dana sepenuhnya merupakan hubungan hukum antara penumpang dengan maskapai penerbangan bersangkutan, dalam hal ini tiket.com hanya bertindak sebagai agen penjual tiket penerbangan. Apabila penumpang masih belum menerima pengembalian dana dalam kurun  waktu tersebut, mohon hubungi Customer Care tiket.com. Ketentuan refund ini menggantikan seluruh ketentuan refund yang dinyatakan di dokumen lain.3</p>
                    </div>
                </div>
            </div>
        )
    )
}

export default EticketContainer