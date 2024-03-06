import React from 'react';
import ReactDOM from 'react-dom/client';
import './Format.css';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import Register from './Register';
import ScrumBoard from './ScrumBoard';



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
