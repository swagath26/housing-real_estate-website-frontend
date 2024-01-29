import { useState } from "react";
import axios from "axios";
import getCookie from './csrfToken';

const SellHome = () => {
    const [location, setLocation] = useState('');
    const handleLocationValue = (event) => {
        setLocation(event.target.value);
    }

    const [society, setSociety] = useState('');
    const handleSocietyValue = (event) => {
        setSociety(event.target.value);
    }

    const [areaType, setAreaType] = useState('');
    const handleAreaTypeValue = (event) => {
        setAreaType(event.target.value);
    }

    const [availability, setAvailability] = useState('');
    const handleAvailabilityValue = (event) => {
        setAvailability(event.target.value);
    }

    const [balcony, setBalcony] = useState(0);
    const handleBalconyValue = (event) => {
        setBalcony(event.target.value);
    }

    const [area, setArea] = useState(0);
    const handleAreaValue = (event) => {
        setArea(event.target.value);
    }

    const [price, setPrice] = useState(0);
    const handlePriceValue = (event) => {
        setPrice(event.target.value);
    }

    const [bathroom, setBathroom] = useState(0);
    const handleBathroomValue = (event) => {
        setBathroom(event.target.value);
    }

    const [size, setSize] = useState(0);
    const handleSizeValue = (event) => {
        setSize(event.target.value);
    }

    const [images, setImages] = useState([]);
    const handleImageUpload = (event) => {
        const newImages = [...images, ...event.target.files]
        setImages(newImages);
    }

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    function clearFields() {
        setLocation('');
        setSociety('');
        setAreaType('');
        setAvailability('');
        setBalcony(0);
        setBathroom(0);
        setSize(0);
        setSize(0);
        setArea(0);
        setImages([]);
    }

        // function getCookie(name) {
        //     let cookieValue = null;
        //     if (document.cookie && document.cookie !== '') {
        //         const cookies = document.cookie.split(';');
        //         for (let i = 0; i < cookies.length; i++) {
        //             const cookie = cookies[i].trim();
        //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
        //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        //                 break;
        //             }
        //         }
        //     }
        //     return cookieValue;
        // }
    
    const csrftoken = getCookie('csrftoken');

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('location', location);
        formData.append('society', society);
        formData.append('area', area);
        formData.append('area_type', areaType);
        formData.append('availability', availability);
        formData.append('size', size);
        formData.append('price', price);
        formData.append('bathrooms', bathroom);
        formData.append('balcony', balcony);
        images.forEach((image, index) => {
            formData.append('images', image, `images[${index}]`);
        });
        try {
            const response = await axios.post('/add/', formData, {headers: { 'X-CSRFToken': csrftoken }});
            console.log(response);
            setSuccessMessage(response.data.message);
            setErrorMessage(null);
            clearFields();
        }
        catch (error) {
            setErrorMessage(error.response.data.errors || 'Something went wrong!')
            console.log(error.response);
        }
    }

    const SellHomeForm = () => {
        return (
            <form>
                <div className="row p-2">
                    <div className="col-auto">
                    <label htmlFor="location" className="col-form-label">Location</label>
                    </div>
                    <div className="col-auto">
                    <input type="text" className="form-control" placeholder="Enter your location" id="location" value={location} onChange={handleLocationValue}/>
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-auto">
                    <label htmlFor="society" className="col-form-label">Society</label>
                    </div>
                    <div className="col-auto">
                    <input type="text" className="form-control" placeholder="Enter society name" id="society" value={society} onChange={handleSocietyValue}/>
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-auto">
                    <label htmlFor="size" className="col-form-label">Bedrooms</label>
                    </div>
                    <div className="col-auto">
                    <input type="text" className="form-control" placeholder="Number of bedrooms" id="size" value={size} onChange={handleSizeValue}/>
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-auto">
                    <label htmlFor="bathrooms" className="col-form-label">Bathrooms</label>
                    </div>
                    <div className="col-auto">
                    <input type="text" className="form-control" placeholder="Number of bathrooms" id="bathrooms" value={bathroom} onChange={handleBathroomValue}/>
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-auto">
                    <label htmlFor="area_type" className="col-form-label">Type of Area</label>
                    </div>
                    <div className="col-auto">
                    <input type="text" className="form-control" placeholder="Type of Area" id="area_type" value={areaType} onChange={handleAreaTypeValue}/>
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-auto">
                    <label htmlFor="area" className="col-form-label">Area</label>
                    </div>
                    <div className="col-auto">
                    <input type="text" className="form-control" placeholder="Area in sqft" id="area" value={area} onChange={handleAreaValue}/>
                    </div>
                </div>

                <label htmlFor="availability">Availability</label>
                <input type="text" id="availability" value={availability} onChange={handleAvailabilityValue}></input><br/>

                <label htmlFor="balcony">Balcony</label>
                <input type="number" id="balcony" value={balcony} onChange={handleBalconyValue}></input><br/>

                <label htmlFor="price">Price</label>
                <input type="number" id="price" value={price} onChange={handlePriceValue}></input><br/>

                <label htmlFor="image">Upload Image</label>
                <input type="file" id="images" multiple onChange={handleImageUpload}></input><br/><br/>
    
                {errorMessage && <div>{errorMessage}</div>}
                {successMessage && <div>{successMessage}Uploaded</div>}

                <div className="row p-2 g-2">
                    <div className="col-auto">
                    <input type="checkbox" className="form-check-input" id="rememberme" />
                    </div>
                    <div className="col-auto">
                    <label htmlFor="rememberme" className="form-check-label">Remember me</label>
                    </div>
                    <div className="col-auto">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmitForm}>Add</button>
                    </div>
                </div>
                
            </form>
        )
    }
    return (
        <div>
            <h1>Add your property</h1><br/>
            <SellHomeForm />
        </div>
    )
}

export default SellHome;