import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AuthContext from './AuthContext';

const Header = () => {

  const isAuthenticated = useContext(AuthContext).isAuthenticated;

  return (
    <header className="header">
    <nav className="navbar navbar-expand-md py-0" data-bs-theme='dark'>
        <div className='container-fluid'>
          <Link to="/" className="navbar-brand px-3 py-0 pt-2 pt-lg-3">
          <div className='d-none d-lg-block'>
              <img src="/img/logo2.png" alt="Housing Logo" width="65" />
            </div>
            <div className='d-lg-none'>
              <img src="/img/logo2.png" alt="Housing Logo" width="50" />
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

const SearchBox = () => {
  return (
    <div className='input-group'>
      <input type='text' id='search' className='form-control' placeholder='Search by location, society, etc.' aria-label='Search' aria-describedby='search-addon'/>
      <button className='btn btn-outline-light' type='button' id='search-addon'>
        <i className='fas fa-search'></i>
      </button>
    </div>
  )
}

const Homepage = () => {
  
  const user = useContext(AuthContext).user;

  return (
    <div>
      <div class="view" style={{ backgroundImage: "url(/img/housing-bg5.jpg)", backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition: 'top'}}>
        <Header />
        <div className="container-fluid px-0">
          
          <section className="text-center text-light pt-0 px-md-1">
            <h1 className="display-5 pt-3 pt-lg-2 px-2 px-md-5">Welcome to Your New Housing Assistant</h1>
            <p className="fs-6 fw-light">Find your dream home with us.</p>
          </section>

          <div class="container-fluid">
              <div class="row text-light">
                <div>
                  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </div>
                <div className='row d-flex my-1 p-5 p-sm-5'>
                  <div className='col-sm-1 col-lg-2 col-xl-3'></div>
                  <div className='col-sm-10 col-lg-8 col-xl-6'><SearchBox /></div>
                  <div className='col-sm-1 col-lg-2 xol-xl-3'></div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row py-5">
          <div class="col-md-12 text-center">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
    

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


// const Homepage = () => {
//   // const [featuredProperties, setFeaturedProperties] = useState([]);

//   // useEffect(() => {
//   //   // Fetch featured properties from Django API and set state
//   //   fetch('/api/featured-properties')
//   //     .then(response => response.json())
//   //     .then(data => setFeaturedProperties(data));
//   // }, []);
//   const api = "http://127.0.0.1:8000" 
//   function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     fetch('/contact', {
//       method: 'POST',
//       body: formData
//     })
//     .then(response => {

//     })
//     .catch(error => {

//     })
//   }
//   return (
//     <div className="homepage">
//       <section class="hero-banner">
//         <h1>Welcome to Our Housing Assistant Website</h1>
//         <p>Find your dream home with us.</p>
//       </section>

//       <section class="container main-content">
//         <h2>Explore Apps</h2>
//         <Link to="/price_estimator" className="app-box">House Price Estimator</Link>
//         <br></br>
//         <Link to="/recommend_location" className="app-box">Location Recommendation</Link>
//       </section>
    
//       <section class="featured-houses">
//         <h2>Featured Houses</h2>
        
//         <div class="house-card">
//             <img src="http://127.0.0.1:8000/static/img/house1.jpeg" alt="House 1"></img>
//             <h3>Beautiful Family Home</h3>
//             <p>3 bedrooms | 2 bathrooms | $300,000</p>
//         </div>
        
//       </section>

//       <section class="faq">
//         <h2>Frequently Asked Questions</h2>
//         <div class="faq-item">
//             <h3>How can I buy a house?</h3>
//             <p>Buying a house is easy with our step-by-step guide. Explore our listings and contact us for more details.</p>
//         </div>
//       </section>

//       <section class="contact">
//         <h2>Contact Us</h2>
//         <p>Have questions or need assistance? Reach out to our team!</p>
//         <form onSubmit={handleSubmit}>
//             <label for="name">Name:</label>
//             <input type="text" id="name" name="name" required></input><br></br><br></br>
//             <label for="email">Email:</label>
//             <input type="email" id="email" name="email" required></input><br></br><br></br>
//             <label for="message">Message:</label>
//             <textarea id="message" name="message" rows="4" required></textarea><br></br><br></br>
//             <button type="submit">Submit</button><br></br><br></br>
//         </form>
//       </section>

//       <br></br>
//       <br></br>
//       <br></br>
//       {/* <SearchBar /> */}
//       {/* <FeaturedProperties properties={featuredProperties} /> */}
//       {/* Add other sections like About Us, Call to Action buttons */}
//     </div>
//   );
// };

export default Homepage;