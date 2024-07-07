import axios from "axios";
import { Booking, BookingData, BookingListProps } from "../types/bookingData";


export async function getBookings(): Promise<{ data?: Booking[]; error?: string }> {
    try {
        const res = await fetch('http://host.docker.internal:5000/api/bookings',
            { cache: 'no-store' });

        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.message || 'Failed to fetch bookings. Please try again later.' };
        }

        const data = await res.json();
        return { data };
    } catch (error) {
        return { error: 'Failed to fetch bookings. Please try again later.' };
    }
}

export async function getBookingsById(id: number): Promise<{ data?: Booking; error?: string }> {
    try {

        const res = await fetch(`http://host.docker.internal:5000/api/bookings/${id}`, { cache: 'no-store' });


        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.message || 'Failed to fetch bookings. Please try again later.' };
        }

        const data = await res.json();
        return { data };
    } catch (error) {
        return { error: 'Failed to fetch bookings. Please try again later.' };
    }
}



export async function postBooking(formData: BookingData) {
    try {
        const response = await axios.post('http://host.docker.internal:5000/api/bookings', formData);

        if (response.status === 201) {
            return response.data;
        } else {
            const errorData = response.data;
            throw new Error(errorData.message || ' Failed to post data. Please try again! ');
        }
    } catch (error: any) {
        return { error: error.message || ' Failed to post data. Please try again! ' };
    }
}

