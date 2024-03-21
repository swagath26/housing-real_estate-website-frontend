import { useState } from "react";
import SigninForm from "./SigninForm";
import RegisterForm from "./RegisterForm";

const Accounts = () => {
    const [navigate, setNavigate] = useState('signinform');
    return (
        <div>
            <h1 className="fs-5 pt-5  pb-4 m-0 d-flex justify-content-center" id="signinLabel">Welcome to Housing</h1>
            <div className="container">
                <nav className="nav px-3">
                    <ul className="nav nav-underline">
                        <li className="nav-item">
                            <button onClick={() => {setNavigate('signinform')}} className={`nav-link ${navigate === 'signinform' ? 'active' : ''} px-3`} style={{color:'black', fontWeight:'400'}}>Sign in</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={() => {setNavigate('registerform')}} className={`nav-link ${navigate === 'registerform' ? 'active' : ''} px-3`} style={{color:'black', fontWeight:'400'}}>New Account</button>
                        </li>
                    </ul>
                </nav>
                <div className="container mb-3">
                                    
                    {navigate==="signinform" && <SigninForm/>}
                    {navigate==="registerform" && <RegisterForm/>}
                                    
                </div>
            </div>
        </div>
    )
}

export default Accounts;