import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import Buy from './Buy';
import Sell from './Sell';
import PriceEstimator from './PriceEstimator';
import SellHome from './SellHome';
import About from './About';
import Accounts from './Accounts';
// import PropertyDetails from './PropertyDetails';
// import EditProperty from './EditProperty';
// import Contact from './Contact';
// import ForgotPasswordPage from './ForgotPasswordPage';

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
            <Route path='/accounts' element={<Accounts />} />
            {/* <Route path='/contact' element={<Contact />} /> */}
            {/* <Route path='/forgot-password' element={<ForgotPasswordPage />} /> */}
            {/* <Route path='/property_details/:property_id' element={<PropertyDetails />}/>
            <Route path='/edit-property/:property_id' element={<EditProperty />} /> */}
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default Layout;