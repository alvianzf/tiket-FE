import { DateISOFormat } from "@api/baseApi/types";

export interface FindFlightsRequest {
    from: string;
    to: string;
    date: string;
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
    flight_detailroute: FlightDetail[];
}

interface FlightDetail {
    route_airport: string;
    route_city_code: string;
    route_city_name: string;
    route_date: string;
    route_duration_stop: string;
    route_time: string;
}