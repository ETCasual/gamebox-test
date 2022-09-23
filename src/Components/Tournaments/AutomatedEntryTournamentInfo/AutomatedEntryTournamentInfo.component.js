// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import _ from "lodash";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadPrizes from "redux/thunks/Prizes.thunk";

// HELPER FUNCTIONS
import { convertSecondsToHours } from "Utils/TimeConversion";
import getTimerFullUnits from "Utils/GetTImerFullUnits";
import { useTranslation, Trans } from "react-i18next";

const AutomatedEntryTournamentInfo = ({ data, type }) => {
    const location = useLocation();

    const { automatedEntryTicket } = useSelector(
        (state) => state.automatedEntryTickets
    );
    const dispatch = useDispatch();

    const { config } = useSelector((state) => state.config);

    const history = useHistory();

    const [timer, setTimer] = useState("0d 0h 0m 0s");

    let watcherRef = useRef(null);

    useEffect(() => {
        const nowTimeStamp = () => Date.now() + (config?.offsetTimestamp || 0);

        let currentTimeZone = -(
            new Date(nowTimeStamp()).getTimezoneOffset() / 60
        );
        let calculatedTime = new Date(data?.scheduledOff * 1000);
        if (currentTimeZone !== data?.timeZone) {
            calculatedTime.setHours(
                calculatedTime.getHours() -
                    timeZoneHourDifference(currentTimeZone, data?.timeZone)
            );
        }
        clearInterval(watcherRef.current);
        watcherRef.current = setInterval(() => {
            let finalTimeRef = convertSecondsToHours(
                calculatedTime.valueOf(),
                config.offsetTimestamp ? config.offsetTimestamp : 0
            );
            setTimer(finalTimeRef);
            if (finalTimeRef === "Ended") countDownTimerEnded();
        }, 1000);

        // END COUNTDOWN TIMER
        function countDownTimerEnded() {
            clearInterval(watcherRef.current);
            watcherRef.current = null;

            setTimeout(() => {
                dispatch(loadPrizes());
            }, 1000);
        }

        function timeZoneHourDifference(currentTimeZone, prizeTimeZone) {
            if (currentTimeZone > prizeTimeZone)
                return currentTimeZone - prizeTimeZone;
            return prizeTimeZone - currentTimeZone;
        }

        return () => {
            clearInterval(watcherRef.current);
            watcherRef.current = null;
        };
    }, [data, type, dispatch, config]);

    const getTickets = () => {
        let currentPrize = automatedEntryTicket.filter(
            (e) => e.prizeId === parseInt(data.prizeId)
        );
        if (currentPrize) return _.maxBy(currentPrize, "ticket")?.ticket || 0;
        return 0;
    };

    const { t } = useTranslation();

    return (
        <section id="automatedEntryTournamentInfo">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-7">
                        {/* BACK BUTTON */}
                        <div className="row">
                            <div className="d-flex align-items-center back-button mb-4 px-3">
                                <Link
                                    className="d-flex align-items-center"
                                    to={{
                                        pathname: "/",
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
                        {/* CARD */}
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-9 px-0 px-md-3">
                                <div
                                    className="wrapper position-relative"
                                    style={{
                                        backgroundImage: `url("${data?.prizeBG}")`,
                                    }}
                                >
                                    <div className="overlay" />
                                    <div className="content d-flex flex-column align-items-center justify-content-center">
                                        <img
                                            className="bg-img mb-4"
                                            src={data?.prizeBG}
                                            alt={data?.prizeTitle}
                                        />
                                        <p className="token-id mb-3">
                                            {t("ae.token_id", {
                                                tkn: data?.prizeSubtitle,
                                            })}
                                        </p>
                                        <p className="title text-center mb-3">
                                            {data?.prizeTitle}
                                        </p>
                                        <p className="subtitle text-center mb-4">
                                            {data?.prizeContent}
                                        </p>
                                        <p className="countdown text-center mt-2 mb-5">
                                            {getTimerFullUnits(timer)}
                                        </p>
                                        <div className="w-100 mt-3 mb-5 text-center">
                                            <Trans
                                                i18nKey="ae.collected"
                                                values={{
                                                    tkt:
                                                        getTickets()?.toLocaleString() ||
                                                        0,
                                                }}
                                            >
                                                <p className="mb-2 tickets-label">
                                                    0
                                                </p>
                                                <p className="mb-0 tickets-value">
                                                    1
                                                </p>
                                            </Trans>
                                        </div>
                                        <Link
                                            className="start-earning-btn text-center"
                                            to={{
                                                pathname: "/",
                                                state: location.pathname,
                                            }}
                                        >
                                            {t("ae.start_earning")}
                                        </Link>
                                        <div className="line" />
                                        <p className="instructions-title text-center">
                                            {t("ae.how_to.title")}
                                        </p>
                                        <p className="instructions-subtitle text-center">
                                            {t("ae.how_to.1")}
                                        </p>
                                        <p className="instructions-tip text-center mb-5">
                                            {t("ae.how_to.2")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AutomatedEntryTournamentInfo;
