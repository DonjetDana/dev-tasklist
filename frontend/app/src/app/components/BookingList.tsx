import React from 'react';
import Link from 'next/link';
import { BookingListProps } from '../types/bookingData';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Typography, Box } from '@mui/material';

const BookingList: React.FC<BookingListProps> = ({ bookings, error }) => {
  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (bookings.length === 0) {
    return <Typography>No bookings found.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: '800px', margin: '0 auto', boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)' }}>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead sx={{ backgroundColor: "#488598" }}>
            <TableRow>
              <TableCell sx={{ color: "white"}}>Booking</TableCell>
              <TableCell sx={{ color: "white"}}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>A Booking on {new Date(booking.date).toISOString().split('T')[0]} starting at {booking.start_time}</TableCell>
                <TableCell>
                  <Link href={`/booking/${booking.id}`} passHref style={{ color: "blue"}}>
                      View Details
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BookingList;
