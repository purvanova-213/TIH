import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


import { AdminLogin } from './Components/Auth/AdminLogin.jsx';
import { AdminDashboard } from './Components/Dashboard/AdminDashboard.jsx';
import { AddPatients } from './Components/Dashboard/AddPatients.jsx';
import { HorizontalStepper } from './Components/Processing/Stepper.jsx';
import './App.css'

function App() {


  return (
    <>
    <Router>
        <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/add-patients" element={<AddPatients />}  />
        <Route path="/stepper" element={<HorizontalStepper />} />
        </Routes>
    </Router>

    </>
  )
}

export default App
