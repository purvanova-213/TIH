import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import DocImage from "../assets/Images/docImg.jpg";
import { Layout } from "../Components/Dashboard/layout.jsx";

const doctor = {
  name: "Dr. Pradeep Patil",
  qualifications: "MBBS, DNB - Dermatology & Venereology",
  specialties: "Dermatologist, Venereologist, Hair Transplant Surgeon",
  experience: "22 Years Experience Overall (6 years as specialist)",
  address:
    "301, Decent Homes, Lait Estate, Near Ganraj Chowk,\nBaner, Pune-411045",
  email: "srihtvak@gmail.com",
  phoneNumber: "+91-9044430888",
  avatar: DocImage,
};

export const DoctorProfile = () => {
  return (
    <Layout>
      <Card elevation={3} sx={{ flexGrow: 1, py: 1, marginLeft: { xs: 0, lg: 30 }}}>
        <CardHeader title="Doctor Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Avatar
                src={doctor.avatar}
                alt={`${doctor.name}'s Avatar`}
                sx={{ width: 100, height: 100 }}
              />
              <Typography variant="h5" sx={{ mt: 1 }}>
                {doctor.name}
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 1 }}>
                {doctor.qualifications}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                label="Specialties"
                value={doctor.specialties}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                label="Experience"
                value={doctor.experience}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Address</Typography>
          <TextField
            variant="outlined"
            multiline
            rows={2}
            value={doctor.address}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Contact</Typography>
          <TextField
            variant="outlined"
            label="Email"
            value={doctor.email}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            sx={{ mb: 2, mt: 2 }}
          />
          <TextField
            variant="outlined"
            label="Phone Number"
            value={doctor.phoneNumber}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </CardContent>
      </Card>
    </Layout>
  );
};
