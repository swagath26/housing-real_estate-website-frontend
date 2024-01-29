import { useState, useContext } from "react"
import { FaLock, FaUser } from "react-icons/fa";
import getCookie from "./csrfToken";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "./AuthContext";

const csrftoken = getCookie('csrftoken');

const RegisterForm = () => {

    const navigate = useNavigate();

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password_1, setPassword_1] = useState('');
    const [password_2, setPassword_2] = useState('');

    const [errorMessage, setErrorMessage] = useState(null);
    // const [successMessage, setSuccessMessage] = useState(null);
    
    const handleRegister = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password_1);
        // formData.append('password_2', password_2);
        
        const response = await axios.post('/members/signup/', formData, {headers: { 'X-CSRFToken': csrftoken }});
        if (response.data.success) {
            // setSuccessMessage(response.data.messages);
            setIsAuthenticated(true);
            navigate('/');
        }
        else {
            setErrorMessage(response.data.messages || 'Something went wrong');
            setIsAuthenticated(false);
        }
        console.log(response);
    }

    return (
        
            <div className="card mt-4">
                {errorMessage}
                <form>
                {/* <div className="row p-2">
                    <div className="col-auto">
                    <label htmlFor="email" className="col-form-label">Email</label>
                    </div>
                    <div className="col-auto g-1">
                    <FaUser className="icon" />
                    </div>
                    <div className="col-auto">
                    <input type="email" className="form-control" placeholder="Enter your email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-describedby="emailHelp"/>
                    </div>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div> */}

                <div className="row p-2">
                    <div className="col-auto">
                    <label htmlFor="username" className="col-form-label">Username</label>
                    </div>
                    <div className="col-auto g-1">
                    <FaUser className="icon" />
                    </div>
                    <div className="col-auto">
                    <input type="text" className="form-control" placeholder="Enter your username" id="username" value={username} onChange={(event) => setUsername(event.target.value)}/>
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
                    <input type="password" className="form-control" placeholder="Enter new password" id="password1" value={password_1} onChange={(event) => setPassword_1(event.target.value)} aria-describedby="passwordHelp"/>
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
                    <input type="password" className="form-control" placeholder="Enter password" id="password2" value={password_2} onChange={(event) => setPassword_2(event.target.value)} />
                    </div>
                </div>

                <div className="row p-2 g-2">
                    <div className="col-auto">
                    <input type="checkbox" className="form-check-input" id="rememberme" />
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