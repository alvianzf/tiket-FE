import baseAPI, { handleDefaultSuccess, handleDefaultError } from "@api/baseApi";

export type DanaPayMethod = "QRIS" | "BCA" | "BNI" | "BRI" | "MANDIRI";

export interface DanaPaymentResponse {
    method: DanaPayMethod;
    kind: "QRIS" | "VA";
    vaNumber: string | null;
    qrContent: string | null;
    paymentCode: string;
    expiryTime: string | null;
    referenceNo: string | null;
    bookingNo: string;
}

const API_DANA_CREATE_ORDER = "/api/dana/create-order";

/**
 * Create a native DANA payment for a booking. The amount is derived server-side
 * from the stored booking — the client only supplies the booking number and the
 * chosen payment method.
 */
export const createDanaOrder = async (bookingNo: string, payMethod: DanaPayMethod) =>
    await baseAPI
        .post<DanaPaymentResponse>(API_DANA_CREATE_ORDER, { bookingNo, payMethod })
        .then(handleDefaultSuccess)
        .catch(handleDefaultError);
