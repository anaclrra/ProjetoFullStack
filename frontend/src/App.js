import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './components/TaskList';

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('token'));
  const [id, setId] = useState(localStorage.getItem('id'));


  const handleLogin = (token, id) => {
    localStorage.setItem("token", token);
    localStorage.setItem('id', id);
    setAccessToken(token);
    setId(id);
  };

  return (
    <>
  
      <Routes>
        <Route
         path='/login'
         element={<Login onLogin={handleLogin} />}
       />
        <Route path="/users" element={<Register/>} />
        <Route path="/tasks/user" element={<Tasks id={id} token={accessToken} />} />
      </Routes>
    </>
  );
}

export default App;



























/* import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';




function App() {

  const [accessToken, setAccessToken] = useState(localStorage.getItem('token'));
  const [id, setid] = useState(localStorage.getItem('id'));
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (token) => {
    setAccessToken(token);
    //setIsLoggedIn(true);
    navigate(`/tasks/user/${id}`);
  };

  return (
    <>
    
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

export default App; */
