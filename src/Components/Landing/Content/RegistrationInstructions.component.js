import React, { useEffect } from "react";

const RegistrationInstructions = ({ setRegistrationInstructionModal }) => {
    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    return (
        <div
            id="registration"
            className="d-flex align-items-center justify-content-center"
        >
            <div className="container position-relative">
                <div className="row justify-content-center">
                    <div className="pop-up-wrapper col-12 col-md-8 col-xl-7 px-md-0">
                        {/* CLOSE BUTTON */}
                        <img
                            onClick={() =>
                                setRegistrationInstructionModal(false)
                            }
                            width="36"
                            className="close-button"
                            src={`${window.cdn}buttons/button_close.png`}
                            alt="close-btn"
                        />
                        {/* CONTENT */}
                        <div className="main-wrapper p-3 d-flex flex-column align-items-center justify-content-center">
                            <div className="row">
                                <div className="top text-center">
                                    <p className="title mb-2">
                                        How to register
                                    </p>
                                    <p className="subtitle mb-2">
                                        Here’s a simple guide for you on how to
                                        register with us.
                                    </p>
                                </div>
                            </div>
                            <div className="step-wrapper d-flex flex-column flex-lg-row mt-3 w-100">
                                <div className="col-lg-4 px-2 mb-3 mb-lg-0">
                                    <div className="center">
                                        <div className="number d-flex align-items-center justify-content-center mb-3">
                                            1
                                        </div>
                                        <p className="title">
                                            Register with www.froyo.games
                                        </p>
                                        <p className="description">
                                            Head over to{" "}
                                            <span>
                                                www.froyo.games/registration
                                            </span>{" "}
                                            and create an account.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-4 px-2 mb-3 mb-lg-0">
                                    <div className="center">
                                        <div className="number d-flex align-items-center justify-content-center mb-3">
                                            2
                                        </div>
                                        <p className="title">
                                            Verify your email address
                                        </p>
                                        <p className="description">
                                            Verify your email address once your
                                            account has been created.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-4 px-2 mb-3 mb-lg-0">
                                    <div className="center">
                                        <div className="number d-flex align-items-center justify-content-center mb-3">
                                            3
                                        </div>
                                        <p className="title">
                                            Return to GameBox to login
                                        </p>
                                        <p className="description">
                                            Close all tabs and return to{" "}
                                            <span>www.froyo.games/gamebox</span>{" "}
                                            to continue with your login.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="bottom text-center">
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={
                                            process.env.REACT_APP_NODE_ENV ===
                                            "development"
                                                ? "https://staging.froyo.games/registration"
                                                : "https://froyo.games/registration"
                                        }
                                    >
                                        <p className="mb-0">
                                            Click here to{" "}
                                            <span>
                                                {`www.froyo.games/registration`}
                                            </span>{" "}
                                            to start registering.
                                        </p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationInstructions;
