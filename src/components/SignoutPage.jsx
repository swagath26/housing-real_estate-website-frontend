import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "./AuthContext";

const SignoutPage = () => {

    const navigate = useNavigate();
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const handleSignout = async () => {
        const response = await axios.get('/members/signout/');
        console.log(response);
        if (response.data.success) {
            setIsAuthenticated(false);
            navigate('/accounts');
        }
    }

    return (
        <div className="card mt-4">
            <div className="row p-2">
                <p>You are signed in currently..</p>
            </div>
            <div className="row p-2">
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={handleSignout}>Sign Out</button>
                </div>
            </div>
            <div className="row p-2">
                <Link to="/">Go to Homepage</Link>
            </div>
        </div>
    )

}

export default SignoutPage;