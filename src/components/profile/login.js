import {useNavigate,Link} from "react-router-dom";
import {useState, useEffect} from "react";
import * as service from "../../services/auth-service";
import './prof.css';

export const Login = () => {
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate()
    const login = () =>
        service.login(loginUser)
            .then((user) => {
                sessionStorage.setItem("userId", user._id);
                sessionStorage.setItem("username", user.username);
                navigate('/profile/mytuits');
            })
            .catch(e => alert(e));

    const getLoggedInUser = () => {
                const userId = sessionStorage.getItem('userId');
                if (userId && userId !== '') {
                    alert('You are already logged in')
                    navigate('/profile/mytuits');
                } else {
                    navigate('/login');
                }
            }
          
    useEffect(getLoggedInUser, []);
    return (
        <div>
            <h1>Login</h1>
            <input className="mb-2 form-control"
                   onChange={(e) => setLoginUser({...loginUser,
                        username: e.target.value})}
                   placeholder="username"/>
            <input className="mb-2 form-control"
                   onChange={(e) => setLoginUser({...loginUser,
                        password: e.target.value})}
                   placeholder="password" type="password"/>
            <button onClick={login} className="btn btn-primary mb-5 sp-btn">Login</button> 
            <Link className={`btn btn-primary mb-5 sp-btn`} to="/signup">Go To SignUp</Link>
        </div>
    );
};