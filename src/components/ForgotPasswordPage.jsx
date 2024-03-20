// import { useState } from "react"
// import { FaLock, FaUser } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const ForgotPasswordPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
    
//     const handleLogin = () => {

//     }

//     const handleRegister = () => {

//     }

//     const handleForgotPassword = () => {

//     }

//     // const { isOpen, setIsOpen } = useContext(MyContext);
//     // const handleClick = () => setIsOpen(!isOpen);

//     return (
        
//             <div className="card mt-4">
//                 <form>
//                 <div className="row p-2">
//                     <div className="col-auto">
//                     <label htmlFor="email" className="col-form-label">Email</label>
//                     </div>
//                     <div className="col-auto g-1">
//                     <FaUser className="icon" />
//                     </div>
//                     <div className="col-auto">
//                     <input type="email" className="form-control" placeholder="Enter your email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-describedby="emailHelp"/>
//                     </div>
//                     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//                 </div>

//                 <div className="row p-2">
//                     <div className="col-auto">
//                     <label htmlFor="password" className="col-form-label">Set Password</label>
//                     </div>
//                     <div className="col-auto g-1">
//                     <FaLock className="icon" />
//                     </div>
//                     <div className="col-auto">
//                     <input type="password" className="form-control" placeholder="Enter new password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} aria-describedby="passwordHelp"/>
//                     </div>
//                     <div id="passwordHelp" className="form-text">Password must be 8-20 characters long</div>
//                 </div>

//                 <div className="row p-2">
//                     <div className="col-auto">
//                     <label htmlFor="password" className="col-form-label">Confirm Password</label>
//                     </div>
//                     <div className="col-auto g-1">
//                     <FaLock className="icon" />
//                     </div>
//                     <div className="col-auto">
//                     <input type="password" className="form-control" placeholder="Enter password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
//                     </div>
//                 </div>

//                 <div className="row p-2 g-2">
//                     <div className="col-auto">
//                     <input type="checkbox" className="form-check-input" id="rememberme" />
//                     </div>
//                     <div className="col-auto">
//                     <label htmlFor="rememberme" className="form-check-label">Remember me</label>
//                     </div>
//                     <div className="col-auto">
//                     <button type="submit" className="btn btn-primary" onClick={handleRegister}>Reset Password</button>
//                     </div>
//                 </div>

//                 <div className="row p-2 g-5">
//                 <div className="col-auto">
//                     <p>Know your Password? <Link to="/accounts">Sign in</Link></p>
//                 </div>
//                 </div>

//                 </form>
//             </div>
        
//     )
// }

// export default ForgotPasswordPage;