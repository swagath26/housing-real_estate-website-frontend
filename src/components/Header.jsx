import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AuthContext from './AuthContext';
import { useLocation } from 'react-router-dom';

const Header = () => {

  const isAuthenticated = useContext(AuthContext).isAuthenticated;

  const location = useLocation();
  if ((location.pathname == '/' || location.pathname == '')) {
    return null;
  }

  return (
    <header className="header">
    <nav className="navbar navbar-expand-md py-0">
        <div className='container-fluid'>
          <Link to="/" className="navbar-brand px-3">
            <img src="/img/logo.png" alt="Housing Logo" width="70" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby='offcanvasNavbarLabel'>
            <div className='offcanvas-header'>
              {/* <h5 className='offcanvas-title' id='offcanvasNavbarLabel'>Close</h5> */}
              <button type='button' className='btn-close' data-bs-dismiss="offcanvas" aria-label='Close'></button>
            </div>
            <div className='offcanvas-body justify-content-end pe-3'>
              <ul className='navbar-nav'>
                <li className="nav-item px-2"><Link to="/buy" className="nav-link">Buy</Link></li>
                <li className="nav-item px-2"><Link to="/sell" className="nav-link">Sell</Link></li>
                <li className="nav-item px-2 dropdown">
                  <button className='btn text-nowrap nav-link dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                    Utilities
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="appsDropdown">
                    <li><Link to="/price_estimator" className="dropdown-item">Price Estimator</Link></li>
                    <li><Link to="/recommend_location" className="dropdown-item">Location Estimator</Link></li>
                  </ul>
                </li>
                {!isAuthenticated && 
                <li className="nav-item px-2"><Link to="/accounts" className="nav-link">Signin</Link></li>
                }
                {isAuthenticated && 
                <li className="nav-item px-2 dropdown">
                  <button className='btn text-nowrap nav-link dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                    Accounts
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="appsDropdown">
                    <li><Link to="/saved_properties" className="dropdown-item">Saved Properties</Link></li>
                    <li><Link to="/liked_properties" className="dropdown-item">Liked Properties</Link></li>
                    <li><Link to="/signout" className="nav-link">Sign Out</Link></li>
                  </ul>
                </li>
                }
                <li className="nav-item px-2"><Link to="/about" className="nav-link">About</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;