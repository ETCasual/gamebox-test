import React from "react";
import { useTranslation } from "react-i18next";

const HeroContent = ({ setLoginModal, setRegistrationInstructionModal }) => {
    const { t } = useTranslation();

    return (
        <>
            <p className="intro-text mb-2">{t("hero_content.welcome")}</p>

            {/* <p className="intro-text mb-2">Hello and welcome!</p> */}
            <h1 className="title-text">Discover, Explore, and Collect NFTs!</h1>
            <p className="subtitle-text mt-2 mb-5">
                Discover a wide selection of available NFTs. Now is your chance
                to explore and collect them while they are still available.
            </p>
            <div className="button-wrapper mb-3">
                <button
                    className="register-now-button w-100 p-3 mb-3"
                    onClick={() => setRegistrationInstructionModal(true)}
                >
                    REGISTER NOW!
                </button>
            </div>
        </>
    );
};

export default HeroContent;
