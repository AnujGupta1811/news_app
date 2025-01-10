import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/header.css';

function Header({ onSearch,handleSearchChange,handleSearchSubmit}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);



  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          <h1>News App</h1>
        </Link>
        <form>
          <p>Search Here</p>
          <input
            type="text"
            placeholder="Search by category"
            onChange={handleSearchChange}
            className="search-input"
          />
        </form>

        <nav className="nav-links">
          {isLoggedIn ? (
            <Link to="/logout">Logout</Link>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
