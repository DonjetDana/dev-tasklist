export interface BookingData {
    service: string;
    doctor_name: string;
    date: string; 
    start_time: string;
    end_time: string;
}

export interface Booking {
  id: number;
  service: string;
  doctor_name: string;
  date: string; 
  start_time: string;
  end_time: string;
}

export interface BookingListProps {
  bookings: Booking[];
  error: string | null;
}

export interface BookingDetailPageProps {
  params: {
      id: string;
  };
}

export interface BookingDetailProps {
  booking: Booking;
}
