// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import _ from "lodash";

// COMPONENTS
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

// HELPER FUNCTIONS
import { convertSecondsToHours } from "Utils/TimeConversion";

const AutomatedEntryModalPopup = ({ data, handleInstructionsCloseBtn }) => {
    const location = useLocation();

    const { automatedEntryTicket } = useSelector(
        (state) => state.automatedEntryTickets
    );
    const { config } = useSelector((state) => state.config);

    const [timer, setTimer] = useState("0d 0h 0m 0s");

    let watcherRef = useRef(null);

    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

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

    // useEffect(() => {
    //     const nowTimeStamp = () => Date.now() + (config?.offsetTimestamp || 0);

    //     let currentTimeZone = -(
    //         new Date(nowTimeStamp()).getTimezoneOffset() / 60
    //     );
    //     let calculatedTime = new Date(data?.scheduledOff * 1000);
    //     if (currentTimeZone !== data?.timeZone)
    //     {
    //         calculatedTime.setHours(
    //             calculatedTime.getHours() -
    //             timeZoneHourDifference(currentTimeZone, data?.timeZone)
    //         );
    //     }
    //     clearInterval(watcherRef.current);
    //     watcherRef.current = setInterval(() => {
    //         let finalTimeRef = convertSecondsToHours(
    //             calculatedTime.valueOf(),
    //             config.offsetTimestamp ? config.offsetTimestamp : 0
    //         );
    //         // let finalTimeRef = convertSecondsTo24HoursBase(
    //         //     calculatedTime.valueOf(),
    //         //     config.offsetTimestamp ? config.offsetTimestamp : 0
    //         // );
    //         setTimer(finalTimeRef);
    //         if (finalTimeRef === "Ended") countDownTimerEnded();
    //     }, 1000);

    //     // END COUNTDOWN TIMER
    //     function countDownTimerEnded() {
    //         clearInterval(watcherRef.current);
    //         watcherRef.current = null;
    //     }

    //     function timeZoneHourDifference(currentTimeZone, prizeTimeZone) {
    //         if (currentTimeZone > prizeTimeZone)
    //             return currentTimeZone - prizeTimeZone;
    //         return prizeTimeZone - currentTimeZone;
    //     }

    //     return () => {
    //         clearInterval(watcherRef.current);
    //         watcherRef.current = null;
    //     };
    // }, [data, config]);

    const getTickets = () => {
        let currentPrize = automatedEntryTicket.filter(
            (e) => e.prizeId === parseInt(data.prizeId)
        );
        if (currentPrize) return _.maxBy(currentPrize, "ticket")?.ticket || 0;
        return 0;
    };

    return (
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
                <div className="modal-body-automated-entry position-relative">
                    {/* CLOSE BTN */}
                    <img
                        className="close-button"
                        onClick={handleInstructionsCloseBtn}
                        width="36"
                        src={`${window.cdn}buttons/button_close.png`}
                        alt="close-btn"
                    />

                    {/* CARD */}
                    <div className="row justify-content-center mt-3 mt-sm-5">
                        <div className="col-10 col-md-6 mb-3 pl-2 pr-1">
                            {/* <div className="card-prize d-flex flex-column flex-sm-row m-auto"> */}
                            <div className="card-prize d-flex m-auto">
                                <div className="p-1 m-auto">
                                    {/* THUMBNAIL MEDIA */}
                                    <ThumbnailMedia
                                        url={data.prizeBG}
                                        isPlayVideo={true}
                                        className={"thumb"}
                                    />
                                </div>
                                <div className="w-100 p-2 d-flex flex-column">
                                    <div className="prize-text mb-auto">
                                        <p className="card-subtitle m-auto pb-1 pb-sm-2">
                                            Token ID: {data?.prizeSubtitle}
                                        </p>
                                        <p className="card-title m-auto pb-1 pb-sm-3">
                                            {data?.prizeTitle}
                                        </p>
                                        <p className="card-content m-auto">
                                            {data?.prizeContent}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="countdown d-flex flex-row align-items-center justify-content-center my-2 my-sm-4 mx-auto">
                                <p className="countdown-text mb-0 mr-2">
                                    Draw starts in
                                </p>
                                <p className="mob-text mb-0">{timer}</p>
                            </div>

                            <div className="text-center my-2 my-sm-4">
                                <p className="tickets-label mb-1 mb-sm-2">
                                    Tickets you have collected
                                </p>
                                <p className="tickets-value d-flex flex-row align-items-center justify-content-center mx-auto">
                                    <span className="tickets mob-text mr-2">
                                        {getTickets()?.toLocaleString() || 0}
                                    </span>
                                    <img
                                        className="icon"
                                        src={`${window.cdn}assets/tickets_06.png`}
                                        alt={"icon"}
                                    />
                                </p>
                            </div>
                            <div className="mx-auto my-2 my-sm-4">
                                <Link
                                    className="start-earning-btn d-block text-center m-auto"
                                    to={{
                                        pathname: "/",
                                        state: location.pathname,
                                    }}
                                    onClick={handleInstructionsCloseBtn}
                                >
                                    START EARNING TICKETS
                                </Link>
                            </div>
                            <div className="line" />
                            <p className="instructions-title text-center mb-1 mb-sm-3">
                                How to win tickets for the Bonus Draw?
                            </p>
                            <p className="instructions-subtitle text-center mb-2 mb-sm-3">
                                Participate in any tournament throughout the
                                platform before the timer runs out.
                                <br />
                                Tickets won from the tournaments will
                                automatically be added into the Bonus Draw pool.
                                It’s that easy.
                            </p>
                            <p className="instructions-tip text-center mb-0 mb-sm-4">
                                Tip: Earn more tickets by “spent gems” to
                                increase your ticket count.
                            </p>
                        </div>
                    </div>

                    {/* <div className="col-12 p-3">
                    <h5 className="title"></h5>
                    <p className="subtitle"></p>
                    <ul className="my-4 list-unstyled">
                        <li className="row">
                            <div className="col-3 col-md-2 step">
                                <p className="mb-0">Step 1</p>
                            </div>
                            <div className="col-9 col-md-10 px-0 instruction">
                                <p className="mb-0">
                                    Select the prize you would like to win.
                                </p>
                            </div>
                        </li>
                        <li className="row">
                            <div className="col-3 col-md-2 step">
                                <p className="mb-0">Step 2</p>
                            </div>
                            <div className="col-9 col-md-10 px-0 instruction">
                                <p className="mb-0">
                                    Participate in the tournament.
                                </p>
                            </div>
                        </li>
                        <li className="row">
                            <div className="col-3 col-md-2 step">
                                <p className="mb-0">Step 3</p>
                            </div>
                            <div className="col-9 col-md-10 px-0 instruction">
                                <p className="mb-0">
                                    Win and earn tickets at the end of
                                    tournament.
                                </p>
                            </div>
                        </li>
                        <li className="row">
                            <div className="col-3 col-md-2 step">
                                <p className="mb-0">Step 4</p>
                            </div>
                            <div className="col-9 col-md-10 px-0 instruction">
                                <p className="mb-0">
                                    Enter new tournaments to collect more
                                    tickets.
                                </p>
                            </div>
                        </li>
                    </ul>
                    <p className="subtitle">
                        Pro tip: The more tickets you have, the higher chance to
                        win the prize.
                    </p>
                    <h5 className="title">How it works?</h5>
                    <p className="subtitle">
                        When the total amount of tickets (global tickets)
                        reaches the allocated number, your tickets (along with
                        other players' tickets) will enter a pool. The winner
                        will be chosen based on the ticket drawn from the pool
                        randomly.
                    </p>
                    <p className="subtitle">
                        If a prize enter's overtime, players can still
                        participate in tournaments and win tickets. Consider it
                        as a bonus hour to earn more tickets before the prize
                        ends.
                    </p>
                </div> */}
                </div>
            </div>
        </>
    );
};

export default AutomatedEntryModalPopup;
