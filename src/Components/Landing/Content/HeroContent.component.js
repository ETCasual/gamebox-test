import React from "react";

const HeroContent = ({ setLoginModal, setRegistrationInstructionModal }) => {
    return (
        <>
            <p className="intro-text mb-2">Hello and welcome!</p>
            <h1 className="title-text">Discover, Explore and Collect NFT'S!</h1>
            <p className="subtitle-text mt-2 mb-5">
                Discover a wide range of available NFT’s all up for grabs.
                Here’s your chance to explore and collect them now while they’re
                available.
            </p>
            <div className="button-wrapper mb-3">
                <button
                    className="register-now-button w-100 p-3 mb-3"
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
