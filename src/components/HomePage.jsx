import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AuthContext from './AuthContext';
import Accounts from './Accounts';
import axios from 'axios';
import './HomePage.css';

const Header = () => {

  const isAuthenticated = useContext(AuthContext).isAuthenticated;
  const setIsAuthenticated = useContext(AuthContext).setIsAuthenticated;

  const handleSignout = async () => {
    const response = await axios.get('/api/members/signout/');
    if (response.data.success) {
        setIsAuthenticated(false);
    }
  }

  return (
    <header className="header home-header px-3 py-0 pt-3">
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

          <button className="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar">
            <div className='offcanvas-header'>
              <button className='btn-close' data-bs-dismiss="offcanvas" />
            </div>
            <div className='offcanvas-body justify-content-end pe-3'>
              <ul className='navbar-nav text-light'>
                <li className="nav-item px-2" data-bs-dismiss="offcanvas"><Link to="/buy" className="nav-link text-light">Buy</Link></li>
                <li className="nav-item px-2" data-bs-dismiss="offcanvas"><Link to="/sell" className="nav-link text-light">Sell</Link></li>
                <li className="nav-item px-2 dropdown">
                  <button className='btn text-nowrap nav-link dropdown-toggle text-light' data-bs-toggle='dropdown'>
                    Utilities
                  </button>
                    <ul className="dropdown-menu">
                      <li data-bs-dismiss="offcanvas"><Link className="dropdown-item">Price Estimator</Link></li>
                      <li data-bs-dismiss="offcanvas"><Link className="dropdown-item">Location Estimator</Link></li>
                    </ul>
                </li>
                {!isAuthenticated && 
                <li className="nav-item px-2" data-bs-dismiss="offcanvas">
                  <Link to="/accounts" className='nav-link text-light' data-bs-toggle='modal' data-bs-target='#accounts'>Signin</Link>
                </li>
                }
                {isAuthenticated && 
                <li className="nav-item px-2 dropdown">
                  <button className='btn text-nowrap nav-link dropdown-toggle text-light' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                    Accounts
                  </button>
                    <ul className="dropdown-menu" aria-labelledby="appsDropdown">
                      <li data-bs-dismiss="offcanvas"><Link className="dropdown-item">Profile</Link></li>
                      <li data-bs-dismiss="offcanvas"><Link to="/saved_properties" className="dropdown-item">Saved Properties</Link></li>
                      <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" onClick={handleSignout}>Sign Out</Link></li>
                    </ul>
                </li>
                }
                <li className="nav-item px-2" data-bs-dismiss="offcanvas"><Link to="/about" className="nav-link text-light">About</Link></li>
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
  )
}

const TopView = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = () => {
    navigate(`/buy/${searchQuery}`)
  };
  useEffect(() => {
    document.getElementById('search-input').addEventListener('keypress', (event) => {
      if(event.key == 'Enter') {
        event.preventDefault();
        navigate(`/buy/${event.target.value}`);
      }
    })
  }, []);
  
  return (
      <div className="view" style={{ backgroundImage: "url(/static/img/housing-bg5.jpg)", backgroundSize:'cover', backgroundRepeat:'no-repeat',  backgroundPosition: 'top'}}>
        <Header />
        <div className="container-fluid px-0">
          
          <section className="text-center text-light py-5 pt-lg-3 pt-xl-2">
            <h1 style={{fontFamily:'serif'}} className="display-5 fw-bold">Welcome To Housing</h1>
            <p className="fs-6 fw-light">Find your dream home with us</p>< br />< br />
          </section>

          <div className="container-fluid">
              <div className="row text-light">
                <div>
                  <br /><br />
                  <br /><br /><br /><br /><br /><br /><br /><br />
                </div>
                <div className='row d-flex my-3 p-5'>
                  <div className='col-sm-1 col-lg-2 col-xl-3'></div>
                  <div className='col-sm-10 col-lg-8 col-xl-6'>
                    <div className='input-group'>
                      <input type='text' id="search-input" value={searchQuery} onChange={(event) => {setSearchQuery(event.target.value)}} className='form-control' placeholder='Search by location, address, etc.' aria-label='Search' aria-describedby='search-addon'/>
                      <button onClick={handleSearch} className='btn btn-outline-light' id='search-addon'>
                        <i className='fas fa-search'></i>
                      </button>
                    </div>
                  </div>
                  <div className='col-sm-1 col-lg-2 col-xl-3'></div>
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
  // const navigate = useNavigate();

  return (
      <div className='card property-card' style={{width:'350px'}}>
         {/* onClick={() => navigate(`/property_details/${property.id}`)} */}
        <div className='card-img-top' style={{overflow:'hidden'}}>
          <img style={{width:'100%', height:'180px', objectFit:'cover'}} src={property.images && property.images.length > 0 && property.images[0].image} alt={`Property ${property.id}`} />
        </div>
      
        <div className="card-body p-2" style={{height:'130px'}}>
          <h5 className='card-title fw-bold'>{IndianRupeeFormatter.format(property.price)}</h5>
          <div className='card-text'>
            <p style={{fontSize:'16px', margin:'0', textOverflow:'ellipsis', overflow:'hidden', textWrap:'nowrap'}}>
              <b>{property.bedrooms} </b>bds | <b>{property.bathrooms}</b> ba <b>{property.balcony && ' | Balcony'}</b> | <b>{property.area || '--'}</b> sqft | {property.area_type}
            </p>
            <p style={{fontSize:'16px', margin:'0', textOverflow:'ellipsis', overflow:'hidden', textWrap:'nowrap'}}>
              {property.address}, {property.location}
            </p>
            <p style={{fontSize:'13px'}}>
              Listing by: {property.user_first_name} {property.user_last_name} | {property.availability || (property.ready_to_move && 'Ready To Move')}
            </p>
          </div>
        </div>
      </div>
  );
};

const RecommendedSection = () => {

  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/api/properties_list/', {
        params: {
          page: 1,
          page_size: 10
        }
      })
      setProperties(response.data.results);
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
    var scrollby = -350
    if (scrollContainer.clientWidth >= 1320) {
      scrollby = -1050;
    }
    else if (scrollContainer.clientWidth >= 960) {
      scrollby = -700;
    }
    scrollContainer.scrollBy({left: scrollby, behavior:'smooth'});
  }

  const handleNextSlide = () => {
    const scrollContainer = document.getElementById('property-scroll-div');
    var scrollby = 350;
    if (scrollContainer.clientWidth >= 1320) {
      scrollby = 1050;
    }
    else if (scrollContainer.clientWidth >= 960) {
      scrollby = 700;
    }
    scrollContainer.scrollBy({left: scrollby, behavior:'smooth'});
  }

  function updateScrollIconVisibility() {
    const scrollContainer = document.getElementById('property-scroll-div');
    const scrollLeftButton = document.getElementById('scroll-left-button');
    const scrollRightButton = document.getElementById('scroll-right-button');
  
    const isAtLeftEdge = scrollContainer.scrollLeft < 50;
    const isAtRightEdge = scrollContainer.scrollLeft + 50 > scrollContainer.scrollWidth - scrollContainer.clientWidth;
  
    scrollLeftButton.style.opacity = isAtLeftEdge ? 0.5 : 1;
    scrollLeftButton.style.cursor = isAtLeftEdge ? 'default' : 'pointer';
    scrollRightButton.style.opacity = isAtRightEdge ? 0.5 : 1;
    scrollRightButton.style.cursor = isAtRightEdge ? 'default' : 'pointer';
  }

  return (
      <div className="container pb-5 pt-3 px-0">
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
          <li className='property-card-div h-100 px-3'>
            <button className='btn btn-outline-primary d-flex align-items-center' onClick={() => navigate(`/buy`)}>
              Browse for<br/> More</button>
          </li>
        </ul>
        }
      </div>
  )
}

const Homepage = () => {
  
  const user = useContext(AuthContext).user;
  const navigate = useNavigate();

  return (
    <div>
      <TopView />
      
      
      <div className='container p-5 mt-2'>
        <div className='row'>

          <div className='col-lg-4 p-3'>
            <div className='card nav-card' id='buy-card' onClick={() => navigate(`/buy`)}>
              <div className='row p-2 m-0 d-flex justify-content-center'>
                <div className='col-lg-12 col-12 col-md-6 d-flex align-items-center p-2'>
                  <img src="/static/img/buy.jpg" style={{width:'100%', maxWidth:'350px'}}/>
                </div>
                <div className='col-lg-12 col-12 col-md-6 p-2'>
                  <div className='row p-2 m-0'>
                    <h3 className='d-flex justify-content-center' style={{fontFamily:'serif'}}>Buy a home</h3>
                  </div>
                  <div className='row p-0 py-2 m-0 d-flex align-items-center' style={{height:'120px'}}>
                    <p style={{textAlign:'center', fontSize:'17px'}}>Find your place with an immersive photo experience and the listings, 
                      which you won’t find anywhere else.</p>
                  </div>
                  <div className='row p-4 m-0 d-flex justify-content-center'>
                    <button className='btn btn-outline-primary fw-bold' id='buy-button' style={{maxWidth:'200px'}}>
                      Browse Homes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-lg-4 p-3'>
            <div className='card nav-card' id='sell-card' onClick={() => navigate(`/sell`)}>
              <div className='row p-2 m-0 d-flex justify-content-center'>
                <div className='col-lg-12 col-12 col-md-6 d-flex align-items-center p-2'>
                  <img src="/static/img/sell.jpg" style={{width:'100%', maxWidth:'350px'}}/>
                </div>
                <div className='col-lg-12 col-12 col-md-6 p-2'>
                  <div className='row p-2 m-0'>
                    <h3 className='d-flex justify-content-center' style={{fontFamily:'serif'}}>Sell a home</h3>
                  </div>
                  <div className='row p-0 py-2 m-0 d-flex align-items-center' style={{height:'120px'}}>
                    <p style={{textAlign:'center', fontSize:'17px'}}>No matter what path you take to sell your home, we can help you navigate a 
                      successful sale without difficulties.</p>
                  </div>
                  <div className='row p-4 m-0 d-flex justify-content-center'>
                    <button className='btn btn-outline-primary fw-bold' id='sell-button' style={{maxWidth:'200px'}}>
                      See Options
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-lg-4 p-3'>
            <div className='card nav-card' id='rent-card'>
              <div className='row p-2 m-0 d-flex justify-content-center'>
                <div className='col-lg-12 col-12 col-md-6 d-flex align-items-center p-2'>
                  <img src="/static/img/rent.jpg" style={{width:'100%', maxWidth:'350px'}}/>
                </div>
                <div className='col-lg-12 col-12 col-md-6 p-2'>
                  <div className='row p-2 m-0'>
                    <h3 className='d-flex justify-content-center' style={{fontFamily:'serif'}}>Rent a home</h3>
                  </div>
                  <div className='row p-0 py-2 m-0 d-flex align-items-center' style={{height:'120px'}}>
                    <p style={{textAlign:'center', fontSize:'17px'}}>Get a seamless online experience from shopping on the largest 
                      rental network, to applying, to paying rent.</p>
                  </div>
                  <div className='row p-4 m-0 d-flex justify-content-center'>
                    <button className='btn btn-outline-primary fw-bold' id='rent-button' style={{maxWidth:'200px'}}>
                      Find Rentals
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <RecommendedSection />

    </div>
  );
};


export default Homepage;