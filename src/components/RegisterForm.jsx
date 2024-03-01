import { useState, useContext } from "react"
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
// import getCookie from "./csrfToken";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "./AuthContext";

// const csrftoken = getCookie('csrftoken');

const RegisterForm = () => {

    const navigate = useNavigate();

    const setIsAuthenticated = useContext(AuthContext).setIsAuthenticated;
    const csrftoken = useContext(AuthContext).csrftoken;

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [rememberme, setRememberme] = useState(false);

    const [errorMessage, setErrorMessage] = useState(false);
    // const [successMessage, setSuccessMessage] = useState(null);
    
    const handleRegister = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('username', username);
        formData.append('password1', password1);
        formData.append('password2', password2);
        formData.append('remember_me', rememberme);
        
        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }

        const response = await axios.post('/api/members/signup/', formData, {headers: { 'X-CSRFToken': csrftoken }});
        console.log(response);
        if (response.data.success) {
            // setSuccessMessage(response.data.messages);
            // setErrorMessage(false);
            window.bootstrap.Modal.getInstance('#accounts').hide();
            setIsAuthenticated(true);
        }
        else {
            setErrorMessage(true);
            setIsAuthenticated(false);
            // console.log(response.data.errors);
            // console.log(errorMessage)
        }
    }

    return (
        
        <div className="card">
            {errorMessage && 'Something went wrong'}
            <form className="p-2">
                <div className="row p-2">
                    <div className="col-auto">
                        <label htmlFor="email" className="col-form-label">
                            <MdEmail className="icon" />
                        </label>
                    </div>
                    <div className="col-9">
                        <input type="email" className="form-control" placeholder="Email Address" id="email" onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-auto">
                        <label htmlFor="username" className="col-form-label">
                            <FaUser className="icon" />
                        </label>
                    </div>
                    <div className="col-6">
                        <input type="text" className="form-control" placeholder="Username" id="username" onChange={(event) => setUsername(event.target.value)}/>
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-5">
                        <input type="text" className="form-control" placeholder="First Name" id="first_name" onChange={(event) => setFirstName(event.target.value)}/>
                    </div>
                    <div className="col-5">
                        <input type="text" className="form-control" placeholder="Last Name" id="last_name" onChange={(event) => setlastName(event.target.value)}/>
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-auto">
                        <label htmlFor="password1" className="col-form-label">
                            <FaLock className="icon" />
                        </label>
                    </div>
                    <div className="col-auto">
                        <input type="password" className="form-control" placeholder="Create a password" id="password1" onChange={(event) => setPassword1(event.target.value)} aria-describedby="passwordHelp"/>
                    </div>
                    <div id="passwordHelp" className="form-text">Password must be 8-20 characters long</div>
                </div>

                <div className="row p-2">
                    <div className="col-auto">
                        <label htmlFor="password2" className="col-form-label">
                            <FaLock className="icon" />
                        </label>
                    </div>
                    <div className="col-auto">
                        <input type="password" className="form-control" placeholder="Confirm password" id="password2" onChange={(event) => setPassword2(event.target.value)} />
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-auto d-flex align-items-center">
                        <input type="checkbox" className="form-check-input m-0" id="rememberme" onChange={(event) => {setRememberme(event.target.checked)}} />
                        <label htmlFor="rememberme" className="form-check-label ms-2">Remember me</label>
                    </div>
                    <div className="col-auto ms-3 d-flex align-items-center">
                    <button type="submit" className="btn btn-primary" onClick={handleRegister}>Register</button>
                    </div>
                </div>
                
            </form>
        </div>
        
    )
}

export default RegisterForm;