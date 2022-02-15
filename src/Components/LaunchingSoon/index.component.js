import React from "react";
import "./styles.module.scss";

const Index = () => {
    return (
        <section id="coming-soon">
            <div className="container-fluid coming-soon-wrapper">
                <div className="row">
                    <img
                        width={110}
                        className="logo img-fluid"
                        src={`${window.cdn}logo/logo_gamebox.png`}
                        alt="GameBox"
                    />
                    <div className="col-12 d-flex flex-column align-items-center justify-content-center min-vh-100">
                        <h1
                            data-title="Sorry"
                            className="text-center px-2 px-md-0"
                        >
                            Sorry
                        </h1>
                        <p className="mb-2 mb-md-0">
                            GameBox is not available in your country yet.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Index;
