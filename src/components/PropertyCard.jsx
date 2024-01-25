import React, { Component, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const PropertyCard = ({ property }) => {
  
  const settings = {
    // customPaging: function(i) {
    //   return (
    //     <a>
    //       <img src={property.image_files[i].image}/>
    //     </a>
    //   )
    // },
    dots: true,
    centerMode: true,
    dotsClass: "slick-dots slick-thumb",
    infinite:true,
    speed:500,
    slidesToShow:1,
    // adaptiveHeight:true,
    slidesToScroll:1,
  };

  return (
    <div className='card'>
      
        <Slider {...settings} className='card-img-top'>
          {property.image_files.map((image, index) => (
            <div key={index}>
              <img src={image.image} alt={`Property Image ${index+1}`} />
            </div>
          ))}
        </Slider>
      
      <div className="card-body">
        <h4 className='card-title'>INR {property.price} lakhs</h4>
        <p className='card-text'>
          {property.size} | {property.bathrooms} ba | {property.balcony && 'Balcony'} | {property.area} sqft | {property.area_type}
          <br />
          {property.society}, {property.location}, Bengaluru
          <p>Listing by: Anonymous | {property.availability}</p>
        </p>
      </div>

    </div>
  );
};

export default PropertyCard;