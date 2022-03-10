import React from "react";

const HeroContent = ({ setLoginModal }) => {
    return (
        <>
            <p className="intro-text mb-2">Introducing</p>
            <h1 className="title-text">The ultimate gaming platform!</h1>
            <p className="subtitle-text mt-2 mb-5">
                Discover rewards and win them for free!
            </p>
            <a
                target="_blank"
                rel="noreferrer"
                href={
                    process.env.REACT_APP_NODE_ENV === "development"
                        ? "https://staging.froyo.games/registration"
                        : "https://froyo.games/registration"
                }
                className="button-wrapper mb-3"
            >
                <button className="register-now-button w-100 p-3">
                    Register now!
                </button>
            </a>

            <button
                className="login-button p-3"
                onClick={() => setLoginModal(true)}
            >
                Login
            </button>
        </>
    );
};

export default HeroContent;
