
export interface BookFlightRequest {
    flight: string;
    from: string;
    to: string;
    date: string;
    adult: number;
    child: number;
    infant: number;
    email: string;
    phone: string;
    passengername: string;
    dateofbirth: string;
}

export type BookFlightResponse = BookFlight; 

interface ContactDetailInfo {
    contact_title: string;
    contact_fullname: string;
    contact_email: string;
    contact_phone: string;
}

interface PassengerInfo {
    passenger_title: string;
    passenger_fullname: string;
    passenger_type: string;
    passenger_baggageintl: string;
    passenger_ffnumber: string;
    passenger_dob: string;
    passenger_passportnumber: string;
    passenger_passportexpired: string;
}

export interface BookFlight {
    result: "ok" | "no";
    tid: string;
    tanggal: string;
    flight: string;
    flight_code: string;
    kodebooking: string;
    flight_route: string;
    flight_departure: string;
    flight_time: string;
    flight_response: string;
    flight_infotransit: string;
    flight_class: string;
    flight_totalpassenger: string;
    flight_datapassengers_json: PassengerInfo[];
    flight_contactdetails_json: ContactDetailInfo;
    flight_currency: string;
    flight_publishfare: number;
    flight_tax: number;
    flight_totalfare: number;
    flight_realnta: number;
    flight_shownta: number;
    flight_bonus_agen: number;
    flight_timelimit: string;
    flight_bookingby: string;
    flight_bookingby_kodeagen: string;
    flight_issued_date: string;
    flight_issued_ticketnumber: string;
    flight_issuedby: string;
    flight_issuedby_kodeagen: string;
    flight_statusbooking: string;
}

export interface CheckBookRequest {
    kodebooking: string;
}

export type CheckBookResponse = BookFlight;