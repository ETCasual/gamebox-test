import Footer from "Components/Landing/Footer/Footer.component";

const Content = ({
    handleSignUp,
    heroRef,
    iconsRef,
    workRef,
    workCardRef,
    dailyRewardRef,
    dailyRewardCardRef
}) => {
    return (
        <section id="landing">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-8 mx-auto d-flex flex-column justify-content-center">
                        {/* HERO */}
                        <div
                            className="hero w-100 text-center p-4 d-flex flex-column align-items-center justify-content-center"
                            ref={heroRef}
                        >
                            <p className="intro mt-4 mb-0">Introducing</p>
                            <h1 className="title my-2">
                                THE ULTIMATE GAMING PLATFORM
                            </h1>
                            <p className="subtitle">
                                Discover rewards and win them for free!
                            </p>
                            <button className="signup" onClick={handleSignUp}>
                                Sign up now!
                            </button>
                            {/* ICONS */}
                            <img
                                ref={(elem) => (iconsRef.current[0] = elem)}
                                className="icon icon-1"
                                src={`${window.cdn}art_assets/illustrations/bonus_04.png`}
                                alt="icon_01"
                            />
                            <img
                                ref={(elem) => (iconsRef.current[1] = elem)}
                                className="icon icon-2"
                                src={`${window.cdn}art_assets/illustrations/landing_rewards.png`}
                                alt="icon_02"
                            />
                            <img
                                ref={(elem) => (iconsRef.current[2] = elem)}
                                className="icon game-icon-0"
                                src={`${window.cdn}art_assets/illustrations/landing_game.png`}
                                alt="game-controller"
                            />
                            <img
                                ref={(elem) => (iconsRef.current[3] = elem)}
                                className="icon game-icon-1"
                                src={`${window.cdn}art_assets/illustrations/landing_gameicon_01.png`}
                                alt="game-1"
                            />
                            <img
                                ref={(elem) => (iconsRef.current[4] = elem)}
                                className="icon game-icon-2"
                                src={`${window.cdn}art_assets/illustrations/landing_gameicon_02.png`}
                                alt="game-2"
                            />
                            <img
                                ref={(elem) => (iconsRef.current[5] = elem)}
                                className="icon game-icon-3"
                                src={`${window.cdn}art_assets/illustrations/landing_gameicon_03.png`}
                                alt="game-3"
                            />
                            <img
                                ref={(elem) => (iconsRef.current[6] = elem)}
                                className="icon game-icon-4"
                                src={`${window.cdn}art_assets/illustrations/landing_gameicon_04.png`}
                                alt="game-4"
                            />
                            <img
                                ref={(elem) => (iconsRef.current[7] = elem)}
                                className="icon game-icon-5"
                                src={`${window.cdn}art_assets/illustrations/landing_gameicon_05.png`}
                                alt="game-5"
                            />
                        </div>
                        {/* WORK */}
                        <div className="works w-100 mt-5" ref={workRef}>
                            <h1 className="title mb-1">How it works?</h1>
                            <p className="subtitle">
                                Discover prizes, play games and win them.
                            </p>
                            <div className="row">
                                <div className="col-12 col-md-4 px-md-2">
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
                                            Discover Rewards
                                        </h5>
                                        <p className="description">
                                            Discover and choose from a variety
                                            Of rewards
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
                                        <h5 className="title">Play Games</h5>
                                        <p className="description">
                                            Compete with players around the
                                            world and get the highest score to
                                            win
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
                                        <h5 className="title">Win Rewards</h5>
                                        <p className="description">
                                            Collect tickets and stand a chance
                                            To win the reward of your dreams
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
                                Get FREE rewards everyday
                            </p>
                            <div
                                className="col-12 wrapper text-center d-flex align-items-center justify-content-center"
                                ref={dailyRewardCardRef}
                            >
                                <div className="w-100 p-3">
                                    <h2>Daily Bonus Reward</h2>
                                    <p>
                                        Get tickets automatically for daily
                                        bonus reward when you win in any
                                        tournaments!
                                    </p>
                                    <button onClick={handleSignUp}>
                                        Sign up now!
                                    </button>
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
                        {/* FOOTER */}
                        <Footer />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Content;
