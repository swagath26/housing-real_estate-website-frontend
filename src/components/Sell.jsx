import { useEffect, useState } from "react";
import axios from "axios";

const Sell = () => {
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

        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
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
        console.log(formData)
        try {
            const response = await axios.post('/add/', formData
            , {
                headers: { 'X-CSRFToken': csrftoken }
            }
            );
            setSuccessMessage(response.data.message);
            setErrorMessage(null);
            clearFields();
        }
        catch (error) {
            setErrorMessage(error.response.data.errors || 'Something went wrong!')
        }
    }

    return (
        <div>
            <h1>Add your property</h1><br/>

            <form >
                <label htmlFor="location">Location</label>
                <input type="text" id="location" value={location} onChange={handleLocationValue} /><br/>

                <label htmlFor="society">Society</label>
                <input type="text" id="society" value={society} onChange={handleSocietyValue}></input><br/>

                <label htmlFor="area_type">Area_type</label>
                <input type="text" id="area_type" value={areaType} onChange={handleAreaTypeValue}></input><br/>

                <label htmlFor="availability">Availability</label>
                <input type="text" id="availability" value={availability} onChange={handleAvailabilityValue}></input><br/>

                <label htmlFor="balcony">Balcony</label>
                <input type="number" id="balcony" value={balcony} onChange={handleBalconyValue}></input><br/>

                <label htmlFor="area">Area</label>
                <input type="number" id="area" value={area} onChange={handleAreaValue}></input><br/>

                <label htmlFor="price">Price</label>
                <input type="number" id="price" value={price} onChange={handlePriceValue}></input><br/>

                <label htmlFor="bathroom">Bathrooms</label>
                <input type="number" id="bathroom" value={bathroom} onChange={handleBathroomValue}></input><br/>

                <label htmlFor="size">Bedrooms</label>
                <input type="number" id="size" value={size} onChange={handleSizeValue}></input><br/>

                <label htmlFor="image">Upload Image</label>
                <input type="file" id="images" multiple onChange={handleImageUpload}></input><br/><br/>
    
                {errorMessage && <div>{errorMessage}</div>}
                {successMessage && <div>{successMessage}Uploaded</div>}

                <button type="submit" onClick={handleSubmitForm}>Add</button><br/>
            </form>
        </div>
    )
}

export default Sell;