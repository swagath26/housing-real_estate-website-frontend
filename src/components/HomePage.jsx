import React, { useContext, useEffect, useState } from 'react';
// import Slider from 'react-slick';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AuthContext from './AuthContext';
import axios from 'axios';
import './HomePage.css';

const Header = () => {

  const isAuthenticated = useContext(AuthContext).isAuthenticated;

  return (
    <header className="header px-3 py-0 pt-3">
    <nav className="navbar navbar-expand-md py-0" data-bs-theme='dark'>
        <div className='container-fluid'>
          <Link to="/" className="navbar-brand">
          <div className='d-none d-lg-block'>
              <img src="/static/img/logo2.png" alt="Housing Logo" width="65" />
            </div>
            <div className='d-lg-none'>
              <img src="/static/img/logo2.png" alt="Housing Logo" width="50" />
            </div>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby='offcanvasNavbarLabel'>
            <div className='offcanvas-header'>
              {/* <h5 className='offcanvas-title' id='offcanvasNavbarLabel'>Close</h5> */}
              <button type='button' className='btn-close' data-bs-dismiss="offcanvas" aria-label='Close'></button>
            </div>
            <div className='offcanvas-body justify-content-end pe-3'>
              <ul className='navbar-nav text-light'>
                <li className="nav-item px-2"><Link to="/buy" className="nav-link text-light">Buy</Link></li>
                <li className="nav-item px-2"><Link to="/sell" className="nav-link text-light">Sell</Link></li>
                <li className="nav-item px-2 dropdown">
                  <button className='btn text-nowrap nav-link dropdown-toggle text-light' type='button ' data-bs-toggle='dropdown' aria-expanded='false'>
                    Utilities
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="appsDropdown">
                    <li><Link to="/price_estimator" className="dropdown-item">Price Estimator</Link></li>
                    <li><Link to="/recommend_location" className="dropdown-item">Location Estimator</Link></li>
                  </ul>
                </li>
                {!isAuthenticated && 
                <li className="nav-item px-2"><Link to="/accounts" className="nav-link text-light">Signin</Link></li>
                }
                {isAuthenticated && 
                <li className="nav-item px-2 dropdown">
                  <button className='btn text-nowrap nav-link dropdown-toggle text-light' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                    Accounts
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="appsDropdown">
                    <li><Link to="/saved_properties" className="dropdown-item">Saved Properties</Link></li>
                    <li><Link to="/liked_properties" className="dropdown-item">Liked Properties</Link></li>
                    <li><Link to="/signout" className="nav-link">Sign Out</Link></li>
                  </ul>
                </li>
                }
                <li className="nav-item px-2"><Link to="/about" className="nav-link text-light">About</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

const TopView = () => {
  return (
      <div className="view" style={{ backgroundImage: "url(/static/img/housing-bg5.jpg)", backgroundSize:'cover', backgroundRepeat:'no-repeat',  backgroundPosition: 'top'}}>
        <Header />
        <div className="container-fluid px-0">
          
          <section className="text-center text-light py-5 pt-lg-3 pt-xl-2">
            <h1 style={{fontFamily:'serif'}} className="display-5 fw-bold">Welcome To Housing</h1>
            <p className="fs-6 fw-light">Find your dream home with us</p>< br />< br />
          </section>

          <div class="container-fluid">
              <div class="row text-light">
                <div>
                  <br /><br />
                  <br /><br /><br /><br /><br /><br /><br /><br />
                </div>
                <div className='row d-flex my-3 p-5'>
                  <div className='col-sm-1 col-lg-2 col-xl-3'></div>
                  <div className='col-sm-10 col-lg-8 col-xl-6'>
                    <div className='input-group'>
                      <input type='text' id='search' className='form-control' placeholder='Search by location, society, etc.' aria-label='Search' aria-describedby='search-addon'/>
                      <button className='btn btn-outline-light' type='button' id='search-addon'>
                        <i className='fas fa-search'></i>
                      </button>
                    </div>
                  </div>
                  <div className='col-sm-1 col-lg-2 xol-xl-3'></div>
                </div>
            </div>
          </div>
        </div>
      </div>
  )
}

const PropertyCard = ({ property }) => {
  const IndianRupeeFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  });
  const navigate = useNavigate();
  return (
      <div className='card' style={{width:'356px'}} onClick={() => navigate(`/property_details/${property.id}`)}>
        <div className='card-img-top'>
          <img style={{width:'100%', height:'180px', objectFit:'cover'}} src={property.images.length > 0 && property.images[0].image} alt={`Property ${property.id}`} />
        </div>
      
        <div className="card-body p-2" style={{height:'130px'}}>
          <h5 className='card-title fw-bold'>{IndianRupeeFormatter.format(property.price)}</h5>
          <p className='card-text' style={{fontSize:'17px'}}>
            {property.bedrooms} bds | {property.bathrooms} ba{property.balcony && ' | Balcony'} | {property.area || '--'} sqft | {property.area_type}
            <br />
            {property.address}, {property.location}
            <p style={{fontSize:'14px'}}>Listing by: {property.user_first_name} {property.user_last_name} | {property.availability || (property.ready_to_move && 'Ready To Move')}</p>
          </p>
        </div>
      </div>
  );
};

const RecommendedSection = () => {

  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/api/properties_list/', {
        params: {
          page: 1,
        }
      })
      setProperties(response.data);
      setIsLoading(false);
    }
    catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProperties();
  }, []);

  const handlePreviousSlide = () => {
    const scrollContainer = document.getElementById('property-scroll-div');
    var scrollby = -300
    if (scrollContainer.clientWidth >= 1320) {
      scrollby = -1000;
    }
    else if (scrollContainer.clientWidth >= 960) {
      scrollby = -600;
    }
    scrollContainer.scrollBy({left: scrollby, behavior:'smooth'});
  }

  const handleNextSlide = () => {
    const scrollContainer = document.getElementById('property-scroll-div');
    var scrollby = 300;
    if (scrollContainer.clientWidth >= 1320) {
      scrollby = 1000;
    }
    else if (scrollContainer.clientWidth >= 960) {
      scrollby = 600;
    }
    scrollContainer.scrollBy({left: scrollby, behavior:'smooth'});
  }

  function updateScrollIconVisibility() {
    const scrollContainer = document.getElementById('property-scroll-div');
    const scrollLeftButton = document.getElementById('scroll-left-button');
    const scrollRightButton = document.getElementById('scroll-right-button');

    console.log(scrollContainer.scrollLeft);
    console.log(scrollContainer.scrollWidth);
    console.log(scrollContainer.clientWidth);
  
    const isAtLeftEdge = scrollContainer.scrollLeft < 50;
    const isAtRightEdge = scrollContainer.scrollLeft + 50 > scrollContainer.scrollWidth - scrollContainer.clientWidth;
  
    scrollLeftButton.style.opacity = isAtLeftEdge ? 0.5 : 1;
    scrollLeftButton.style.cursor = isAtLeftEdge ? 'default' : 'pointer';
    scrollRightButton.style.opacity = isAtRightEdge ? 0.5 : 1;
    scrollRightButton.style.pointerEvents = isAtRightEdge ? 'default' : 'pointer';
  }

  return (
      <div class="container py-5 px-0">
        <div className='row px-3 mx-0'>
          <div className='col-10 col-xl-11 px-0'>
            <h1 className='fs-3'>Homes For You</h1>
            <p className='lead fs-6'>Based on homes you recently viewed</p>
          </div>
          <div className='col-2 col-xl-1 px-0 d-flex align-items-center justify-content-between'>
            <i id='scroll-left-button' style={{opacity:'0.5'}} className='fa-solid fa-circle-chevron-left' onClick={handlePreviousSlide} />
            <i id='scroll-right-button' style={{opacity:'1'}} className='fa-solid fa-circle-chevron-right' onClick={handleNextSlide} />
          </div>
        </div>

        {isLoading && <p>Loading Properties...</p>}
        {!isLoading && properties.length > 0 &&
        <ul id='property-scroll-div' className='property-scroll-div pb-2 p-0 my-0' onScroll={updateScrollIconVisibility}>
          {properties.map((property) => (
            <li className='property-card-div px-3' key={property.id}>
              <PropertyCard property={property} />
            </li>
          ))} 
          <li className='property-card-div px-3'>
            <button className='btn btn-primary'>Browse For <br/> More</button>
          </li>
        </ul>
        }
      </div>
  )
}

const Homepage = () => {
  
  const user = useContext(AuthContext).user;

  return (
    <div>
      <TopView />
      <RecommendedSection />

        <section className="container main-content">
          <h2 className="mb-4">Explore Apps</h2>
          <div className="row">
            <div className="col-md-6">
              <Link to="/price_estimator" className="btn btn-primary app-box btn-block">House Price Estimator</Link> {/* Use buttons for app links */}
            </div>
            <div className="col-md-6">
              <Link to="/recommend_location" className="btn btn-primary app-box btn-block">Location Recommendation</Link>
            </div>
          </div>
        </section>

        <section className="container featured-houses">
          <h2 className="mb-4">Featured Houses</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4">
                <img className="card-img-top" src="/img/house1.jpeg" alt="House 1" />
                <div className="card-body">
                  <h4 className="card-title">Beautiful Family Home</h4>
                  <p className="card-text">3 bedrooms | 2 bathrooms | $300,000</p>
                </div>
              </div>
            </div>
          </div>
        </section>

    </div>
  );
};


export default Homepage;