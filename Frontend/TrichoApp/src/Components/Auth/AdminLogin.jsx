import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import docImage from "../../assets/Images/doc.jpg";
import clearImage from "../../assets/Images/clearBg.jpg";

import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export function AdminLogin() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });
    navigate("/dashboard");
  };

  return (
    <ThemeProvider theme={defaultTheme} >
      <CssBaseline />
      <Box sx={{ backgroundImage: `url(${clearImage})`, height: '100vh', backgroundSize: 'cover'  }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Card sx={{ width: '1000px', border: '1px solid #ccc', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)' }}>
            <Grid container component={CardContent} sx={{ height: '100%' }}>
              <Grid item xs={false} sm={4} md={7} sx={{ backgroundImage: `url(${docImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <Grid item xs={12} sm={8} md={5}>
                <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar sx={{ m: 1, bgcolor: '#f7ab60' }}>
                    <LocalHospitalIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus />
                    <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#726ae4', '&:hover': { bgcolor: '#654E92' } }}>
                      Sign In
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
