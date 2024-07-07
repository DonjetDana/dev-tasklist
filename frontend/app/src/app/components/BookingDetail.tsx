// /src/app/booking/BookingDetail.tsx
import React from 'react';
import Link from 'next/link';
import { BookingDetailProps } from '../types/bookingData';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';



const BookingDetail: React.FC<BookingDetailProps> = ({ booking }) => {
    return (
        <Box>
            {booking ? (
                <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                    backgroundColor: "#488598", color: "white" }}>
                    <CardContent>
                        <Typography variant="h5" component="div" sx={{ color: "white"}}>
                            Booking Details
                        </Typography>
                        <Typography sx={{ mb: 1.5, color: "white" }}>
                            This Booking is with {booking.doctor_name} for {booking.service} and it ends on {booking.end_time}
                        </Typography>
                        <Link href="/">Back</Link>
                    </CardContent>
                </Card>
            ) : (
                <Box className='loader-parent'>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
};

export default BookingDetail;
