import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './Buy.css';

const Buy = () => {

  const params = useParams();
  const [properties, setProperties] = useState([]);
  const [propertyCount, setPropertyCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [showCurrentPage, setShowCurrentPage] = useState(1);
  const pageSize = 40;
  const [pageCount, setPageCount] = useState(1);

  const [searchQuery, setSearchQuery] = useState(params.search_query? params.search_query : '' );
  const [sortBy, setSortBy] = useState('');

  const [minPriceFilter, setMinPriceFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');
  const [minAreaFilter, setMinAreaFilter] = useState('');
  const [maxAreaFilter, setMaxAreaFilter] = useState('');
  const [bedsFilter, setBedsFilter] = useState([]);
  const [minBedsFilter, setMinBedsFilter] = useState('');
  const [minBathsFilter, setMinBathsFilter] = useState('');
  const [homeTypefilter, setHomeTypeFilter] = useState([]);

  const [minLatFilter, setMinLatFilter] = useState();
  const [maxLatFilter, setMaxLatFilter] = useState();
  const [minLngFilter, setMinLngFilter] = useState();
  const [maxLngFilter, setMaxLngFilter] = useState();

  const [map, setMap] = useState(null);
  const [markers] = useState({});

  const [center, setCenter] = useState([12.98, 77.58]);
  const [zoom, setZoom] = useState(11);

  const [refetch, setRefetch] = useState(false);
  const abortController = useRef(null);

  const [isMapToggled, setIsMapToggled] = useState(true);
  const [isMapOpen, setIsMapOpen] = useState(true);

  const [filterPrice, setFilterPrice] = useState('Price');
  const [filterBeds, setFilterBeds] = useState('Beds');
  const [filterBaths, setFilterBaths] = useState('Baths');
  const [filterArea, setFilterArea] = useState('Area');
  const [filterHomeType, setFilterHomeType] = useState('Type');

  const [selectedPropertyView, setSelectedPropertyView] = useState(null);
  const [prevSelectedPropertyView, setPrevSelectedPropertyView] = useState(null);

  const icon_std = window.L.icon({
    iconUrl: "/static/img/map_icon_std.png",
    shadowUrl: "/static/img/map_icon_shadow.png",
    iconSize: [14, 14],
    shadowSize: [16, 16],
  })

  const icon_hover = window.L.icon({
    iconUrl: "/static/img/map_icon_hover.png",
    shadowUrl: "/static/img/map_icon_shadow.png",
    iconSize: [14, 14],
    shadowSize: [16, 16],
  })

  const icon_select = window.L.icon({
    iconUrl: "/static/img/map_icon_hover.png",
    shadowUrl: "/static/img/map_icon_shadow.png",
    iconSize: [20, 20],
    shadowSize: [23, 23],
  })

  const throttle = (fn, interval) => {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= interval) {
        lastCall = now;
        fn(...args);
      }
    };
  }
  
  const debounce = (fn, interval) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), interval);
    };
  }

  const handleMapFilter = () => {
    setMinLatFilter(map.getBounds()._southWest.lat);
    setMaxLatFilter(map.getBounds()._northEast.lat);
    setMinLngFilter(map.getBounds()._southWest.lng);
    setMaxLngFilter(map.getBounds()._northEast.lng);
  }

  const fetchProperties = async () => {
    const controller = new AbortController();
    abortController.current = controller;
    try {
      setIsLoading(true);
      const response = await axios.get('/api/properties_list/', {
        params: {
          page: currentPage,
          ordering: sortBy,
          min_lat: minLatFilter,
          max_lat: maxLatFilter,
          min_lng: minLngFilter,
          max_lng: maxLngFilter,
          min_price: minPriceFilter,
          max_price: maxPriceFilter,
          min_area: minAreaFilter,
          max_area: maxAreaFilter,
          beds: bedsFilter.join(','),
          min_bed: minBedsFilter,
          min_bath: minBathsFilter,
          type: homeTypefilter.join(',')

        },
        signal: controller.signal,
      });
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
      else {
        setIsLoading(false);
        abortController.current = null;
        setRefetch(true);
      }
    }
  };

  const handleMapToggle = () => {

    map && console.log(map.getBounds());

    if ((document.getElementById('map-collapse') != null) && (document.getElementById('property-section') != null)) {

      const map_collapse = document.getElementById('map-collapse');
      const property_section = document.getElementById('property-section');

      if (window.matchMedia('(max-width: 992px)').matches) {

        if(isMapToggled) {
          map_collapse.style.display = 'block';
          setIsMapOpen(true);
          property_section.style.display = 'none';
        }
        else {
          map_collapse.style.display = 'none';
          setIsMapOpen(false);
          property_section.style.display = 'block';
        }
      }
      else {
        map_collapse.style.display = 'block';
        setIsMapOpen(true);
        property_section.style.display = 'block';
      }
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

  const geocodeLocation = (searchText) => {
    const encodedText = encodeURIComponent(searchText);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedText}&format=json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const firstResult = data[0];
                const lat = firstResult.lat;
                const lng = firstResult.lon;
                setCenter([lat,lng]);
                setZoom(12);
            } else {
                console.log("No results found for:", searchText);
            }
        })
        .catch(error => {
            console.error("Error fetching geocode data:", error);
        });
  }

  const handleSearchChange = () => {
    geocodeLocation(searchQuery);
  };

  const clearFilters = () => {
    setMinPriceFilter('');
    setMaxPriceFilter('');
    setMinAreaFilter('');
    setMaxAreaFilter('');
    setMinBedsFilter('');
    setMinBathsFilter('');
    setHomeTypeFilter([]);
    setBedsFilter([]);
    setFilterPrice('Price');
    setFilterBaths('Baths');
    setFilterBeds('Beds');
    setFilterArea('Area');
    setFilterHomeType('Type');
    fetchProperties();
  }

  window.matchMedia('(max-width: 992px)').addEventListener('change', handleMapToggle);

  useEffect(() => {
    handleMapToggle();
  }, [isMapToggled])

  useEffect (() => {
    const list_section = document.getElementById("list-section");
    isLoading ? list_section.style.opacity = 0.5 : list_section.style.opacity = 1;
  }, [isLoading]);

  useEffect(() => {
    if (params.search_query)
      geocodeLocation(params.search_query)
  }, []);

  useEffect(() => {

    async function initMap() {
      const map_obj = window.L.map('map', {
        center: center,
        zoom: zoom
      });

      window.L.maptilerLayer({
        apiKey: 'cIpY5YW2swGKoC5mFkdK',
        style: window.L.MaptilerStyle.STREETS,
      }).addTo(map_obj);

      setMap(map_obj);
    }

    initMap();
  }, []);
  

  useEffect(() => {
    if(map) {
        handleMapFilter();
        const centerThrottledHandler = throttle(handleMapFilter, 1000);
        map.addEventListener('move', centerThrottledHandler);
        const zoomThrottledHandler = debounce(handleMapFilter, 1000);
        map.addEventListener('zoom', zoomThrottledHandler);
    }
  }, [map])


  useEffect(() => {
    if(!isLoading) {
        fetchProperties();
    }
    else if(abortController.current) {
      abortController.current.abort();
    }
  }, [currentPage, sortBy, minLatFilter, maxLatFilter, minLngFilter, maxLngFilter]);


  useEffect(() => {
    if(refetch) {
      setRefetch(false);
      fetchProperties();
    }
  }, [refetch])

  useEffect(() => {
    if (!isLoading && isMapOpen) {
      for(let key in markers)
        markers[key].remove();
      properties.forEach(property => {
        if (property.latitude && property.longitude) {
          let new_marker = window.L.marker(
            [parseFloat(property.latitude), parseFloat(property.longitude)], 
            {icon: icon_std}
          ).addTo(map);
          new_marker.bindPopup(property.price)
          markers[property.id] = new_marker;
        }
      });
    }
  }, [properties, isMapOpen]);

  useEffect(() => {
    if(map) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  useEffect(() => {
    if(prevSelectedPropertyView) {
      markers[prevSelectedPropertyView.id].setIcon(icon_std);
    }
  }, [prevSelectedPropertyView]);

  useEffect(() => {
    if(selectedPropertyView) {
      const currentPosition = ([parseFloat(selectedPropertyView.latitude), parseFloat(selectedPropertyView.longitude)]);
      setCenter(currentPosition);
      setZoom(16)
      markers[selectedPropertyView.id].setIcon(icon_hover);
    }
  }, [selectedPropertyView])

  useEffect(() => {
    document.getElementById('search-input').addEventListener('keypress', (event) => {
      if(event.key == 'Enter') {
        event.preventDefault();
        geocodeLocation(event.target.value);
      }
    })
  }, []);


  const PropertyCard = ({ property}) => {
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
            selectedPropertyView!=property && markers[property.id] && markers[property.id].setIcon(icon_select)}
          }
          onMouseLeave={() => {
            selectedPropertyView!=property && markers[property.id] && markers[property.id].setIcon(icon_std)}
          }
        >

          <div className='card-top-section'>

            <div className="row m-0 p-0 pt-1" style={{position:'absolute', zIndex:'1', width:'100%'}}>
              <div className='col-10 px-1'>
                <div className='rounded-3 px-2' style={{backgroundColor:'rgba(0,0,0,0.7)', color:'#f0f0f0', fontSize:'13px', display:'inline-block'}}>
                  {property.area_type}
                </div>
              </div>
              <div className='col-2' >
                <a className='favourites-icon' id={`fav_${property.id}`} style={{display:'inline-block'}}>
                  <img src="/static/img/fav-logo.png"/>
                </a>
              </div>
            </div>
  
            <div id={`property_${property.id}`} className="carousel slide" style={{zIndex:'0'}}>
              <div className="carousel-inner">
  
                {property.images && 
                property.images.map((image, index) => (
                <div className={index==0 ? 'carousel-item active' : 'carousel-item'} key={index}>
                  <img className='w-100 object-fit-cover card-img' style={{height:'160px', overflow:'hidden'}} 
                  src={image.image}
                  alt={`Property Image ${index+1}`} />
                </div>
                ))}
  
              </div>
  
              <div>
                <button className="carousel-controls carousel-control-prev" type="button" data-bs-target={`#property_${property.id}`} data-bs-slide="prev">
                  <FontAwesomeIcon icon={faAngleLeft} style={{fontSize:'30px'}} />
                </button>
  
                <button className="carousel-controls carousel-control-next" type="button" data-bs-target={`#property_${property.id}`} data-bs-slide="next">
                  <FontAwesomeIcon icon={faAngleRight} style={{fontSize:'30px'}} />
                </button>
              </div>
  
            </div>
  
          </div>
        
          <div className="card-body p-2" style={{height:'130px'}}>
            <div className='row mb-2'>
              <div className='col-7'>
                <h5 className='card-title fw-bold m-0'>{IndianRupeeFormatter.format(property.price)}</h5>
              </div>
              <div className='col-5 d-flex justify-content-center'>
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
              <p style={{fontSize:'13px', margin:'0'}}>Listing by: {property.user_first_name} {property.user_last_name}
              </p>
            </div>
          </div>
        </div>
    );
  };

  const SortButton = () => {
    return (
      <div className='dropdown'>
        <button className='btn text-nowrap dropdown-toggle' type='button' id='sortDropdown' data-bs-toggle='dropdown' aria-expanded='false'>
          Sort: {
          (sortBy == '' && 'Default') ||
          (sortBy == 'price' && 'Price (Low to High)') ||
          (sortBy == '-price' && 'Price (High to Low)')
          }
        </button>
        <ul className='dropdown-menu' aria-labelledby='sortDropdown'>
          <li><button className='dropdown-item' onClick={() => setSortBy('')}>Default</button></li>
          <li><button className='dropdown-item' onClick={() => setSortBy('price')}>Price (Low to High)</button></li>
          <li><button className='dropdown-item' onClick={() => setSortBy('-price')}>Price (High to Low)</button></li>
        </ul>
      </div>
    )
  }

  const [isExactMatchBeds, setIsExactMatchBeds] = useState(false);
  useEffect(() => {
    isExactMatchBeds ? setMinBedsFilter('') : setBedsFilter([]);
  }, [isExactMatchBeds])
  
  const BedsFilterBox = () => {
    
    return (
      <div className='card'>
        <div className='card-header'>
          <h6>Number of Bedrooms</h6>
        </div>
        <div className='card-body'>
          <div className='row mb-1 m-0' hidden={!isExactMatchBeds}>
            <div className='col px-2'>
              <input type="checkbox" className="btn-check" id="bed1" checked={bedsFilter.includes(1)} onChange={(event) => {
                setBedsFilter(event.target.checked ? [...bedsFilter, 1] : bedsFilter.filter((n) => n != 1));
              }} />
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed1">1</label>
            </div>

            <div className='col px-2'>
              <input type="checkbox" className="btn-check" id="bed2" checked={bedsFilter.includes(2)} onChange={(event) => {
                setBedsFilter(event.target.checked ? [...bedsFilter, 2] : bedsFilter.filter((n) => n != 2));
              }}/>
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed2">2</label>
            </div>

            <div className='col px-2'>
              <input type="checkbox" className="btn-check" id="bed3" checked={bedsFilter.includes(3)} onChange={(event) => {
                setBedsFilter(event.target.checked ? [...bedsFilter, 3] : bedsFilter.filter((n) => n != 3));
              }}/>
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed3">3</label>
            </div>

            <div className='col px-2'>
              <input type="checkbox" className="btn-check" id="bed4" checked={bedsFilter.includes(4)} onChange={(event) => {
                setBedsFilter(event.target.checked ? [...bedsFilter, 4] : bedsFilter.filter((n) => n != 4));
              }}/>
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed4">4</label>
            </div>

            <div className='col px-2'>
              <input type="checkbox" className="btn-check" id="bed5" checked={bedsFilter.includes(5)} onChange={(event) => {
                setBedsFilter(event.target.checked ? [...bedsFilter, 5] : bedsFilter.filter((n) => n != 5));
              }}/>
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed5">5</label>
            </div>
          </div>

          <div className='row mb-1 m-0' hidden={isExactMatchBeds}>
            <div className='col px-2'>
              <input type="radio" className="btn-check" name='bedrooms' id="bed1+" checked={minBedsFilter==1} onChange={(event) => {
                setMinBedsFilter(event.target.checked ? 1 : null)}}/>
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed1+">1+</label>
            </div>
            <div className='col px-2'>
              <input type="radio" className="btn-check" name='bedrooms' id="bed2+" checked={minBedsFilter==2} onChange={(event) => {
                setMinBedsFilter(event.target.checked ? 2 : null)}}/>
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed2+">2+</label>
            </div>
            <div className='col px-2'>
              <input type="radio" className="btn-check" name='bedrooms' id="bed3+" checked={minBedsFilter==3} onChange={(event) => {
                setMinBedsFilter(event.target.checked ? 3 : null)}}/>
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed3+">3+</label>
            </div>
            <div className='col px-2'>
              <input type="radio" className="btn-check" name='bedrooms' id="bed4+" checked={minBedsFilter==4} onChange={(event) => {
                setMinBedsFilter(event.target.checked ? 4 : null)}}/>
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed4+">4+</label>
            </div>
            <div className='col px-2'>
              <input type="radio" className="btn-check" name='bedrooms' id="bed5+" checked={minBedsFilter==5} onChange={(event) => {
                setMinBedsFilter(event.target.checked ? 5 : null)}}/>
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed5+">5+</label>
            </div>
          </div>

          <div className='row my-2 m-0 ps-2'>
            <div className='form-check'>
              <input className='form-check-input' type='checkbox' id='useexactmatch' checked={isExactMatchBeds} onChange={() => {setIsExactMatchBeds(!isExactMatchBeds)}}/>
              <label className='form-check-label' htmlFor='useexactmatch'>Use Exact Match</label>
            </div>
          </div>
          
          <div className='row my-1 m-0'>
            <button className='btn btn-primary' onClick={() => {
              if(minBedsFilter != '')
                setFilterBeds(`${minBedsFilter}+ bds`)
              else if(bedsFilter.length > 0)
                setFilterBeds(`${bedsFilter.sort().join(', ')} bds`)
              else
                setFilterBeds('Beds')
              fetchProperties()}}>
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
          <h6>Number of Bathrooms</h6>
        </div>
        <div className='card-body'>
          <div className='row mb-1 m-0'>
            <div className='col px-2'>
              <input type="radio" className="btn-check" id="bath1+" name='bathroms' checked={minBathsFilter==1} onChange={(event) => {
                setMinBathsFilter(event.target.checked ? 1 : null)}} />
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bath1+">1+</label>
            </div>

            <div className='col px-2'>
              <input type="radio" className="btn-check" id="bath2+" name='bathroms' checked={minBathsFilter==2} onChange={(event) => {
                setMinBathsFilter(event.target.checked ? 2 : null)}} />
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bath2+">2+</label>
            </div>

            <div className='col px-2'>
              <input type="radio" className="btn-check" id="bath3+" name='bathroms' checked={minBathsFilter==3} onChange={(event) => {
                setMinBathsFilter(event.target.checked ? 3 : null)}} />
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bath3+">3+</label>
            </div>

            <div className='col px-2'>
              <input type="radio" className="btn-check" id="bath4+" name='bathroms' checked={minBathsFilter==4} onChange={(event) => {
                setMinBathsFilter(event.target.checked ? 4 : null)}} />
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bath4+">4+</label>
            </div>

            <div className='col px-2'>
              <input type="radio" className="btn-check" id="bath5+" name='bathroms' checked={minBathsFilter==5} onChange={(event) => {
                setMinBathsFilter(event.target.checked ? 5 : null)}} />
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bath5+">5+</label>
            </div>
          </div>
          
          <div className='row my-1 mt-3 m-0'>
            <button className='btn btn-primary' data-bs-dismiss='dropdown' data-bs-target='#baths-dropdown' onClick={() => {
              if(minBathsFilter != '')
                setFilterBaths(`${minBathsFilter}+ baths`)
              else
                setFilterBaths('Baths')
              fetchProperties()}}>
              Apply
            </button>
          </div>
        </div>
      </div>
    )
  }

  const HomeTypeFilterBox = () => {
    return (
        <div className="card" style={{maxWidth:'320px'}}>
          <div className='card-header'>
            <h6>Home Type</h6>
          </div>
          <div className='card-body'>
            <div className='row mb-1'>
              <div className='form-check'>
                <input type="checkbox" className="form-check-input" id="houses" checked={homeTypefilter.includes('Houses')} onChange={(event) => {
                setHomeTypeFilter(event.target.checked ? [...homeTypefilter, 'Houses'] : homeTypefilter.filter((n) => n != 'Houses'));
              }}/>
                <label className='form-check-label' htmlFor="houses">Houses</label>
              </div>

              <div className='form-check'>
                <input type="checkbox" className="form-check-input" id="apartments" checked={homeTypefilter.includes('Apartments')} onChange={(event) => {
                setHomeTypeFilter(event.target.checked ? [...homeTypefilter, 'Apartments'] : homeTypefilter.filter((n) => n != 'Apartments'));
              }}/>
                <label htmlFor="apartments">Apartments</label>
              </div>

              <div className='form-check'>
                <input type="checkbox" className="form-check-input" id="condos" checked={homeTypefilter.includes('Condos/Co-ops')} onChange={(event) => {
                setHomeTypeFilter(event.target.checked ? [...homeTypefilter, 'Condos/Co-ops'] : homeTypefilter.filter((n) => n != 'Condos/Co-ops'));
              }} />
                <label htmlFor="condos">Condos/Co-ops</label>
              </div>

              <div className='form-check'>
                <input type="checkbox" className="form-check-input" id="multi"  checked={homeTypefilter.includes('Multi-family')} onChange={(event) => {
                setHomeTypeFilter(event.target.checked ? [...homeTypefilter, 'Multi-family'] : homeTypefilter.filter((n) => n != 'Multi-family'));
              }}/>
                <label htmlFor="multi">Multi-family</label>
              </div>
            </div>
                        
            <div className='row my-1'>
              <button className='btn btn-primary' onClick={() => {
                if(homeTypefilter.length > 0)
                  setFilterHomeType(`Type (${homeTypefilter.length})`)
                else
                setFilterHomeType('Type')
                fetchProperties()}}>
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
          <div className='col-lg-10 col-8 p-0'>
            <div className='input-group'>
              <input type='text' id="search-input" value={searchQuery} onChange={(event) => {setSearchQuery(event.target.value)}} className='form-control' placeholder='Search by location, address, etc.' aria-label='Search' aria-describedby='search-addon'/>
              <button onClick={handleSearchChange} className='btn btn-outline-secondary' id='search-addon'>
                <i className='fas fa-search'></i>
              </button>
            </div>
          </div>

          <div className='col-2 px-2' id='map-toggle-button'>
            <button className='btn btn-outline-dark' onClick={() => {setIsMapToggled(!isMapToggled)}}>{isMapToggled ? 'List' : 'Map' }</button>
          </div>

          <div className='col-2 px-0 ps-2 d-flex justify-content-center'>
            <button className='btn btn-outline-dark' style={{width:'100%'}} id='filter-toggle-button' data-bs-toggle='collapse' data-bs-target='#filter-collapse'>Filter</button>
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
          <div className='filter-row d-flex align-items-center'>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn btn-text-nowrap dropdown-toggle' style={{width:'85%'}} data-bs-toggle='dropdown' data-bs-auto-close="outside" aria-expanded='false'>
                {filterPrice}
              </button>
              <div className="dropdown-menu m-0 p-0">
                <div className='card' style={{maxWidth:'320px'}}>
                  <div className='card-header'>
                    <h6>Price Range (in Rs)</h6>
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
                        <input className='ms-4 ps-2 filter-input' placeholder='No Min' id='min-price' value={minPriceFilter} onChange={(event) => {setMinPriceFilter(event.target.value)}} style={{maxWidth:'110px'}} />
                      </div>
                      <div className='col-2 d-flex justify-content-center'>
                        <p>-</p>
                      </div>
                      <div className='col-5 d-flex justify-content-center'>
                        <input className='me-4 ps-2 filter-input' placeholder='No Max' id='max-price' value={maxPriceFilter} onChange={(event) => {setMaxPriceFilter(event.target.value)}} style={{maxWidth:'110px'}} />
                      </div>
                    </div>
                    <div className='row'>
                      <button className='btn btn-primary' onClick={() => {
                        setFilterPrice(minPriceFilter && maxPriceFilter ? 
                          `Rs ${minPriceFilter/100000}L - ${maxPriceFilter/100000}L` : 
                          (minPriceFilter ?
                            `Rs ${minPriceFilter/100000}L+` :
                            (maxPriceFilter ?
                              `Upto Rs ${maxPriceFilter/100000}L` :
                              'Price'))
                        );
                        fetchProperties()}}>
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn btn-text-nowrap dropdown-toggle' style={{width:'85%'}} data-bs-toggle='dropdown' data-bs-auto-close="outside" aria-expanded='false'>
                {filterBeds}
              </button>
                <div className="dropdown-menu m-0 p-0">
                  <BedsFilterBox/>
                </div>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn btn-text-nowrap dropdown-toggle' style={{width:'85%'}} data-bs-toggle='dropdown' data-bs-auto-close="outside" aria-expanded='false'>
                {filterBaths}
              </button>
                <div className="dropdown-menu m-0 p-0" id='baths-dropdown'>
                  <BathsFilterBox/>
                </div>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn btn-text-nowrap dropdown-toggle' style={{width:'85%'}} data-bs-toggle='dropdown' data-bs-auto-close="outside" aria-expanded='false'>
                {filterArea}
              </button>
                <div className="dropdown-menu m-0 p-0">
                  <div className='card' style={{maxWidth:'320px'}}>
                    <div className='card-header'>
                      <h6>Area in Sqft</h6>
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
                          <input className='ms-4 ps-2 filter-input' placeholder='No Min' id='min-area' value={minAreaFilter} onChange={(event) => {setMinAreaFilter(event.target.value)}} style={{maxWidth:'110px'}} />
                        </div>
                        <div className='col-2 d-flex justify-content-center'>
                          <p>-</p>
                        </div>
                        <div className='col-5 d-flex justify-content-center'>
                          <input className='me-4 ps-2 filter-input' placeholder='No Max' id='max-area' value={maxAreaFilter} onChange={(event) => {setMaxAreaFilter(event.target.value)}} style={{maxWidth:'110px'}} />
                        </div>
                      </div>
                      <div className='row'>
                        <button className='btn btn-primary' onClick={() => {
                          setFilterArea(minAreaFilter && maxAreaFilter ? 
                            `${minAreaFilter} - ${maxAreaFilter} sqft` : 
                            (minAreaFilter ?
                              `${minAreaFilter} sqft+` :
                              (maxAreaFilter ?
                                `Upto ${maxAreaFilter} sqft` :
                                'Area'))
                          );
                          fetchProperties()}}>
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn btn-text-nowrap dropdown-toggle' style={{width:'85%'}} data-bs-toggle='dropdown' data-bs-auto-close="outside" aria-expanded='false'>
                {filterHomeType}
              </button>
                <div className="dropdown-menu m-0 p-0">
                  <HomeTypeFilterBox/>
                </div>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn text-nowrap' onClick={clearFilters} style={{width:'85%'}}>
                Clear
              </button>
            </div>
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
                  <div key={property.id} className='col-12 col-md-6 col-lg-12 col-xl-6 col-xxl-4 d-flex justify-content-center p-1'>
                    <PropertyCard property={property}  />
                  </div>
                ))}
              </div>

              <div className='row py-4 m-0'>
                <div className='col-4 d-flex justify-content-center'>
                  <button className='btn btn-primary' onClick={handlePreviousPage}>Previous</button>
                </div>
                <div className='col-4 px-0 d-flex justify-content-center align-items-center'>
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
              <p className="text-center text-muted">&copy; 2024 Housing</p>
            </div>
          </footer>
        
        </div>
        
      </div>
      
    </div>
  );
};

export default Buy;