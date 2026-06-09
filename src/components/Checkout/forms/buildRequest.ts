import { GetBookFlightRequest } from "@api/bookFlight/types";
import { FormProps } from "./useForm";

function formatDate(inputDate: string | number | Date) {
    if (!inputDate) return '';
    // Create a new Date object from the input date string
    const date = new Date(inputDate);
    if (isNaN(date.getTime())) return '';
    
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

/**
 * Normalise a phone number to the local Indonesian format (08...)
 * expected by the flight provider.
 *
 * Examples:
 *   628123456789  → 08123456789
 *   +628123456789 → 08123456789
 *   08123456789   → 08123456789  (already correct)
 *   8123456789    → 08123456789
 */
function normalizePhone(phone: string): string {
    if (!phone) return phone;
    const digits = phone.replace(/\D/g, ''); // strip spaces, dashes, plus signs
    if (digits.startsWith('62')) return '0' + digits.slice(2);
    if (digits.startsWith('0')) return digits;
    return '0' + digits;
}

const buildRequest = (data: FormProps): GetBookFlightRequest => {

    // Build buyer name from first adult passenger
    const firstAdult = data.adultPassengers[0];
    const buyerName = firstAdult
        ? `${firstAdult.call}. ${firstAdult.firstname} ${firstAdult.lastname}`.trim()
        : '';

    return {
        searchId: data.searchId,
        adult: data.adult.toString(),
        child: data.child.toString(),
        infant: data.infant.toString(),
        buyer: {
            name: buyerName,
            telp_number: normalizePhone(data.phone),
            mobile_number: normalizePhone(data.phone),
            email: data.email
        },
        passengers: {
            adults: data.adultPassengers.map((adult) => ({
                title: adult.call,
                first_name: adult.firstname,
                last_name: adult.lastname,
                date_of_birth: formatDate(adult.date_of_birth),
                nationality: '',
                passport_number: '',
                passport_issue_date: '',
                passport_expiry_date: '',
                passport_issuing_country: '',
                cabin_class: adult.cabinClass || 'economy',
                baggage_kg: adult.baggageKg ?? 0
            })),
            children: data.childPassengers.map((child) => ({
                title: child.call,
                first_name: child.firstname,
                last_name: child.lastname,
                date_of_birth: formatDate(child.date_of_birth),
                nationality: '',
                passport_number: '',
                passport_issue_date: '',
                passport_expiry_date: '',
                passport_issuing_country: '',
                cabin_class: child.cabinClass || 'economy',
                baggage_kg: child.baggageKg ?? 0
            })),
            infants: data.infantPassengers.map((infant) => ({
                title: infant.call,
                first_name: infant.firstname,
                last_name: infant.lastname,
                date_of_birth: formatDate(infant.date_of_birth),
                nationality: '',
                passport_number: '',
                passport_issue_date: '',
                passport_expiry_date: '',
                passport_issuing_country: '',
                cabin_class: infant.isLapInfant ? 'lap' : (infant.cabinClass || 'economy'),
                baggage_kg: 0,
                is_lap_infant: infant.isLapInfant ?? false
            }))
        }
    }
}

export default buildRequest