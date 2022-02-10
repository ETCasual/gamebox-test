// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadAutomatedEntryTickets from "redux/thunks/AutomatedEntryTickets.thunk";

// HELPER FUNCTIONS
import convertSecondsToHours from "Utils/TimeConversion";
import { scrollToTop } from "Utils/ScrollToTop";

const AutomatedEntry = ({ data, length }) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.userData);
    const { automatedEntryTicket } = useSelector(
        (state) => state.automatedEntryTickets
    );

    const history = useHistory();

    const [timer, setTimer] = useState("0d 0h 0m 0s");

    let watcherRef = useRef(null);

    useEffect(() => {
        if (user.id > 0)
            dispatch(loadAutomatedEntryTickets(data.scheduledOn, data.prizeId));
    }, [dispatch, data.scheduledOn, data.prizeId, user.id]);

    // COUNT DOWN TIMER
    useEffect(() => {
        // DICT TO COMPARE THE DAYS WITH API DATA
        const repeatedOnDict = {
            0: 7,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
        };
        // CURRENT PLAYER TIMEZONE
        let currentTimeZone = -(new Date().getTimezoneOffset() / 60);

        let isTimeValid =
            new Date() >= new Date(data.scheduledOn * 1000) &&
            new Date() <= new Date(data.scheduledOff * 1000);

        // IF TODAY DATE EXISTS IN THE REPEATED API DATA THEN PROCEED WITH THE COUNTDOWN TIMER
        if (data.repeatedOn.includes(repeatedOnDict[new Date().getDay()])) {
            // CHEKING IF CURRENT TIME IS IN-BETWEEN THE SCHEDULE ON & OFF TIME
            if (isTimeValid) initCountDownTimer();
        } else if (data.repeatedOn.length === 1 && data.repeatedOn[0] === 0) {
            // CHEKING IF CURRENT TIME IS IN-BETWEEN THE SCHEDULE ON & OFF TIME
            if (isTimeValid) initCountDownTimer();
        }

        // COUNTDOWN TIMER INIT
        function initCountDownTimer() {
            let calculatedTime = new Date(data.scheduledOff * 1000);

            // CHECKING IF TIMEZONE IS DIFFERENT THEN GET THE TIMEZONE DIFFERENCE
            if (currentTimeZone !== data.timeZone) {
                calculatedTime.setHours(
                    calculatedTime.getHours() -
                        timeZoneHourDifference(currentTimeZone, data.timeZone)
                );
            }

            // COUNTDOWN TIMER INTERVAL
            clearInterval(watcherRef.current);
            watcherRef.current = setInterval(() => {
                if (calculatedTime.getDate() < new Date().getDate()) {
                    calculatedTime.setDate(calculatedTime.getDate() + 1);
                }

                let finalTimeRef = convertSecondsToHours(
                    calculatedTime.valueOf() / 1000
                );
                setTimer(finalTimeRef);
                if (finalTimeRef === "Ended") countDownTimerEnded();
            }, 1000);
        }
        // END COUNTDOWN TIMER
        function countDownTimerEnded() {
            clearInterval(watcherRef.current);
            watcherRef.current = null;
        }
        // GETTING TIMEZONE HOUR DIFFERENCE
        function timeZoneHourDifference(currentTimeZone, prizeTimeZone) {
            if (currentTimeZone > prizeTimeZone)
                return currentTimeZone - prizeTimeZone;
            return prizeTimeZone - currentTimeZone;
        }

        return () => {
            clearInterval(watcherRef.current);
            watcherRef.current = null;
        };
    }, [data]);

    const getTickets = () => {
        const currentPrize = automatedEntryTicket.filter(
            (e) => e.prizeId === data.prizeId
        );
        if (currentPrize) return _.maxBy(currentPrize, "ticket")?.ticket || 0;
        return 0;
    };

    if (timer === "Ended" || timer === "0d 0h 0m 0s") return "";
    else
        return (
            <Link
                onClick={scrollToTop}
                to={{
                    pathname: `/prize/automated/${data.prizeId}`,
                    state: {
                        prevPath: history.location.pathname,
                    },
                }}
            >
                <div className={`card-wrapper ${length > 1 ? "my-3" : "mt-3"}`}>
                    <picture>
                        <source
                            media="(max-width:768px)"
                            srcSet={data.prizeBG2}
                        />
                        <img src={data.prizeBG} alt={data.prizeTitle} />
                    </picture>
                    <div className="overlay"></div>
                    <div className="badges">
                        {data.prizeContent || "Daily Bonus Reward"}
                    </div>
                    <div className="timer d-flex align-items-center justify-content-space px-3">
                        <img
                            className="icon"
                            src={`${window.cdn}art_assets/icons/timer_normal.png`}
                            alt="timer"
                        />
                        <p className="mb-0 label d-none d-md-block">Draw in</p>
                        <p className="countdown">{`\u00A0 ${timer}`}</p>
                    </div>
                    <div className="prize-text col-12">
                        {/* PRIZE NAME */}
                        <div className="card-title">{data.prizeTitle}</div>
                        <div className="card-subtitle text-white">
                            {data.prizeSubtitle || "Version 2"}
                        </div>
                        {/* TICKETS */}
                        <div className="col-12 ticket-info d-flex align-items-center py-1 mt-3">
                            <div className="w-100 your-tickets d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    <p className="mb-0 label d-flex align-items-center pl-2">
                                        Your collected tickets
                                    </p>
                                </div>
                                <p className="mb-0 tickets">
                                    {getTickets()?.toLocaleString() || "-"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
};

export default AutomatedEntry;
