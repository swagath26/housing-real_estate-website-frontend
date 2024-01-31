// import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';
import { useContext } from 'react';
// import FeaturedProperties from './FeaturedProperties';
// import SearchBar from './SearchBar';

const Homepage = () => {
  
  const user = useContext(AuthContext).user;

  return (
    <div className="container-fluid homepage"> {/* Wrap in container for responsiveness */}
      <section className="jumbotron text-center hero-banner"> {/* Use jumbotron for hero area */}
        <h1 className="display-4">Welcome to Our Housing Assistant Website</h1>
        <p className="lead">Find your dream home with us.</p>
      </section>

      <section className="container main-content">
        <h2 className="mb-4">Explore Apps</h2> {/* Add spacing for readability */}
        <div className="row"> {/* Use row for horizontal layout */}
          <div className="col-md-6"> {/* Use grid for app boxes */}
            <Link to="/price_estimator" className="btn btn-primary app-box btn-block">House Price Estimator</Link> {/* Use buttons for app links */}
          </div>
          <div className="col-md-6">
            <Link to="/recommend_location" className="btn btn-primary app-box btn-block">Location Recommendation</Link>
          </div>
        </div>
      </section>

      <section className="container featured-houses">
        <h2 className="mb-4">Featured Houses</h2>

        <div className="row"> {/* Use row for featured house cards */}
          <div className="col-md-6">
            <div className="card mb-4"> {/* Use card for house details */}
              <img className="card-img-top" src="/img/house1.jpeg" alt="House 1" />
              <div className="card-body">
                <h4 className="card-title">Beautiful Family Home</h4>
                <p className="card-text">3 bedrooms | 2 bathrooms | $300,000</p>
              </div>
            </div>
          </div>
          {/* Add more house cards here as needed */}
        </div>
      </section>

      {/* Apply similar Bootstrap classes for FAQ and Contact sections */}

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