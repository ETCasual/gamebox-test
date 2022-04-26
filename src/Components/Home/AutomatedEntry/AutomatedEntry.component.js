// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadAutomatedEntryTickets from "redux/thunks/AutomatedEntryTickets.thunk";

// HELPER FUNCTIONS
import convertSecondsToHours from "Utils/TimeConversion";
import getTimerFullUnits from "Utils/GetTImerFullUnits";

const AutomatedEntry = ({ data }) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.userData);
    const { automatedEntryTicket } = useSelector(
        (state) => state.automatedEntryTickets
    );

    const history = useHistory();

    const [timer, setTimer] = useState("0d 0h 0m 0s");

    let watcherRef = useRef(null);

    useEffect(() => {
        if (user.id)
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
                to={{
                    pathname: `/prize/automated/${data.prizeId}`,
                    state: {
                        prevPath: history.location.pathname,
                    },
                }}
            >
                <div className="card-wrapper p-2 p-md-3">
                    <div className="row">
                        {/* PRIZE SUBTITLE */}
                        <p className="prize-id mb-0">{data.prizeSubtitle}</p>
                        {/* PRIZE INFO */}
                        <div className="col-6 col-md-8 col-lg-7 d-flex flex-column align-items-start justify-content-end position-relative">
                            {/* PRIZE NAME */}
                            <div className="prize-title mt-2">
                                {data.prizeTitle}
                            </div>
                            {/* PRIZE DETAILED CONTENT */}
                            <div className="prize-subtitle mt-1">
                                {data.prizeContent}
                            </div>
                            {/* TICKETS */}
                            <div className="ticket-info d-flex flex-column align-items-start mt-2 p-2">
                                <p className="mb-2 ticket-label d-flex align-items-center">
                                    Your total tickets
                                </p>
                                <p className="mb-0 tickets-value">
                                    {getTickets()?.toLocaleString() || "-"}
                                </p>
                            </div>
                        </div>
                        {/* PRIZE PICTURE */}
                        <div className="col-6 col-md-4 col-lg-5 d-flex align-items-center justify-content-end position-relative">
                            <picture>
                                <source
                                    media="(max-width:768px)"
                                    srcSet={data.prizeBG2}
                                />
                                <img src={data.prizeBG} alt={data.prizeTitle} />
                            </picture>
                        </div>
                    </div>
                </div>
                {/* TIMER */}
                <div className="timer d-flex align-items-center justify-content-center px-3">
                    <p className="countdown mb-0">{`\u00A0 ${getTimerFullUnits(
                        timer
                    )} left`}</p>
                </div>
            </Link>
        );
};

export default AutomatedEntry;
