import React, { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PropertyCard = ({ property }) => {

  return (
    <div className='col-6'>
      <div className='card'>
        <div className='card-img-top d-flex justify-content-center'>
          <div id={`property_${property.id}`} class="carousel slide">
            <div class="carousel-inner">

              {property.image_files.map((image, index) => (
              <div className={index==0 ? 'carousel-item active' : 'carousel-item'} key={index} style={{height:'250px'}}>
                <img className='w-100 p-2 h-100 object-fit-contain' src={image.image} alt={`Property Image ${index+1}`} />
              </div>
              ))}

            </div>
            <button class="carousel-control-prev" type="button" data-bs-target={`#property_${property.id}`} data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>

            <button class="carousel-control-next" type="button" data-bs-target={`#property_${property.id}`} data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>

          </div>
        </div>
      
        <div className="card-body" style={{height:'200px'}}>
          <h6 className='card-title'><b>INR {property.price} lakhs</b></h6>
          <p style={{fontSize:'18px'}} className='card-text'>
            {property.size} | {property.bathrooms} ba | {property.balcony && 'Balcony'} | {property.area} sqft | {property.area_type}
            <br />
            {property.society}, {property.location}, Bengaluru
            <p style={{fontSize:'14px'}}>Listing by: Anonymous | {property.availability}</p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;