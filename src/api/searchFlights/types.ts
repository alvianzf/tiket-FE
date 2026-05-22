
export interface FlightClass {
    availability: number;
    class: string;
    price: number;
    departureTime: string;
    depatureTime: string;
    arrivalTime: string;
    flightCode: string;
    departure: string;
    departureName: string;
    arrival: string;
    arrivalName: string;
    isInternational: number,
    departureTimeZone: string;
    arrivalTimeZone: string;
    departureTimeZoneText: string;
    arrivalTimeZoneText: string;
    duration: string;
    departureDate: string;
    arrivalDate: string;
}

export interface DetailTitle {
    flightIcon: string;
    flightName: string;
    transitTime: string;
    flightCode: string;
    origin: string;
    originName: string;
    destination: string;
    destinationName: string;
    depart: string;
    arrival: string;
    departureDate: string;
    durationDetail: string;
    arrivalDate: string;
    departureTimeZoneText: string;
    arrivalTimeZoneText: string;
}

export interface Flight {
    classes: FlightClass[][];
    title: string;
    isTransit: boolean;
    detailTitle: DetailTitle[];
    cityTransit: string;
    departureDate: string;
    arrivalDate: string;
    duration: string;
    airlineIcon: string;
    airlineName: string;
    airlineCode: string;
    searchId: string;
}

export const getPrice = (f: Flight): number | null => {
    if (!f.classes || f.classes.length === 0) return null;
    
    // For transit flights, the first segment carries the total bundled price.
    // Connecting segments have price=0 by design (included in the first leg).
    // For direct flights, there's only one segment.
    // Strategy: use the first segment's price as the base fare.
    const firstSegmentClasses = f.classes[0];
    const firstClass = firstSegmentClasses?.[0];

    if (!firstClass || firstClass.price === undefined || firstClass.price === null) return null;

    const rawPrice = firstClass.price as string | number;
    const price = typeof rawPrice === 'string' ? parseFloat(rawPrice.replace(/[^0-9]/g, '')) : Number(rawPrice);

    // Return null for 0, NaN, or negative prices — these flights have no valid pricing
    if (!Number.isFinite(price) || price <= 0) return null;

    return price;
};

export interface GetFlightRequest {
    departure: string;
    arrival: string;
    departureDate: string;
    adult: number;
    child: number;
    infant: number;
}

export interface GetFlightResponse {
    msg: string;
    data: Flight[][];
}