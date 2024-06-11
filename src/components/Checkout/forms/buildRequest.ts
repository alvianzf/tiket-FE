import { BookFlightRequest } from "@api/bookFlight/types";
import { FormProps } from "./useForm";

const buildRequest = (data: FormProps): BookFlightRequest => {

    const passengers: string[] = [];
    const dateofbirths: string[] = [];

    data.adultPassengers.map((adult) => passengers.push(`${adult.call}. ${adult.firstname} ${adult.lastname}`));
    data.childPassengers.map((child) => passengers.push(`${child.call}. ${child.firstname} ${child.lastname}`));
    data.infantPassengers.map((infant) => passengers.push(`${infant.call}. ${infant.firstname} ${infant.lastname}`));

    data.adultPassengers.map((adult) => dateofbirths.push(adult.date_of_birth));
    data.childPassengers.map((child) => dateofbirths.push(child.date_of_birth));
    data.infantPassengers.map((infant) => dateofbirths.push(infant.date_of_birth));
    

    return {
        flight: data.flight,
        from: data.from,
        to: data.to,
        date: data.date,
        adult: data.adult,
        child: data.child,
        infant: data.infant,
        email: data.email,
        phone: data.phone,
        passengername: passengers?.join(":") ?? "",
        dateofbirth: dateofbirths?.join(":") ?? ""
    }
}

export default buildRequest