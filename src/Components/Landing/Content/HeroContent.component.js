import React from "react";

const HeroContent = ({ setLoginModal, setRegistrationInstructionModal }) => {
    return (
        <>
            <p className="intro-text mb-2">Introducing</p>
            <h1 className="title-text">The ultimate gaming platform!</h1>
            <p className="subtitle-text mt-2 mb-5">
                Discover rewards and win them for free!
            </p>
            <div className="button-wrapper mb-3">
                <button
                    className="register-now-button w-100 p-3 mb-2"
                    onClick={() => setRegistrationInstructionModal(true)}
                >
                    Register now!
                </button>
                <button
                    className="login-button w-100 p-3"
                    onClick={() => setLoginModal(true)}
                >
                    Login
                </button>
            </div>
        </>
    );
};

export default HeroContent;
