import { useState, useContext } from "react"
import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import getCookie from "./csrfToken";
import AuthContext from "./AuthContext";

const csrftoken = getCookie('csrftoken');

const SigninForm = () => {

    const navigate = useNavigate();
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);
    // const [successMessage, setSuccessMessage] = useState(null);

    const handleSignin = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('remember', remember);
        
        const response = await axios.post('/members/signin/', formData, {headers: { 'X-CSRFToken': csrftoken }});
        if (response.data.success) {
            setIsAuthenticated(true);
            navigate('/');
        }
        else {
            setErrorMessage(response.data.messages || 'Something went wrong');
            setIsAuthenticated(false);
        }
    }

    return (
        <div>
            {/* {isAuthenticated && navigate('/signout')} */}

            {/* {(!isAuthenticated) &&  */}
            <div className="card mt-4">
                {errorMessage}
                <form>
                <div className="row p-2">
                    <div className="col-auto">
                    <label htmlFor="email" className="col-form-label">Email</label>
                    </div>
                    <div className="col-auto g-1">
                    <FaUser className="icon" />
                    </div>
                    <div className="col-auto">
                    <input type="email" className="form-control" placeholder="Enter your email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-describedby="emailHelp"/>
                    </div>
                    <div id="emailHelp" className="form-text">We will never share your email with anyone else.
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-auto">
                    <label htmlFor="password" className="col-form-label">Password</label>
                    </div>
                    <div className="col-auto g-1">
                    <FaLock className="icon" />
                    </div>
                    <div className="col-auto">
                    <input type="password" className="form-control" placeholder="Enter your password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} aria-describedby="passwordHelp"/>
                    </div>
                    <div id="passwordHelp" className="form-text">Never share your passwords with anyone</div>
                </div>

                <div className="row p-2 g-2">
                    <div className="col-auto">
                    <input type="checkbox" className="form-check-input" id="rememberme" onChange={(event) => {setRemember(event.target.value)}} />
                    </div>
                    <div className="col-auto">
                    <label htmlFor="rememberme" className="form-check-label">Remember me</label>
                    </div>
                    <div className="col-auto">
                    <button type="submit" className="btn btn-primary" onClick={handleSignin}>Signin</button>
                    </div>
                </div>

                <div className="row p-2 g-5">
                <div className="col-auto">
                    <Link to="/forgot-password" className="link">Forgot Password?</Link>
                </div>
                </div>

                </form>
            </div>
            {/* } */}
        </div> 
    )
}

export default SigninForm;