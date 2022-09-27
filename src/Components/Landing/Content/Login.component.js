import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadLogin } from "redux/thunks/Login.thunk";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = ({ setLoginModal, setIsFirstEncounter }) => {
    const { t } = useTranslation();

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
        setIsFirstEncounter(false);
        dispatch(loadLogin(loginData, setLoginError, history));
    };

    const handleOnChangeData = (e) => {
        setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div
            id="login"
            className="d-flex flex-column align-items-center justify-content-end min-vw-100 min-vh-100 w-100"
        >
            <div className="overlay" onClick={() => setLoginModal(false)} />
            <div className="wrapper w-100 px-4 pt-4 pb-2 text-center">
                <p className="welcome-text mb-2">
                    {t("landing.login.welcome")}
                </p>
                <p className="subtitle mb-4 pb-2">
                    {t("landing.login.subtitle")}
                </p>
                <form
                    onSubmit={handleLoginSubmit}
                    className="d-flex flex-column"
                >
                    <input
                        className="email mb-3 text-center"
                        name="username"
                        type="email"
                        placeholder={t("landing.login.email")}
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
                        placeholder={t("landing.login.password")}
                        onChange={handleOnChangeData}
                        required
                    />
                    {loginError.length > 0 && (
                        <p className="mb-5 error text-danger">{loginError}</p>
                    )}
                    <button type="submit" className="submit mb-4">
                        {t("landing.login.btn.login")}
                    </button>
                    <a
                        href={`${process.env.REACT_APP_FROYO_WEB_URL}/forgot-pass`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <p className="forgot-password">
                            {t("landing.login.forgot_password")}
                        </p>
                    </a>
                </form>
            </div>
        </div>
    );
};

export default Login;
