import React, { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";

const RegistrationInstructions = ({ setRegistrationInstructionModal }) => {
    const { t } = useTranslation();

    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    return (
        <div
            id="registration"
            className="d-flex align-items-center justify-content-center"
        >
            <div className="container position-relative">
                <div className="row justify-content-center">
                    <div className="pop-up-wrapper col-12 col-md-8 col-xl-7 px-md-0">
                        {/* CLOSE BUTTON */}
                        <img
                            onClick={() =>
                                setRegistrationInstructionModal(false)
                            }
                            width="36"
                            className="close-button"
                            src={`${window.cdn}buttons/button_close.png`}
                            alt="close-btn"
                        />
                        {/* CONTENT */}
                        <div className="main-wrapper p-3 d-flex flex-column align-items-center justify-content-center">
                            <div className="row">
                                <div className="top text-center">
                                    <p className="title mb-2">
                                        {t("landing.register.title")}
                                    </p>
                                    <p className="subtitle mb-2">
                                        {t("landing.register.subtitle")}
                                    </p>
                                </div>
                            </div>
                            <div className="step-wrapper d-flex flex-column flex-lg-row mt-3 w-100">
                                <div className="col-lg-4 px-2 mb-3 mb-lg-0">
                                    <div className="center">
                                        <div className="number d-flex align-items-center justify-content-center mb-3">
                                            1
                                        </div>
                                        <p className="title">
                                            {t("landing.register.step_1.title")}
                                        </p>
                                        <p className="description">
                                            <Trans i18nKey="landing.register.step_1.desc">
                                                Head over to
                                                <a
                                                    className="link"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={`${process.env.REACT_APP_FROYO_WEB_URL}/registration`}
                                                >
                                                    www.froyo.games/registration
                                                </a>
                                                and create an account.
                                            </Trans>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-4 px-2 mb-3 mb-lg-0">
                                    <div className="center">
                                        <div className="number d-flex align-items-center justify-content-center mb-3">
                                            2
                                        </div>
                                        <p className="title">
                                            {t("landing.register.step_2.title")}
                                        </p>
                                        <p className="description">
                                            {t("landing.register.step_2.desc")}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-4 px-2 mb-3 mb-lg-0">
                                    <div className="center">
                                        <div className="number d-flex align-items-center justify-content-center mb-3">
                                            3
                                        </div>
                                        <p className="title">
                                            {t("landing.register.step_3.title")}
                                        </p>
                                        <p className="description">
                                            <Trans i18nKey="landing.register.step_3.desc">
                                                Close all tabs and return to
                                                <a
                                                    className="link"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={`${process.env.REACT_APP_FROYO_WEB_URL}/gamebox`}
                                                >
                                                    www.froyo.games/gamebox
                                                </a>
                                                to continue with your login.
                                            </Trans>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="bottom text-center">
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={`${process.env.REACT_APP_FROYO_WEB_URL}/registration`}
                                    >
                                        <p className="mb-0">
                                            <Trans i18nKey="landing.register.register_url">
                                                Click
                                                <span className="link">
                                                    here
                                                </span>
                                                to start registering.
                                            </Trans>
                                        </p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationInstructions;
