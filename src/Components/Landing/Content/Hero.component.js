import React from "react";
import HeroContent from "Components/Landing/Content/HeroContent.component";
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";
// import HeroCarousel from "Components/Landing/Content/HeroCarousel.component";

const Hero = ({ heroRef, setLoginModal, setRegistrationInstructionModal }) => {
    return (
        <div
            className="container-fluid d-flex align-items-center justify-content-center px-2"
            id="hero"
        >
            {/* THUMBNAIL */}
            <div className="background">
                <ThumbnailMedia
                    className="thumbnail"
                    url={`${window.cdn}landing_samples/froyo_01.jpg`}
                    isPlayVideo={false}
                />
            </div>

            <div
                className="col-12 col-md-10 col-xl-7 mx-auto main-wrapper"
                ref={heroRef}
            >
                <div className="row">
                    {/* HERO TEXT */}
                    <div className="col-12 col-md-5 d-flex flex-column align-items-start justify-content-center content-wrapper order-2 order-md-1">
                        <HeroContent
                            setLoginModal={setLoginModal}
                            setRegistrationInstructionModal={
                                setRegistrationInstructionModal
                            }
                        />
                    </div>
                    {/* CAROUSEL */}
                    {/* <div className="col-12 col-md-7 d-flex flex-column align-items-end justify-content-end carousel-wrapper px-0 px-md-2 order-1 order-md-2">
                        <HeroCarousel />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Hero;
