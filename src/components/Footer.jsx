import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  if ((location.pathname === '/buy' || location.pathname === '/buy/')) {
    return null;
  }
  return (
    <footer className="footer bg-light" style={{height:'10vh'}}>
      <div className="container d-flex align-items-center justify-content-center" style={{height:'100%'}}>
        <p className="m-0">&copy; 2024 Housing</p>
      </div>
    </footer>
  );
};

export default Footer;
