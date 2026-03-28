import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getCarById } from '@api/carRental';
import { CarPhoto } from '@api/carRental/types';
import { 
    Button, 
    Card, 
    CardBody, 
    Skeleton, 
    Divider,
    Breadcrumbs,
    BreadcrumbItem,
    Chip
} from "@nextui-org/react";
import { 
    Users, 
    Settings, 
    Car as CarIcon,
    ShieldCheck,
    Calendar,
    ArrowLeft
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

const CarDetailPage = () => {
    const router = useRouter();
    const { id, date } = router.query;
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    const { data: car, isLoading, error } = useQuery(
        ['car', id],
        () => getCarById(id as string),
        { enabled: !!id }
    );

    const handleBack = () => router.back();

    const handleRent = () => {
        router.push({
            pathname: '/car-rental/rent',
            query: { carId: car?.id, date: date ?? '' }
        });
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-12">
                <Skeleton className="h-8 w-48 rounded-lg mb-8" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Skeleton className="aspect-video w-full rounded-3xl" />
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="aspect-video rounded-xl" />)}
                        </div>
                        <Skeleton className="h-64 w-full rounded-2xl" />
                    </div>
                    <div className="space-y-6">
                        <Skeleton className="h-96 w-full rounded-3xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !car) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-xl text-slate-600">Terjadi kesalahan saat memuat data kendaraan.</p>
                <Button onPress={handleBack} variant="flat">Kembali</Button>
            </div>
        );
    }

    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(Number(car.pricePerDay));

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20 pt-28">
            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumbs & Back Button */}
                <div className="flex items-center justify-between mb-8">
                    <Breadcrumbs 
                        underline="hover"
                        classNames={{
                            list: "bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm"
                        }}
                    >
                        <BreadcrumbItem href="/">Home</BreadcrumbItem>
                        <BreadcrumbItem href="/car-rental">Sewa Mobil</BreadcrumbItem>
                        <BreadcrumbItem>{car.name}</BreadcrumbItem>
                    </Breadcrumbs>
                    <Button 
                        isIconOnly 
                        variant="flat" 
                        onPress={handleBack}
                        className="bg-white shadow-sm border border-slate-200"
                    >
                        <ArrowLeft size={20} />
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Column: Media & Description */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Swiper Gallery */}
                        <div className="space-y-4">
                            <Swiper
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                                className="aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/40"
                                pagination={{ clickable: true }}
                            >
                                {(car.photos && car.photos.length > 0 ? car.photos : [{ url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80' }]).map((photo: Partial<CarPhoto>, index: number) => (
                                    <SwiperSlide key={photo.id || index}>
                                        <div className="relative w-full h-full">
                                            <Image 
                                                src={photo.url || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80'} 
                                                alt={car.name || 'Vehicle Photo'} 
                                                fill 
                                                className="object-cover"
                                                priority={index === 0}
                                                unoptimized
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Thumbnails */}
                            {(car.photos && car.photos.length > 1) && (
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={12}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="h-24"
                                >
                                    {car.photos.map((photo: CarPhoto, index: number) => (
                                        <SwiperSlide key={photo.id || index} className="rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent data-[thumb-active=true]:border-orange-500">
                                            <div className="relative w-full h-full">
                                                <Image 
                                                    src={photo.url || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80'} 
                                                    alt={`${car.name || 'Vehicle'} thumbnail ${index}`} 
                                                    fill 
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>

                        {/* Description Section */}
                        <Card className="border-none shadow-sm bg-white/70 backdrop-blur-md rounded-[2.5rem] p-4 lg:p-8">
                            <CardBody className="gap-8">
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-slate-800">Tentang Kendaraan</h2>
                                    <div 
                                        className="prose prose-slate max-w-none text-slate-600 leading-relaxed rich-description"
                                        dangerouslySetInnerHTML={{ __html: car.description || '<p>Tidak ada deskripsi tersedia untuk kendaraan ini.</p>' }}
                                    />
                                </div>

                                <Divider className="my-2 bg-slate-200" />

                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-slate-800">Fitur & Fasilitas</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {(car.features ?? ['AC', 'USB Port', 'Spare Tire']).map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-100/50 border border-slate-200/50 text-slate-700 font-medium">
                                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                                    <ShieldCheck size={16} className="text-green-500" />
                                                </div>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Right Column: Booking & Stats */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-6">
                            <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
                                <div className="p-8 space-y-8">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Chip color="success" variant="flat" size="sm" className="font-bold border-none">Tersedia</Chip>
                                            <Chip variant="flat" size="sm" className="bg-slate-100 text-slate-600 border-none">{car.type}</Chip>
                                        </div>
                                        <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">{car.name}</h1>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-black text-orange-600">{formattedPrice}</span>
                                            <span className="text-slate-500 font-medium">/hari</span>
                                        </div>
                                    </div>

                                    <Divider className="bg-slate-100" />

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                                <Users size={14} />
                                                Kapasitas
                                            </div>
                                            <span className="text-slate-900 font-bold">{car.rows} Baris</span>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                                <Settings size={14} />
                                                Transmisi
                                            </div>
                                            <span className="text-slate-900 font-bold">{car.transmission || 'Otomatis'}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-slate-600 text-sm bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                                            <Calendar size={18} className="text-blue-500" />
                                            <span>Mulai sewa dari: <strong>{date || 'Pilih tanggal'}</strong></span>
                                        </div>

                                        <Button 
                                            size="lg"
                                            className="w-full h-16 rounded-2xl bg-orange-600 text-white font-black text-lg shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all"
                                            onPress={handleRent}
                                        >
                                            Sewa Sekarang
                                        </Button>
                                    </div>

                                    <div className="pt-2">
                                        <p className="text-[10px] text-zinc-400 text-center uppercase tracking-widest font-bold">
                                            * Harga sudah termasuk asuransi dasar
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            {/* Trust Badges */}
                            <div className="px-4 grid grid-cols-3 gap-4">
                                {[
                                    { icon: <ShieldCheck size={20} />, label: 'Aman' },
                                    { icon: <CarIcon size={20} />, label: 'Terawat' },
                                    { icon: <Calendar size={20} />, label: 'Mudah' },
                                ].map((badge, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-slate-400">
                                            {badge.icon}
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{badge.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .rich-description p { margin-bottom: 1rem; }
                .rich-description ul, .rich-description ol { margin-bottom: 1rem; padding-left: 1.5rem; }
                .rich-description li { margin-bottom: 0.5rem; }
                .rich-description h1, .rich-description h2, .rich-description h3 { 
                    color: #1e293b; 
                    font-weight: 700; 
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                }
                .swiper-button-next, .swiper-button-prev {
                    background: rgba(255, 255, 255, 0.8);
                    width: 48px;
                    height: 48px;
                    border-radius: 16px;
                    backdrop-filter: blur(8px);
                    color: #475569;
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                }
                .swiper-button-next:after, .swiper-button-prev:after {
                    font-size: 1.25rem;
                    font-weight: bold;
                }
                .swiper-pagination-bullet-active {
                    background: #ea580c !important;
                }
            `}</style>
        </div>
    );
};

export default CarDetailPage;
