import React from "react";
import { Link, useHistory } from "react-router-dom";
import getFroyoGamesContactUrl from "Utils/GetFroyoGamesContact";
import { useTranslation, Trans } from "react-i18next";

const Index = () => {
    const history = useHistory();
    const { t } = useTranslation();

    return (
        <section className="tnc">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-9">
                        <div className="row">
                            {/* BACK BUTTON */}
                            <div className="col-12 mb-3 mb-md-4">
                                <Link
                                    className="back-button"
                                    to={{
                                        pathname: "/profile/settings",
                                        state: {
                                            prevPath: history.location.pathname,
                                        },
                                    }}
                                >
                                    <img
                                        src={`${window.cdn}buttons/button_back.png`}
                                        alt="back-btn"
                                    />
                                    <span className="ml-2">
                                        {t("btn.back")}
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="row mt-4">
                            {/* MAIN DESCRIPTION */}
                            <div className="col-12 main-desc mb-5">
                                <h4 className="title mb-4">{t("tnc.title")}</h4>
                                <p className="description">
                                    {t("tnc.subtitle1")}
                                </p>
                                <p className="description">
                                    {t("tnc.subtitle2")}
                                </p>
                                <p className="description">
                                    {t("tnc.subtitle3")}
                                </p>
                            </div>
                            {/* PERSONAL INFO */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("tnc.personal_info.title")}
                                </p>
                                <p className="description">
                                    {t("tnc.personal_info.subtitle")}
                                </p>
                            </div>
                            {/* BULLYING & HARASSMENT */}
                            <div className="col-12 mb-4">
                                <p className="title">{t("tnc.bully.title")}</p>
                                <p className="description">
                                    {t("tnc.bully.subtitle")}
                                </p>
                            </div>
                            {/* IMPERSONATING OTHERS */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("tnc.impersonation.title")}
                                </p>
                                <p className="description">
                                    {t("tnc.impersonation.subtitle")}
                                </p>
                            </div>
                            {/* CHEATING AND ABUSE */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("tnc.cheating.title")}
                                </p>
                                <p className="description">
                                    {t("tnc.cheating.subtitle")}
                                </p>
                            </div>
                            {/* DIVERSIIY */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("tnc.diversity.title")}
                                </p>
                                <p className="description">
                                    {t("tnc.diversity.subtitle")}
                                </p>
                            </div>
                            {/* ILLEGAL ACTIVITIES */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("tnc.illegal.title")}
                                </p>
                                <p className="description">
                                    {t("tnc.illegal.subtitle")}
                                </p>
                            </div>
                            {/* CONSEQUENCES */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("tnc.consequences.title")}
                                </p>
                                <p className="description">
                                    {t("tnc.consequences.subtitle1")}
                                </p>
                                <p className="description">
                                    {t("tnc.consequences.subtitle2")}
                                </p>
                                <p className="description">
                                    {t("tnc.consequences.subtitle3")}
                                </p>
                            </div>
                            {/* AUTO-RENEWABLE SUBSCRIPTION */}
                            {/* <div className="col-12 mb-4">
                                    <p className="title">
                                        Auto-Renewable Subscription
                                    </p>
                                    <ul className="description pb-3 px-3 m-0">
                                        <li>
                                            By purchasing the subscription, it
                                            is understood that the subscription
                                            will be automatically renewed unless
                                            turned off or canceled at least
                                            24-hours before the item period
                                            ends.
                                        </li>
                                        <li>
                                            You may cancel your subscription by
                                            proceeding to your Account page on
                                            your respective platform and
                                            choosing to unsubscribe.
                                        </li>
                                        <li>
                                            The cancellation of auto-renewal
                                            will stop subscriptions from the
                                            next cycle. Your current
                                            subscription will still be active
                                            for the remaining duration.
                                        </li>
                                    </ul>
                                </div> */}
                            {/* DATA DELETION REQUEST */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("tnc.data_deletion.title")}
                                </p>
                                <p className="description">
                                    <Trans i18nKey="tnc.data_deletion.subtitle">
                                        0
                                        <a
                                            className="email"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={getFroyoGamesContactUrl()}
                                        >
                                            1
                                        </a>
                                        2
                                    </Trans>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Index;
