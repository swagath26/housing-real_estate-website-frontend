import React, { useState } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/click/click.css';
// import 'click-carousel/click/click-theme.css';

const PropertyCard = ({ property }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: true,
    infinite:true,
    speed:500,
    slidesToShow:1,
    slidesToScroll:1,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <div className="card mb-4">
      {/* <Slider {...settings}>
        {property.map((loc, index) => (
          <div key={index} className='card-img-top'>
            <img src="loc" alt={'Property Image ${index+1}'} />
          </div>
        ))}
      </Slider> */}

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