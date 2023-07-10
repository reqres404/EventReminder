import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {CgMenuRight as Hamburger} from 'react-icons/cg'
import logoSvg from '../../assets/caketrackLogo.png';
import './Navbar.css'

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar">
      <div className="container">
      <div className="logo">
        <Link to ="/" className='"logo-link'>
          <img src={logoSvg} alt="Logo" />
          </Link>
        </div>
        <div className="menu-icon"  onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/Home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/Login">Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
