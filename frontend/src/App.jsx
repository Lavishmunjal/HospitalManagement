import React from 'react'
import "./App.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Appointment from './pages/Appointment'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Register from './pages/Register'
import Login from './pages/Login'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='/appointment' element={<Appointment/>}/> 
          <Route path='/about' element={<AboutUs/>}/> 
          <Route path='/register' element={<Register/>}/> 
          <Route path='/login' element={<Login/>}/> 
        </Routes>
        <ToastContainer position='top-center'/>
      </Router>
    </>
  )
}

export default App
