export interface Hotel {
    id: number;
    name: string;
    location: string;
    description?: string;
    pricePerNight: number | string;
    amenities: string[];
    photos: string[];
    available: boolean;
}

export interface HotelListResponse {
    message: string;
    data: Hotel[];
}

export interface BookHotelPayload {
    checkIn: string;
    checkOut: string;
    guests: number;
    fullName: string;
    phone: string;
    email: string;
}

export interface BookHotelResponse {
    status: number;
    message: string;
    data: { id: number; transaction?: { bookingCode: string; totalSales: number } };
}
