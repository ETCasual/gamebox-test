import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadLogin } from "redux/thunks/Login.thunk";
import { useHistory } from "react-router-dom";

const Login = ({ setLoginModal }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });
    const [loginError, setLoginError] = useState("");

    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(loadLogin(loginData, setLoginError, history));
    };

    const handleOnChangeData = (e) => {
        setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div
            id="login"
            className="d-flex flex-column align-items-center justify-content-end min-vw-100 min-vh-100"
        >
            <div className="overlay" onClick={() => setLoginModal(false)} />
            <div className="wrapper w-100 px-4 pt-4 pb-2 text-center">
                <p className="welcome-text mb-2">Welcome back!</p>
                <p className="subtitle mb-4 pb-2">
                    Login with your froyo.games account.
                </p>
                <form
                    onSubmit={handleLoginSubmit}
                    className="d-flex flex-column"
                >
                    <input
                        className="email mb-3 text-center"
                        name="username"
                        type="email"
                        placeholder="Email Address"
                        value={loginData.username}
                        onChange={handleOnChangeData}
                        required
                    />
                    <input
                        className={`password ${
                            loginError.length > 0 ? "mb-3" : "mb-5"
                        } text-center`}
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={handleOnChangeData}
                        required
                    />
                    {loginError.length > 0 && (
                        <p className="mb-5 error text-danger">{loginError}</p>
                    )}
                    <button type="submit" className="submit mb-4">
                        Login
                    </button>
                    <a
                        href="https://staging.froyo.games/forgot-pass"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <p className="forgot-password">Forgot your password?</p>
                    </a>
                </form>
            </div>
        </div>
    );
};

export default Login;
