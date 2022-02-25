import Footer from "Components/Landing/Footer/Footer.component";

const Content = ({
    handleSignUp,
    heroRef,
    iconsRef,
    workRef,
    workCardRef,
    dailyRewardRef,
    dailyRewardCardRef,
}) => {
    return (
        <section
            id="landing"
            className="landing-container w-100 mx-auto d-flex flex-column"
        >
            {/* HERO SECTION*/}
            <div className="hero-container mx-auto d-flex" ref={heroRef}>
                {/* LEFT OR UP SIDE OF THE HERO SECTION*/}
                <div className="hero-text-container">
                    <div className="intro-text">Introducing</div>
                    <h1 className="title-text">
                        The ultimate gaming platform!
                    </h1>
                    <p className="subtitle-text">
                        Discover rewards and win them for free!
                    </p>
                    {/* <div className="subtitle-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Etiam efficitur lorem et erat convallis, a tempus libero
                        convallis. Aenean maximus nulla quis mi tempus dapibus.
                    </div> */}
                    <button
                        className="register-now-button"
                        onClick={handleSignUp}
                    >
                        Register now!
                    </button>
                    <button className="login-button" onClick={handleSignUp}>
                        Login
                    </button>
                </div>

                {/* RIGHT OR DOWN SIDE OF THE HERO SECTION*/}
                <div className="hero-image-container position-relative">
                    <div className="first-image hero-image position-absolute d-flex justify-content-center align-items-center">
                        <img
                            ref={(elem) => (iconsRef.current[0] = elem)}
                            src={`${window.cdn}temp_img/sample_nft_1.png`}
                            alt="Sample NFT"
                        />
                    </div>
                    <div className="second-image hero-image position-absolute d-flex justify-content-center align-items-center">
                        <img
                            ref={(elem) => (iconsRef.current[1] = elem)}
                            src={`${window.cdn}temp_img/sample_nft_2.png`}
                            alt="Sample NFT"
                        />
                    </div>
                    <div className="third-image hero-image position-absolute d-flex justify-content-center align-items-center">
                        <img
                            ref={(elem) => (iconsRef.current[2] = elem)}
                            src={`${window.cdn}temp_img/sample_nft_3.png`}
                            alt="Sample NFT"
                        />
                    </div>
                </div>
            </div>

            {/* HOW DOES IT WORK SECTION */}
            <div
                className="how-does-it-work-container d-flex mx-auto"
                ref={workRef}
            >
                {/* HOW DOES IT WORK */}
                <h1 className="title-text">HOW DOES IT WORK?</h1>

                {/* FOLLOW STEPS */}
                <p className="subtitle-text">
                    Just follow these 3 simple steps.
                </p>

                {/* STEP 1 2 3*/}
                <div className="multiple-steps-container">
                    {/* STEP 1*/}
                    <div
                        className="step-container"
                        ref={(elem) => {
                            workCardRef.current[0] = elem;
                        }}
                    >
                        <div className="multiple-imgs-container">
                            <img
                                className="frame-1-img-1"
                                src={`${window.cdn}assets/howto_frame1_01.png`}
                                alt="discover rewards"
                            />
                            <img
                                className="frame-1-img-2"
                                src={`${window.cdn}assets/howto_frame1_02.png`}
                                alt="discover rewards"
                            />
                        </div>
                        <div className="step-text">STEP 1</div>
                        <div className="title-text">Discover NFTs</div>
                        <div className="description-text">
                            A wide collection of NFTs waiting just to be
                            discovered.
                        </div>
                    </div>

                    {/* STEP 2*/}
                    <div
                        className="step-container"
                        ref={(elem) => {
                            workCardRef.current[1] = elem;
                        }}
                    >
                        <div className="multiple-imgs-container">
                            <img
                                className="frame-2-img-1"
                                src={`${window.cdn}assets/howto_frame2_01.png`}
                                alt="discover rewards"
                            />
                            <img
                                className="frame-2-img-2"
                                src={`${window.cdn}assets/howto_frame2_02.png`}
                                alt="discover rewards"
                            />
                            <img
                                className="frame-2-img-3"
                                src={`${window.cdn}assets/howto_frame2_03.png`}
                                alt="discover rewards"
                            />
                        </div>
                        <div className="step-text">STEP 2</div>
                        <div className="title-text">Compete in tournaments</div>
                        <div className="description-text">
                            Compete with players around the world and get the
                            highest score to win.
                        </div>
                    </div>

                    {/* STEP 3*/}
                    <div
                        className="step-container"
                        ref={(elem) => {
                            workCardRef.current[2] = elem;
                        }}
                    >
                        <div className="multiple-imgs-container">
                            <img
                                className="frame-3-img-1"
                                src={`${window.cdn}assets/howto_frame3_01.png`}
                                alt="discover rewards"
                            />
                            <img
                                className="frame-3-img-2"
                                src={`${window.cdn}assets/tickets_02.png`}
                                alt="discover rewards"
                            />
                            <img
                                className="frame-3-img-3"
                                src={`${window.cdn}assets/tickets_01.png`}
                                alt="discover rewards"
                            />
                            <img
                                className="frame-3-img-4"
                                src={`${window.cdn}assets/tickets_02.png`}
                                alt="discover rewards"
                            />
                            <img
                                className="frame-3-img-5"
                                src={`${window.cdn}assets/tickets_01.png`}
                                alt="discover rewards"
                            />
                            <img
                                className="frame-3-img-6"
                                src={`${window.cdn}assets/tickets_02.png`}
                                alt="discover rewards"
                            />
                        </div>
                        <div className="step-text">STEP 3</div>
                        <div className="title-text">Win NFTs</div>
                        <div className="description-text">
                            Collect tickets and stand a chance to win the NFT of
                            your choice.
                        </div>
                    </div>
                </div>
            </div>

            {/* THAT'S NOT ALL SECTION*/}
            <div
                className="thats-not-all-container d-flex mx-auto"
                ref={dailyRewardRef}
            >
                <h1 className="title-text">That's not all!</h1>
                <p className="subtitle-text">
                    We’ve got a weekly bonus just for you.
                </p>

                <div
                    className="get-nft-container position-relative"
                    ref={dailyRewardCardRef}
                >
                    <div className="background-img-container position-absolute d-flex flex-row">
                        <img
                            className="left-img"
                            src={`${window.cdn}assets/bonusreward_01.png`}
                            alt="bonus-rewards"
                        />
                        <img
                            className="right-img"
                            src={`${window.cdn}assets/bonusreward_02.png`}
                            alt="bonus-rewards"
                        />
                    </div>

                    <div className="info-container position-absolute d-flex align-items-center flex-column w-100 h-100">
                        <h2 className="title-text">
                            We’re giving out FREE NFTs every week!
                        </h2>
                        <p className="subtitle-text">
                            You heard that right! All you need to do is play any
                            tournaments in the platform and win tickets.
                        </p>
                        <p className="count-down-text d-flex align-items-center justify-content-center">
                            3 days 23 hours 15 minutes left
                        </p>
                        <button
                            className="register-now-button"
                            onClick={handleSignUp}
                        >
                            Register now!
                        </button>
                    </div>
                </div>
            </div>

            {/* TODO AFTER LANDING PAGE HAS DATA TO DISPLAY */}
            {/* CHECK OUT OUR NFTS SECTION*/}
            {/* <div className="check-out-our-nfts-container"></div> */}

            {/* LOGO + ABOUT + TERMS AND CONDITIONS + JOIN COMMUNITY */}
            <Footer />
        </section>
    );
};

export default Content;
