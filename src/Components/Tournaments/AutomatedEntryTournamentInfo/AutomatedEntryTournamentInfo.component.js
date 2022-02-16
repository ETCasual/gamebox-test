// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import _ from "lodash";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadPrizes from "redux/thunks/Prizes.thunk";

// HELPER FUNCTIONS
import { scrollToTop } from "Utils/ScrollToTop";
import convertSecondsToHours from "Utils/TimeConversion";

const AutomatedEntryTournamentInfo = ({ data, type }) => {
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
        <>
            {/* BACK BUTTON */}
            <div className="nav-top-back-btn-wrapper d-flex align-items-center justify-content-center mx-auto">
                <div className="d-flex col-12 col-md-10 col-lg-8 col-xl-8 justify-content-between">
                    {/* BACK BUTTON */}
                    <Link
                        onClick={scrollToTop}
                        to={{
                            pathname: "/",
                            state: {
                                prevPath: history.location.pathname,
                            },
                        }}
                    >
                        <img
                            className="back-button"
                            width="40"
                            src={`${window.cdn}buttons/button_back.png`}
                            alt="back-btn"
                        />
                    </Link>
                </div>
            </div>
            {/* INFO */}
            <section id="automatedEntryTournamentInfo">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8">
                            <div className="row">
                                <div className="col-12 mb-2">
                                    <div className="wrapper">
                                        {/* PRIZE INFO */}
                                        <div
                                            className="card-wrapper d-flex flex-column align-items-center justify-content-center"
                                            style={{
                                                backgroundImage: `url("${data?.prizeBG}")`,
                                            }}
                                        >
                                            <div className="overlay"></div>
                                            <div className="badge d-flex align-items-center">
                                                {data?.prizeContent ||
                                                    "Daily Bonus Reward"}
                                            </div>
                                            <div className="col-12 py-3 d-flex flex-column align-items-center justify-content-center">
                                                <p className="title text-center my-1">
                                                    {data?.prizeTitle}
                                                </p>
                                                <p className="subtitle text-center my-1">
                                                    {data?.prizeSubtitle}
                                                </p>
                                            </div>
                                            <div className="timer d-flex align-items-center justify-content-center px-3">
                                                <img
                                                    className="icon mr-2"
                                                    src={`${window.cdn}icons/timer_normal.png`}
                                                    alt="timer"
                                                />
                                                <p className="mb-0 label d-none d-md-block">
                                                    Draw in
                                                </p>
                                                <p className="countdown">{`\u00A0 ${timer}`}</p>
                                            </div>

                                            {/* TICKETS */}
                                            <div className="ticket-wrapper col-10 col-md-8 mx-auto">
                                                <div className="ticket-info d-flex align-items-center p-2">
                                                    <div className="w-100 your-tickets d-flex align-items-center justify-content-center p-2">
                                                        <p className="mb-0 mt-1 label">
                                                            Your collected
                                                            tickets
                                                        </p>
                                                        <p className="mb-0 tickets mx-2">
                                                            {getTickets()?.toLocaleString() ||
                                                                0}
                                                        </p>
                                                        <img
                                                            className="icon"
                                                            src={`${window.cdn}icons/tickets.png`}
                                                            alt="tickets"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* INSTRUCTIONS */}
                                        <div className="w-100 instructions pt-5 pb-3 px-0 px-md-2 text-center">
                                            <div className="col-11 col-md-8 px-0 mx-auto">
                                                <p>
                                                    How to win tickets for the
                                                    Daily Draw Bonus?
                                                </p>
                                                <p>
                                                    Participate in any
                                                    tournament throughout the
                                                    platform. Tickets won will
                                                    automatically enter into the
                                                    Daily Draw Bonus pool.
                                                </p>
                                                <p className="mb-xl-5">
                                                    Pro tip: The more tickets
                                                    you collect, the higher the
                                                    chance to win the prize.
                                                </p>
                                                <Link
                                                    onClick={scrollToTop}
                                                    to={{
                                                        pathname: "/",
                                                        state: {
                                                            prevPath:
                                                                history.location
                                                                    .pathname,
                                                        },
                                                    }}
                                                >
                                                    <button className="mb-4 mb-md-3">
                                                        Start earning tickets
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AutomatedEntryTournamentInfo;
