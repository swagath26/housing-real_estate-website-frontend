import { useEffect, useState, useContext } from "react";
import axios from "axios";
import getCookie from './getCookie';
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import './SellHome.css'

const SellHome = () => {

    const navigate = useNavigate();
    const isAuthenticated = useContext(AuthContext).isAuthenticated;
    
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    
    const [price, setPrice] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');

    const [balcony, setBalcony] = useState(false);
    const [area, setArea] = useState('');
    const [homeType, setHomeType] = useState('');
    
    const [images, setImages] = useState([]);
    const handleImageUpload = (event) => {
        const newImages = [...images, ...event.target.files]
        setImages(newImages);
    }

    const csrftoken = getCookie('csrftoken');

    const handleSubmitForm = async () => {
        const formData = new FormData();
        formData.append('location', location);
        formData.append('address', address);
        formData.append('description', description);

        formData.append('price', price);
        formData.append('bedrooms', bedrooms);
        formData.append('bathrooms', bathrooms);

        formData.append('balcony', balcony);
        formData.append('area', area);
        formData.append('home_type', homeType);
        
        images.forEach((image, index) => {
            formData.append('images', image, `images[${index}]`);
        });

        try {
            const response = await axios.post('/api/add/', formData, {headers: { 'X-CSRFToken': csrftoken }});
            if(response.data.success) {
                navigate('/sell');
            }
            else {
                console.log(response.data.errors);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const [isAddNav, setIsAddNav] = useState(false);

    useEffect(() => {
        const basicDetails = document.getElementById('basic-details');
        const addDetails = document.getElementById('add-details');
        if(isAddNav) {
            basicDetails.style.display = 'none';
            addDetails.style.display = 'block';
        }
        else {
            addDetails.style.display = 'none';
            basicDetails.style.display = 'block';
        }
    }, [isAddNav])

    useEffect(() => {
        if(!isAuthenticated)
            window.bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast')).show();
    }, [])

    
    return (
        <div className="container mb-2">
            <div className="row">
                <h1 className="d-flex justify-content-center" style={{fontFamily:'serif'}}>Post for a Sale by Owner Listing</h1><br/>
                <div className="col-xxl-6 py-3 pt-4">
                    <img src="/static/img/sell-property2.jpg" alt="sell home" style={{maxWidth:'100%'}}/>
                </div>

                <div className="col-xxl-6 py-3">

                    <ul className="row nav nav-underline mb-3">
                        <li className='col-auto nav-item ps-4 px-2'>
                            <button className={`fs-6 nav-link ${!isAddNav ? 'active' : ''}`} id="basic-nav" style={{fontWeight:'600', color:'#222222', cursor:'pointer'}} onClick={() => {
                                setIsAddNav(false);
                            }}>Enter Basic Details</button>
                        </li>
                        <li className='col-auto nav-item ps-4 pe-2'>
                            <button className={`fs-6 nav-link ${isAddNav ? 'active' : ''}`} id="add-nav" style={{fontWeight:'600', color:'#222222', cursor:'pointer'}} onClick={() => {
                                document.getElementById('basic-details').classList.add('was-validated');
                                if(document.getElementById('basic-details').checkValidity()) {
                                    setIsAddNav(true);
                                }
                            }}>Additional Details</button>
                        </li>
                    </ul>

                    <form id="basic-details" className="sell-form needs-validation" noValidate>
                        <div className="row m-0">
                            <div className={`d-flex form-group-sellpage ${location ? 'filled' : ''} m-2 p-0`}>
                                <input type="text" className="form-control form-control-sellpage" style={{width:'50%'}} id="location" value={location} onChange={(event) => {setLocation(event.target.value)}} required/>
                                <label htmlFor="location" className="sellpage-label px-0">Location</label>
                                <div className="invalid-feedback mx-2 p-2" style={{width:'30%'}}>
                                    Invalid Location
                                </div>
                            </div>
                        </div>

                        <div className="row m-0">
                            <div className={`form-group-sellpage ${address ? 'filled' : ''} m-2 p-0`}>
                                <input type="text" className="form-control form-control-sellpage" style={{width:'90%'}} id="address" value={address} onChange={(event) => {setAddress(event.target.value)}} required/>
                                <label htmlFor="address" className="sellpage-label">Street Address</label>
                                <div className="invalid-feedback ps-2">
                                    Invalid address
                                </div>
                            </div>
                        </div>

                        <div className="row m-0">
                            <div className={`form-group-sellpage ${bedrooms ? 'filled' : ''} m-2 p-0`} style={{width:'40%'}} >
                                <input type="number" className="form-control form-control-sellpage" style={{width:'100%'}} id="bedrooms" value={bedrooms} onChange={(event) => {setBedrooms(event.target.value)}} required/>
                                <label htmlFor="bedrooms" className="sellpage-label">Bedrooms</label>
                                <div className="invalid-feedback ps-2">
                                    Provide a valid number
                                </div>
                            </div>

                            <div className={`form-group-sellpage ${bathrooms ? 'filled' : ''} m-2 p-0`} style={{width:'40%'}} >
                                <input type="number" className="form-control form-control-sellpage" style={{width:'100%'}} id="bathrooms" value={bathrooms} onChange={(event) => {setBathrooms(event.target.value)}} required/>
                                <label htmlFor="bathrooms" className="sellpage-label">Bathrooms</label>
                                <div className="invalid-feedback ps-2">
                                    Provide a valid number
                                </div>
                            </div>
                        </div>

                        <div className="row m-0">
                            <div className="input-group m-2 p-0 d-flex align-items-center">
                                <label className="input-text p-2" style={{color:'#555555'}} htmlFor="images">Upload Images</label>
                                <input type="file" multiple className="form-control" id="images" onChange={handleImageUpload} required/>
                                <div className="invalid-feedback ps-2">
                                    Upload atleast an image
                                </div>
                            </div>
                        </div>

                        <div className="row m-0">
                            <div className="form-check form-check-reverse d-flex align-items-center m-2 p-0" style={{width:'50%'}} >
                                <label className="form-check-label p-1 ps-3" htmlFor="balcony" style={{color:'#555555'}}>
                                    Balcony
                                </label>
                                <input className="form-check-input m-2 ms-3 ps-2" type="checkbox" onChange={(event) => {setBalcony(event.target.checked)}} id="balcony" style={{borderColor:'#bbbbbb', scale:'1.25'}}/>
                            </div>

                            <div className='m-2 p-0 d-flex justify-content-center align-items-center' style={{width:'40%'}} >
                                <button type="button" className="btn btn-success" id="continue-button" onClick={() => {
                                    document.getElementById('basic-details').classList.add('was-validated');
                                        if(document.getElementById('basic-details').checkValidity()) {
                                            setIsAddNav(true);
                                        }
                                    }}>
                                    Continue
                                </button>
                            </div>
                        </div>
                    </form>


                    <form style={{display:'none'}} id="add-details"className="sell-form needs-validation" noValidate>
                        <div className="row m-0">
                            <div className={`form-group-sellpage ${description ? 'filled' : ''} m-2 p-0`}>
                                <textarea type="text" className="form-control-sellpage" style={{width:'60%'}} id="description" value={description} onChange={(event) => {setDescription(event.target.value)}}/>
                                <label htmlFor="description" className="sellpage-label">Add Description</label>
                            </div>
                        </div>

                        <div className="row m-0">
                            <div className={`input-group form-group-sellpage ${area ? 'filled' : ''} m-2 p-0`} style={{width:'40%', minWidth:'200px'}} >
                                <input type="number" className="form-control-sellpage" style={{width:'60%', height:'40px'}} id="area" value={area} onChange={(event) => {setArea(event.target.value)}}/>
                                <label htmlFor="area" className="sellpage-label">Area</label>
                                <span className="input-group-text" style={{height:'40px'}}>Sqft</span>
                            </div>

                            <div className="input-group m-2 p-0" style={{width:'50%', minWidth:'300px'}}>
                                <label className="input-group-text p-0 d-flex justify-content-center" htmlFor="hometype" style={{width:'40%', minWidth:'100px'}}>Home Type</label>
                                <select className="form-control-sellpage m-0 py-0" style={{width:'60%', height:'40px'}} id="hometype">
                                    <option defaultValue={''}>Choose...</option>
                                    <option value="1">House</option>
                                    <option value="2">Apartment</option>
                                    <option value="3">Studio</option>
                                    <option value="3">Multi-Family</option>
                                </select>
                            </div>
                        </div>


                        <div className="row m-0">
                            <label className="px-3 p-1 pb-3" style={{color:'#555555'}} htmlFor="date_of_availability">Available On</label>
                            <input type="date" className="form-control-sellpage mx-2 p-2 ps-3" id="date_of_availability"style={{width:'40%'}}/>

                            <div className="form-check form-check-reverse d-flex ms-2 p-0" style={{width:'50%'}} >
                                <label className="form-check-label p-1 ps-3" htmlFor="ready_to_move" style={{color:'#555555'}}>
                                    Ready To Move
                                </label>
                                <input className="form-check-input m-2 ms-3 ps-3" type="checkbox" id="ready_to_move" style={{borderColor:'#bbbbbb', scale:'1.25'}}/>
                            </div>
                        </div>

                        <div className="row m-0 my-2">
                            <label className="px-3 p-1 py-3" style={{color:'#555555'}} htmlFor="price">Your Price for the Property</label>
                            <div className="input-group" style={{width:'50%', height:'40px'}} >
                                <span className="input-group-text">INR</span>
                                <input type="number" className="form-control m-0" id="price" value={price} onChange={(event) => {setPrice(event.target.value)}} required/>
                                <div className="invalid-feedback ps-2">
                                    Provide a Price for your Property
                                </div>
                            </div>

                            <div className='ms-2 p-0 d-flex justify-content-center align-items-center' style={{width:'40%'}} >
                                <button type="submit" className="btn btn-primary" onClick={(event) => {
                                    document.getElementById('add-details').classList.add('was-validated');
                                    event.preventDefault();
                                    if(!isAuthenticated) {
                                        window.bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast')).show();
                                    }
                                    else if(document.getElementById('add-details').checkValidity()) {
                                        handleSubmitForm(event);
                                    }
                                    }}>
                                    List for Sale
                                </button>
                                
                            </div>
                        </div>
                    </form>
                </div>
                <div className="toast-container position-fixed bottom-0 end-0 p-3">
                    <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-body">
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                        </div>
                        <div className="d-flex justify-content-start p-2">
                            <b>Sign in to list your property..</b>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellHome;