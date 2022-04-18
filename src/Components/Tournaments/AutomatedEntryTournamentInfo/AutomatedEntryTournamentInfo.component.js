// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import _ from "lodash";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadPrizes from "redux/thunks/Prizes.thunk";

// HELPER FUNCTIONS
import convertSecondsToHours from "Utils/TimeConversion";
import getTimerFullUnits from "Utils/GetTImerFullUnits";

const AutomatedEntryTournamentInfo = ({ data, type }) => {
    const location = useLocation();

    const { automatedEntryTicket } = useSelector(
        (state) => state.automatedEntryTickets
    );
    const dispatch = useDispatch();

    const history = useHistory();

    const [timer, setTimer] = useState("0d 0h 0m 0s");

    let watcherRef = useRef(null);

    useEffect(() => {
        let currentTimeZone = -(new Date().getTimezoneOffset() / 60);
        let calculatedTime = new Date(data?.scheduledOff * 1000);
        if (currentTimeZone !== data?.timeZone) {
            calculatedTime.setHours(
                calculatedTime.getHours() -
                    timeZoneHourDifference(currentTimeZone, data?.timeZone)
            );
        }
        clearInterval(watcherRef.current);
        watcherRef.current = setInterval(() => {
            if (calculatedTime.getDate() < new Date().getDate())
                calculatedTime.setDate(calculatedTime.getDate() + 1);

            let finalTimeRef = convertSecondsToHours(
                calculatedTime.valueOf() / 1000,
                "new"
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
    }, [data, type, dispatch]);

    const getTickets = () => {
        let currentPrize = automatedEntryTicket.filter(
            (e) => e.prizeId === parseInt(data.prizeId)
        );
        if (currentPrize) return _.maxBy(currentPrize, "ticket")?.ticket || 0;
        return 0;
    };

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
                                    <span className="ml-2">Back</span>
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
                                            Token ID: {data?.prizeContent}
                                        </p>
                                        <p className="title text-center mb-3">
                                            {data?.prizeTitle}
                                        </p>
                                        <p className="subtitle text-center mb-4">
                                            {data?.prizeSubtitle}
                                        </p>
                                        <p className="countdown text-center mt-2 mb-5">
                                            {getTimerFullUnits(timer)}
                                        </p>
                                        <div className="w-100 mt-3 mb-5 text-center">
                                            <p className="mb-2 tickets-label">
                                                You have collected
                                            </p>
                                            <p className="mb-0 tickets-value">
                                                {getTickets()?.toLocaleString() ||
                                                    0}{" "}
                                                tickets
                                            </p>
                                        </div>
                                        <Link
                                            className="start-earning-btn text-center"
                                            to={{
                                                pathname: "/",
                                                state: location.pathname,
                                            }}
                                        >
                                            Start earning tickets
                                        </Link>
                                        <div className="line" />
                                        <p className="instructions-title text-center">
                                            How to win tickets for the Bonus
                                            Draw?
                                        </p>
                                        <p className="instructions-subtitle text-center">
                                            Participate in any tournament
                                            throughout the platform before the
                                            timer runs out. Tickets won from the
                                            tournaments will automatically be
                                            added into the Bonus Draw pool. It’s
                                            that easy.
                                        </p>
                                        <p className="instructions-tip text-center mb-5">
                                            Tip: Earn more tickets by “watching
                                            ads” or “use gems” to increase your
                                            ticket count.
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
