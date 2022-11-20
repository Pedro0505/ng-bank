import React from 'react';
import './style/app.css';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <SignUp /> } />
        <Route path="/home" element={ <UserProvider> <Home /> </UserProvider> } />
      </Routes>
    </div>
  );
}

export default App;
