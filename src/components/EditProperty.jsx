// import { useState, useEffect } from "react";
// import axios from "axios";
// import getCookie from './getCookie';
// import { useNavigate, useParams } from "react-router-dom";

// const EditProperty = () => {

//     const navigate = useNavigate();
//     const params = useParams();

//     const property_id = params.property_id;

//     const [property, setProperty] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(false);
    
//     const [location, setLocation] = useState('');
//     const [address, setAddress] = useState('');
//     const [description, setDescription] = useState('');
    
//     const [price, setPrice] = useState('');
//     const [bedrooms, setBedrooms] = useState('');
//     const [bathrooms, setBathrooms] = useState('');

//     const [balcony, setBalcony] = useState(false);
//     const [area, setArea] = useState('');
//     const [areaType, setAreaType] = useState('');
    
//     const [dateOfAvailability, setDateOfAvailability] = useState('');
//     const [readyToMove, setReadyToMove] = useState(false);
    
//     const [images, setImages] = useState([]);

//     const fetchProperty = async () => {
//         try {
//             const response = await axios.get('/api/properties_list/', {
//                 params: {
//                     id : property_id,
//                 },
//             });
//             setProperty(response.data[0]);
//             setIsLoaded(true);
//         }
//         catch (error) {
//             // setIsLoading(false);
//             console.error(error);
//         }
//     }

//     useEffect(() => {
//         fetchProperty();
//     }, []);

//     useEffect(() => {
//         isLoaded && setFields();
//     }, [property_id, isLoaded])

//     const handleImageUpload = (event) => {
//         const newImages = [...images, ...event.target.files]
//         setImages(newImages);
//     }

//     const [successMessage, setSuccessMessage] = useState(null);
//     const [errorMessage, setErrorMessage] = useState(null);

//     function setFields() {
//         setLocation(property.location);
//         setAddress(property.address);
//         setDescription(property.description);
//         setPrice(property.price);
//         setBedrooms(property.bedrooms);
//         setBathrooms(property.bathrooms);
//         setBalcony(property.balcony);
//         setArea(property.area);
//         setAreaType(property.area_type);
//         setDateOfAvailability(property.date_of_availability);
//         setReadyToMove(property.ready_to_move);
//         setImages([]);
//     }

//     const csrftoken = getCookie('csrftoken');

//     const handleSubmitForm = async (event) => {
//         event.preventDefault();
//         const formData = new FormData();
//         formData.append('id', property_id)
//         formData.append('location', location);
//         formData.append('address', address);
//         formData.append('description', description);

//         formData.append('price', price);
//         formData.append('bedrooms', bedrooms);
//         formData.append('bathrooms', bathrooms);

//         formData.append('balcony', balcony);
//         formData.append('area', area);
//         formData.append('area_type', areaType);

//         formData.append('date_of_availability', dateOfAvailability);
//         formData.append('ready_to_move', readyToMove);
        
//         images.forEach((image, index) => {
//             formData.append('images', image, `images[${index}]`);
//         });
        
//         // for (const [key, value] of formData.entries()) {
//         //     console.log(`${key}: ${value}`);
//         //   }

//         const response = await axios.post('/api/edit/', formData, {headers: { 'X-CSRFToken': csrftoken }});
//         console.log(response);

//         if (response.data.success) {
//             setSuccessMessage(response.data.message);
//             setErrorMessage(null);
//             navigate('/buy');
//         }
//         else {
//             // setErrorMessage(response.data.errors || 'Something went wrong!')
//             console.log(response.data.errors);
//         }
//     }

    
//     return (
//         <div>
//             <h1>Edit your property</h1><br/>
//             <form>
//                 <div className="row p-2">
//                     <div className="col-auto">
//                     <label htmlFor="address" className="col-form-label">Address</label>
//                     </div>
//                     <div className="col-auto">
//                     <input type="text" className="form-control" placeholder="Enter property address" id="address" value={address} onChange={(event) => {setAddress(event.target.value)}} required/>
//                     </div>
//                 </div>

//                 <div className="row p-2">
//                     <div className="col-auto">
//                     <label htmlFor="location" className="col-form-label">Location</label>
//                     </div>
//                     <div className="col-auto">
//                     <input type="text" className="form-control" placeholder="Enter your location" id="location" value={location} onChange={(event) => {setLocation(event.target.value)}} required/>
//                     </div>
//                 </div>

//                 <div className="row p-2">
//                     <div className="col-auto">
//                     <label htmlFor="description" className="col-form-label">Description</label>
//                     </div>
//                     <div className="col-auto">
//                     <input type="text" className="form-control" placeholder="Description of your property" id="description" value={description} onChange={(event) => {setDescription(event.target.value)}}/>
//                     </div>
//                 </div>

//                 <div className="row p-2">
//                     <div className="col-auto">
//                     <label htmlFor="price" className="col-form-label">Price</label>
//                     </div>
//                     <div className="col-auto">
//                     <input type="text" className="form-control" placeholder="Price" id="price" value={price} onChange={(event) => {setPrice(event.target.value)}} required/>
//                     </div>
//                 </div>

//                 <div className="row p-2">
//                     <div className="col-auto">
//                     <label htmlFor="bedrooms" className="col-form-label">Bedrooms</label>
//                     </div>
//                     <div className="col-auto">
//                     <input type="text" className="form-control" placeholder="Number of bedrooms" id="bedrooms" value={bedrooms} onChange={(event) => {setBedrooms(event.target.value)}} required/>
//                     </div>
//                 </div>

//                 <div className="row p-2">
//                     <div className="col-auto">
//                     <label htmlFor="bathrooms" className="col-form-label">Bathrooms</label>
//                     </div>
//                     <div className="col-auto">
//                     <input type="text" className="form-control" placeholder="Number of bathrooms" id="bathrooms" value={bathrooms} onChange={(event) => {setBathrooms(event.target.value)}} required/>
//                     </div>
//                 </div>

//                 <div className="row p-2">
//                     <div className="col-auto">
//                     <label htmlFor="balcony" className="col-form-label">Balcony</label>
//                     </div>
//                     <div className="col-auto">
//                     <input type="checkbox" id="balcony" onChange={(event) => {setBalcony(event.target.checked)}}/>
//                     </div>
//                 </div>

//                 <div className="row p-2">
//                     <div className="col-auto">
//                     <label htmlFor="area" className="col-form-label">Area in sqft</label>
//                     </div>
//                     <div className="col-auto">
//                     <input type="text" className="form-control" placeholder="Area in sqft" id="area" value={area} onChange={(event) => {setArea(event.target.value)}}/>
//                     </div>
//                 </div>

//                 <div className="row p-2">
//                     <div className="col-auto">
//                     <label htmlFor="area_type" className="col-form-label">Type of Area</label>
//                     </div>
//                     <div className="col-auto">
//                     <input type="text" className="form-control" placeholder="Type of Area" id="area_type" value={areaType} onChange={(event) => {setAreaType(event.target.value)}}/>
//                     </div>
//                 </div>

//                 <div className="row p-2">
//                     <div className="col-auto">
//                     <label htmlFor="date_of_availability" className="col-form-label">Date of Availability</label>
//                     </div>
//                     <div className="col-auto">
//                     <input type="date" className="form-control" id="date_of_availability" value={dateOfAvailability} onChange={(event) => {setDateOfAvailability(event.target.value)}}/>
//                     </div>
//                 </div>

//                 <div className="row p-2">
//                     <div className="col-auto">
//                     <label htmlFor="ready_to_move" className="col-form-label">Ready To Move</label>
//                     </div>
//                     <div className="col-auto">
//                     <input type="checkbox" id="ready_to_move" onChange={(event) => {setReadyToMove(event.target.checked)}}/>
//                     </div>
//                 </div>

//                 <div className="row p-2">
//                     <div className="col-auto">
//                     <label htmlFor="images" className="col-form-label">Upload Images</label>
//                     </div>
//                     <div className="col-auto">
//                     <input type="file" multiple className="form-control" id="images" onChange={handleImageUpload}/>
//                     </div>
//                 </div>

//                 {errorMessage && <div>{errorMessage}</div>}
//                 {successMessage && <div>{successMessage}Uploaded</div>}

//                 <div className="row p-2 g-2">
//                     <div className="col-auto">
//                     <button type="submit" className="btn btn-primary" onClick={handleSubmitForm}>Save</button>
//                     </div>
//                 </div>
                
//             </form>
//         </div>
//     )
// }

// export default EditProperty;