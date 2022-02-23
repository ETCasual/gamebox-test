import React from "react";

const Navbar = ({ handleSignUp }) => {
    return (
        <div className="nav-bar position-fixed">
            <div className="position-relative w-100 h-100">
                <div className="blur-background position-absolute w-100 h-100"></div>
                <div className="items position-absolute d-flex flex-row align-items-center justify-content-between h-100 mx-auto">
                    <div className="logo-img-wrapper">
                        <img
                            className="logo"
                            src={`${window.cdn}logo/logo_gamebox.png`}
                            alt="GameBox"
                        />
                    </div>
                    <div className="login-button-wrapper">
                        <button className="nav-login" onClick={handleSignUp}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
