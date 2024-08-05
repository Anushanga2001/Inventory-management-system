import React from 'react';
import './Navigationbar1.css';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faCalendarAlt, faShoppingCart, faBuilding, faChartBar, faSignOutAlt, faEdit,faChartLine } from '@fortawesome/free-solid-svg-icons';

export default function Navigationbar1() {
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
      <Nav defaultActiveKey="/home1" className="flex-column1 nav-menu">
        <ul className="menu-list">
          <li className="nav-item09">
            <Link
              to="/owner/Addusers"
              className={`nav-link ${location.pathname === "/owner/Addusers" ? "active" : ""
                }`}
            >
              <FontAwesomeIcon icon={faUserPlus} /> Add users
            </Link>
          </li>
          <li className="nav-item09">
            <Link
              to="/owner/Availability"
              className={`nav-link ${location.pathname === "/owner/Availability" ? "active" : ""
                }`}
            >
              <FontAwesomeIcon icon={faCalendarAlt} /> Availability
            </Link>
          </li>
          <li className="nav-item09">
            <Link
              to="/owner/Shoporders"
              className={`nav-link ${location.pathname === "/owner/Shoporders" ? "active" : ""
                }`}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> ShopOrders
            </Link>
          </li>
          {/* <li className="nav-item09">
            <Link
              to="/owner/Companyorders"
              className={`nav-link ${location.pathname === "/owner/Companyorders" ? "active" : ""
                }`}
            >
              <FontAwesomeIcon icon={faBuilding} /> CompanyOrders
            </Link>
          </li> */}
          <li className="nav-item09">
            <Link
              to="/owner/Foorecasting"
              className={`nav-link ${location.pathname === "/owner/Foorecasting" ? "active" : ""
                }`}
            >
              {/* give suitable icon for Forecasting */}
              <FontAwesomeIcon icon={faChartLine} /> Forecasting
            </Link>
          </li>
          <li className="nav-item09">
            <Link
              to="/owner/Filterreport"
              className={`nav-link ${location.pathname === "/owner/Filterreport" ? "active" : ""
                }`}
            >
              <FontAwesomeIcon icon={faChartBar} /> Report
            </Link>
          </li>
          <li className="nav-item09">
            <Link
              to="/owner/Reports"
              className={`nav-link ${location.pathname === "/owner/Reports" ? "active" : ""
                }`}
            >
              <FontAwesomeIcon icon={faChartLine} /> DashBoard
            </Link>
          </li>
        </ul>
      </Nav>
      <div className='cc1'>
        <button onClick={handleSignOut} className="custom-button1">
          <FontAwesomeIcon icon={faSignOutAlt} /> <b>Sign out</b>
        </button>
      </div>
    </div>
  );
}
