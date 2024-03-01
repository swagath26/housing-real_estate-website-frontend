import { useState, useContext } from "react"
import { FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "./AuthContext";


const SigninForm = () => {

    const setIsAuthenticated = useContext(AuthContext).setIsAuthenticated;
    const csrftoken = useContext(AuthContext).csrftoken;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberme, setRememberme] = useState(false);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    // const [successMessage, setSuccessMessage] = useState(null);

    const handleSignin = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('remember_me', rememberme);
        
        const response = await axios.post('/api/members/signin/', formData, {headers: { 'X-CSRFToken': csrftoken }});
        if (response.data.success) {
            window.bootstrap.Modal.getInstance('#accounts').hide();
            setIsAuthenticated(true);
        }
        else {
            setError(true);
            setErrorMessage(response.data.messages || 'Something went wrong');
            setIsAuthenticated(false);
        }
    }

    return (
        <div>
        <div className="card">
                {error && errorMessage}
            <form className="p-2">
                <div className="row p-2">
                    <div className="col-auto">
                        <label htmlFor="username" className="col-form-label">
                            <FaUser className="icon" />
                        </label>
                    </div>
                    <div className="col-auto">
                        <input type="text" className="form-control" placeholder="Enter your username" id="username" onChange={(event) => setUsername(event.target.value)} />
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-auto">
                        <label htmlFor="password" className="col-form-label">
                            <FaLock className="icon" />
                        </label>
                    </div>
                    <div className="col-auto">
                        <input type="password" className="form-control" placeholder="Enter your password" id="password" onChange={(event) => setPassword(event.target.value)} aria-describedby="passwordHelp"/>
                    </div>
                    <div id="passwordHelp" className="form-text">Never share your passwords with anyone</div>
                </div>

                <div className="row p-2">
                    <div className="col-auto d-flex align-items-center">
                        <input type="checkbox" className="form-check-input m-0" id="rememberme" onChange={(event) => {setRememberme(event.target.checked)}} />
                        <label htmlFor="rememberme" className="form-check-label ms-2">Remember me</label>
                    </div>
                    <div className="col-auto ms-3 d-flex align-items-center">
                    <button type="submit" className="btn btn-primary" onClick={handleSignin}>Sign in</button>
                    </div>
                </div>

                <div className="row p-2">
                    <Link className="link">Forgot Password?</Link>
                </div>

            </form>
        </div>
        </div> 
    )
}

export default SigninForm;