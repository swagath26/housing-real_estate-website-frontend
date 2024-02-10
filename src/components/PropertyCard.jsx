import React from 'react';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const IndianRupeeFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  });

  return (
      <div className='card property-card' style={{width:'356px'}} onClick={() => navigate(`/property_details/${property.id}`)}>
        <div className='card-img-top'>

          <div id={`property_${property.id}`} class="carousel slide">
            <div class="carousel-inner">

              {property.images.map((image, index) => (
              <div className={index==0 ? 'carousel-item active' : 'carousel-item'} key={index}>
                <img className='w-100 object-fit-cover' style={{height:'160px'}} src={image.image} alt={`Property Image ${index+1}`} />
              </div>
              ))}

            </div>

            <div>
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

        </div>
      
        <div className="card-body p-2" style={{height:'130px'}}>
          <h5 className='card-title fw-bold'>{IndianRupeeFormatter.format(property.price)}</h5>
          <p className='card-text' style={{fontSize:'16px'}}>
            <b>{property.bedrooms} </b>bds | <b>{property.bathrooms}</b> ba <b>{property.balcony && ' | Balcony'}</b> | <b>{property.area || '--'}</b> sqft
            <br />
            {property.address}, {property.location}
            <p style={{fontSize:'13px'}}>Listing by: {property.user_first_name} {property.user_last_name} | {property.availability || (property.ready_to_move && 'Ready To Move')}</p>
          </p>
        </div>
      </div>
  );
};

export default PropertyCard;