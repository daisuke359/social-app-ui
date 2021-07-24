import React, { useRef, useContext } from 'react';
import "./login.css";
import {loginCall} from "../../apiCalls";
import { AuthContext } from '../../context/AuthContext';
import {CircularProgress} from "@material-ui/core";
import {Link} from "react-router-dom";

export default function Login() {

    const email = useRef();
    const password = useRef();
    const { isFetching, dispatch} = useContext(AuthContext);


    const handleClick = (e) => {
        e.preventDefault();
        loginCall({email: email.current.value, password: password.current.value}, dispatch);
        email.current.value="";
        password.current.value="";
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
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input type="email" required placeholder="Email" className="loginInput" ref={email} />
                        <input type="password" minLength="6" required placeholder="Password" className="loginInput" ref={password} />
                        <button className="loginButton">{isFetching ? <CircularProgress/> : "Log in"}</button>
                        <span className="loginForgot">Forgot your password?</span>
                        <Link to="/" className="loginRegisterButton">Create a new account</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
