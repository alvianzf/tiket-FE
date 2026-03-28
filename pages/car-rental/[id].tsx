import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getCarById } from '@api/carRental';
import { CarPhoto } from '@api/carRental/types';
import { 
    Button, 
    Skeleton, 
    Divider,
    Breadcrumbs,
    BreadcrumbItem,
    Chip,
    useDisclosure,
    Modal,
    ModalContent,
    ModalBody
} from "@nextui-org/react";
import { 
    Users, 
    Settings, 
    ShieldCheck,
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
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    const handlePhotoClick = (url: string) => {
        setSelectedPhoto(url);
        onOpen();
    };

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
        <div className="min-h-screen bg-white pb-40 pt-28 relative">
            {/* Main Content Area */}
            <div className="max-w-[800px] mx-auto px-6">
                {/* Breadcrumbs & Back Button */}
                <div className="flex items-center justify-between mb-10">
                    <Breadcrumbs 
                        underline="hover"
                        classNames={{
                            list: "bg-white/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-200 shadow-sm"
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
                        className="bg-white shadow-md border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Button>
                </div>
                
                <div className="flex flex-col gap-12">
                    {/* Media / Gallery Section */}
                    <div className="space-y-6">
                        <Swiper
                            spaceBetween={12}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            modules={[FreeMode, Navigation, Thumbs, Pagination]}
                            className="aspect-video w-full rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100"
                            pagination={{ clickable: true }}
                        >
                            {(car.photos && car.photos.length > 0 ? car.photos : [{ url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80' }]).map((photo: Partial<CarPhoto>, index: number) => (
                                <SwiperSlide key={photo.id || index} onClick={() => handlePhotoClick(photo.url || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80')}>
                                    <div className="relative w-full aspect-video cursor-zoom-in group">
                                        <Image 
                                            src={photo.url || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80'} 
                                            alt={car.name || 'Vehicle Photo'} 
                                            fill 
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            priority={index === 0}
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Thumbnails Swiper */}
                        {(car.photos && car.photos.length > 1) && (
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={14}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="h-28 px-2"
                            >
                                {car.photos.map((photo: CarPhoto, index: number) => (
                                    <SwiperSlide key={photo.id || index} className="rounded-2xl overflow-hidden cursor-pointer border-3 border-transparent data-[thumb-active=true]:border-yellow-400 shadow-md transition-all">
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

                    {/* Header Details Info Card */}
                    <div className="bg-white border-2 border-slate-100 p-8 md:p-12 rounded-[3.5rem] flex flex-col gap-8 shadow-xl shadow-slate-200/50 relative">
                        <div className="flex items-center gap-3">
                            <Chip color="success" variant="solid" size="sm" className="font-black px-4 bg-green-500">TERSEDIA</Chip>
                            <Chip size="sm" className="bg-slate-100 text-slate-800 font-black px-4 border-none uppercase tracking-widest">{car.type}</Chip>
                        </div>
                        <div className="flex flex-wrap items-end justify-between gap-8">
                            <div className="space-y-3">
                                <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">{car.name}</h1>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-orange-600">{formattedPrice}</span>
                                    <span className="text-slate-400 font-bold uppercase text-sm tracking-[0.2em]">/ per hari</span>
                                </div>
                            </div>
                            <Button 
                                size="lg"
                                className="bg-yellow-400 text-slate-900 font-black h-20 px-14 rounded-[2rem] shadow-2xl shadow-yellow-400/30 hover:bg-yellow-500 hover:scale-105 active:scale-95 transition-all text-2xl border-4 border-white"
                                onPress={handleRent}
                            >
                                Sewa Sekarang
                            </Button>
                        </div>
                    </div>

                    <Divider className="bg-slate-100 h-[2px]" />

                    {/* Description & Features Stack */}
                    <div className="space-y-16">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                                <div className="w-2 h-10 bg-yellow-400 rounded-full" />
                                Tentang Kendaraan
                            </h2>
                            <div 
                                className="prose prose-slate max-w-none text-slate-600 leading-relaxed rich-description text-xl"
                                dangerouslySetInnerHTML={{ __html: car.description || '<p>Tidak ada deskripsi tersedia untuk kendaraan ini.</p>' }}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col gap-4 shadow-inner">
                                <div className="flex items-center gap-3 text-slate-400 text-sm font-black uppercase tracking-[0.2em]">
                                    <Users size={20} className="text-yellow-500" />
                                    Kapasitas
                                </div>
                                <span className="text-slate-900 text-2xl font-black">{car.rows} Baris Kursi</span>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col gap-4 shadow-inner">
                                <div className="flex items-center gap-3 text-slate-400 text-sm font-black uppercase tracking-[0.2em]">
                                    <Settings size={20} className="text-yellow-500" />
                                    Transmisi
                                </div>
                                <span className="text-slate-900 text-2xl font-black">{car.transmission || 'Otomatis'}</span>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                                <div className="w-2 h-10 bg-yellow-400 rounded-full" />
                                Fitur Utama
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {(car.features ?? ['Full AC', 'Media Hub', 'Professional Driver']).map((feature, i) => (
                                    <div key={i} className="flex items-center gap-5 p-6 rounded-3xl bg-white border-2 border-slate-50 shadow-sm text-slate-800 font-black hover:border-yellow-200 transition-all cursor-default">
                                        <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-600 shadow-sm">
                                            <ShieldCheck size={24} />
                                        </div>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* High-Impact Trust / CTA Card */}
                        <div className="bg-slate-900 rounded-[4rem] p-12 md:p-16 text-white flex flex-col items-center text-center gap-8 shadow-3xl shadow-slate-900/40 relative overflow-hidden group mb-20">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full -mr-32 -mt-32 blur-[100px] group-hover:bg-yellow-400/10 transition-all animate-pulse" />
                            <div className="space-y-4 relative z-10">
                                <p className="text-yellow-400 font-black uppercase tracking-[0.3em] text-sm">TiketQ Premium Service</p>
                                <h3 className="text-4xl md:text-5xl font-black tracking-tighter italic">Solusi Perjalanan Terbaik di Batam</h3>
                            </div>
                            <p className="text-slate-400 max-w-xl text-xl leading-relaxed relative z-10">Kami memastikan setiap unit dalam kondisi prima untuk menjamin keamanan dan kenyamanan maksimal selama perjalanan Anda.</p>
                            <Button 
                                size="lg"
                                className="bg-yellow-400 text-slate-900 font-black h-20 px-20 rounded-[2rem] shadow-[0_20px_50px_rgba(250,204,21,0.3)] hover:bg-yellow-500 transition-all text-2xl relative z-10 scale-110 md:scale-125 my-6"
                                onPress={handleRent}
                            >
                                Pesan Sekarang
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .rich-description p { margin-bottom: 1.5rem; }
                .rich-description ul, .rich-description ol { margin-bottom: 1.5rem; padding-left: 2rem; }
                .rich-description li { margin-bottom: 0.75rem; }
                .rich-description h1, .rich-description h2, .rich-description h3 { 
                    color: #0f172a; 
                    font-weight: 900; 
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    letter-spacing: -0.025em;
                }
                .swiper-button-next, .swiper-button-prev {
                    background: white;
                    width: 56px;
                    height: 56px;
                    border-radius: 20px;
                    color: #0f172a;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    transition: all 0.3s;
                }
                .swiper-button-next:hover, .swiper-button-prev:hover {
                    transform: scale(1.1);
                    background: #fef08a;
                }
                .swiper-button-next:after, .swiper-button-prev:after {
                    font-size: 1.5rem;
                    font-weight: 900;
                }
                .swiper-pagination-bullet-active {
                    background: #facc15 !important;
                    width: 24px !important;
                    border-radius: 12px !important;
                }
            `}</style>

            {/* Photo Viewing Modal */}
            <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange} 
                size="5xl" 
                backdrop="blur" 
                hideCloseButton
                classNames={{
                    base: "bg-transparent shadow-none border-none",
                    body: "p-0",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <ModalBody onClick={onClose} className="cursor-zoom-out p-4">
                            {selectedPhoto && (
                                <div className="relative w-full h-[85vh] rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                                    <Image 
                                        src={selectedPhoto} 
                                        alt="Full Vehicle View" 
                                        fill
                                        className="object-contain"
                                        unoptimized
                                    />
                                </div>
                            )}
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>

            {/* High-Visibility Sticky Bottom Bar */}
            <div className="fixed bottom-0 inset-x-0 z-50 bg-slate-900/95 backdrop-blur-2xl border-t border-slate-800 py-6 px-8 shadow-[0_-25px_60px_-15px_rgba(0,0,0,0.6)]">
                <div className="max-w-[800px] mx-auto flex items-center justify-between gap-8">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] leading-none">{car?.name}</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-white leading-none">{formattedPrice}</span>
                            <span className="text-xs text-yellow-400 font-black tracking-widest leading-none">/HARI</span>
                        </div>
                    </div>
                    <Button 
                        size="lg"
                        className="bg-yellow-400 text-slate-900 font-black h-16 px-16 rounded-3xl shadow-[0_15px_40px_rgba(250,204,21,0.3)] hover:bg-yellow-500 hover:scale-105 active:scale-95 transition-all text-xl"
                        onPress={handleRent}
                    >
                        Sewa Sekarang
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CarDetailPage;
