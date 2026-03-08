export interface FerrySector {
  id: string;
  name: string;
  code: string;
}

export interface FerryRoute {
  id: string;
  name: string;
  code: string;
  sectorID: string;
  embarkationPort: string;
  destinationPort: string;
}

export interface FerryTrip {
  tripID: string;
  vesselName: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  currency: string;
  availableSeats: number;
}

export interface FerryPassenger {
  firstName: string;
  lastName: string;
  passportNumber: string;
  passportExpiry: string;
  nationality: string;
  gender: string;
  birthDate: string;
}

export interface FerryBooking {
  id: string;
  bookingCode: string;
  totalAmount: number;
  status: string;
  passengers: FerryPassenger[];
}
