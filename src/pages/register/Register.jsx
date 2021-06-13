import axios from 'axios';
import {useRef} from 'react';
import { useHistory } from 'react-router';
import "./register.css";
import {Link} from "react-router-dom";

export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Password does not match.");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            };

            try {
                await axios.post("auth/register", user);
                history.push("/login");
            } catch(err) {
                console.log(err);
            }

            

        }
        
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Social App</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around on Social App.
                    </span>
                </div>
                <div className="loginRight" onSubmit={handleClick}>
                    <form className="loginBox">
                        <input type="text" placeholder="Username" required ref={username} className="loginInput" />
                        <input type="email" placeholder="Email" required ref={email} className="loginInput" />
                        <input type="password" placeholder="Password" required ref={password} className="loginInput" minLength="6" />
                        <input type="password" placeholder="Password Again" required ref={passwordAgain} className="loginInput" minLength="6" />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <Link to="/login" className="loginRegisterButton">Log into your account</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
