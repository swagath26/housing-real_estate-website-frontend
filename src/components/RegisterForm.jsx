import { useState, useContext } from "react"
import { FaLock, FaUser } from "react-icons/fa";
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
    const [remember, setRemember] = useState(false);

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
        // formData.append('remember', remember);
        
        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }

        const response = await axios.post('/members/signup/', formData, {headers: { 'X-CSRFToken': csrftoken }});
        console.log(response);
        if (response.data.success) {
            // setSuccessMessage(response.data.messages);
            setErrorMessage(false);
            setIsAuthenticated(true);
            navigate('/');
        }
        else {
            setErrorMessage(true);
            setIsAuthenticated(false);
            // console.log(response.data.errors);
            console.log(errorMessage)
        }
    }

    return (
        
            <div className="card mt-4">
                {errorMessage && 
                'Something went wrong'
                }
                <form>
                <div className="row p-2">
                    <div className="col-auto">
                    <label htmlFor="email" className="col-form-label">Email</label>
                    </div>
                    <div className="col-auto g-1">
                    <FaUser className="icon" />
                    </div>
                    <div className="col-auto">
                    <input type="email" className="form-control" placeholder="Enter your email" id="email" onChange={(event) => setEmail(event.target.value)} aria-describedby="emailHelp"/>
                    </div>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="row p-2">
                    <div className="col-auto">
                    <label htmlFor="username" className="col-form-label">Username</label>
                    </div>
                    <div className="col-auto g-1">
                    <FaUser className="icon" />
                    </div>
                    <div className="col-auto">
                    <input type="text" className="form-control" placeholder="Provide a username for your account" id="username" onChange={(event) => setUsername(event.target.value)}/>
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-auto">
                    <label htmlFor="first_name" className="col-form-label">First Name</label>
                    </div>
                    <div className="col-auto g-1">
                    </div>
                    <div className="col-auto">
                    <input type="text" className="form-control" placeholder="Enter your First Name" id="first_name" onChange={(event) => setFirstName(event.target.value)}/>
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-auto">
                    <label htmlFor="last_name" className="col-form-label">Last Name</label>
                    </div>
                    <div className="col-auto g-1">
                    </div>
                    <div className="col-auto">
                    <input type="text" className="form-control" placeholder="Enter your last Name" id="last_name" onChange={(event) => setlastName(event.target.value)}/>
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-auto">
                    <label htmlFor="password1" className="col-form-label">Set Password</label>
                    </div>
                    <div className="col-auto g-1">
                    <FaLock className="icon" />
                    </div>
                    <div className="col-auto">
                    <input type="password" className="form-control" placeholder="Enter new password" id="password1" onChange={(event) => setPassword1(event.target.value)} aria-describedby="passwordHelp"/>
                    </div>
                    <div id="passwordHelp" className="form-text">Password must be 8-20 characters long</div>
                </div>

                <div className="row p-2">
                    <div className="col-auto">
                    <label htmlFor="password2" className="col-form-label">Confirm Password</label>
                    </div>
                    <div className="col-auto g-1">
                    <FaLock className="icon" />
                    </div>
                    <div className="col-auto">
                    <input type="password" className="form-control" placeholder="Enter password" id="password2" onChange={(event) => setPassword2(event.target.value)} />
                    </div>
                </div>

                <div className="row p-2 g-2">
                    <div className="col-auto">
                    <input type="checkbox" className="form-check-input" id="rememberme" onChange={(event) => {setRemember(event.target.checked)}} />
                    </div>
                    <div className="col-auto">
                    <label htmlFor="rememberme" className="form-check-label">Remember me</label>
                    </div>
                    <div className="col-auto">
                    <button type="submit" className="btn btn-primary" onClick={handleRegister}>Signup</button>
                    </div>
                </div>
                
                </form>
            </div>
        
    )
}

export default RegisterForm;