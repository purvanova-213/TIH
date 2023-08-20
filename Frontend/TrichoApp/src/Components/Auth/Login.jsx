import React, {useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase.js";
import { useTheme } from "@mui/material/styles"; 

export const Login = () => {
  const navigate = useNavigate();
  const authInstance = getAuth();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;

      try {
        await signInWithEmailAndPassword(authInstance, email, password);
        setShowErrorAlert(false);
        setShowSuccessAlert(true);
        setTimeout(() => {
          navigate("/main");
        }, 1000);
      } catch (error) {
        setShowErrorAlert(true);
      }
    },
  });

  return (
    <>
      <title>Login | Srihtvak</title>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 500,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <Stack spacing={1} sx={{ mb: 5 }}>
            <Typography variant="h4">Admin Login</Typography>
            <Typography color="text.secondary" variant="body2">
              Please enter your admin credentials to log in.
            </Typography>
          </Stack>

          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                label="Email Address"
                name="email"
                type="email"
                {...formik.getFieldProps("email")}
              />

              <TextField
                fullWidth
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                label="Password"
                name="password"
                type="password"
                {...formik.getFieldProps("password")}
              />
            </Stack>

            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              Continue
            </Button>

            {showErrorAlert && (
              <Alert
                severity="error"
                sx={{ mt: 3, backgroundColor: theme.palette.error.light}}
              >
                Login Unsuccessful! Please check your credentials.
              </Alert>
            )}

            {showSuccessAlert && (
              <Alert severity="success" sx={{ mt: 3 }}>
                Login Successful!
              </Alert>
            )}

            <Alert color="primary" severity="info" sx={{ mt: 3}}>
              <div>
                You can use <b>drpmpatil@yahoo.co.in</b> and password{" "}
                <b>Password123!</b>
              </div>
            </Alert>
          </form>
        </Box>
      </Box>
    </>
  );
};
