
export interface AirLine {
    airlineCode: string;
    airlineName: string;
}

export interface GetAirLinesResponse {
    message: string;
    data: AirLine[];
}