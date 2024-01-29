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
import Signin from './Signin'
import ForgotPassword from './ForgotPassword'
import AuthContext from './AuthContext';

const Layout = () => {

  // const AuthContext = createContext();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {/* <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}> */}
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
            <Route path='/signin' element={<Signin />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      {/* </AuthContext.Provider> */}
    </div>
  );
};

export default Layout;