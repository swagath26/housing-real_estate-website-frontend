import React, { useState, useEffect, useRef } from 'react';
import PropertyCard from './PropertyCard';
import axios from 'axios';
import {Box} from '@mui/material';
import {Slider} from '@mui/material';
import {Link} from 'react-router-dom';
import './Buy.css';

const Buy = () => {

  const searchInputRef = useRef(null);

  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const [pageCount, setPageCount] = useState(1);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  // const [priceRangeFilter, setPriceRangeFilter] = useState('');
  const [minPriceFilter, setMinPriceFilter] = useState('0');
  const [maxPriceFilter, setMaxPriceFilter] = useState('1000');

  useEffect (() => {
    fetchProperties();
  }, [currentPage, searchQuery, sortBy, minPriceFilter, maxPriceFilter]);

  const fetchProperties = async () => {
    try {
        const response = await axios.get('/api/properties_list/', {
        params: {
          page: currentPage,
          page_size: pageSize,
          search: searchQuery,
          // location: filteredLocation,
          // min_price: minPriceFilter,
          // max_price: maxPriceFilter,
          // size: filteredSize,
          ordering: sortBy,
        },
      });
      setProperties(response.data);
      setPageCount(Math.trunc(properties.length/pageSize) + 1);
      setIsLoading(false);
    }
    catch (error) {
      console.error('Error fetching properties:', error);
      setError(error);
      setIsLoading(false);
    }
  }

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

  const handlePriceFilterChange = (event) => {
    const [min, max] = event.target.value;
    setMinPriceFilter(min);
    setMaxPriceFilter(max);
  }

  const SearchBox = () => {
    return (
      <div className='input-group'>
        <input type='text' ref={searchInputRef} className='form-control' placeholder='Search by location, society, etc.' aria-label='Search' aria-describedby='search-addon'/>
        <button onClick={handleSearchChange} className='btn btn-outline-secondary' type='button' id='search-addon'>
          <i className='fas fa-search'></i>
        </button>
      </div>
    )
  }

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
      <div className='card filter-card'>
        <div className='card-header'>
          <h5>Price Range (in Lakhs) :</h5>
        </div>
        <div className='card-body'>
          <div className='filter-group'>
            <Box sx={{ width: 250}}>
              <Slider
                value={[minPriceFilter, maxPriceFilter]}
                min={0}
                max={1000}
                onChange={handlePriceFilterChange}
                valueLabelDisplay='auto'
              />
            </Box>
            <span className='range-labels'>
              <span>Properties in INR {minPriceFilter} - {maxPriceFilter}</span>
            </span>
          </div>
        </div>
      </div>
    )
  }
  
  const AreaFilterBox = () => {
    return (
      <div className='card filter-card'>
        <div className='card-body'>
          <div className='filter-group'>
            <h6>Area Range (in sqft) :</h6>
            <Box sx={{ width: 250}}>
              <Slider
                value={[minPriceFilter, maxPriceFilter]}
                min={0}
                max={1000}
                // onChange={handlePriceFilterChange}
                valueLabelDisplay='auto'
              />
            </Box>
            <span className='range-labels'>
              <span>Properties in {minPriceFilter}</span> - <span>{maxPriceFilter} sqft</span>
            </span>
          </div>
        </div>
      </div>
    )
  }


  useEffect(() => {
    setHeight();
  }, []);

  const setHeight = () => {
    const searchSection = document.getElementById('search-section');
    const listSection = document.getElementById('list-section');
    const listHeight = window.innerHeight - (listSection.getBoundingClientRect().top - searchSection.getBoundingClientRect().top);
    listSection.style.height = `${listHeight*1.01}px`;
  }

  window.addEventListener('shown.bs.collapse', setHeight);
  window.addEventListener('hidden.bs.collapse', setHeight);

  const [filterPrice, setFilterPrice] = useState('Price');
  const [filterBeds, setFilterBeds] = useState('Beds & Baths');
  const [filterArea, setFilterArea] = useState('Area');
  const [filterCount, setFilterCount] = useState(0);

  let map;

  async function initMap() {
    const google = window.google;
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }
  useEffect(() => {
    initMap();
  }, []);

  return (
    <div className='container-fluid' id='main-container'>

      <div className="row py-2 g-3 m-0" id='search-section'>

        <div className='col-lg-5 flex justify-content-evenly' id="search-box">
          <div className='row'>
            <div className='col-md-10 col-8'>
              <SearchBox/>
            </div>
            <div className='col-2'>
              <button className='btn btn-outline-dark' id='filter-toggle-button' data-bs-toggle='collapse' data-bs-target='#filter-collapse'>Filter</button>
            </div>
            <div className='col-2'>
              <button className='btn btn-outline-dark' id='map-toggle-button' data-bs-toggle='collapse' data-bs-target='#map-section'>Map</button>
            </div>
          </div>
        </div>

        <div className='col-lg-7 collapse' id="filter-collapse">
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
              <div className="dropdown-item"><PriceFilterBox/></div>
            </div>
          <button className='btn btn-outline-dark dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
            {filterArea}
          </button>
            <div className="dropdown-menu" aria-labelledby="appsDropdown">
              <div className="dropdown-item"><AreaFilterBox/></div>
            </div>
          <button className='btn btn-outline-dark dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
            More Filters {(filterCount > 0) && `(${filterCount})`}
          </button>
            <div className="dropdown-menu" aria-labelledby="appsDropdown">
              <div className="dropdown-item"><b>More</b></div>
            </div>
          <button className='btn text-nowrap'>Clear Filters</button>
        </div>

      </div>

      <div className='row m-0' id='content-section'>

        <div className='col-xl-4 col-md-6 collapse' id='map-section'>
          <div className='d-flex align-items-center justify-content-center'>
            <div className='row' style={{minHeight:'80vh', minWidth:'360px', height:'85vh', width:'80vh'}} id='map'></div>
          </div>
        </div>

        <div className='col-xl-8 col-md-6 list-section' style={{overflowY:'scroll'}} id='list-section'>
          <div className='row g-2 p-2'>
            <div className='col-xl-4'>
              <div>
                <b>Homes for sale</b>
              </div>
              <div>
                Search Results
              </div>
            </div>
            <div className='col-xl-4'>
              <div className='row g-2 p-1'>
                <div className='col-4 d-flex justify-content-end'>
                  <button className='btn btn-primary' onClick={handlePreviousPage}>Previous</button>
                </div>
                <div className='col-4 d-flex flex-column justify-content-center'>
                  <span>Page {currentPage} of {pageCount} </span>
                </div>
                <div className='col-4'>
                  <button className='btn btn-primary' onClick={handleNextpage}>Next</button>
                </div>
              </div>
            </div>
            <div className='col-xl-4 d-flex justify-content-center'>
              <SortButton />
            </div>
          </div>

          <div className='row p-1'>
            {isLoading && <p>Loading properties...</p>}
            {error && <p>Error: {error.message}</p>}
            {!isLoading && properties.length > 0 && (
              <div className='row g-2'>
                {properties.map((property) => (
                  <div className='col-lg-12 col-xl-6 col-xxl-4 d-flex justify-content-center'>
                    <PropertyCard key={property.id} property={property} />
                  </div>
                ))}
              </div>
            )}
            {!isLoading && properties.length === 0 && <p>No properties found.</p>}
          </div>

          <footer className="footer py-2 bg-light mt-auto">
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