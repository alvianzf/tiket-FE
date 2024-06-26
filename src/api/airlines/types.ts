
export interface AirLine {
    airlineCode: string;
    airlineName: string;
}

export interface GetAirLinesResponse {
    msg: string;
    data: AirLine[];
}