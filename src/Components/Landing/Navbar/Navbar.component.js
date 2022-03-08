import React from "react";

const Navbar = () => {
    return (
        <div className="nav-bar position-fixed d-flex align-items-center">
            <div className="blur-background position-absolute w-100 h-100" />
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-xl-7 d-flex align-items-center justify-content-between">
                        <img
                            className="logo"
                            src={`${window.cdn}logo/logo_gamebox.png`}
                            alt="GameBox"
                        />
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={process.env.REACT_APP_NODE_ENV === 'development' ? 'https://staging.froyo.games/login' :  "https://froyo.games/login"}
                        >
                            <button className="nav-login">Login</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
