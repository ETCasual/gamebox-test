// REACT, REDUX & 3RD PARTY LIBRARIES
import React from "react";

// COMPONENTS
import Navbar from "Components/Landing/Navbar/Navbar.component";

// HELPER FUNCTION

const Index = () => {
    return (
        <>
            {/* TOP NAVIGATION BAR */}
            <Navbar setLoginModal={null} />

            <section id="not_found_page">
                <div className="container-fluid px-0">
                    <div className="col-12 col-md-10 col-xl-7 mx-auto main-wrapper">
                        <div className="row-col justify-content-center text-center">
                            <div className="col">
                                <img
                                    src="https://www.froyo.games/assets/img/error.png"
                                    alt="error"
                                />
                            </div>

                            <div className="col my-5">
                                <p className="title">
                                    Error 404 : Page Not Found
                                </p>
                            </div>

                            <div className="col">
                                <p>
                                    The page you are looking for might have been
                                    removed had its
                                    <br /> name changed or is temporarily
                                    unavailable.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Index;
