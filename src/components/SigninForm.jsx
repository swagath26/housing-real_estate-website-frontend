import { useState, useContext } from "react"
import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import csrftoken from "./csrfToken";
import AuthContext from "./AuthContext";

// const csrftoken = getCookie('csrftoken');

const SigninForm = () => {

    const navigate = useNavigate();
    const setIsAuthenticated = useContext(AuthContext).setIsAuthenticated;
    const csrftoken = useContext(AuthContext).csrftoken;

    // const [email, setEmail] = useState('');
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
            // console.log(response);
            // console.log(response.data);
            // console.log(response.data.user);
            // console.log(response.data.is_authenticated);
            // const cookieData = response.headers['set-cookie'];
            // console.log(cookieData);
            // document.cookie = `username=${cookieData.username}`;
            // document.cookie = `signedin_status=${cookieData.signedin}`;
            // document.cookie = `remember_me=${cookieData.remember_me}`;
            setIsAuthenticated(true);
            navigate('/');
        }
        else {
            setError(true);
            setErrorMessage(response.data.messages || 'Something went wrong');
            setIsAuthenticated(false);
        }
    }

    return (
        <div>
            {/* {isAuthenticated && navigate('/signout')} */}

            {/* {(!isAuthenticated) &&  */}
            <div className="card bg-transparent">
                {error && errorMessage}
                <form>
                <div className="row p-2">
                    <div className="col-3">
                    <label htmlFor="username" className="col-form-label">Username</label>
                    </div>
                    <div className="col-auto g-1">
                    <FaUser className="icon" />
                    </div>
                    <div className="col-auto">
                    <input type="text" className="form-control" placeholder="Enter your username" id="username" onChange={(event) => setUsername(event.target.value)} />
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-3">
                    <label htmlFor="password" className="col-form-label">Password</label>
                    </div>
                    <div className="col-auto g-1">
                    <FaLock className="icon" />
                    </div>
                    <div className="col-auto">
                    <input type="password" className="form-control" placeholder="Enter your password" id="password" onChange={(event) => setPassword(event.target.value)} aria-describedby="passwordHelp"/>
                    </div>
                    <div id="passwordHelp" className="form-text">Never share your passwords with anyone</div>
                </div>

                <div className="row p-2 g-2">
                    <div className="col-auto">
                    <input type="checkbox" className="form-check-input" id="rememberme" onChange={(event) => {setRememberme(event.target.checked)}} />
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