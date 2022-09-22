import React from "react";
import { Link, useHistory } from "react-router-dom";
import getFroyoGamesContactUrl from "Utils/GetFroyoGamesContact";
import { useTranslation, Trans } from "react-i18next";

const Index = () => {
    const history = useHistory();
    const { t } = useTranslation();

    return (
        <section className="privacy-policy">
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
                                    {t("privacy.title")}
                                </h4>
                                <p className="description">
                                    {t("privacy.subtitle")}
                                </p>
                            </div>
                            {/* INFO COLLECTION */}
                            <div className="col-12 main-desc mb-3">
                                <h4 className="title">
                                    {t("privacy.collectionOfUse.title")}
                                </h4>
                            </div>
                            {/* PERSONALLY IDENTIFIABLE INFO */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t(
                                        "privacy.collectionOfUse.personallyIdentifiableInfo.title"
                                    )}
                                </p>
                                <p className="description">
                                    {t(
                                        "privacy.collectionOfUse.personallyIdentifiableInfo.content.1"
                                    )}
                                </p>
                                <p className="description">
                                    {t(
                                        "privacy.collectionOfUse.personallyIdentifiableInfo.content.2"
                                    )}
                                </p>
                            </div>
                            {/* DATA PROVIDED BY YOU */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t(
                                        "privacy.collectionOfUse.dataProvidedByYou.title"
                                    )}
                                </p>
                                <p className="description">
                                    {t(
                                        "privacy.collectionOfUse.dataProvidedByYou.subtitle"
                                    )}
                                </p>
                                <ul className="description pb-3 px-3 m-0">
                                    <li>
                                        {t(
                                            "privacy.collectionOfUse.dataProvidedByYou.content.1"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "privacy.collectionOfUse.dataProvidedByYou.content.2"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "privacy.collectionOfUse.dataProvidedByYou.content.3"
                                        )}
                                    </li>
                                </ul>
                            </div>
                            {/* DATA COLLETED AUTOMATICALLY */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t(
                                        "privacy.collectionOfUse.dataCollectedAutomatically.title"
                                    )}
                                </p>
                                <p className="description">
                                    {t(
                                        "privacy.collectionOfUse.dataCollectedAutomatically.subtitle"
                                    )}
                                </p>
                                <ul className="description pb-3 px-3 m-0">
                                    <li>
                                        {t(
                                            "privacy.collectionOfUse.dataCollectedAutomatically.content.1"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "privacy.collectionOfUse.dataCollectedAutomatically.content.2"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "privacy.collectionOfUse.dataCollectedAutomatically.content.3"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "privacy.collectionOfUse.dataCollectedAutomatically.content.4"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "privacy.collectionOfUse.dataCollectedAutomatically.content.5"
                                        )}
                                    </li>
                                </ul>
                            </div>
                            {/* DATA COLLECTED BY OUR PARTNERS */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t(
                                        "privacy.collectionOfUse.dataCollectedByPartners.title"
                                    )}
                                </p>
                                <ul className="description pb-3 px-3 m-0">
                                    <li>
                                        {t(
                                            "privacy.collectionOfUse.dataCollectedByPartners.content.1"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "privacy.collectionOfUse.dataCollectedByPartners.content.2"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "privacy.collectionOfUse.dataCollectedByPartners.content.3"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "privacy.collectionOfUse.dataCollectedByPartners.content.4"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "privacy.collectionOfUse.dataCollectedByPartners.content.5"
                                        )}
                                    </li>
                                </ul>
                            </div>
                            {/* WHY DATA COLLECTED */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t(
                                        "privacy.collectionOfUse.whyIsDataCollected.title"
                                    )}
                                </p>
                                <p className="description">
                                    {t(
                                        "privacy.collectionOfUse.whyIsDataCollected.subtitle"
                                    )}
                                </p>
                                <ul className="description pb-3 px-3 m-0">
                                    <li>
                                        {t(
                                            "privacy.collectionOfUse.whyIsDataCollected.content.1"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "privacy.collectionOfUse.whyIsDataCollected.content.2"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "privacy.collectionOfUse.whyIsDataCollected.content.3"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "privacy.collectionOfUse.whyIsDataCollected.content.4"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "privacy.collectionOfUse.whyIsDataCollected.content.5"
                                        )}
                                    </li>
                                </ul>

                                <p className="description">
                                    {t("privacy.improve.title")}
                                </p>
                                <ul className="description pb-3 px-3 m-0">
                                    <li>{t("privacy.improve.content.1")}</li>
                                    <li>{t("privacy.improve.content.2")}</li>
                                    <li>{t("privacy.improve.content.3")}</li>
                                    <li>{t("privacy.improve.content.4")}</li>
                                    <li>{t("privacy.improve.content.5")}</li>
                                    <li>{t("privacy.improve.content.6")}</li>
                                    <li>{t("privacy.improve.content.7")}</li>
                                </ul>

                                <p className="description">
                                    {t("privacy.ads.title")}
                                </p>
                                <ul className="description pb-3 px-3 m-0">
                                    <li>{t("privacy.ads.content.1")}</li>
                                    <li>{t("privacy.ads.content.2")}</li>
                                </ul>
                            </div>
                            {/* SERVICES SAFE & FAIR */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("privacy.services.title")}
                                </p>
                                <p className="description">
                                    {t("privacy.services.subtitle")}
                                </p>
                                <ul className="description pb-3 px-3 m-0">
                                    <li>{t("privacy.services.content.1")}</li>
                                    <li>{t("privacy.services.content.2")}</li>
                                    <li>{t("privacy.services.content.3")}</li>
                                </ul>
                            </div>
                            {/* DATA RETENTION */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("privacy.dataRetention.title")}
                                </p>
                                <p className="description">
                                    <Trans i18nKey="privacy.dataRetention.subtitle">
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
                            {/* CHILDREN */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("privacy.children.title")}
                                </p>
                                <p className="description">
                                    <Trans i18nKey="privacy.children.subtitle">
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
                            {/* SECURITY */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("privacy.security.title")}
                                </p>
                                <p className="description">
                                    {t("privacy.security.subtitle")}
                                </p>
                            </div>
                            {/* CONSENT */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {" "}
                                    {t("privacy.consent.title")}
                                </p>
                                <p className="description">
                                    {t("privacy.consent.subtitle")}
                                </p>
                            </div>
                            {/* CONTACT */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    {t("privacy.contact.title")}
                                </p>
                                <p className="description">
                                    <Trans i18nKey="privacy.contact.subtitle">
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
