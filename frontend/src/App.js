import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/NavBar';
import Register from './components/Register';




function App() {

  const [accessToken, setAccessToken] = useState(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (token) => {
    setAccessToken(token);
    setIsLoggedIn(true);
    navigate('/tasks/user');
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route
          path='/login'
          element={<Login onLogin={handleLogin} />}
        />
        <Route path="/users" element={<Register token={accessToken} />} />
      </Routes>
    </>
  );
}

export default App;
