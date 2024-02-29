import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  if ((location.pathname == '/buy' || location.pathname == '/buy/')) {
    return null;
  }
  return (
    <footer className="footer py-2 bg-light mt-auto" style={{height:'10vh'}}>
      <div className="container">
        <p className="text-center text-muted">&copy; 2024 Housing</p>
      </div>
    </footer>
  );
};

export default Footer;
