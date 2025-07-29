import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './all css/Home.css';
import Nav from './components.js/nav';
import Home from './components.js/Home';
import Signup from './components.js/signup';
import Login from './components.js/login';
import Pricing from './components.js/Price';
import Work from './components.js/Work';
import Support from './components.js/support';
import Contact from './components.js/contact';

const AppWrapper = () => {
  const location = useLocation();
  // Hide Navbar only on signup and login pages
  const hideNav = location.pathname === '/signup' || location.pathname === '/login';

  return (
    <>
      {!hideNav && <Nav />}
      <Routes>
        {/* Set Home as the main page */}
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/Pricing' element={<Pricing />} />
        <Route path='/Work' element={<Work />} />
        <Route path='/Support' element={<Support />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </div>
  );
}

export default App;
