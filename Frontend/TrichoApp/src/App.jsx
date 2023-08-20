import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "./theme/index.jsx";
import { PatientProfileDetails } from "./Pages/NewExamination.jsx";
import { Layout } from "./Components/Dashboard/layout.jsx";
import { Login } from "./Components/Auth/Login.jsx";
import { AllPatients } from "./Pages/AllPatients.jsx";
import { DoctorProfile } from "./Pages/Account.jsx";

function App() {
  const theme = createTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
         
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/patient" element={<PatientProfileDetails />} />
              <Route path="/all-patient" element={<AllPatients />} />
              <Route path="/account" element={<DoctorProfile />} />
              <Route path="/main" element={<Layout />} />
            </Routes>
  
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
