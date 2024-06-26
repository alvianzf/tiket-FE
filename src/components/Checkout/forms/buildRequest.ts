import { GetBookFlightRequest } from "@api/bookFlight/types";
import { FormProps } from "./useForm";

function formatDate(inputDate: string | number | Date) {
    // Create a new Date object from the input date string
    const date = new Date(inputDate);
    
    // Extract the necessary parts of the date (month, day, year)
    const month = date.getMonth() + 1; // getMonth() returns 0-11, so we add 1
    const day = date.getDate();
    const year = date.getFullYear();
    
    // Ensure each part is two digits (e.g., '03' for March)
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;
    
    // Construct the formatted date string in MM/DD/YYYY format
    const formattedDate = formattedMonth + '/' + formattedDay + '/' + year;
    
    return formattedDate;
}

const buildRequest = (data: FormProps): GetBookFlightRequest => {

    const passengers: string[] = [];
    const dateofbirths: string[] = [];

    data.adultPassengers.map((adult) => passengers.push(`${adult.call}. ${adult.firstname} ${adult.lastname}`));
    data.childPassengers.map((child) => passengers.push(`${child.call}. ${child.firstname} ${child.lastname}`));
    data.infantPassengers.map((infant) => passengers.push(`${infant.call}. ${infant.firstname} ${infant.lastname}`));

    data.adultPassengers.map((adult) => dateofbirths.push(adult.date_of_birth));
    data.childPassengers.map((child) => dateofbirths.push(child.date_of_birth));
    data.infantPassengers.map((infant) => dateofbirths.push(infant.date_of_birth));
    

    return {
        searchId: data.searchId,
        adult: data.adult.toString(),
        child: data.child.toString(),
        infant: data.infant.toString(),
        buyer: {
            telp_number: data.phone,
            mobile_number: data.phone,
            email: data.email
        },
        passengers: {
            adults: data.adultPassengers.map((adult) => ({
                title: adult.call,
                first_name: adult.firstname,
                last_name: adult.lastname,
                date_of_birth: formatDate(adult.date_of_birth)
            })),
            childrens: data.childPassengers.map((child) => ({
                title: child.call,
                first_name: child.firstname,
                last_name: child.lastname,
                date_of_birth: formatDate(child.date_of_birth)
            })),
            infants: data.infantPassengers.map((infant) => ({
                title: infant.call,
                first_name: infant.firstname,
                last_name: infant.lastname,
                date_of_birth: formatDate(infant.date_of_birth)
            }))
        }
    }
}

export default buildRequest