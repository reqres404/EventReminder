import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { CgMenuRight as Hamburger } from "react-icons/cg";
import logoSvg from "../../assets/caketrackLogo.png";
import "./Navbar.css";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const logout = () => {
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("user_id") !== null);
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedIsLoggedIn = localStorage.getItem("user_id") !== null;
      setIsLoggedIn(updatedIsLoggedIn);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src={logoSvg} alt="Logo" />
          </Link>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/Home">Events</NavLink>
            </li>
            {isLoggedIn ? (
              <li onClick={logout}>
                <NavLink to="/Login">Logout</NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/adminpanel">Admin Panel</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;