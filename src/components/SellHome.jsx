import { useState } from "react";
import axios from "axios";
import getCookie from './getCookie';
import { useNavigate } from "react-router-dom";
import './SellHome.css'

const SellHome = () => {

    const navigate = useNavigate();
    
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    
    const [price, setPrice] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');

    const [balcony, setBalcony] = useState(false);
    const [area, setArea] = useState('');
    const [areaType, setAreaType] = useState('');

    const [dateOfAvailability, setDateOfAvailability] = useState(new Date());
    const [readyToMove, setReadyToMove] = useState(false);
    
    const [images, setImages] = useState([]);
    const handleImageUpload = (event) => {
        const newImages = [...images, ...event.target.files]
        setImages(newImages);
    }

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    function clearFields() {
        setLocation('');
        setAddress('');
        setDescription('');
        setPrice('');
        setBedrooms('');
        setBathrooms('');
        setBalcony(false);
        setArea('');
        setAreaType('');
        setDateOfAvailability(new Date());
        setReadyToMove(false);
        setImages([]);
    }

    const csrftoken = getCookie('csrftoken');

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('location', location);
        formData.append('address', address);
        formData.append('description', description);

        formData.append('price', price);
        formData.append('bedrooms', bedrooms);
        formData.append('bathrooms', bathrooms);

        formData.append('balcony', balcony);
        formData.append('area', area);
        formData.append('area_type', areaType);

        formData.append('date_of_availability', dateOfAvailability);
        formData.append('ready_to_move', readyToMove);
        
        images.forEach((image, index) => {
            formData.append('images', image, `images[${index}]`);
        });
        
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }

        try {
            const response = await axios.post('/api/add/', formData, {headers: { 'X-CSRFToken': csrftoken }});
            console.log(response);
            setSuccessMessage(response.data.message);
            setErrorMessage(null);
            navigate('/sell')
        }
        catch (error) {
            setErrorMessage(error.response.data.errors || 'Something went wrong!')
            console.log(error.response);
        }
    }

    
    return (
        <div className="container">
            <div className="row">
                <h1 className="d-flex justify-content-center" style={{fontFamily:'serif'}}>Post for a Sale by Owner Listing</h1><br/>
                <div className="col-6 py-4">
                    <img src="/static/img/sell-property.avif" alt="sell home image"/>
                </div>

                <div className="col-6 py-4">
                    <h5 className="p-0">Enter basic details </h5><br/>
                    <form hidden>
                        <div className="row m-0">
                            <div className={`form-group-sellpage ${location ? 'filled' : ''} m-2 p-0`}>
                                <input type="text" className="form-control-sellpage" style={{width:'60%'}} id="location" value={location} onChange={(event) => {setLocation(event.target.value)}} required/>
                                <label for="location" className="sellpage-label">Location</label>
                            </div>
                        </div>

                        <div className="row m-0">
                            <div className={`form-group-sellpage ${address ? 'filled' : ''} m-2 p-0`}>
                                <input type="text" className="form-control-sellpage" style={{width:'90%'}} id="address" value={address} onChange={(event) => {setAddress(event.target.value)}} required/>
                                <label for="address" className="sellpage-label">Street Address</label>
                            </div>
                        </div>

                            <div className="row m-0">
                                <div className={`form-group-sellpage ${bedrooms ? 'filled' : ''} m-2 p-0`} style={{width:'40%'}} >
                                    <input type="number" className="form-control-sellpage" style={{width:'100%'}} id="bedrooms" value={bedrooms} onChange={(event) => {setBedrooms(event.target.value)}} required/>
                                    <label for="bedrooms" className="sellpage-label">Bedrooms</label>
                                </div>

                                <div className={`form-group-sellpage ${bathrooms ? 'filled' : ''} m-2 p-0`} style={{width:'40%'}} >
                                    <input type="number" className="form-control-sellpage" style={{width:'100%'}} id="bathrooms" value={bathrooms} onChange={(event) => {setBathrooms(event.target.value)}} required/>
                                    <label for="bathrooms" className="sellpage-label">Bathrooms</label>
                                </div>
                            </div>

                            <div className="row m-0">
                                <div class="input-group m-2 p-0">
                                    <label class="input-text px-3 p-1 pb-3" style={{color:'#555555'}} for="images">Upload Images</label>
                                    <input type="file" multiple className="form-control" id="images" onChange={handleImageUpload} />
                                </div>
                            </div>

                            <div className="row m-0 mt-2">
                                <div class="form-check form-check-reverse d-flex ms-2 p-0" style={{width:'50%'}} >
                                    <label class="form-check-label p-1 ps-3" for="balcony" style={{color:'#555555'}}>
                                        Balcony
                                    </label>
                                    <input class="form-check-input m-2 ms-3 ps-3" type="checkbox" onChange={(event) => {setBalcony(event.target.checked)}} id="balcony" style={{borderColor:'#bbbbbb', scale:'1.25'}}/>
                                </div>

                                <div className='m-2 p-0 d-flex justify-content-center align-items-center' style={{width:'40%'}} >
                                    <button className="btn btn-success">
                                        Continue
                                    </button>
                                </div>
                            </div>
                    </form>

                    <form>
                        <div className="row m-0">
                            <div className={`form-group-sellpage ${description ? 'filled' : ''} m-2 p-0`}>
                                <textarea type="text" className="form-control-sellpage" style={{width:'60%'}} id="description" value={description} onChange={(event) => {setDescription(event.target.value)}} required/>
                                <label for="description" className="sellpage-label">Add Description</label>
                            </div>
                        </div>

                            <div className="row m-0">
                                <div className={`input-group form-group-sellpage ${area ? 'filled' : ''} m-2 p-0`} style={{width:'40%'}} >
                                    <input type="number" className="form-control-sellpage" style={{width:'60%'}} id="area" value={area} onChange={(event) => {setArea(event.target.value)}} required/>
                                    <label for="area" className="sellpage-label">Area</label>
                                    <span class="input-group-text">Sqft</span>
                                </div>

                                <div class="input-group m-2 p-0" style={{width:'40%'}}>
                                    <label class="input-group-text" for="inputGroupSelect01">Home Type</label>
                                    <select class="form-select" id="inputGroupSelect01">
                                        <option selected>Choose...</option>
                                        <option value="1">House</option>
                                        <option value="2">Apartment</option>
                                        <option value="3">Studio</option>
                                        <option value="3">Multi-Family</option>
                                    </select>
                                </div>
                            </div>


                        <div className="row m-0">
                            <label class="px-3 p-1 pb-3" style={{color:'#555555'}} for="date_of_availability">Available On</label>
                            <input type="date" className="form-control mx-2 p-2 ps-3" id="date_of_availability"style={{width:'40%'}} value={dateOfAvailability} onChange={(event) => {setDateOfAvailability(event.target.value)}}/>
                                                        
                                <div class="form-check form-check-reverse d-flex ms-2 p-0" style={{width:'50%'}} >
                                    <label class="form-check-label p-1 ps-3" for="balcony" style={{color:'#555555'}}>
                                        Ready To Move
                                    </label>
                                    <input class="form-check-input m-2 ms-3 ps-3" type="checkbox" onChange={(event) => {setBalcony(event.target.checked)}} id="balcony" style={{borderColor:'#bbbbbb', scale:'1.25'}}/>
                                </div>
                            
                        </div>

                        {errorMessage && <div>{errorMessage}</div>}
                        {successMessage && <div>{successMessage}Uploaded</div>}

                            <div className="row m-0 my-2">
                                <label class="px-3 p-1 py-3" style={{color:'#555555'}} for="price">Your Price for the Property</label>
                                
                                <div className="input-group" style={{width:'50%'}} >
                                    <span class="input-group-text">INR</span>
                                    <input type="number" className="form-control" id="price" value={price} onChange={(event) => {setPrice(event.target.value)}} required/>
                                </div>

                                <div className='m-2 p-0 d-flex justify-content-center align-items-center' style={{width:'40%'}} >
                                    <button type="submit" className="btn btn-primary" onClick={handleSubmitForm}>
                                        List for Sale
                                    </button>
                                </div>

                            </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SellHome;