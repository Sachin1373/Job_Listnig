import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Page/Home'
import Login from './Components/Login';
import Register from './Components/Register';
import JobDetails from './Components/JobDetails';
import AddJob from './Components/AddJob';
import Editjob from './Components/Editjob';
import './App.css'

function App() {
 

  return (
    <Router>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/JobDetails/:jobId" element={<JobDetails />} />
        <Route path="/addjobs" element={<AddJob />} />
        <Route path="/editjob" element={<Editjob />} />
      </Routes>
    </Router>
  );
}

export default App
