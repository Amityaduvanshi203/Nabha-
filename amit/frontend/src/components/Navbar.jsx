import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">

        <div className="logo">
          <Link to="/" className="logo-link">MyCollege</Link>
        </div>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>

          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/contact">Contact</Link></li>

          <li>
            <Link to="/login">
              <button className="signin-btn">
                Sign In
              </button>
            </Link>
          </li>

        </ul>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
