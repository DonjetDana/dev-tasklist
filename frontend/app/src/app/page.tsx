import React from 'react';
import Link from 'next/link';
import { getBookings } from './hooks/use-request';
import BookingList from './components/BookingList';
import { Booking } from './types/bookingData';
import { Box, Button, Typography } from '@mui/material';


const Home: React.FC = async () => {
  let bookings: Booking[] = [];
  let error: string | null = null;

  const { data, error: fetchError } = await getBookings();
  if (fetchError) {
    error = fetchError;
  } else {
    bookings = data || [];
  }

  return (
    <Box>
      {bookings.length > 0 ? (
        <Box>
          <Typography sx={{ padding: 2, textAlign: "center", color: "gray", fontSize: "2rem" }}>Current booking count: {bookings.length}</Typography>
          <BookingList bookings={bookings} error={error} />
          <Link href="/newBooking" style={{ display: "flex", margin: "20px auto"}}>
            <Button sx={{ mt: 2, backgroundColor: "#488598 !important",maxWidth: "500px", color: "white", margin: "auto", '&:hover': { backgroundColor: "#33677A" }}}>
              Add Booking
            </Button>
          </Link>
        </Box>
      ) : (
        <Box className='loader-parent'><Box className='loader'></Box></Box>
      )}
    </Box>
  );
};

export default Home;
