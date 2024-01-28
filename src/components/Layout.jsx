import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import Buy from './Buy';
import Contact from './Contact';
import Sell from './Sell';
import PriceEstimator from './PriceEstimator';
import LocationRecommendation from './LocationRecommendation';
import SellHome from './SellHome';
import About from './About';

const Layout = () => {
  return (
    <div>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/sell_home" element={<SellHome/>}/>
            <Route path="/about" element={<About />} />
            <Route path="/price_estimator" element={<PriceEstimator />} />
            <Route path="/recommend_location" element={<LocationRecommendation />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default Layout;