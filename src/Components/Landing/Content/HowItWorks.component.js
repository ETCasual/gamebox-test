import React from "react";

const HowItWorks = ({ workRef, workCardRef }) => {
    return (
        <div className="container-fluid" id="how-it-works">
            <div
                className="col-12 col-md-10 col-xl-7 mx-auto main-wrapper"
                ref={workRef}
            >
                {/* HOW DOES IT WORK */}
                <h1 className="title">HOW DOES IT WORK?</h1>

                {/* FOLLOW STEPS */}
                <p className="subtitle">Just follow these 3 simple steps.</p>

                {/* STEP 1 2 3*/}
                <div className="col-12 mt-3 px-0">
                    <div className="row">
                        {/* STEP 1 */}
                        <div
                            className="col-12 col-md-4 px-2 work-card text-center mb-3 mb-md-0"
                            ref={(elem) => {
                                workCardRef.current[0] = elem;
                            }}
                        >
                            <div className="card-wrapper p-3">
                                <div className="step-1-img">
                                    <img
                                        src={`${window.cdn}assets/howto_frame1.png`}
                                        alt="discover rewards"
                                    />
                                </div>
                                <div className="w-100 text-left">
                                    <div className="step-text mb-2">STEP 1</div>
                                    <div className="title mb-2">
                                        Discover NFTs
                                    </div>
                                    <div className="description">
                                        A wide collection of NFTs waiting just
                                        to be discovered.
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* STEP 2 */}
                        <div
                            className="col-12 col-md-4 px-2 work-card text-center mb-3 mb-md-0"
                            ref={(elem) => {
                                workCardRef.current[1] = elem;
                            }}
                        >
                            <div className="card-wrapper p-3">
                                <div className="step-2-img">
                                    <img
                                        src={`${window.cdn}assets/howto_frame2.png`}
                                        alt="discover rewards"
                                    />
                                </div>
                                <div className="w-100 text-left text-wrapper">
                                    <div className="step-text mb-2">STEP 2</div>
                                    <div className="title mb-2">
                                        Compete in tournaments
                                    </div>
                                    <div className="description">
                                        Compete with players around the world
                                        and get the highest score to win.
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* STEP 3 */}
                        <div
                            className="col-12 col-md-4 px-2 work-card text-center mb-3 mb-md-0"
                            ref={(elem) => {
                                workCardRef.current[2] = elem;
                            }}
                        >
                            <div className="card-wrapper p-3">
                                <div className="step-3-img">
                                    <img
                                        className="img-fluid"
                                        src={`${window.cdn}assets/howto_frame3_02.png`}
                                        alt="discover rewards"
                                    />
                                </div>
                                <div className="w-100 text-left text-wrapper">
                                    <div className="step-text mb-2">STEP 3</div>
                                    <div className="title mb-2">Win NFTs</div>
                                    <div className="description">
                                        Collect tickets and stand a chance to
                                        win the NFT of your choice.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
