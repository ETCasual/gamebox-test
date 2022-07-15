import React from "react";

const DailyBonus = ({ dailyRewardRef, setRegistrationInstructionModal }) => {
    return (
        <div className="container-fluid" id="daily-reward">
            <div
                className="col-12 col-md-10 col-xl-7 mx-auto main-wrapper"
                ref={dailyRewardRef}
            >
                <h1 className="title">That's not all!</h1>
                <p className="subtitle">FREE NFT’s for you every week.</p>

                <div className="col-12 position-relative content-wrapper text-center p-3 d-flex flex-column align-items-center justify-content-center">
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

                    <h2 className="title-text mb-4">
                        Get premium NFT’s every week!
                    </h2>
                    <p className="subtitle-text mb-4">
                        Collect tickets automatically for weekly NFT reward when
                        you win in any tournaments!
                    </p>
                    <button
                        className="register-now-button"
                        onClick={() => setRegistrationInstructionModal(true)}
                    >
                        REGISTER NOW!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DailyBonus;
