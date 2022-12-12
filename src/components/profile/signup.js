import {useState, useEffect} from "react";
import * as service
    from "../../services/auth-service";
import {useNavigate, Link} from "react-router-dom";
import './prof.css';

const Signup = () => {
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate();

    const signup = () =>
        service.signup(newUser)
            .then((u) => {
                sessionStorage.setItem("userId", u._id);
                sessionStorage.setItem("username", u.username);
                navigate('/profile')
            })
            .catch(e => alert(e));
    const getLoggedInUser = () => {
                const userId = sessionStorage.getItem('userId');
                if (userId && userId !== '') {
                    alert('You are already logged in')
                    navigate('/profile/mytuits');
                } else {
                    navigate('/signup');
                }
            }
          
    useEffect(getLoggedInUser, []);
    return (
        <div>
            <h1>Signup</h1>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, username: e.target.value})}
                   placeholder="username"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, password: e.target.value})}
                   placeholder="password" type="password"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, email: e.target.value})}
                   placeholder="email" type="email"/>
            <button onClick={signup} className="btn btn-primary mb-5 sp-btn">Signup</button>
            <Link className={`btn btn-primary mb-5 sp-btn`} to="/login">Go to Login</Link>
        </div>
    );
}
export default Signup;