import React from 'react';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div className='col-6'>
      <div className='card' onClick={() => navigate(`/property_details/${property.id}`)}>
        <div className='card-img-top d-flex justify-content-center'>
          <div id={`property_${property.id}`} class="carousel slide">
            <div class="carousel-inner">

              {property.images.map((image, index) => (
              <div className={index==0 ? 'carousel-item active' : 'carousel-item'} key={index} style={{height:'250px'}}>
                <img className='w-100 p-2 h-100 object-fit-contain' src={image.image} alt={`Property Image ${index+1}`} />
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
      
        <div className="card-body" style={{height:'200px'}}>
          <h6 className='card-title'><b>INR {property.price}</b></h6>
          <p style={{fontSize:'18px'}} className='card-text'>
            {property.bedrooms} bds | {property.bathrooms} ba{property.balcony && ' | Balcony'} | {property.area || '--'} sqft | {property.area_type}
            <br />
            {property.address}, {property.location}
            <p style={{fontSize:'14px'}}>Listing by: {property.user_first_name} {property.user_last_name} | {property.availability || (property.ready_to_move && 'Ready To Move')}</p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;