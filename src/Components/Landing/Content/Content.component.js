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
            <div className="hero-container d-flex" ref={heroRef}>
                {/* LEFT OR UP SIDE OF THE HERO SECTION*/}
                <div className="hero-text-container">
                    <div className="intro-text">Introducing</div>
                    <h1 className="title-text">
                        The Ultimate Gaming Platform!
                    </h1>
                    <div className="subtitle-text">
                        Discover rewards and win them for free!
                    </div>
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
                            src="https://gamebox-froyo.s3.ap-southeast-1.amazonaws.com/app/assets/illustrations/sample_nft_1.png"
                            alt="Sample NFT"
                        />
                    </div>
                    <div className="second-image hero-image position-absolute d-flex justify-content-center align-items-center">
                        <img
                            src="https://gamebox-froyo.s3.ap-southeast-1.amazonaws.com/app/assets/illustrations/sample_nft_2.png"
                            alt="Sample NFT"
                        />
                    </div>
                    <div className="third-image hero-image position-absolute d-flex justify-content-center align-items-center">
                        <img
                            src="https://gamebox-froyo.s3.ap-southeast-1.amazonaws.com/app/assets/illustrations/sample_nft_3.png"
                            alt="Sample NFT"
                        />
                    </div>
                </div>
            </div>

            {/* HOW DOES IT WORK SECTION */}
            <div className="how-does-it-work-container d-flex" ref={workRef}>
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
                                src={`${window.cdn}illustrations/howto_frame1_01.png`}
                                alt="discover rewards"
                            />
                            <img
                                className="frame-1-img-2"
                                src={`${window.cdn}illustrations/howto_frame1_02.png`}
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
                                src={`${window.cdn}illustrations/howto_frame2_01.png`}
                                alt="discover rewards"
                            />
                            <img
                                className="frame-2-img-2"
                                src={`${window.cdn}illustrations/howto_frame2_02.png`}
                                alt="discover rewards"
                            />
                            <img
                                className="frame-2-img-3"
                                src={`${window.cdn}illustrations/howto_frame2_03.png`}
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
                                src={`${window.cdn}illustrations/howto_frame3_01.png`}
                                alt="discover rewards"
                            />
                            <img
                                className="frame-3-img-2"
                                src={`${window.cdn}illustrations/tickets_02.png`}
                                alt="discover rewards"
                            />
                            <img
                                className="frame-3-img-3"
                                src={`${window.cdn}illustrations/tickets_01.png`}
                                alt="discover rewards"
                            />
                            <img
                                className="frame-3-img-4"
                                src={`${window.cdn}illustrations/tickets_02.png`}
                                alt="discover rewards"
                            />
                            <img
                                className="frame-3-img-5"
                                src={`${window.cdn}illustrations/tickets_01.png`}
                                alt="discover rewards"
                            />
                            <img
                                className="frame-3-img-6"
                                src={`${window.cdn}illustrations/tickets_02.png`}
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
                className="thats-not-all-container d-flex"
                ref={dailyRewardRef}
            >
                <div className="daily-reward w-100 my-5">
                    <h1 className="title mb-1">That's not all!</h1>
                    <p className="subtitle">FREE NFTs for you every week.</p>
                    <div
                        className="col-12 wrapper text-center d-flex align-items-center justify-content-center"
                        ref={dailyRewardCardRef}
                    >
                        <div className="w-100 p-3 ">
                            <h2>Get premium NFTs every week!</h2>
                            <p>
                                Collect tickets automatically for weekly NFT
                                reward when you win in any tournaments!
                            </p>
                            <div className="d-flex align-items-start flex-column ">
                                {/* <button className="countdown-button mb-4">
                                            3 days 23 hours 15 minutes left
                                        </button> */}
                                <button
                                    className="register-now-button mt-4 "
                                    onClick={handleSignUp}
                                >
                                    Register now!
                                </button>
                            </div>
                        </div>

                        <img
                            className="icon icon-1 d-none d-md-block"
                            src={`${window.cdn}illustrations/bonus_04.png`}
                            alt="bonus_04"
                        />
                        <img
                            className="icon icon-2 d-none d-md-block"
                            src={`${window.cdn}illustrations/bonus_05.png`}
                            alt="bonus_05"
                        />
                        <img
                            className="icon icon-1 d-block d-md-none"
                            src={`${window.cdn}illustrations/bonus_01.png`}
                            alt="bonus_01"
                        />
                        <img
                            className="icon icon-2 d-block d-md-none"
                            src={`${window.cdn}illustrations/bonus_02.png`}
                            alt="bonus_02"
                        />
                    </div>
                </div>
            </div>

            {/* CHECK OUT OUR NFTS SECTION*/}
            <div className="check-out-our-nfts-container"></div>

            {/* LOGO + ABOUT + TERMS AND CONDITIONS + JOIN COMMUNITY */}
            <Footer />
        </section>
    );
};

export default Content;
