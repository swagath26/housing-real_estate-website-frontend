import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer py-2 bg-light mt-auto">
      <div className="container">
        <p className="text-center text-muted">&copy; 2023 Your Housing Website</p>
        <Link to="/contact" className="footer-link text-center text-decoration-none">Contact Us</Link>
        {/* Add social media links or other elements as needed */}
      </div>
    </footer>
  );
};

export default Footer;
