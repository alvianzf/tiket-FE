
interface FlightDetail {
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

interface PassengerResponse {
    title: string;
    first_name: string;
    last_name: string;
    date_of_birth?: string;
}

interface Buyer {
    telp_number: string;
    mobile_number: string;
    email: string;
    name?: string;
}

export interface GetBookFlightResponse {
    msg: string;
    rc: string;
    data: {
        flightdetail: FlightDetail[];
        passengers: {
            adults: PassengerResponse[];
            children: PassengerResponse[];
            infants: PassengerResponse[];
        }
        buyer: Buyer;
        bookingCode: string;
        reservationDate: string;
        timeLimit: string;
        nominal: string;
        comission: string;
        airlineCode: string;
        status: string;
        tiket_pdf?: string;
    }
}

interface PassengerRequest {
    title: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    nationality?: string;
    passport_number?: string;
    passport_issue_date?: string;
    passport_expiry_date?: string;
    passport_issuing_country?: string;
}

export interface GetBookFlightRequest {
    searchId: string;
    adult: string;
    child: string;
    infant: string;
    buyer: Buyer;
    passengers: {
        adults: PassengerRequest[];
        childrens: PassengerRequest[];
        infants: PassengerRequest[];
    }
}