import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';




function App() {

  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path='/'
        element={<Login setToken={setAccessToken} accessToken={accessToken} navigate={navigate} />}
      />
      <Route path="/users" element={<Register />} />
    </Routes>
  );
}

export default App;
