import React from 'react';
import './Navigationbar3.css'; // Update the CSS file path
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faShoppingCart, faSignOutAlt, faEdit, faMapMarkerAlt, faUndo } from '@fortawesome/free-solid-svg-icons'; // Adjust icons as needed

export default function Navigationbar3() {
  const navigate = useNavigate();
  const jobPosition = localStorage.getItem('jobPosition');
  const firstName = localStorage.getItem('firstName');

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      navigate("/");
      localStorage.removeItem('token');
      localStorage.removeItem('jobPosition');
      localStorage.removeItem('firstName');
      localStorage.removeItem('userID');
      window.location.href = '/';  
    }
  };

  return (
    <div className="vertical-nav">
      <div className='profile'>
        <h2>{firstName}</h2>
        <p>{jobPosition}</p>
        <Link to='/Edit' className="profile-link01">
          <FontAwesomeIcon icon={faEdit} /> Edit
        </Link>
      </div>
      <Nav defaultActiveKey="/home3" className="flex-column3 nav-menu">
        <ul className='menu-list'>
          <li className="nav-item1">
            <Link
              to="/salesrep/Placeshoporders"
              className={`nav-link ${location.pathname === "/salesrep/Placeshoporders" ? "active" : ""
                }`}
            >
              <FontAwesomeIcon icon={faCartPlus} /> Place orders
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/salesrep/Shoporders"
              className={`nav-link ${location.pathname === "/salesrep/Shoporders" ? "active" : ""
                }`}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> Shop Orders
            </Link>
          </li>
          <li className="nav-item2">
            <Link
              to="/salesrep/Map"
              className={`nav-link ${location.pathname === "/salesrep/Map" ? "active" : ""
                }`}
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Map
            </Link>
          </li>
          <li className="nav-item2">
            <Link
              to="/salesrep/Returnpage"
              className={`nav-link ${location.pathname === "/salesrep/Returnpage" ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faUndo} /> Returns
            </Link>
          </li>
        </ul>
      </Nav>
      <div className='c3'>
        <button onClick={handleSignOut} className="custom-button1">
          <FontAwesomeIcon icon={faSignOutAlt} /> <b>Sign out</b>
        </button>
      </div>
      <div className="image-at-bottom"></div> {/* This is where the image will be placed */}
    </div>
  );
}
