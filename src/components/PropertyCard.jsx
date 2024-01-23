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
      <div className='card mt-3'>
        <Slider {...settings}>
          {property.image_files.map((image, index) => (
            <div key={index} className='card-img-top'>
              <img src={image.image} alt={`Property Image ${index+1}`} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="card-body">
        <h4 className='card-title'>{property.location}</h4>
        <p className='card-text'>
          {property.society}, {property.area_type}, Available on {property.availability}
        </p>
        <div className='row'>
          <div className='col-6'>
            <p className = 'mb-0'>
              <strong>Price:</strong> $ {property.price} Lack
            </p>
          </div>
          <div className ='col-6 text-end'>
            <p className='mb-0'>
              <strong>{property.size}</strong>
            </p>
          </div>
          <div className='col-6'>
            <p className='mb-0'>
              <strong>Bathrooms : {property.bathrooms}</strong>
            </p>
          </div>
        </div>
        <button className='btn btn-primary'>View Details</button>
      </div>
    </div>
  );
};

export default PropertyCard;