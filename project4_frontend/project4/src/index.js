import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import HomeAndLogin from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import SideMenu from './menu/SideMenu';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Router>
      <Routes>
      <Route index element={<HomeAndLogin  />} />
        <Route path="/" element={<HomeAndLogin  />} />
        <Route path="/menu" element={<SideMenu />} />
      </Routes>
  </Router>

  </React.StrictMode>
);


reportWebVitals();
