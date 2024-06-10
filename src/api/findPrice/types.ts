
export interface FindPriceRequest {
    from: string;
    to: string;
    date: string;
    flight: string;
    adult: number;
    child: number;
    infant: number;
}

export type FindPriceResponse = FindPrice;

export interface FindPrice {
    result: "ok" | "no";
    flight: string;
    flight_code: string;
    flight_seat: string;
    flight_from: string;
    flight_to: string;
    flight_date: string;
    flight_departure: string;
    flight_transit: string;
    flight_infotransit: string;
    flight_time: string;
    flight_class: string;
    flight_availableseat: string;
    flight_baggage: string;
    flight_facilities: string;
    adult: string;
    child: string;
    infant: string;
    publish: number;
    tax: number;
    totalfare: number;
    flight_shownta: number;
    flight_realnta: number;
}