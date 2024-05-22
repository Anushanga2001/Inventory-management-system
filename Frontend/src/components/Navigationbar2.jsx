import React from 'react';
import './Navigationbar2.css'; // Update the CSS file path
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCalendarAlt, faShoppingCart, faBuilding, faBell, faSignOutAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Navigationbar2() {
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
      <Nav defaultActiveKey="/home2" className="flex-column2 nav-menu">
        <ul className="menu-list">
          <li className="nav-item">
            <Link
              to="/stockmanager/Addquantity"
              className={`nav-link ${location.pathname === "/stockmanager/Addquantity" ? "active" : ""
                }`}
            >
              <FontAwesomeIcon icon={faBoxOpen} /> Add items
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/stockmanager/Availability"
              className={`nav-link ${location.pathname === "/stockmanager/Availability" ? "active" : ""
                }`}
            >
              <FontAwesomeIcon icon={faCalendarAlt} /> Availability
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/stockmanager/Shoporders"
              className={`nav-link ${location.pathname === "/stockmanager/Shoporders" ? "active" : ""
                }`}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> ShopOrders
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/stockmanager/Companyorders2"
              className={`nav-link ${location.pathname === "/stockmanager/Companyorders2" ? "active" : ""
                }`}
            >
              <FontAwesomeIcon icon={faBuilding} /> CompanyOrders
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/stockmanager/Notification"
              className={`nav-link ${location.pathname === "/stockmanager/Notification" ? "active" : ""
                }`}
            >
              <FontAwesomeIcon icon={faBell} /> Notification
            </Link>
          </li>
        </ul>
      </Nav>
      <div className='c2'>
        <button onClick={handleSignOut} className="custom-button1">
          <FontAwesomeIcon icon={faSignOutAlt} /> <b>Sign out</b>
        </button>
      </div>
      <div className="image-at-bottom2"></div> {/* This is where the image will be placed */}
    </div>
  );
}
