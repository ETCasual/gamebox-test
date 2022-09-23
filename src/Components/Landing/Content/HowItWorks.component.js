import React from "react";
import { useTranslation } from "react-i18next";

const HowItWorks = ({ workRef, workCardRef }) => {
    const { t } = useTranslation();

    return (
        <div className="container-fluid" id="how-it-works">
            <div
                className="col-12 col-md-10 col-xl-7 mx-auto main-wrapper"
                ref={workRef}
            >
                {/* HOW DOES IT WORK */}
                <h1 className="title">{t("landing.how_it_works.title")}</h1>

                {/* FOLLOW STEPS */}
                <p className="subtitle">{t("landing.how_it_works.subtitle")}</p>

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
                                    <div className="step-text mb-2">
                                        {t("landing.how_it_works.step_1.step")}
                                    </div>
                                    <div className="title mb-2">
                                        {t("landing.how_it_works.step_1.title")}
                                    </div>
                                    <div className="description">
                                        {t("landing.how_it_works.step_1.desc")}
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
                                    <div className="step-text mb-2">
                                        {t("landing.how_it_works.step_2.step")}
                                    </div>
                                    <div className="title mb-2">
                                        {t("landing.how_it_works.step_2.title")}
                                    </div>
                                    <div className="description">
                                        {t("landing.how_it_works.step_2.desc")}
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
                                    <div className="step-text mb-2">
                                        {t("landing.how_it_works.step_3.step")}
                                    </div>
                                    <div className="title mb-2">
                                        {t("landing.how_it_works.step_3.title")}
                                    </div>
                                    <div className="description">
                                        {t("landing.how_it_works.step_3.desc")}
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
