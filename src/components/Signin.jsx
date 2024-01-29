import { Link} from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import SigninPage from "./SigninPage";
import RegisterPage from "./RegisterPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import { useState } from "react";


// const SigninButton = () => {

//     return (
//         <div>
//             <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signin">
//                 Signin
//             </button>
//             <div className="modal fade" id="signin" aria-labelledby="signinLabel">
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h1 className="modal-title fs-5" id="signinLabel">Welcome to Housing</h1>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <nav className="nav">
//                                 <ul className="nav nav-underline" role="tablist">
//                                     <li className="nav-item" role="presentation">
//                                         <button className="nav-link" id="signin-tab" data-bs-toggle="tab" data-bs-target="#signin-tab-pane" role="tab" aria-controls="signin-tab-pane" aria-selected="true">Signin</button>
//                                     </li>
//                                     <li className="nav-item" role="presentation">
//                                         <button className="nav-link" id="register-tab" data-bs-toggle="tab" data-bs-target="#register-tab-pane" role="tab" aria-controls="register-tab-pane" aria-selected="false">New Account</button>
//                                     </li>
//                                 </ul>
//                             </nav>
//                             <div className="tab-content">
//                                 <div className="tab-pane fade show active" id="signin-tab-pane" role="tabpanel" aria-labelledby="signin-tab" tabIndex="0">
//                                     <SigninPage />
//                                 </div>
//                                 <div className="tab-pane fade" id="register-tab-pane" role="tabpanel" aria-labelledby="register-tab" tabIndex="0">
//                                     <RegisterPage />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }





const Signin = () => {

    const [navigate, setNavigate] = useState('signinpage');

    return (
        <div>
            {/* <div className="modal fade" id="signin" aria-labelledby="signinLabel"> */}
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="signinLabel">Welcome to Housing</h1>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">
                            <nav className="nav">
                                <ul className="nav nav-underline">
                                    <li className="nav-item">
                                        <button onClick={() => {setNavigate('signinpage')}} className="nav-link">Signin</button>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={() => {setNavigate('registerpage')}} className="nav-link">New Account</button>
                                    </li>
                                </ul>
                            </nav>
                            <div className="container">
                                
                                {navigate=="forgotpasswordpage" && <ForgotPasswordPage />}
                                {navigate=="signinpage" && <SigninPage/>}
                                {navigate=="registerpage" && <RegisterPage/>}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        // </div>
    )
}

export default Signin;