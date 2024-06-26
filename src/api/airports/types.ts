
export interface Airport {
    code: string;
    name: string;
    bandara: string;
    group: "Internasional" | "Domestik";
}

export interface GetAirportsResponse {
    msg: string;
    data: Airport[];
}

export interface GetSearchAirportsResponse {
    data: Airport[];
}