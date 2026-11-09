export interface Destination {
    id: number;
    name: string;
    area: string;
    category?: string;
    description?: string;
    tags: string[];
    minStayMinutes: number;
    travelGapMinutes: number;
    price: number | string;
    photos: string[];
    available: boolean;
}

export interface DestinationListResponse {
    message: string;
    data: Destination[];
}
