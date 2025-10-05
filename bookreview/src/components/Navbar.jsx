import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
function Navbar({ IsLoggedIn, setIsLoggedIn }) {
  async function handleLogout(){
    const token = localStorage.getItem("token"); 
    try {
      await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
        setIsLoggedIn(false); 
    
        localStorage.removeItem("token");
      }  
      catch (err) {
      console.error("Logout failed", err);
  }

  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link className="h" to="/">BookReviewer</Link>
      </div>
      <div className="navbar-links">
        
        <Link to="/" className="nav-link">
          Home
        </Link>
      
        <Link to="/mybooks" className="nav-link">
          MyBooks
        </Link>
        <Link to="/registerbooks" className="nav-link">
          Register-Books
        </Link>

        <div className="register-login">
          {!IsLoggedIn && <Link to="/register" className="reg-link">Register</Link>}
          {!IsLoggedIn && <Link to="/login" className="reg-link">Login</Link>}
          {IsLoggedIn && (
            <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
