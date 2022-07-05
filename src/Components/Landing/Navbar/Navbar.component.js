import React from "react";

const Navbar = ({ setLoginModal }) => {
    return (
        <div className="nav-bar position-fixed d-flex align-items-center">
            <div className="blur-background position-absolute w-100 h-100" />
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-xl-8 d-flex align-items-center justify-content-between">
                        <img
                            className="logo"
                            src={`${window.cdn}logo/logo_gamebox.png`}
                            alt="GameBox"
                        />

                        <button
                            className="nav-login"
                            onClick={() => setLoginModal(true)}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
