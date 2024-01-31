import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropertyCard from "./PropertyCard";

const PropertyDetails = () => {
    const params = useParams()
    const property_id = params.property_id;
    // console.log(property_id)
    const [property, setProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProperty = async () => {
        try {
            const response = await axios.get('/properties_list/', {
                params: {
                    id : property_id,
                },
            });
            setProperty(response.data[0]);
            setIsLoading(false);
        }
        catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProperty();
    }, []);

    return (
        <div>
            {isLoading && <p>Loading properties...</p>}
            {!isLoading && 
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <button className="btn btn-danger">Delete post</button>
                    </div>
                    <div className="col-4">
                        <button className="btn btn-primary">Edit post</button>
                    </div>
                </div>

                <div className='row'>

                            {property.images.map((image, index) => (
                            <div className='col-4'>
                                <img className='img-fluid img-thumbnail' src={image.image} alt={`Property Image ${index+1}`} />
                            </div>
                            ))}
                    
                </div>
      
                <div className="row p-5">
                    <div className="col-4">
                        <h3>INR {property.price}</h3>
                    </div>
                    <div className="col-4">
                    
                        {property.bedrooms} bds | {property.bathrooms} ba{property.balcony && ' | Balcony'} | {property.area || '--'} sqft | {property.area_type}
                        <br />
                        </div>
                        <div className="col-4">
                        {property.address}, {property.location}
                        <p style={{fontSize:'14px'}}>Listing by: {property.owner} | {property.availability || (property.ready_to_move && 'Ready To Move')}</p>
                    
                    </div>
                </div>

                <div className="row p-5">
                    <div className="col">
                        <h3>Overview</h3>
                        <p>{property.description}</p>
                    </div>
                </div>

            </div>
            }
        </div>
    )
}


export default PropertyDetails;