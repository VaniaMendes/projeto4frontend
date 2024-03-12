import React from 'react';
import ReactDOM from 'react-dom/client';
import './format/Format.css';
import Login from './pages/Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import Register from './pages/Register';
import PrincipalPage from './pages/PrincipalPage';
import Categories from './pages/Categories';
import InactiveUsers from './pages/InactiveUsers';
import ProductOwner from './pages/ProductOwner';
import EditProfile from './pages/EditProfile';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Router>
      <Routes>
      <Route index element={<Login/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/principalPage" element = {<PrincipalPage/>}/>
      <Route path="/productOwner" element = {<ProductOwner/>}/>
      <Route path = "/editProfile" element = {<EditProfile/>}/>
      <Route path = "/inactiveUsers" element = {<InactiveUsers/>}/>
      <Route path= "/categories" element={<Categories/>} />
      </Routes>
  </Router>

  </React.StrictMode>
);


reportWebVitals();
