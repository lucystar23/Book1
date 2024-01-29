import React from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { Navigate, Route, Routes } from 'react-router-dom';

import Register from './components/register/Register';
import Login from './components/login/Login';
import Homepage from './components/homepage/Homepage';
import Bookpage from './components/bookpage/Bookpage';
import { CartProvider } from './components/context/CartContext';
import CartPage from './components/cartpage/CartPage';
import DashboardPage from './components/admindashboard/DasboardPage';
import AdminUser from './components/adminuser/AdminUser';

function App() {
  const userToken = localStorage.getItem('token');
  let userRole = '';

  if (userToken) {
    const decodedToken = jwt_decode(userToken);
    userRole = decodedToken.role;
  }

  return (
    <CartProvider>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {userToken && (
          <>
            <Route path="/book" element={<Bookpage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/adminusers" element={<AdminUser />} />

            {userRole === 'admin' && <Route path="/" element={<DashboardPage />} />}
            {userRole !== 'admin' && <Route path="/" element={<Homepage />} />}
          </>
        )}

        {!userToken && <Route path="/" element={<Navigate to="/login" />} />}
      </Routes>
    </CartProvider>
  );
}

export default App;
