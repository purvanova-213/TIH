import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import { AdminLogin } from './Components/Auth/AdminLogin.jsx';
import { AdminDashboard } from './Components/Dashboard/AdminDashboard.jsx';
import { AddPatients } from './Components/Dashboard/AddPatients.jsx';
import './App.css'

function App() {


  return (
    <>
    <Router>
        <Routes>


        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/add-patients" element={<AddPatients />}  />




        </Routes>
    </Router>

    </>
  )
}

export default App
