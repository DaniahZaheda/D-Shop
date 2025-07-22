import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../../assets/icon.png";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const storedUser = localStorage.getItem('userName');
      if (storedUser) {
        setIsLoggedIn(true);
        setUserName(storedUser);
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    };

    checkLogin(); // أول مرة

    // ✅ الاستماع لحدث تسجيل الدخول
    window.addEventListener('userLoggedIn', checkLogin);

    return () => {
      window.removeEventListener('userLoggedIn', checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src={logo}
          alt="Logo"
          style={{ width: '40px', height: '40px', marginRight: '10px' }}
        />
        <span className="fw-bold fs-5">D Shop</span>
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/">Home</Link>
          </li>

         {!isLoggedIn ? (
  <>
    <li className="nav-item mx-2">
      <Link className="nav-link" to="/register">Register</Link>
    </li>
    <li className="nav-item mx-2">
      <Link className="nav-link" to="/login">Login</Link>
    </li>
  </>
) : (
  <>
    <li className="nav-item mx-2">
      <span className="nav-link">Welcome, {userName}</span>
    </li>
    <li className="nav-item mx-2">
      <Link className="nav-link" to="/cart">🛒 Cart</Link>
    </li>
    <li className="nav-item mx-2">
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        Logout
      </button>
    </li>
  </>
)}

        </ul>
      </div>
    </nav>
  );
}
