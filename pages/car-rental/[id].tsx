import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { NextPageWithLayout } from "@interfaces/common";
import { AppLayout } from "@layouts";
import { getCarById } from '@api/carRental';
import { CarPhoto } from '@api/carRental/types';
import { 
    Button, 
    Skeleton, 
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

const CarDetailPage: NextPageWithLayout = () => {
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
        <div className="min-h-screen bg-slate-50 pb-32 pt-28 relative">
            {/* Centered Container with max-w-[800px] to ensure ample horizontal space */}
            <div className="max-w-[800px] mx-auto px-6 sm:px-8">
                
                {/* Header & Breadcrumbs */}
                <div className="flex items-center justify-between mb-8">
                    <Breadcrumbs 
                        underline="hover"
                        classNames={{
                            list: "bg-white px-5 py-2.5 rounded-xl border border-slate-200 shadow-sm"
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
                        className="bg-white shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-100"
                    >
                        <ArrowLeft size={18} />
                    </Button>
                </div>

                <div className="flex flex-col gap-8">
                    {/* Media / Gallery Section */}
                    <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 flex flex-col gap-4">
                        <Swiper
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            modules={[FreeMode, Navigation, Thumbs, Pagination]}
                            className="aspect-[16/9] w-full rounded-2xl overflow-hidden"
                            pagination={{ clickable: true }}
                        >
                            {(car.photos && car.photos.length > 0 ? car.photos : [{ url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80' }]).map((photo: Partial<CarPhoto>, index: number) => (
                                <SwiperSlide key={photo.id || index} onClick={() => handlePhotoClick(photo.url || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80')}>
                                    <div className="relative w-full h-full cursor-zoom-in group">
                                        <Image 
                                            src={photo.url || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80'} 
                                            alt={car.name || 'Vehicle Photo'} 
                                            fill 
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            priority={index === 0}
                                            unoptimized
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Thumbnails Swiper */}
                        {(car.photos && car.photos.length > 1) && (
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={5}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="h-20"
                            >
                                {car.photos.map((photo: CarPhoto, index: number) => (
                                    <SwiperSlide key={photo.id || index} className="rounded-xl overflow-hidden cursor-pointer border-2 border-transparent data-[thumb-active=true]:border-orange-500 transition-colors">
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

                    {/* Clean Header Details Info Card */}
                    <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Chip color="success" variant="flat" size="sm" className="font-semibold border-none">Tersedia</Chip>
                                <Chip variant="flat" size="sm" className="bg-slate-100 text-slate-600 border-none font-semibold">{car.type}</Chip>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">{car.name}</h1>
                            
                            <div className="flex items-baseline gap-2 pt-2 pb-4 border-b border-slate-100">
                                <span className="text-3xl font-bold text-orange-600">{formattedPrice}</span>
                                <span className="text-slate-500 font-medium whitespace-nowrap">/ hari</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                                    <Users size={16} />
                                    Kapasitas
                                </div>
                                <span className="text-slate-900 font-bold">{car.rows} Baris</span>
                            </div>
                            <div className="flex flex-col gap-1 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                                    <Settings size={16} />
                                    Transmisi
                                </div>
                                <span className="text-slate-900 font-bold">{car.transmission || 'Otomatis'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
                            Fasilitas & Fitur
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(car.features ?? ['AC Dingin', 'Kabin Bersih', 'Driver Ramah']).map((feature, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 font-medium hover:border-slate-200 transition-colors">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                                        <ShieldCheck size={20} />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200 mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
                            Tentang Kendaraan
                        </h2>
                        <div 
                            className="prose prose-slate max-w-none text-slate-600 leading-relaxed rich-description text-lg"
                            dangerouslySetInnerHTML={{ __html: car.description || '<p>Tidak ada deskripsi tersedia untuk kendaraan ini.</p>' }}
                        />
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .rich-description p { margin-bottom: 1rem; }
                .rich-description ul, .rich-description ol { margin-bottom: 1rem; padding-left: 1.5rem; }
                .rich-description li { margin-bottom: 0.5rem; }
                .swiper-button-next, .swiper-button-prev {
                    background: rgba(255, 255, 255, 0.9);
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    color: #475569;
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                    transition: background 0.2s;
                }
                .swiper-button-next:hover, .swiper-button-prev:hover {
                    background: white;
                    color: #ea580c;
                }
                .swiper-button-next:after, .swiper-button-prev:after {
                    font-size: 1.25rem;
                    font-weight: bold;
                }
                .swiper-pagination-bullet-active {
                    background: #ea580c !important;
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
                                <div className="relative w-full h-[85vh] rounded-[2rem] overflow-hidden">
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

            {/* Always-visible Sticky Bottom Bar for booking CTA */}
            <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-slate-200 py-4 px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <div className="max-w-[800px] mx-auto w-full flex items-center justify-between gap-6">
                    <div className="flex flex-col hidden sm:flex">
                        <span className="text-xs text-slate-500 font-semibold">{car?.name}</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-orange-600">{formattedPrice}</span>
                        </div>
                    </div>
                    <Button 
                        size="lg"
                        className="bg-orange-600 text-white font-bold h-14 px-12 rounded-xl shadow-md active:scale-95 w-full sm:w-auto"
                        onPress={handleRent}
                    >
                        Sewa Sekarang
                    </Button>
                </div>
            </div>
        </div>
    );
};

CarDetailPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default CarDetailPage;
