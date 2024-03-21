import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AuthContext from './AuthContext';
import Accounts from './Accounts';
import axios from 'axios';

const Header = () => {

  const isAuthenticated = useContext(AuthContext).isAuthenticated;
  const setIsAuthenticated = useContext(AuthContext).setIsAuthenticated;

  const location = useLocation();
  if ((location.pathname === '/' || location.pathname === '')) {
    return null;
  }

  const handleSignout = async () => {
    const response = await axios.get('/api/members/signout/');
    if (response.data.success) {
        setIsAuthenticated(false);
    }
  }

  return (
    <header className="header web-header">

    <nav className="navbar navbar-expand-md py-0">
        <div className='container-fluid'>
          <Link to="/" className="navbar-brand">
            <div className='d-none d-lg-block'>
              <img src="/static/img/logo2.png" alt="Housing Logo" width="65" />
            </div>
            <div className='d-lg-none'>
              <img src="/static/img/logo2.png" alt="Housing Logo" width="50" />
            </div>
          </Link>
          <button className="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby='offcanvasNavbarLabel'>
            <div className='offcanvas-header'>
              <button type='button' className='btn-close' data-bs-dismiss="offcanvas" aria-label='Close'></button>
            </div>
            <div className='offcanvas-body justify-content-end pe-3'>
              <ul className='navbar-nav'>
                <li className="nav-item px-2" data-bs-dismiss="offcanvas"><Link to="/buy" className="nav-link">Buy</Link></li>
                <li className="nav-item px-2" data-bs-dismiss="offcanvas"><Link to="/sell" className="nav-link">Sell</Link></li>
                <li className="nav-item px-2 dropdown">
                  <button className='btn text-nowrap nav-link dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                    Utilities
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="appsDropdown">
                    <li><Link className="dropdown-item" data-bs-dismiss="offcanvas">Price Estimator</Link></li>
                    <li><Link className="dropdown-item" data-bs-dismiss="offcanvas">Location Estimator</Link></li>
                  </ul>
                </li>
                {!isAuthenticated && 
                <li className="nav-item px-2" data-bs-dismiss="offcanvas">
                  <Link to="/accounts" className='nav-link' data-bs-toggle='modal' data-bs-target='#accounts'>Signin</Link>
                </li>
                }
                {isAuthenticated && 
                <li className="nav-item px-2 dropdown">
                  <button className='btn text-nowrap nav-link dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                    Accounts
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="appsDropdown">
                    <li data-bs-dismiss="offcanvas"><Link className="dropdown-item">Profile</Link></li>
                    <li data-bs-dismiss="offcanvas"><Link to="/saved_properties" className="dropdown-item">Saved Properties</Link></li>
                    <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" onClick={handleSignout}>Sign Out</Link></li>
                  </ul>
                </li>
                }
                <li className="nav-item px-2" data-bs-dismiss="offcanvas"><Link to="/about" className="nav-link">About</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="modal fade" id="accounts">
        <div className="modal-dialog">
          <div className="modal-content">
            <button type="button" style={{position:'absolute', right:'8px', top:'8px'}} className="btn-close m-0" data-bs-dismiss="modal" aria-label="Close" />
            <Accounts />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;