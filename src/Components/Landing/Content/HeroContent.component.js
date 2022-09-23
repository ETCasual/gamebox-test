import React from "react";
import { useTranslation } from "react-i18next";

const HeroContent = ({ setLoginModal, setRegistrationInstructionModal }) => {
    const { t } = useTranslation();

    return (
        <>
            <p className="intro-text mb-2">
                {t("landing.hero_content.welcome")}
            </p>
            <h1 className="title-text">{t("landing.hero_content.title")}</h1>
            <p className="subtitle-text mt-2 mb-5">
                {t("landing.hero_content.subtitle")}
            </p>
            <div className="button-wrapper mb-3">
                <button
                    className="register-now-button w-100 p-3 mb-3"
                    onClick={() => setRegistrationInstructionModal(true)}
                >
                    {t("landing.btn.register")}
                </button>
            </div>
        </>
    );
};

export default HeroContent;
