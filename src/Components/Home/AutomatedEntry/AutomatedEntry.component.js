// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadAutomatedEntryTickets from "redux/thunks/AutomatedEntryTickets.thunk";

// COMPONENTS
import AutomatedEntryModalPopup from "Components/Modals/AutomatedEntry.modal";

// HELPER FUNCTIONS
import { convertSecondsToHours } from "Utils/TimeConversion";

const AutomatedEntry = ({ data }) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.userData);
    const { config } = useSelector((state) => state.config);
    const { automatedEntryTicket } = useSelector(
        (state) => state.automatedEntryTickets
    );

    const [bonusRewardShown, setBonusRewardShown] = useState(false);
    const [timer, setTimer] = useState("0d 0h 0m 0s");

    let watcherRef = useRef(null);

    useEffect(() => {
        if (user.id) {
            dispatch(loadAutomatedEntryTickets(data.scheduledOn, data.prizeId));
        }
    }, [dispatch, data.scheduledOn, data.prizeId, user.id]);

    // COUNT DOWN TIMER
    useEffect(() => {
        const nowTimeStamp = () => Date.now() + (config?.offsetTimestamp || 0);

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
        const nowDate = new Date(nowTimeStamp());

        // CURRENT PLAYER TIMEZONE
        let currentTimeZone = -(nowDate.getTimezoneOffset() / 60);

        let isTimeValid =
            nowDate >= new Date(data.scheduledOn * 1000) &&
            nowDate <= new Date(data.scheduledOff * 1000);

        // IF TODAY DATE EXISTS IN THE REPEATED API DATA THEN PROCEED WITH THE COUNTDOWN TIMER
        if (data.repeatedOn.includes(repeatedOnDict[nowDate.getDay()])) {
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
                let finalTimeRef = convertSecondsToHours(
                    calculatedTime.valueOf(),
                    config.offsetTimestamp ? config.offsetTimestamp : 0
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
    }, [data, config]);

    const getTickets = () => {
        const currentPrize = automatedEntryTicket.filter(
            (e) => e.prizeId === data.prizeId
        );
        if (currentPrize) return _.maxBy(currentPrize, "ticket")?.ticket || 0;
        return 0;
    };

    return (
        <>
            <div
                className="bonus-card"
                onClick={() => setBonusRewardShown(true)}
            >
                <div className="auto">
                    <div className="card-wrapper pt-1 px-2 pb-2 pt-sm-1 px-sm-3 pb-sm-3">
                        <div className="row">
                            {/* PRIZE INFO */}
                            <div className="col-8 col-lg-7 d-flex flex-column align-items-start position-relative">
                                <div>
                                    {/* PRIZE NAME */}
                                    <div className="prize-title mb-1">
                                        {data.prizeTitle}
                                    </div>
                                    {/* PRIZE DETAILED CONTENT */}
                                    <div className="prize-subtitle d-none d-sm-flex">
                                        {data.prizeContent}
                                    </div>
                                </div>
                                {/* TICKETS */}
                                <div className="total-ticket-info d-flex mt-sm-4">
                                    <p className="mb-0 ticket-label d-flex align-items-center mr-3">
                                        My tickets
                                    </p>
                                    <p className="mb-0 ticket-value">
                                        {getTickets()?.toLocaleString() || "-"}
                                        <img
                                            className="icon ml-1"
                                            src={`${window.cdn}assets/tickets_06.png`}
                                            alt="ticket"
                                        />
                                    </p>
                                </div>
                            </div>
                            {/* PRIZE PICTURE */}
                            <div className="bonus-reward-img-wrapper col-4 col-lg-5 d-flex justify-content-end">
                                <picture>
                                    <source
                                        media="(max-width:768px)"
                                        srcSet={data.prizeBG2}
                                    />
                                    <img
                                        className="bonus-reward-img mt-sm-2"
                                        src={data.prizeBG}
                                        alt={data.prizeTitle}
                                    />
                                </picture>
                            </div>
                        </div>
                    </div>
                    {/* TIMER */}
                    <div className="timer d-flex align-items-center justify-content-sm-center px-2 px-md-3">
                        <p className="timer-text mb-0">Ends in</p>
                        <p className="countdown mb-0">{`\u00A0 ${timer} `}</p>
                    </div>
                </div>
            </div>

            {/* BONUS REWARDS */}
            {bonusRewardShown && (
                <AutomatedEntryModalPopup
                    data={data}
                    handleInstructionsCloseBtn={() =>
                        setBonusRewardShown(false)
                    }
                />
            )}
        </>
    );
};

export default AutomatedEntry;
