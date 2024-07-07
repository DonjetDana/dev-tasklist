"use client"
import React, { useState } from 'react';
import { BookingData } from '../types/bookingData';
import { postBooking } from '../hooks/use-request';
import DoneIcon from '@mui/icons-material/Done';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography } from '@mui/material';


const NewBooking: React.FC = () => {
  const [form, setForm] = useState<BookingData>({
    service: '',
    doctor_name: '',
    date: '',
    start_time: '',
    end_time: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string>('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const today = new Date().toISOString().split('T')[0];

    if (form.date < today) {
      setError('It is not allowed to book a date in the past');
      return;
    }
    if (form.doctor_name.length < 2) {
      setError('Please fill your full name');
      return;
    }

    try {
      const response = await postBooking(form);
      if (response.error) {
        setError(response.error);
      } else {
        setSuccess('Booking added successfully');
        setError(null);
        setForm({ service: '', doctor_name: '', date: '', start_time: '', end_time: '' });
        setTimeout(() => {
          router.push('/')
        }, 3000)
      }
    } catch (error) {
      setError('Failed to save booking. Please try again later.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
      {success ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <DoneIcon color="success" />
          <Typography variant="h6" color="success.main">{success}</Typography>
          <Typography variant="h6" color="success.main">Returning to Home page</Typography>
        </Box>
      ) : (
        <Box sx={{ backgroundColor: "white", padding: "20px 40px", borderRadius: "20px" }}>
          <form onSubmit={handleSubmit}  >
            <Typography  sx={{color: "gray", fontSize: "2rem", textAlign: "center"}}>Add a Booking</Typography>
            <TextField label="Doctor Name" name="doctor_name" value={form.doctor_name} onChange={handleChange} fullWidth
              required margin="normal" />
            <TextField label="Service" name="service" value={form.service} onChange={handleChange} fullWidth required margin="normal" />
            <TextField label="Date" type="date" name="date" value={form.date} onChange={handleChange} fullWidth required
              margin="normal" InputLabelProps={{ shrink: true, }} />
            <TextField label="Start Time" type="time" name="start_time" value={form.start_time} onChange={handleChange}
              fullWidth required margin="normal" InputLabelProps={{ shrink: true, }} />
            <TextField label="End Time" type="time" name="end_time" value={form.end_time} onChange={handleChange} fullWidth
              required margin="normal" InputLabelProps={{ shrink: true, }} />
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Button type="submit"  sx={{ mt: 2, backgroundColor: "#488598 !important", maxWidth: "550px", color: "white" }}>
                Add Booking
              </Button>
            </Box>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          </form>
        </Box>
      )}
    </Box>
  );
};

export default NewBooking;




