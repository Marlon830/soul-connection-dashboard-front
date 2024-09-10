import axios from "axios";
import { ZodiacSign } from "./astroCompatibility";

export interface Encounter {
    date: string,
    rating: number,
    comment: string,
    source: string,
};

export interface Payment {
    date: string,
    payment_method: string,
    amount: number,
    comment: string,
};

export interface Clothe {
    id: number,
    type: string,
    imageId: string,
};

export interface Customer {
    id: number,
    email: string,
    name: string,
    surname: string,
    birth_date: string,
    gender: string,
    description?: string,
    astrological_sign: ZodiacSign,
    phone_number: string,
    coachId?: number,
    encounters: Array<Encounter>,
    payments: Array<Payment>,
    clothes: Array<Clothe>,
    imageId?: string,
    address?: string,
    // TODO: Remove this later
    coachName?: string | null,
};

export let cachedCustomers: Array<Customer> = [];

export const getCustomers = async (role: string | null): Promise<Array<Customer>> => {
    if (cachedCustomers.length > 0) {
        return cachedCustomers;
    }
    if (!role) {
        return [];
    }
    try {
        const apiURL = role === "Coach" ? "/employees/my_clients" : "/customers/all_customers";
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}${apiURL}`, {
            withCredentials: true,
        });
        cachedCustomers = response.data;
        return response.data;
    } catch (error) {
        console.error("Error fetching customers:", error);
    }
    return [];
};
