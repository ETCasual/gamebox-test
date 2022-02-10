import React from "react";

const Navbar = ({ handleSignUp }) => {
    return (
        <>
            <div className="blur-overlay" />
            <div className="landing-nav">
                <div className="col-12 col-md-10 col-lg-8 col-xl-8 mx-auto d-flex flex-row justify-content-center wrapper">
                    <div className="col px-0 d-flex align-items-center">
                        <img
                            className="img-fluid logo"
                            src={`${window.cdn}art_assets/logo/logo_esportsmini.png`}
                            alt="Esports Mini"
                        />
                    </div>
                    <div className="col px-0 d-flex align-items-center justify-content-end">
                        <button className="sign-in" onClick={handleSignUp}>
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
