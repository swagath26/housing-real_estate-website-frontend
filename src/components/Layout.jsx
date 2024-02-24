import React, {useState} from 'react';
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
import ForgotPasswordPage from './ForgotPasswordPage';
import Accounts from './Accounts';
import SignoutPage from './SignoutPage';
import PropertyDetails from './PropertyDetails';
import EditProperty from './EditProperty';

const Layout = () => {

  return (
    <div>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/buy/:search_query" element={<Buy />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/sell_home" element={<SellHome/>}/>
            <Route path="/about" element={<About />} />
            <Route path="/price_estimator" element={<PriceEstimator />} />
            <Route path="/recommend_location" element={<LocationRecommendation />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/accounts' element={<Accounts />} />
            <Route path='/signout' element={<SignoutPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/property_details/:property_id' element={<PropertyDetails />}/>
            <Route path='/edit-property/:property_id' element={<EditProperty />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default Layout;