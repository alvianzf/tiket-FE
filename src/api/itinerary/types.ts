export interface ItineraryItemPayload {
    destinationId: number;
    order: number;
}

export interface SubmitItineraryPayload {
    fullName: string;
    phone: string;
    email: string;
    startDate: string;
    durationLabel: string;
    notes?: string;
    items: ItineraryItemPayload[];
}

export interface SubmitItineraryResponse {
    status: number;
    message: string;
    data: {
        id: number;
        transaction?: { bookingCode: string; totalSales: number };
    };
}
