// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

// COMPONENTS
import FortuneWheel from "Components/Tournaments/FortuneWheel/FortuneWheel.component";

// HELPER FUNCTIONS
import { convertSecondsToHours } from "Utils/TimeConversion";
import { useTranslation } from "react-i18next";

const SpinnerEntry = () => {
    const { config } = useSelector((state) => state.config);

    const [fortuneWheelShown, setFortuneWheelShown] = useState(false);
    const [timer, setTimer] = useState("0d 0h 0m 0s");

    let watcherRef = useRef(null);

    // COUNT DOWN TIMER
    useEffect(() => {
        const nowTimeStamp = () => Date.now() + (config?.offsetTimestamp || 0);
        const nowDate = new Date(nowTimeStamp());

        var endDatetime = new Date();
        endDatetime.setUTCHours(0, 0, 0, 0);

        if (endDatetime < nowDate) {
            endDatetime.setDate(endDatetime.getDate() + 1);
        }

        // COUNTDOWN TIMER INTERVAL
        clearInterval(watcherRef.current);
        watcherRef.current = setInterval(() => {
            let finalTimeRef = convertSecondsToHours(
                endDatetime.valueOf(),
                config.offsetTimestamp ? config.offsetTimestamp : 0
            );
            setTimer(finalTimeRef);
            if (finalTimeRef === "Ended") countDownTimerEnded();
        }, 1000);

        // END COUNTDOWN TIMER
        function countDownTimerEnded() {
            clearInterval(watcherRef.current);
            watcherRef.current = null;
        }

        return countDownTimerEnded;
    }, [config.offsetTimestamp]);

    const { t } = useTranslation();

    return (
        <>
            <div
                className="spinner d-flex flex-column justify-content-between h-100"
                onClick={() => setFortuneWheelShown(true)}
            >
                <div className="card-wrapper h-100 pt-1 px-2 pb-2 pt-sm-1 px-sm-3 pb-sm-3">
                    <div className="row">
                        <div className="col-8 col-lg-7 d-flex flex-column align-items-start position-relative">
                            <p className="title-text mb-1">
                                {t("spinner.freegems")}
                            </p>
                            <div className="desc-text mb-1">
                                {t("spinner.claim")}
                            </div>
                        </div>
                        <div className="card-img-wrapper col-4 col-lg-5 d-flex justify-content-end">
                            <img
                                className="thumb-img"
                                src={`${window.cdn}icons/icon_spinner.png`}
                                alt="thumb-img"
                            />
                        </div>
                    </div>
                </div>
                {/* TIMER */}
                <div className="timer d-flex align-items-center justify-content-sm-center px-2 px-md-3">
                    <p className="timer-text mb-0">{t("spinner.refresh")}</p>
                    <p className="countdown mb-0">{`\u00A0 ${timer} `}</p>
                </div>
            </div>

            {fortuneWheelShown && (
                <FortuneWheel
                    prizeId={0}
                    setIsTicketsUpdated={false}
                    ticketsRequired={0}
                    setFortuneWheelShown={setFortuneWheelShown}
                />
            )}
        </>
    );
};

export default SpinnerEntry;
