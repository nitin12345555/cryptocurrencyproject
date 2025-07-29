import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoImage from '../assets/Mylogo.png';
import '../App.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, [location]);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = "/login"; // Redirect to login after logout
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Hide Navbar only on signup and login pages
  const hideNav = isLoginPage || isSignupPage;

  if (hideNav) {
    return null; // Don't render Navbar on these pages
  }

  return (
    <nav className="nav-container">
      <Link to="/" onClick={closeMobileMenu}>
        <img src={LogoImage} alt="Logo" className="Logo" />
      </Link>

      <button className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>


      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="nav-ul">
          <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
          <li><Link to="/Pricing" onClick={closeMobileMenu}>Pricing</Link></li>
          <li><Link to="/Work" onClick={closeMobileMenu}>Work</Link></li>
          <li><Link to="/support" onClick={closeMobileMenu}>Support</Link></li>
          <li><Link to="/contact" onClick={closeMobileMenu}>Contact</Link></li>
        </ul>

        <div className="nav-buttons">
          {!user && !isLoginPage && (
            <Link to="/login" onClick={closeMobileMenu}>
              <button className="login-button">Login</button>
            </Link>
          )}

          {!user && !isSignupPage && (
            <Link to="/signup" onClick={closeMobileMenu}>
              <button className="sign-button">Sign Up</button>
            </Link>
          )}

          {user && (
            <div className="user-info">
              <span className="user-icon">👤</span>
              <span className="user-name">{user.name}</span>
              <button className="logout-button" onClick={() => { logout(); closeMobileMenu(); }}>Logout</button>
            </div>
          )}
        </div>
      </div>


      <ul className="nav-ul desktop-only">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Pricing">Pricing</Link></li>
        <li><Link to="/Work">Work</Link></li>
        <li><Link to="/support">Support</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="nav-buttons desktop-only">
        {!user && !isLoginPage && (
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        )}

        {!user && !isSignupPage && (
          <Link to="/signup">
            <button className="sign-button">Sign Up</button>
          </Link>
        )}

        {user && (
          <div className="user-info">
            <span className="user-icon">👤</span>
            <span className="user-name">{user.name}</span>
            <button className="logout-button" onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
