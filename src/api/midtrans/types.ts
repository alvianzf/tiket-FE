export interface customer_details {
    name: string;
    email: string;
    phone: string;
}

export interface item_details {
    id: string;
    price: number;
    quantity: number;
    name: string;
}

export interface transaction_details {
    order_id: string;
    gross_amount: number;
}

export interface midtrans_snap_request {
    customer_details: customer_details;
    transaction_details: transaction_details;
    item_details: item_details[];
}

export interface midtrans_snap_response {
    token: string;
}
