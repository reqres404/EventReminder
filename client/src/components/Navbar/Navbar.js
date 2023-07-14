import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CgMenuRight as Hamburger } from 'react-icons/cg';
import axios from 'axios';
import logoSvg from '../../assets/caketrackLogo.png';
import './Navbar.css';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const sendWishMails = async () => {
    axios.get("http://localhost:4000/api/birthdays/1days");
    axios.get("http://localhost:4000/api/anniversaries/1days")
  };

  // useEffect(() => {
  //   // Run the function immediately on component mount
  //   sendWishMails();

  //   // Calculate the time until 12:01 AM
  //   const calculateTimeDiff = () => {
  //     const currentDate = new Date();
  //     const targetTime = new Date(
  //       currentDate.getFullYear(),
  //       currentDate.getMonth(),
  //       currentDate.getDate(),
  //       0, // Hours
  //       1, // Minutes
  //       0 // Seconds
  //     );

  //     let timeDiff = targetTime.getTime() - currentDate.getTime();
  //     if (timeDiff < 0) {
  //       timeDiff += 24 * 60 * 60 * 1000; // Add 24 hours
  //     }

  //     return timeDiff;
  //   };

  //   // Set an interval to run the function when the target time is reached
  //   const interval = setInterval(() => {
  //     const timeDiff = calculateTimeDiff();

  //     if (timeDiff <= 0) {
  //       sendWishMails();
  //     }
  //   }, 1000);

  //   // Clear the interval on component unmount
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

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
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/Home">Events</NavLink>
            </li>
            <li>
              <NavLink to="/Login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/Register">Register</NavLink>
            </li>
            <button onClick={sendWishMails} className="wish-employees">
              Wish Employees
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
