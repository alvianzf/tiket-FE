export interface Airport {
    code: string;
    name: string;
    bandara: string;
    group: "Internasional" | "Domestik";
}

export type GetAirportsResponse = Airport[];

export type GetSearchAirportsResponse = Airport[];