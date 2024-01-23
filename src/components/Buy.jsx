import React, { useState, useEffect, useRef } from 'react';
import PropertyCard from './PropertyCard';
// import fetchProperties from './FetchProperties';
import axios from 'axios';
import {Box} from '@mui/material';
import {Slider} from '@mui/material';
// import ReactPaginate from 'react-paginate';

// function RangeSlider() {
//   cpnst [value, setValue] = useState([0, 100]);
//   const handleChange = (event) => {
//     setValue();
//   }
// }

const Buy = () => {

  const searchInputRef = useRef(null);
  // const minPriceFilterInputRef = useRef(null);
  // const maxPriceFilterInputRef = useRef(null);
  // const sortInputRef = useRef(null);

  // const filteredLocation = useState('');
  // const filteredSize = useState('');
  // const filteredMinPrice = useState('');
  // const filteredMaxPrice = useState('');

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
        const response = await axios.get('/properties_list/', {
        params: {
          page: currentPage,
          page_size: pageSize,
          search: searchQuery,
          // location: filteredLocation,
          min_price: minPriceFilter,
          max_price: maxPriceFilter,
          // size: filteredSize,
          ordering: sortBy,
        },
      });
      setPageCount(Math.trunc(response.data.count/pageSize) + 1);
      setProperties(response.data.results);
      setIsLoading(false);
    }
    catch (error) {
      console.error('Error fetching properties:', error);
      setError(error);
      setIsLoading(false);
    }
  }

  // const handlePageChange = (newPage) => {
  //   setCurrentPage(newPage);
  //   fetchProperties();
  // };

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

  // const handleMaxPriceFilterChange = () => {
  //   setMaxPriceFilter(maxPriceFilterInputRef.current.value);
  // }

  // const handleSortChange = (val) => {
  //   setSortBy(val);
  // }

  // useEffect(() => {
  //   fetch('http://127.0.0.1:8000/list/')
  //     .then(response => response.json())
  //     .then(data => {
  //       setProperties(data);
  //       setIsLoading(false);
  //     })
  //     .catch(error => {
  //       setError(error);
  //       setIsLoading(false);
  //     });
  // }, []);

  // const [filters, setFilters] = useState({});

  // const handlePriceFilterChange = (event) => {
  //   setFilters({ ...filters, priceRange: event.target.value });
  // }

  // const handlePageClick = (data) => {
  //   const newPage = (data.selected*propertyPerPage) % properties.length;
  //   setCurrentPage(data.selected + 1);
  // };
  const SearchBox = () => {
    return (
      <div className='input-group mb-3'>
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
        <button className='btn btn-secondary dropdown-toggle' type='button' id='sortDropdown' data-bs-toggle='dropdown' aria-expanded='false'>
          Sort By
        </button>
        <ul className='dropdown-menu' aria-labelledby='sortDropdown'>
          <li><button className='dropdown-item' onClick={() => setSortBy('')}>None</button></li>
          <li><button className='dropdown-item' onClick={() => setSortBy('price')}>Price (low to High)</button></li>
          <li><button className='dropdown-item' onClick={() => setSortBy('-price')}>Price (High to Low)</button></li>
        </ul>
      </div>
    )
  }

  const FilterBox = () => {
    return (
      <div className='card filter-card'>
        <div className='card-header'>
          <h5>Filter Properties</h5>
        </div>
        <div className='card-body'>
          <div className='filter-group'>
            <h6>Price Range (in Lakhs) :</h6>
            <Box sx={{ width: 300}}>
              <Slider
                value={[minPriceFilter, maxPriceFilter]}
                min={0}
                max={1000}
                onChange={handlePriceFilterChange}
                valueLabelDisplay='auto'
              />
            </Box>
            <span className='range-labels'>
              <span>Properties in {minPriceFilter}</span> - <span>{maxPriceFilter} Lakhs</span>
            </span>
            {/* <div className='filter-group'></div> */}
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className='container'>

      <div className='row text-center'>
        <h1>humm</h1>
      </div>

      <div className="row">

        <div className="col-md-4">
          <div className='row'>
            <SearchBox/>
          </div>
          <div className='row'>
            <FilterBox/>
          </div>
          
        </div>

        <div className='col-md-8' style={{height:'100vh', overflowY:'scroll'}}>
          <div>
            <SortButton />
          </div>

          <div>
            <span>Page {currentPage} of {pageCount} </span>
            <button onClick={handlePreviousPage}>Previous</button>
            <button onClick={handleNextpage}>Next</button>
          </div>

          <div>
            {isLoading && <p>Loading properties...</p>}
            {error && <p>Error: {error.message}</p>}
            {!isLoading && properties.length > 0 && (
              <div className="container">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
            {!isLoading && properties.length === 0 && <p>No properties found.</p>}
          </div>
        
        </div>
        
      </div>
      
      {/* <ReactPaginate
        previousLabel={'< Previous'}
        nextLabel={'Next >'}
        breakLabel={<a href="">...</a>}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassname={'pagination'}
        activeClassName={'active'}
      /> */}
      
    </div>
  );
};

export default Buy;