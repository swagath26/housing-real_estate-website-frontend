import { useState, useContext, useEffect } from "react"
import { FaLock, FaUser, FaKey, FaIdCard } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import AuthContext from "./AuthContext";

const RegisterForm = () => {

    const setIsAuthenticated = useContext(AuthContext).setIsAuthenticated;
    const csrftoken = useContext(AuthContext).csrftoken;

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [rememberme, setRememberme] = useState(false);

    const [errors, setErrors] = useState(null);
    
    useEffect(() => {
        const handleError = () => {
            if(errors) {
                errors.email && errors.email.forEach((error, index) => {
                    console.log(index, error);
                })
                errors.username && errors.username.forEach((error, index) => {
                    console.log(index, error);
                })
                errors.password1 && errors.password1.forEach((error, index) => {
                    console.log(index, error);
                })
                errors.password2 && errors.password2.forEach((error, index) => {
                    console.log(index, error);
                })
            }
        }
        handleError();
    }, [errors]);

    const clearFields = () => {
        setEmail('');
        setUsername('');
        setFirstName('');
        setlastName('');
        setPassword1('');
        setPassword2('');
        setRememberme(false);
        setErrors(null);
        setFormValidate(false);
        setIsFormValidated(false);
        ['email', 'username', 'first_name', 'last_name', 'password1', 'password2'].forEach((input) => {
            document.getElementById(input).classList.remove('is-valid');
        });
    }

    const handleRegister = async () => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('username', username);
        formData.append('password1', password1);
        formData.append('password2', password2);
        formData.append('remember_me', rememberme);

        const response = await axios.post('/api/members/signup/', formData, {headers: { 'X-CSRFToken': csrftoken }});
        if (response.data.success) {
            clearFields();
            window.bootstrap.Modal.getInstance('#accounts').hide();
            setIsAuthenticated(true);
        }
        else {
            setErrors(response.data.errors);
            setIsAuthenticated(false);
        }
    }

    const [formValidate, setFormValidate] = useState(false);
    const [isFormValidated, setIsFormValidated] = useState(false);
    const [isPassword1Validated, setIsPassword1Validated] = useState(false);
    const [isPassword2Validated, setIsPassword2Validated] = useState(false);
    const [isEmailValidated, setIsEmailValidated] = useState(false);
    const [isFirstNameValidated, setIsFirstNameValidated] = useState(false);
    const [isLastNameValidated, setIsLastNameValidated] = useState(false);
    const [isUsernameValidated, setIsUsernameValidated] = useState(false);

    const validateField = (input) => {
        !input.classList.contains('is-valid') && input.classList.add('is-valid');
        input.classList.contains('is-invalid') && input.classList.remove('is-invalid');
    }

    const invalidateField = (input) => {
        !input.classList.contains('is-invalid') && input.classList.add('is-invalid');
        input.classList.contains('is-valid') && input.classList.remove('is-valid');
    }

    useEffect(() => {
        if(isPassword1Validated && isPassword2Validated && isEmailValidated && isFirstNameValidated && isLastNameValidated && isUsernameValidated) {
            setIsFormValidated(true);
        }
        else
            setIsFormValidated(false);
    }, [isPassword1Validated, isPassword2Validated, isEmailValidated, isFirstNameValidated, isLastNameValidated, isUsernameValidated])

    const checkForUsername = async (check) => {
        document.getElementById('existing-username').style.display = 'none';
        const username_input = document.getElementById('username');
        try{
            const response = await axios.get('/api/members/check-username/', {params: {username:check}});
            if (response.data.availability) {
                validateField(username_input);
                document.getElementById('existing-username').style.display = 'none';
                setIsUsernameValidated(true);
            }
            else {
                invalidateField(username_input);
                document.getElementById('existing-username').style.display = 'block';
                setIsUsernameValidated(false);
            }
        }
        catch(error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        const debouncedFunction = setTimeout(() => {
            formValidate && username && checkForUsername(username);
            }, 300);
          return () => clearTimeout(debouncedFunction);
    }, [username, formValidate]);

    useEffect(() => {
        const pass1_input = document.getElementById('password1');
        const pass2_input = document.getElementById('password2');
        const fn_input = document.getElementById('first_name');
        const ln_input = document.getElementById('last_name');
        const username_input = document.getElementById('username');
        const email_input = document.getElementById('email');

        if(formValidate) {
            if(password1.length < 8 || password1.length > 20) {
                invalidateField(pass1_input);
                document.getElementById('passwordHelp').classList.add('invalid-feedback');
                document.getElementById('passwordHelp').style.display = 'block';
                setIsPassword1Validated(false);
            } else {
                validateField(pass1_input);
                document.getElementById('passwordHelp').classList.remove('invalid-feedback');
                setIsPassword1Validated(true);
            }
            if(password2.length < 8 || password2.length > 20 || password1 !== password2) {
                invalidateField(pass2_input);
                document.getElementById('invalid-password2').style.display = 'block';
                setIsPassword2Validated(false);
            } else {
                validateField(pass2_input);
                document.getElementById('invalid-password2').style.display = 'none';
                setIsPassword2Validated(true);
            }
            if (firstName === '') {
                invalidateField(fn_input);
                document.getElementById('invalid-name').style.display = 'block';
                setIsFirstNameValidated(false);
            } else {
                validateField(fn_input);
                setIsFirstNameValidated(true);
            }
            if (lastName === '') {
                invalidateField(ln_input);
                document.getElementById('invalid-name').style.display = 'block';
                setIsLastNameValidated(false);
            } else {
                validateField(ln_input);
                setIsLastNameValidated(true);
            }
            if (firstName && lastName) document.getElementById('invalid-name').style.display = 'none';
            if (username === '') {
                invalidateField(username_input);
                document.getElementById('invalid-username').style.display = 'block';
                setIsUsernameValidated(false);
            } else {
                document.getElementById('invalid-username').style.display = 'none';
            }
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailRegex.test(email)) {
                invalidateField(email_input);
                document.getElementById('invalid-email').style.display = 'block';
                setIsEmailValidated(false);
            } else {
                validateField(email_input);
                document.getElementById('invalid-email').style.display = 'none';
                setIsEmailValidated(true);
            }
        }
    }, [password1, password2, formValidate, firstName, lastName, username, email]);

    return (
        
        <div className="card">
            <form className="p-2 needs-validation" id="registration-form" noValidate>
                <div className="row p-2">
                    <div className="col-auto">
                        <label htmlFor="email" className="col-form-label">
                            <MdEmail className="icon" />
                        </label>
                    </div>
                    <div className="col-9">
                        <input type="email" className="form-control mt-1" placeholder="Email Address" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
                    </div>
                    <div className="invalid-feedback" id="invalid-email">
                        Provide a valid email address
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-auto d-flex align-items-center">
                        <label htmlFor="username" className="col-form-label">
                            <FaUser className="icon" />
                        </label>
                    </div>
                    <div className="col-10 row">
                        <div className="col-8 d-flex align-items-center">
                            <input type="text" className="form-control my-1" placeholder="Username" id="username" value={username} onChange={(event) => setUsername(event.target.value)} required/>
                        </div>
                        <div className="col-4 d-flex align-items-center">
                            <div className="invalid-feedback m-0" id="invalid-username">
                                Provide a valid username
                            </div>
                            <div className="invalid-feedback m-0" id="existing-username">
                                Username is aleady used
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row p-2 input-group">
                    <div className="col-auto">
                        <label className="col-form-label">
                            <FaIdCard className="icon" />
                        </label>
                    </div>
                    <div className="col-5">
                        <input type="text" className="form-control" placeholder="First Name" id="first_name" value={firstName} onChange={(event) => setFirstName(event.target.value)} required/>
                    </div>
                    <div className="col-5">
                        <input type="text" className="form-control" placeholder="Last Name" id="last_name" value={lastName} onChange={(event) => setlastName(event.target.value)} required/>
                    </div>
                    <div className="invalid-feedback" id="invalid-name">
                        Names can't be empty
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-auto">
                        <label htmlFor="password1" className="col-form-label">
                            <FaLock className="icon" />
                        </label>
                    </div>
                    <div className="col-auto">
                        <input type="password" className="form-control" placeholder="Create a password" id="password1" value={password1} onChange={(event) => {setPassword1(event.target.value)}} aria-describedby="passwordHelp" required/>
                    </div>
                    <div id="passwordHelp" className="form-text">Password must be 8-20 characters long</div>
                </div>

                <div className="row p-2">
                    <div className="col-auto">
                        <label htmlFor="password2" className="col-form-label">
                            <FaKey className="icon" />
                        </label>
                    </div>
                    <div className="col-auto">
                        <input type="password" className="form-control" placeholder="Confirm password" id="password2" value={password2} onChange={(event) => setPassword2(event.target.value)} required/>
                    </div>
                    <div className="invalid-feedback" id="invalid-password2">
                        Passwords aren't matching!
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-auto d-flex align-items-center">
                        <input type="checkbox" className="form-check-input m-0" id="rememberme" value={rememberme} onChange={(event) => {setRememberme(event.target.checked)}} />
                        <label htmlFor="rememberme" className="form-check-label ms-2">Remember me</label>
                    </div>
                    <div className="col-auto ms-3 d-flex align-items-center">
                    <button type="submit" className="btn btn-primary" onClick={(event) => {
                        event.preventDefault();
                        if (!formValidate) {
                            handleRegister();
                            setFormValidate(true);
                        }
                        if(isFormValidated) {
                            handleRegister();
                        }
                    }}>Register</button>
                    </div>
                </div>
                
            </form>
        </div>
        
    )
}

export default RegisterForm;