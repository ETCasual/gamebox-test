import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import VisibilitySensor from "react-visibility-sensor";
import convertSecondsToHours from "Utils/TimeConversion";
import getPoolTickets from "Utils/PoolTickets";
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";

const DailyBonus = ({ data, handleGamePanel }) => {
    const dispatch = useDispatch();

    const { config } = useSelector((state) => state.config);

    const [timer, setTimer] = useState("0d 0h 0m 0s");

    let watcherRef = useRef();

    const dispatchPoolTickets = (isVisible, id) => {
        if (isVisible) {
            dispatch(loadPlayerTickets(id, false));
        }
    };

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

        // NEW COUNTDOWN TIMER
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
    }, [data]);

    if (timer === "0d 0h 0m 0s" || timer === "0d 0h 0m 0s") {
        return "";
    } else
        return (
            <VisibilitySensor
                resizeCheck={true}
                scrollCheck={true}
                partialVisibility="top"
                onChange={(isVisible) =>
                    dispatchPoolTickets(isVisible, data.prizeId)
                }
            >
                <div className="container-fluid daily">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8 col-xl-6 my-2">
                            <div
                                className="card-wrapper"
                                onClick={() =>
                                    handleGamePanel(
                                        data.prizeTitle,
                                        finalTimeRef.current
                                    )
                                }
                                style={{
                                    backgroundImage: `url("${data.prizeBG}")`,
                                }}
                            >
                                <div className="overlay"></div>
                                <div className="content">
                                    <div className="col-12 top-content">
                                        <div className="badges mb-1">Daily</div>
                                        <div className="card-title">
                                            {data.prizeTitle}
                                        </div>
                                    </div>
                                    <div className="col-12 bottom-content px-2">
                                        <div className="bottom-wrapper d-flex align-items-center justify-content-between">
                                            <div className="tickets-grid">
                                                <div className="tickets">
                                                    <p>Your tickets</p>
                                                    <p>
                                                        {getPoolTickets(
                                                            esmData.poolTickets,
                                                            data.prizeId
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="tickets-pool">
                                                    <p>Draw starts in</p>
                                                    <p>{timer}</p>
                                                </div>
                                            </div>
                                            <div className="game-icon d-flex">
                                                {data?.gameInfo.map(
                                                    (e, idx) => (
                                                        <React.Fragment
                                                            key={`game-icon-${idx}`}
                                                        >
                                                            <img
                                                                className="img-fluid"
                                                                src={e.gameIcon}
                                                                alt="game-icon"
                                                            />
                                                        </React.Fragment>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </VisibilitySensor>
        );
};

export default DailyBonus;
