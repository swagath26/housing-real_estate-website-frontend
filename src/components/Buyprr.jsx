import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Buy.css';

const Buy = () => {

  const searchInputRef = useRef(null);

  const [properties, setProperties] = useState([]);
  const [propertyCount, setPropertyCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [showCurrentPage, setShowCurrentPage] = useState(1);
  const pageSize = 40;
  const [pageCount, setPageCount] = useState(1);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  // const [priceRangeFilter, setPriceRangeFilter] = useState('');
  const [minPriceFilter, setMinPriceFilter] = useState('0');
  const [maxPriceFilter, setMaxPriceFilter] = useState('1000');

  const [minLatFilter, setMinLatFilter] = useState();
  const [maxLatFilter, setMaxLatFilter] = useState();

  const [minLngFilter, setMinLngFilter] = useState();
  const [maxLngFilter, setMaxLngFilter] = useState();

  useEffect (() => {
    const list_section = document.getElementById("list-section");
    isLoading ? list_section.style.opacity = 0.5 : list_section.style.opacity = 1;
  }, [isLoading]);

  function throttle(fn, interval) {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= interval) {
        lastCall = now;
        fn(...args);
      }
    };
  }
  
  function debounce(fn, interval) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), interval);
    };
  }



  const [map, setMap] = useState(null);
  const [markers] = useState({});
  const [center, setCenter] = useState({ lat: 13, lng: 77.5 });
  const [zoom, setZoom] = useState(11);

  const handleMapFilter = () => {
    setMinLatFilter(map.getBounds().ci.lo);
    setMaxLatFilter(map.getBounds().ci.hi);
    setMinLngFilter(map.getBounds().Lh.lo);
    setMaxLngFilter(map.getBounds().Lh.hi);
  }

  useEffect(() => {
    async function initMap() {
      const { Map } = await window.google.maps.importLibrary("maps");
      const map_obj = new Map(document.getElementById('map'), {
        center: center,
        zoom: zoom
      });
      map_obj.setOptions({
        disableDefaultUI: true,
        zoomControl: false
      });
      setMap(map_obj);
      if(map_obj.getBounds())
        console.log('prr',map_obj.getBounds(),'prr');
    }
    initMap();
  }, []);

  const [flag, setFlag] = useState(0);
  const [mapBounds, setMapBounds] = useState(null);

  if(map && flag===0) {
    if(map.getBounds()) {
      setMapBounds(map.getBounds());
      setFlag(1);
    }
  }
  
  useEffect(() => {
    if(map) {
      if(map.getBounds()) {
        handleMapFilter();
        const centerThrottledHandler = throttle(handleMapFilter, 1000);
        map.addListener('center_changed', centerThrottledHandler);
        const zoomThrottledHandler = debounce(handleMapFilter, 1000);
        map.addListener('zoom_changed', zoomThrottledHandler);
      }
    }
  }, [mapBounds])

  const [refetch, setRefetch] = useState(false);
  // const [mounted, setMounted] = useState(true);
  const abortController = useRef(null);

  const fetchProperties = async () => {
    const controller = new AbortController();
    abortController.current = controller;
    try {
      console.log("hehe");
      setIsLoading(true);
      const response = await axios.get('/api/properties_list/', {
        params: {
          page: currentPage,
          ordering: sortBy,
          min_lat: minLatFilter,
          max_lat: maxLatFilter,
          min_lng: minLngFilter,
          max_lng: maxLngFilter,
        },
        signal: controller.signal,
      });
      console.log("hihi");
      setProperties(response.data.results);
      setPropertyCount(response.data.count);
      setShowCurrentPage(currentPage);
      setPageCount(Math.trunc(response.data.count/pageSize) + 1);
      setError(null);
      setIsLoading(false);
      abortController.current = null;
    }
    catch (error) {
      if (error.name !== 'CanceledError') {
        setError(error);
        setIsLoading(false);
        abortController.current = null;
      }
      // else if (mounted) {
      else {
        console.log(error);
        setIsLoading(false);
        abortController.current = null;
        setRefetch(true);
        console.log("trigger refetch")
      }
    }
  };

  useEffect(() => {
    if(!isLoading) {
      // if(minLatFilter && maxLatFilter && minLngFilter && maxLngFilter)
        fetchProperties();
    }
    else if(abortController.current) {
      console.log("fetch abort")
      abortController.current.abort();
      console.log("fetch abort 2")
    }
    // return () => {
    //   setMounted(false);
    //   if(abortController.current) {
    //     abortController.current.abort();
    //   }
    // };
  }, [currentPage, sortBy, minPriceFilter, maxPriceFilter, minLatFilter, maxLatFilter, minLngFilter, maxLngFilter]);

  useEffect(() => {
    console.log("fetch refetch change");
    if(refetch) {
      console.log("refetch trigger")
      setRefetch(false);
      fetchProperties();
    }
  }, [refetch])




  const handleNextpage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = () => {
    setSearchQuery(searchInputRef.current.value);
  };

  // const handlePriceFilterChange = (event) => {
  //   const [min, max] = event.target.value;
  //   setMinPriceFilter(min);
  //   setMaxPriceFilter(max);
  // }

  const [filterPrice, setFilterPrice] = useState('Price');
  const [filterBeds, setFilterBeds] = useState('Beds & Baths');
  const [filterArea, setFilterArea] = useState('Area');
  const [filterCount, setFilterCount] = useState(0);

  const [selectedPropertyView, setSelectedPropertyView] = useState(null);
  const [prevSelectedPropertyView, setPrevSelectedPropertyView] = useState(null);

  const icon_1 = {
    url: "/static/img/map_std_icon2.png",
  }

  const icon_2 = {
    url: "/static/img/map_std_icon3.png",
  }

  const icon_3 = {
    url: "/static/img/map_std_icon5.png",
  }

  useEffect(() => {
    if (!isLoading) {
      for(let key in markers)
        markers[key].setMap(null);
      properties.forEach(property => {
        if (property.latitude) {
          let new_marker = new window.google.maps.Marker({
            position: { lat: parseFloat(property.latitude), lng: parseFloat(property.longitude) },
            map: map,
            icon: icon_1,
          });
          markers[property.id] = new_marker;
        }
      });
    }
  }, [properties]);

  useEffect(() => {
    if(map) {
      map.setCenter(center);
    }
  }, [center]);

  useEffect(() => {
    if(map) {
      map.setZoom(zoom);
    }
  }, [zoom]);

  useEffect(() => {
    if(prevSelectedPropertyView) {
      markers[prevSelectedPropertyView.id].setIcon(icon_1);
    }
  }, [prevSelectedPropertyView]);

  useEffect(() => {
    if(selectedPropertyView) {
      const currentPosition = ({lat: parseFloat(selectedPropertyView.latitude), lng:parseFloat(selectedPropertyView.longitude)});
      setCenter(currentPosition);
      setZoom(13);
      markers[selectedPropertyView.id].setIcon(null);
    }
  }, [selectedPropertyView])

  const [isMapToggled, setIsMapToggled] = useState(false);

  useEffect(() => {
    handleMapToggle();
  }, [isMapToggled])

  const handleMapToggle = () => {

    if ((document.getElementById('map-collapse') != null) && (document.getElementById('property-section') != null)) {

      const map_collapse = document.getElementById('map-collapse');
      const property_section = document.getElementById('property-section');

      if (window.matchMedia('(max-width: 992px)').matches) {

        if(isMapToggled) {
          map_collapse.style.display = 'block';
          property_section.style.display = 'none';
        }
        else {
          map_collapse.style.display = 'none';
          property_section.style.display = 'block';
        }
      }
      else {
        map_collapse.style.display = 'block';
        property_section.style.display = 'block';
      }
    }
  }

  window.matchMedia('(max-width: 992px)').addEventListener('change', handleMapToggle);

  const PropertyCard = ({ property }) => {
    // const navigate = useNavigate();
    const IndianRupeeFormatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    });

    const handleViewClick = () => {
      if (selectedPropertyView) {
        setPrevSelectedPropertyView(selectedPropertyView);
      }
      if (property.latitude && property.longitude) {
        setSelectedPropertyView(property);
      }
    }

    return (
        <div className='card property-card' style={{width:'100vh'}}
          onMouseEnter={() => {
            selectedPropertyView!=property && markers[property.id] && markers[property.id].setIcon(icon_3)}
          }
          onMouseLeave={() => {
            selectedPropertyView!=property && markers[property.id] && markers[property.id].setIcon(icon_1)}
          }
          // onClick={() => navigate(`/property_details/${property.id}`)}
        >
          
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
                <button style={{fontSize:'13px'}} className='btn btn-outline-primary py-0' onClick={handleViewClick}>View <i className='fa-solid fa-location-dot' /></button>
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

  const SearchBox = () => {
    const searchInput = document.getElementById('search-input');
    const autocomplete = new window.google.maps.places.Autocomplete(searchInput);
    autocomplete.setFields(["place_id", "geometry", "name"]);
    return (
      <div className='input-group'>
        <input type='text' ref={searchInputRef} id="search-input" className='form-control' placeholder='Search by location, address, etc.' aria-label='Search' aria-describedby='search-addon'/>
        <button onClick={handleSearchChange} className='btn btn-outline-secondary' type='button' id='search-addon'>
          <i className='fas fa-search'></i>
        </button>
      </div>
    )
  };

  const SortButton = () => {
    return (
      <div className='dropdown'>
        <button className='btn text-nowrap dropdown-toggle' type='button' id='sortDropdown' data-bs-toggle='dropdown' aria-expanded='false'>
          Sort By {(sortBy != '') && `(${sortBy})`}
        </button>
        <ul className='dropdown-menu' aria-labelledby='sortDropdown'>
          <li><button className='dropdown-item' onClick={() => setSortBy('')}>None</button></li>
          <li><button className='dropdown-item' onClick={() => setSortBy('price')}>Price (low to High)</button></li>
          <li><button className='dropdown-item' onClick={() => setSortBy('-price')}>Price (High to Low)</button></li>
        </ul>
      </div>
    )
  }

  const PriceFilterBox = () => {
    return (
      <div className='card' style={{maxWidth:'320px'}}>
        <div className='card-header'>
          <h6>Price Range (in Rs) :</h6>
        </div>
        <div className='card-body'>
          <div className='row mb-1'>
            <div className='col-6 d-flex justify-content-center'>
              <b>Minimum</b>
            </div>
            <div className='col-6 d-flex justify-content-center'>
              <b>Maximum</b>
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-5 d-flex justify-content-center'>
              <input className='ms-4 ps-2' placeholder='No Min' style={{maxWidth:'110px'}} />
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <p>-</p>
            </div>
            <div className='col-5 d-flex justify-content-center'>
              <input className='me-4 ps-2' placeholder='No Max'  style={{maxWidth:'110px'}} />
            </div>
          </div>
          <div className='row'>
            <button className='btn btn-primary'>
              Apply
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  const AreaFilterBox = () => {
    return (
      <div className='card' style={{maxWidth:'320px'}}>
        <div className='card-header'>
          <h6>Area in Sqft :</h6>
        </div>
        <div className='card-body'>
          <div className='row mb-1'>
            <div className='col-6 d-flex justify-content-center'>
              <b>Minimum</b>
            </div>
            <div className='col-6 d-flex justify-content-center'>
              <b>Maximum</b>
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-5 d-flex justify-content-center'>
              <input className='ms-4 ps-2' placeholder='No Min' style={{maxWidth:'110px'}} />
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <p>-</p>
            </div>
            <div className='col-5 d-flex justify-content-center'>
              <input className='me-4 ps-2' placeholder='No Max'  style={{maxWidth:'110px'}} />
            </div>
          </div>
          <div className='row'>
            <button className='btn btn-primary'>
              Apply
            </button>
          </div>
        </div>
      </div>
    )
  }

  const BedsFilterBox = () => {
    return (
      <div className='card'>
        <div className='card-header'>
          <h6>Number of Bedrooms:</h6>
        </div>
        <div className='card-body'>
          <div className='row mb-1'>
            <div className='col'>
              <input type="checkbox" class="btn-check" id="bed1" autocomplete="off" />
              <label class="btn btn-outline-primary" for="bed1">1</label>
            </div>

            <div className='col'>-
              <input type="checkbox" class="btn-check" id="bed2" autocomplete="off" />
              <label class="btn btn-outline-primary" for="bed2">2</label>
            </div>

            <div className='col'>
              <input type="checkbox" class="btn-check" id="bed3" autocomplete="off" />
              <label class="btn btn-outline-primary" for="bed3">3</label>
            </div>

            <div className='col'>
              <input type="checkbox" class="btn-check" id="bed4" autocomplete="off" />
              <label class="btn btn-outline-primary" for="bed4">4</label>
            </div>

            <div className='col'>
              <input type="checkbox" class="btn-check" id="bed5" autocomplete="off" />
              <label class="btn btn-outline-primary" for="bed5">5+</label>
            </div>
          </div>
          
          <div className='row my-1'>
            <button className='btn btn-primary'>
              Apply
            </button>
          </div>
        </div>
      </div>
    )
  }

  const BathsFilterBox = () => {
    return (
      <div className='card'>
        <div className='card-header'>
          <h6>Number of Bedrooms:</h6>
        </div>
        <div className='card-body'>
          <div className='row mb-1'>
            <div className='col'>
              <input type="radio" class="btn-check" id="bed1" autocomplete="off" />
              <label class="btn btn-outline-primary" for="bed1">1</label>
            </div>

            <div className='col'>
              <input type="radio" class="btn-check" id="bed2" autocomplete="off" />
              <label class="btn btn-outline-primary" for="bed2">2</label>
            </div>

            <div className='col'>
              <input type="radio" class="btn-check" id="bed3" autocomplete="off" />
              <label class="btn btn-outline-primary" for="bed3">3</label>
            </div>

            <div className='col'>
              <input type="radio" class="btn-check" id="bed4" autocomplete="off" />
              <label class="btn btn-outline-primary" for="bed4">4</label>
            </div>

            <div className='col'>
              <input type="radio" class="btn-check" id="bed5" autocomplete="off" />
              <label class="btn btn-outline-primary" for="bed5">5</label>
            </div>
          </div>

          <div className='row my-1'>
            <input type='checkbox' className='btn-check' id='bedmatch' autoComplete='off'/>
            <label className='btn btn-outline-primary' htmlFor='bedmatch'>Use Exact match</label>
          </div>
          
          <div className='row my-1'>
            <button className='btn btn-primary'>
              Apply
            </button>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className='buy-container row m-0'>

      <div className="map-section col-lg-6 col-xl-5 col-xxl-4 px-2">
        <div className='row search-row m-0 d-flex align-items-center'>
          <div className='col-10 p-0'>
            <SearchBox/>
          </div>

          <div className='col-2 p-0' hidden>
            <button className='btn btn-outline-dark' id='map-toggle-button' onClick={() => {setIsMapToggled(!isMapToggled)}}>{isMapToggled ? 'List' : 'Map' }</button>
          </div>

          <div className='col-2 p-0 d-flex justify-content-center'>
            <button className='btn btn-outline-dark' id='filter-toggle-button' data-bs-toggle='collapse' data-bs-target='#filter-collapse'>Filter</button>
          </div>
        </div>

        <div className='row m-0' id='map-collapse'>
          <div className='map-box d-flex align-items-top justify-content-center'>
            <div className='row map-row' style={{width:'100vh', maxWidth:'100vh'}} id='map'></div>
          </div>
        </div>

      </div>

      <div className='property-section col-lg-6 col-xl-7 col-xxl-8 px-2' id='property-section'>

        <div className='filter-section collapse' id="filter-collapse">
          <div className='filter-row d-flex align-items-center justify-content-evenly'>
            <button className='btn btn-outline-dark dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
              {filterPrice}
            </button>
              <div className="dropdown-menu" aria-labelledby="appsDropdown">
                <div className="dropdown-item"><PriceFilterBox/></div>
              </div>
            <button className='btn btn-outline-dark dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
              {filterBeds}
            </button>
              <div className="dropdown-menu" aria-labelledby="appsDropdown">
                <div className="dropdown-item">
                  <BedsFilterBox/>
                  <BathsFilterBox/>
                  </div>
              </div>
            <button className='btn btn-outline-dark dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
              {filterArea}
            </button>
              <div className="dropdown-menu" aria-labelledby="appsDropdown">
                <div className="dropdown-item"><AreaFilterBox/></div>
              </div>
            <button className='btn btn-outline-dark dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
              More {(filterCount > 0) && `(${filterCount})`}
            </button>
              <div className="dropdown-menu" aria-labelledby="appsDropdown">
                <div className="dropdown-item"><b>More</b></div>
              </div>
            <button className='btn text-nowrap'>Clear</button>
          </div>
        </div>

        <div className='list-section' id="list-section">

          <div className='row p-2 m-0 list-section-header'>
            <div className='col-6'>
              <div>
                <b>Homes for sale</b>
              </div>
              {isLoading &&
              <div>
                Properties Loading...
              </div>
              }
              {!isLoading &&
              <div>
                {propertyCount} Result{propertyCount>1 && 's'}
              </div>
              }
            </div>
            
            <div className='col-6 d-flex justify-content-end'>
              <SortButton />
            </div>
          </div>

          <div className='row p-1 m-0 list-section-body'>
            {!isLoading && error && 
            <div className='list-error'>
              <p>Error: {error.message}</p>
            </div> 
            }
            {properties.length > 0 &&
            <div className='list-loaded'>
              <div className='row p-0 m-0'>
                {properties.map((property) => (
                  <div className='col-12 col-md-6 col-lg-12 col-xl-6 col-xxl-4 d-flex justify-content-center p-1'>
                    <PropertyCard key={property.id} property={property} />
                  </div>
                ))}
              </div>

              <div className='row p-4 m-0'>
                <div className='col-4 d-flex justify-content-center'>
                  <button className='btn btn-primary' onClick={handlePreviousPage}>Previous</button>
                </div>
                <div className='col-4 d-flex justify-content-center'>
                  <span>Page {showCurrentPage} of {pageCount} </span>
                </div>
                <div className='col-4 d-flex justify-content-center'>
                  <button className='btn btn-primary' onClick={handleNextpage}>Next</button>
                </div>
              </div>
            </div>
            }
            {!isLoading && properties.length === 0 &&
            <div className='list-noresult'>
              <p>No properties found.</p>
            </div>
            }
          </div>

          <footer className="footer py-2 bg-light mt-auto list-section-footer" style={{height:'10vh'}}>
            <div className="container">
              <p className="text-center text-muted">&copy; 2023 Your Housing Website</p>
              <Link to="/contact" className="footer-link text-center text-decoration-none">Contact Us</Link>
            </div>
          </footer>
        
        </div>
        
      </div>
      
    </div>
  );
};

export default Buy;