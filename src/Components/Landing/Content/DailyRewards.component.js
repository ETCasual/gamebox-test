import React from "react";
import { useTranslation } from "react-i18next";

const DailyBonus = ({ dailyRewardRef, setRegistrationInstructionModal }) => {
    const { t } = useTranslation();

    return (
        <div className="container-fluid" id="daily-reward">
            <div
                className="col-12 col-md-10 col-xl-7 mx-auto main-wrapper"
                ref={dailyRewardRef}
            >
                <h1 className="title">{t("landing.daily_rewards.title")}</h1>
                <p className="subtitle">
                    {t("landing.daily_rewards.subtitle")}
                </p>

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
                        {t("landing.daily_rewards.desc_1")}
                    </h2>
                    <p className="subtitle-text mb-4">
                        {t("landing.daily_rewards.desc_2")}
                    </p>
                    <button
                        className="register-now-button"
                        onClick={() => setRegistrationInstructionModal(true)}
                    >
                        {t("landing.btn.register")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DailyBonus;
