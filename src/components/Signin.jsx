import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SigninPage from "./SigninPage";
import RegisterPage from "./RegisterPage";
import ForgotPasswordPage from "./ForgotPasswordPage";

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
                                <Link to="/signinpage" className="nav-link">Signin</Link>
                                </li>
                                <li className="nav-item">
                                <Link to="/registerpage" className="nav-link">New Account</Link>
                                </li>
                                </ul>
                            </nav>
                            <div className="container">
                                <Routes>
                                    <Route index element={<SigninPage/>}></Route>
                                    <Route path="/forgotpasswordpage" element={<ForgotPasswordPage />}></Route>
                                    <Route path="/signinpage" element={<SigninPage/>}></Route>
                                    <Route path="/registerpage" element={<RegisterPage/>}></Route>
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SigninButton;