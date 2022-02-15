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
        <section id="landing">
            <div className="container-fluid">
                <div className="row">
                    {/* HERO */}
                    <div className="hero  d-flex flex-column" ref={heroRef}>
                        <p className="intro mt-4 mb-0">Introducing</p>
                        <h1 className="title my-2">
                            THE ULTIMATE<br></br>GAMING PLATFORM
                        </h1>
                        <p className="subtitle mb-5">
                            Discover rewards and win them for free!<br></br>
                            {/* adipiscing elit. Etiam efficitur lorem et erat
                            <br></br>
                            convallis, a tempus libero convallis. Aenean
                            <br></br>
                            maximus nulla quis mi tempus dapibus. */}
                        </p>
                        <button
                            className="register-now-button mb-4 mt-2"
                            onClick={handleSignUp}
                        >
                            Register now!
                        </button>
                        <button className="login-button" onClick={handleSignUp}>
                            Login
                        </button>

                        {/*SAMPLE IMAGES*/}
                        {/* <img
                            ref={(elem) => (iconsRef.current[0] = elem)}
                            className="icon icon-1"
                            src={`https://drive.google.com/file/d/1xHQOgSBi-CxaqUm1V_5hKFkZ2bHZH0uJ/view?usp=sharing`}
                            alt="sample-image-1"
                        />

                        <img
                            ref={(elem) => (iconsRef.current[0] = elem)}
                            className="icon icon-1"
                            src={`https://drive.google.com/file/d/1wQYDR0uWmqqXR0KY1dLeNDWrGQQFfWO6/view?usp=sharing`}
                            alt="sample-image-2"
                        />
                         <img
                            ref={(elem) => (iconsRef.current[0] = elem)}
                            className="icon icon-1"
                            src="https://drive.google.com/file/d/1xHQOgSBi-CxaqUm1V_5hKFkZ2bHZH0uJ/view?usp=sharing"
                            alt="sample-image-3"
                        /> */}
                        {/* ICONS */}
                        {/* <img
                                ref={(elem) => (iconsRef.current[0] = elem)}
                                className="icon icon-1"
                                src={`${window.cdn}art_assets/illustrations/bonus_04.png`}
                                alt="icon_01"
                            /> */}
                        {/* <img
                                ref={(elem) => (iconsRef.current[1] = elem)}
                                className="icon icon-2"
                                src={`${window.cdn}art_assets/illustrations/landing_rewards.png`}
                                alt="icon_02"
                            /> */}
                        {/* <img
                                ref={(elem) => (iconsRef.current[2] = elem)}
                                className="icon game-icon-0"
                                src={`${window.cdn}art_assets/illustrations/landing_game.png`}
                                alt="game-controller"
                            /> */}
                        {/* <img
                                ref={(elem) => (iconsRef.current[3] = elem)}
                                className="icon game-icon-1"
                                src={`${window.cdn}art_assets/illustrations/landing_gameicon_01.png`}
                                alt="game-1"
                            /> */}
                        {/* <img
                                ref={(elem) => (iconsRef.current[4] = elem)}
                                className="icon game-icon-2"
                                src={`${window.cdn}art_assets/illustrations/landing_gameicon_02.png`}
                                alt="game-2"
                            /> */}
                        {/* <img
                                ref={(elem) => (iconsRef.current[5] = elem)}
                                className="icon game-icon-3"
                                src={`${window.cdn}art_assets/illustrations/landing_gameicon_03.png`}
                                alt="game-3"
                            /> */}
                        {/* <img
                                ref={(elem) => (iconsRef.current[6] = elem)}
                                className="icon game-icon-4"
                                src={`${window.cdn}art_assets/illustrations/landing_gameicon_04.png`}
                                alt="game-4"
                            /> */}
                        {/* <img
                                ref={(elem) => (iconsRef.current[7] = elem)}
                                className="icon game-icon-5"
                                src={`${window.cdn}art_assets/illustrations/landing_gameicon_05.png`}
                                alt="game-5"
                            /> */}
                    </div>
                    <div className="col-12 col-md-10 col-lg-8 col-xl-8 mx-auto d-flex flex-column justify-content-center">
                        {/* WORK */}
                        <div className="works w-100 mt-5" ref={workRef}>
                            <h1 className="title mb-1">HOW IT WORKS?</h1>
                            <p className="subtitle">
                                Just follow these 3 simple steps.
                            </p>
                            <div className="row d-flex justify-content-center">
                                <div className="col-12 col-md-4 px-md-4">
                                    <div
                                        className="work-card"
                                        ref={(elem) => {
                                            workCardRef.current[0] = elem;
                                        }}
                                    >
                                        <img
                                            className="img-fluid"
                                            src={`${window.cdn}art_assets/illustrations/steps_01.png`}
                                            alt="discover rewards"
                                        />
                                        <p className="mb-2 step">STEP 1</p>
                                        <h5 className="title">
                                            Discover NFT’s
                                        </h5>
                                        <p className="description">
                                            A wide collection of NFT’s waiting
                                            just to be discovered.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4 px-md-2">
                                    <div
                                        className="work-card"
                                        ref={(elem) => {
                                            workCardRef.current[1] = elem;
                                        }}
                                    >
                                        <img
                                            className="img-fluid"
                                            src={`${window.cdn}art_assets/illustrations/steps_02.png`}
                                            alt="play games"
                                        />
                                        <p className="mb-2 step">STEP 2</p>
                                        <h5 className="title">
                                            Compete in tournaments
                                        </h5>
                                        <p className="description">
                                            Compete with players around the
                                            world and get the highest score to
                                            win.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4 px-md-2">
                                    <div
                                        className="work-card"
                                        ref={(elem) => {
                                            workCardRef.current[2] = elem;
                                        }}
                                    >
                                        <img
                                            className="img-fluid"
                                            src={`${window.cdn}art_assets/illustrations/steps_03.png`}
                                            alt="win rewards"
                                        />
                                        <p className="mb-2 step">STEP 3</p>
                                        <h5 className="title">Win NFT’s</h5>
                                        <p className="description">
                                            Collect tickets and stand a chance
                                            to win the NFT of your choice.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* DAILY BONUS REWARD */}
                        <div
                            className="daily-reward w-100 my-5"
                            ref={dailyRewardRef}
                        >
                            <h1 className="title mb-1">That's not all!</h1>
                            <p className="subtitle">
                                FREE NFT’s for you every week.
                            </p>
                            <div
                                className="col-12 wrapper text-center d-flex align-items-center justify-content-center"
                                ref={dailyRewardCardRef}
                            >
                                <div className="w-100 p-3 ">
                                    <h2>Get premium NFT’s every week!</h2>
                                    <p>
                                        Collect tickets automatically for weekly
                                        NFT reward when you win in any
                                        tournaments!
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
                                    src={`${window.cdn}art_assets/illustrations/bonus_04.png`}
                                    alt="bonus_04"
                                />
                                <img
                                    className="icon icon-2 d-none d-md-block"
                                    src={`${window.cdn}art_assets/illustrations/bonus_05.png`}
                                    alt="bonus_05"
                                />
                                <img
                                    className="icon icon-1 d-block d-md-none"
                                    src={`${window.cdn}art_assets/illustrations/bonus_01.png`}
                                    alt="bonus_01"
                                />
                                <img
                                    className="icon icon-2 d-block d-md-none"
                                    src={`${window.cdn}art_assets/illustrations/bonus_02.png`}
                                    alt="bonus_02"
                                />
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            {/* FOOTER */}
            <Footer />
        </section>
    );
};

export default Content;
