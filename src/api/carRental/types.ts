export interface CarSearchParams {
    date?: string;
    type?: string;
    rows?: number | '';
}

export interface CarPhoto {
    id: number;
    filename: string;
    url: string;
    isPrimary: boolean;
    carId: number;
    createdAt: string;
}

export interface CarResult {
    id: string | number;
    name: string;
    type: string;
    rows: number;
    pricePerDay: number | string;
    transmission: string;
    features: string[];
    available: boolean;
    description?: string;
    photos?: CarPhoto[];
}

export interface CarSearchResponse {
    message: string;
    data: CarResult[];
    total: number;
}

export interface CarTypesResponse {
    message: string;
    data: string[];
}
