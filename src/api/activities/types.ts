export interface Activity {
    id: number;
    name: string;
    category: string;
    location?: string;
    description?: string;
    price: number | string;
    duration?: string;
    photos: string[];
    available: boolean;
}

export interface ActivityListResponse {
    message: string;
    data: Activity[];
}

export interface BookActivityPayload {
    date: string;
    participants: number;
    fullName: string;
    phone: string;
    email: string;
}

export interface BookActivityResponse {
    status: number;
    message: string;
    data: { id: number; transaction?: { bookingCode: string; totalSales: number } };
}
