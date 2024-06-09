import { DateISOFormat, DateIndoFormat } from "@api/baseApi/types";

export interface FindFlightsRequest {
    from: string;
    to: string;
    date: DateIndoFormat;
}

export type FindFlightsResponse = Flight[];

export interface Flight {
    flight_id: string;
    flight: string;
    flight_code: string;
    flight_image: string;
    flight_from: string;
    flight_to: string;
    flight_route: string;
    flight_date: DateISOFormat;
    flight_duration: string;
    flight_transit: 'Nonstop' | '1 Transit' | '2 Transit' | '3 Transit';
    flight_infotransit: string;
    flight_datetime: string;
    flight_price: string;
    flight_publishfare: string;
    flight_seatavail: string;
    flight_baggage: string;
    flight_facilities: string;
}