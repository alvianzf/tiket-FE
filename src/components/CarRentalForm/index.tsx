import { Button } from "@nextui-org/react";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import baseApi from "@api/baseApi";
import { CarResult } from "@api/carRental/types";

interface Props {
    car: CarResult;
    date: string;
}

const CarRentalForm = ({ car, date }: Props) => {
    const { push } = useRouter();

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [rentalDays, setRentalDays] = useState(1);
    const [ktpImage, setKtpImage] = useState<File | null>(null);
    const [ktpSelfie, setKtpSelfie] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const ktpRef = useRef<HTMLInputElement>(null);
    const selfieRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {
        if (!fullName || !phone || !email) {
            toast.error('Please fill in all personal details.');
            return;
        }
        if (!ktpImage) { toast.error('Please upload your KTP photo.'); return; }
        if (!ktpSelfie) { toast.error('Please upload your KTP selfie photo.'); return; }

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('carId', String(car.id));
            formData.append('carName', car.name);
            formData.append('date', date);
            formData.append('rentalDays', String(rentalDays));
            formData.append('fullName', fullName);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('ktpImage', ktpImage);
            formData.append('ktpSelfie', ktpSelfie);

            await baseApi.post('/api/car-rental/rent', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast.success('Rental request submitted! We will contact you shortly.');
            push('/car-rental');
        } catch {
            toast.error('Failed to submit rental. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const totalPrice = Number(car.pricePerDay) * rentalDays;
    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency", currency: "IDR", maximumFractionDigits: 0
    }).format(Number(car.pricePerDay));
    const formattedTotalPrice = new Intl.NumberFormat("id-ID", {
        style: "currency", currency: "IDR", maximumFractionDigits: 0
    }).format(totalPrice);

    const UploadArea = ({
        label, subtitle, file, inputRef, icon, onChange
    }: { label: string; subtitle: string; file: File | null; inputRef: React.MutableRefObject<HTMLInputElement | null>; icon: string; onChange: (f: File) => void }) => (
        <div className="flex flex-col gap-2">
            <p className="font-semibold text-slate-700 text-sm">{label}</p>
            <p className="text-xs text-slate-500">{subtitle}</p>
            <input ref={inputRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) onChange(f); }} />
            <button
                onClick={() => inputRef.current?.click()}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all ${
                    file ? 'border-orange-400 bg-orange-50/30' : 'border-slate-300 hover:border-orange-300 hover:bg-orange-50/20'
                }`}
            >
                {file ? (
                    <><span className="text-2xl">✅</span><p className="text-sm font-medium text-orange-600">{file.name}</p><p className="text-xs text-slate-400">Click to change</p></>
                ) : (
                    <><span className="text-3xl">{icon}</span><p className="text-sm font-medium text-slate-600">Click to upload</p><p className="text-xs text-slate-400">JPG, PNG — max 5MB</p></>
                )}
            </button>
        </div>
    );

    return (
        <div className="flex flex-col gap-6 w-full max-w-[700px] mx-auto px-4 py-8">
            {/* Car summary */}
            <div className="glass-card p-6 rounded-2xl border border-white/20 bg-white/30 backdrop-blur-xl shadow-xl flex flex-col gap-3">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">{car.name}</h2>
                    <p className="text-slate-500 text-sm">{car.type} · {car.rows} Baris · {car.transmission}</p>
                </div>
                
                <div className="flex flex-col gap-1.5 pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Tanggal Sewa</span>
                        <span className="text-slate-800 font-bold">{date || '-'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Durasi Sewa</span>
                        <div className="flex items-center gap-2">
                            <input 
                                type="number" 
                                min="1" 
                                max="30"
                                className="w-16 border rounded-lg bg-white px-2 py-1 text-center font-bold text-orange-600 outline-none focus:border-orange-400"
                                value={rentalDays} 
                                onChange={(e) => setRentalDays(Math.max(1, parseInt(e.target.value) || 1))} 
                            />
                            <span className="text-slate-800 font-bold capitalize">{car.pricingDuration || 'Hari'}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Harga / {car.pricingDuration || 'Hari'}</span>
                        <span className="text-slate-800 font-bold">{formattedPrice}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-dashed border-slate-300">
                        <span className="text-slate-800 font-bold text-lg">Total Pembayaran</span>
                        <span className="text-orange-600 font-bold text-2xl">{formattedTotalPrice}</span>
                    </div>
                </div>
            </div>

            {/* Personal details */}
            <div className="glass-card p-6 rounded-2xl border border-white/20 bg-white/30 backdrop-blur-xl shadow-xl flex flex-col gap-4">
                <h3 className="font-bold text-slate-800 text-lg">Personal Details</h3>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-slate-600">Full Name (as in KTP)</label>
                    <input className="border-b border-slate-300 bg-transparent py-2 px-1 outline-none text-slate-800 focus:border-orange-400 transition-colors"
                        value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-slate-600">Phone Number</label>
                    <input className="border-b border-slate-300 bg-transparent py-2 px-1 outline-none text-slate-800 focus:border-orange-400 transition-colors"
                        type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-slate-600">Email Address</label>
                    <input className="border-b border-slate-300 bg-transparent py-2 px-1 outline-none text-slate-800 focus:border-orange-400 transition-colors"
                        type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>

            {/* Documents */}
            <div className="glass-card p-6 rounded-2xl border border-white/20 bg-white/30 backdrop-blur-xl shadow-xl flex flex-col gap-5">
                <h3 className="font-bold text-slate-800 text-lg">Identity Documents</h3>
                <p className="text-sm text-slate-500 -mt-2">Required for identity verification before your rental is approved.</p>
                <UploadArea
                    label="KTP Photo" subtitle="Clear, flat photo of your KTP — no glare or blur"
                    file={ktpImage} inputRef={ktpRef} icon="🪪"
                    onChange={setKtpImage}
                />
                <UploadArea
                    label="Selfie with KTP" subtitle="Hold your KTP next to your face, clearly visible"
                    file={ktpSelfie} inputRef={selfieRef} icon="🤳"
                    onChange={setKtpSelfie}
                />
            </div>

            <Button
                className="button-orange w-full h-14 text-base font-bold shadow-lg shadow-orange-500/30"
                isLoading={isSubmitting}
                onPress={handleSubmit}
            >
                Submit Rental Request
            </Button>
        </div>
    );
};

export default CarRentalForm;
