import React from 'react';
import ReactDOM from 'react-dom/client';
import './format/Format.css';
import Login from './pages/Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import Register from './pages/Register';
import ScrumBoard from './pages/ScrumBoard';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Router>
      <Routes>
      <Route index element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/scrumBoard" element = {<ScrumBoard/>}/>
      </Routes>
  </Router>

  </React.StrictMode>
);


reportWebVitals();
