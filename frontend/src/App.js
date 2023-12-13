import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';



function App() {

  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path='/'
        element={<Login setToken={setAccessToken} accessToken={accessToken} navigate={navigate} />}
      />
    </Routes>
  );
}

export default App;
