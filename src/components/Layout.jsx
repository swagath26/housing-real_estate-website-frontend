import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import Buy from './Buy';
import Contact from './Contact';
import Sell from './Sell';
import Signin from './Signin';
import PriceEstimator from './PriceEstimator';
import LocationRecommendation from './LocationRecommendation';

const Layout = () => {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/price_estimator" element={<PriceEstimator />} />
            <Route path="/recommend_location" element={<LocationRecommendation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default Layout;