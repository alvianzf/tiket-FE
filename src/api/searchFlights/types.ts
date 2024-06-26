
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
    classes: FlightClass[];
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