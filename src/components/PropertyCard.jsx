import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './PropertyCard.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';

const PropertyCard = ({ property }) => {
  // const navigate = useNavigate();
  const IndianRupeeFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  });

  return (
      <div className='card property-card' style={{width:'100vh'}}>
         {/* onClick={() => navigate(`/property_details/${property.id}`)} */}
        
        {/* <div id='favourites-icon' style={{position:'absolute', top:'10px', right:'10px', zIndex:'1'}} >
          <FontAwesomeIcon icon={faHeart} color='white' className='hover-dark' />
        </div> */}

        <div className='card-img-top' style={{overflow:'hidden'}}>

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
          <div className='row mb-2'>
            <div className='col-6'>
              <h5 className='card-title fw-bold m-0'>{IndianRupeeFormatter.format(property.price)}</h5>
            </div>
            <div className='col-6 d-flex justify-content-center'>
              <button style={{fontSize:'13px'}} className='btn btn-outline-primary py-0'>View <i className='fa-solid fa-location-dot' /></button>
            </div>
          </div>
          <div className='card-text'>
            <p style={{fontSize:'16px', margin:'0', textOverflow:'ellipsis', overflow:'hidden', textWrap:'nowrap'}}>
            <b>{property.bedrooms} </b>bds | <b>{property.bathrooms}</b> ba <b>{property.balcony && ' | Balcony'}</b> | <b>{property.area || '--'}</b> sqft
            </p>
            <p style={{fontSize:'16px', margin:'0', textOverflow:'ellipsis', overflow:'hidden', textWrap:'nowrap'}} >
            {property.address}, {property.location}
            </p>
            <p style={{fontSize:'13px', margin:'0'}}>Listing by: {property.user_first_name} {property.user_last_name} | {property.availability || (property.ready_to_move && 'Ready To Move')}
            </p>
          </div>
        </div>
      </div>
  );
};

export default PropertyCard;