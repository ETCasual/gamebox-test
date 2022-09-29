import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import getFroyoGamesContactUrl from "Utils/GetFroyoGamesContact";
import { Trans, useTranslation } from "react-i18next";

const Index = () => {
    const { config } = useSelector((state) => state.config);

    const history = useHistory();
    const { t } = useTranslation();

    return (
        <section className="tournament-rules">
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
                                <h4 className="title mb-4">
                                    {t("rules.title")}
                                </h4>
                                <small>{t("rules.date")}</small>
                                <p className="subtitle my-4">
                                    {t("rules.subtitle")}
                                </p>
                            </div>
                            {/* GENERAL */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("rules.content.general.title")}
                                </p>
                                <p className="description">
                                    {t("rules.content.general.1")}
                                </p>
                                <p className="description">
                                    {t("rules.content.general.2")}
                                </p>
                                <p className="description">
                                    {t("rules.content.general.3")}
                                </p>
                            </div>
                            {/* PARTICIPANTS */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("rules.content.participants.title")}
                                </p>
                                <p className="description">
                                    {t("rules.content.participants.subtitle")}
                                </p>
                            </div>
                            {/* PRIZE / REWARD / TOURNAMENT PERIOD */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("rules.content.period.title")}
                                </p>
                                <p className="description">
                                    {t("rules.content.period.1")}
                                </p>
                                <p className="description">
                                    {t("rules.content.period.2")}
                                </p>
                                <p className="description">
                                    {t("rules.content.period.3")}
                                </p>
                                <p className="description">
                                    {t("rules.content.period.4")}
                                </p>
                            </div>
                            {/* PARTICIPATION */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("rules.content.participation.title")}
                                </p>
                                <p className="description">
                                    {t("rules.content.participation.subtitle")}
                                </p>
                                <ul className="description pb-3 px-3 m-0">
                                    <li>
                                        {t("rules.content.participation.1")}
                                    </li>
                                    <li>
                                        {t("rules.content.participation.2")}
                                    </li>
                                    <li>
                                        {t("rules.content.participation.3")}
                                    </li>
                                </ul>
                            </div>
                            {/* PRIZE / REWARD AND WINNING A TOURNAMENT */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("rules.content.winning.title")}
                                </p>
                                <ul className="description pb-3 px-3 m-0">
                                    <li>{t("rules.content.winning.1")}</li>
                                    <li>{t("rules.content.winning.2")}</li>
                                </ul>

                                <p className="title">
                                    {t("rules.content.draw.title")}
                                </p>
                                <ul className="description pb-3 px-3 m-0">
                                    <li>{t("rules.content.draw.1")}</li>
                                    <li>{t("rules.content.draw.2")}</li>
                                    <li>{t("rules.content.draw.3")}</li>
                                    <li>{t("rules.content.draw.4")}</li>
                                </ul>

                                <p className="title">
                                    {t("rules.content.bonus_prize.title")}
                                </p>
                                <ul className="description pb-3 px-3 m-0">
                                    <li>{t("rules.content.bonus_prize.1")}</li>
                                    <li>{t("rules.content.bonus_prize.2")}</li>
                                    <li>{t("rules.content.bonus_prize.3")}</li>
                                    <li>{t("rules.content.bonus_prize.4")}</li>
                                    <li>{t("rules.content.bonus_prize.5")}</li>
                                </ul>

                                <p className="title">
                                    {t("rules.content.claims.title")}
                                </p>
                                <ul className="description pb-3 px-3 m-0">
                                    <li>{t("rules.content.claims.1")}</li>
                                    <li>{t("rules.content.claims.2")}</li>
                                    <li>{t("rules.content.claims.3")}</li>
                                    <li>{t("rules.content.claims.4")}</li>
                                    <li>{t("rules.content.claims.5")}</li>
                                    <li>{t("rules.content.claims.6")}</li>
                                    <li>{t("rules.content.claims.7")}</li>
                                    <li>{t("rules.content.claims.8")}</li>
                                    <li>{t("rules.content.claims.9")}</li>
                                    <li>{t("rules.content.claims.10")}</li>
                                    <li>{t("rules.content.claims.11")}</li>
                                    <li>{t("rules.content.claims.12")}</li>
                                    <li>{t("rules.content.claims.13")}</li>
                                    <li>{t("rules.content.claims.14")}</li>
                                    <li>{t("rules.content.claims.15")}</li>
                                </ul>

                                <p className="title">
                                    {t("rules.content.referral.title")}
                                </p>
                                <p className="description">
                                    {t("rules.content.referral.1", {
                                        gemsPerInvite: config.gemsPerInvite,
                                        action:
                                            config.rewardInvitesRank > 1
                                                ? ` reaches level ${config.rewardInvitesRank}`
                                                : "",
                                    })}
                                </p>
                                <p className="description">
                                    {t("rules.content.referral.2")}
                                </p>
                                <p className="description">
                                    {t("rules.content.referral.3")}
                                </p>
                            </div>
                            {/* SUSPEND, MODIFY & TERMINATE */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("rules.content.right_to_suspend.title")}
                                </p>
                                <p className="description">
                                    {t(
                                        "rules.content.right_to_suspend.subtitle"
                                    )}
                                </p>
                            </div>
                            {/* PROPERTY RIGHTS */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("rules.content.confidentiality.title")}
                                </p>
                                <p className="description">
                                    {t("rules.content.confidentiality.1")}
                                </p>
                                <p className="description">
                                    {t("rules.content.confidentiality.2")}
                                </p>
                                <p className="description">
                                    {t("rules.content.confidentiality.3")}
                                </p>
                                <p className="description">
                                    {t("rules.content.confidentiality.4")}
                                </p>
                                <p className="description">
                                    {t("rules.content.confidentiality.5")}
                                </p>
                                <p className="description">
                                    {t("rules.content.confidentiality.6")}
                                </p>
                            </div>
                            {/* LIMITATION OF LIABILITY & RELEASE */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("rules.content.limitation.title")}
                                </p>
                                <p className="description">
                                    {t("rules.content.limitation.subtitle")}
                                </p>
                            </div>
                            {/* PRIVACY & PUBLIC RELEASE */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("rules.content.release.title")}
                                </p>
                                <p className="description">
                                    {t("rules.content.release.subtitle")}
                                </p>
                            </div>
                            {/* GENERAL CONDITIONS */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("rules.content.conditions.title")}
                                </p>
                                <p className="description">
                                    {t("rules.content.conditions.1")}
                                </p>
                                <p className="description">
                                    {t("rules.content.conditions.2")}
                                </p>

                                <p className="description">
                                    <Trans i18nKey="rules.content.conditions.3">
                                        {/* HACK: Trick the compile to think this as an element to render proper style */}
                                        <>0</>
                                        <a
                                            className="email"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={getFroyoGamesContactUrl()}
                                        >
                                            1
                                        </a>
                                    </Trans>
                                </p>
                            </div>
                            {/* CONTACT */}
                            {/* <div className="col-12 mb-4">
                                    <p className="title">Contacting Us</p>
                                    <p className="description">
                                        If you have any questions regarding our
                                        privacy policy or our practices, please
                                        contact us at{" "}
                                        <a
                                            className="email"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={getFroyoGamesContactUrl()}
                                        >
                                            Froyo Games
                                        </a>
                                        .
                                    </p>
                                </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Index;
