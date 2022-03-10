import React from "react";
import HeroContent from "Components/Landing/Content/HeroContent.component";
import HeroCarousel from "Components/Landing/Content/HeroCarousel.component";

const Hero = ({ heroRef, setLoginModal }) => {
    return (
        <div
            className="container-fluid d-flex align-items-start justify-content-between align-items-md-center justify-content-md-center px-0 px-md-2"
            id="hero"
        >
            <div
                className="col-12 col-md-10 col-xl-7 mx-auto main-wrapper"
                ref={heroRef}
            >
                <div className="row">
                    {/* HERO TEXT */}
                    <div className="col-12 col-md-5 d-flex flex-column align-items-start justify-content-center content-wrapper order-2 order-md-1">
                        <HeroContent setLoginModal={setLoginModal} />
                    </div>
                    {/* CAROUSEL */}
                    <div className="col-12 col-md-7 d-flex flex-column align-items-end justify-content-end carousel-wrapper px-0 px-md-2 order-1 order-md-2">
                        <HeroCarousel />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
