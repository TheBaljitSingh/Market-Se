import React from 'react';
import { BrowserRouter as Router, Route, Routes,  BrowserRouter } from 'react-router-dom';

import ProductDetails from './components/ProductDetails'
import ProductListing from './components/ProductListings';
import Home from './components/layout/Home/Home';
import Login from './auth/Login'
import Profile from "./components/Profile"
import { UserProvider } from './context/UserContext';




export default function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/product" element={<ProductListing  />} />
        <Route path="/product/:id" element={<ProductDetails  />} />
      </Routes>
      <Routes>

        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </Router>
    </UserProvider>
  );
}


