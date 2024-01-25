import { useState } from "react"
import { FaLock, FaUser } from "react-icons/fa";

const SigninButton = () => {
    return (
        <div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signin">
                Signin
            </button>
            <div class="modal fade" id="signin" aria-labelledby="signinLabel">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="signinLabel">Welcome to Housing</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <nav className="nav">
                                <ul className="nav nav-underline">
                                <li className="nav-item">
                                <button className="nav-link">Signin</button>
                                </li>
                                <li className="nav-item">
                                <button className="nav-link">Signup</button>
                                </li>
                                </ul>
                            </nav>
                            <div className="container">
                            <Signin />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = () => {

    }

    const handleRegister = () => {

    }

    const handleForgotPassword = () => {

    }

    // const { isOpen, setIsOpen } = useContext(MyContext);
    // const handleClick = () => setIsOpen(!isOpen);

    return (
        
            <div className="card mt-4">
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
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
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
                    <div id="passwordHelp" className="form-text">Passwords must be 8-20 characters long</div>
                </div>

                <div className="row p-2 g-2">
                    <div className="col-auto">
                    <input type="checkbox" className="form-check-input" id="rememberme" />
                    </div>
                    <div className="col-auto">
                    <label htmlFor="rememberme" className="form-check-label">Remember me</label>
                    </div>
                    <div className="col-auto">
                    <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>

                <div className="row p-2 g-5">
                <div className="col-auto">
                <a href="#">Forgot Password?</a>
                </div>
                </div>

                <div className="register-link">
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div>
                </form>
            </div>
        
    )
}

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = () => {

    }

    const handleRegister = () => {

    }

    const handleForgotPassword = () => {

    }

    // const { isOpen, setIsOpen } = useContext(MyContext);
    // const handleClick = () => setIsOpen(!isOpen);

    return (
        <div className="container">
            <div className="card mt-4">
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
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
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
                    <div id="passwordHelp" className="form-text">Passwords must be 8-20 characters long</div>
                </div>

                <div className="row p-2 g-2">
                    <div className="col-auto">
                    <input type="checkbox" className="form-check-input" id="rememberme" />
                    </div>
                    <div className="col-auto">
                    <label htmlFor="rememberme" className="form-check-label">Remember me</label>
                    </div>
                    <div className="col-auto">
                    <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>

                <div className="row p-2 g-5">
                <div className="col-auto">
                <a href="#">Forgot Password?</a>
                </div>
                </div>

                <div className="register-link">
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div>
                </form>
            </div>
        </div>
    )
}

export default SigninButton;