import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="header py-3 bg-light border-bottom">
      <nav className="container navbar navbar-expand-lg navbar-light">
        <Link to="/" className="navbar-brand">
          <img src="/img/logo.png" alt="Housing Website Logo" width="75" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/buy" className="nav-link">Buy</Link>
            </li>
            <li className="nav-item active">
              <Link to="/sell" className="nav-link">Sell</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
            <li className="nav-item">
              <Link to="/signin" className="nav-link">Sign In</Link>
            </li>
            <li className="nav-item dropdown">
              {/* <a className="nav-link dropdown-toggle" id="appsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Apps
              </a> */}
              <button className='btn btn-secondary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                Apps
              </button>
              <ul className="dropdown-menu" aria-labelledby="appsDropdown">
                <li><Link to="/price_estimator" className="dropdown-item">Price Estimator</Link></li>
                <li><Link to="/recommend_location" className="dropdown-item">Location Estimator</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;