import { useState } from "react";
import SigninForm from "./SigninForm";
import RegisterForm from "./RegisterForm";

const HomePageAccounts = () => {

    const [navigate, setNavigate] = useState('signinform');

    return (
        <div className="card bg-transparent">
            {/* <div className="card-header p-1 text-center">
                <h1 className="card-title fs-5"><i class="fas fa-user white-text"></i> Register:</h1>
            </div> */}
            <div className="card-body p-0">
                <div className="nav pb-0 pt-2">
                    <ul className="nav nav-underline flex-grow-1 justify-content-evenly" style={{fontSize:'22px'}}>
                        <li className="nav-item">
                            <button onClick={() => {setNavigate('signinform')}} className="nav-link">Signin</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={() => {setNavigate('registerform')}} className="nav-link">New Account</button>
                        </li>
                    </ul>
                </div>
                <div className="container-fluid py-0">
                    {navigate=="signinform" && <SigninForm/>}
                    {navigate=="registerform" && <RegisterForm/>}
                </div>
                <div className="container-fluid">
                    <div class="text-center">
                      <div class="inline-ul text-center d-flex justify-content-center">
                        <a class="p-2 m-2 tw-ic">
                          <i class="fab fa-twitter white-text"></i>
                        </a>
                        <a class="p-2 m-2 li-ic">
                          <i class="fab fa-linkedin-in white-text"> </i>
                        </a>
                        <a class="p-2 m-2 ins-ic">
                          <i class="fab fa-instagram white-text"> </i>
                        </a>
                      </div>
                    </div>
                  </div>
            </div>
        </div>
    )
}

export default HomePageAccounts;