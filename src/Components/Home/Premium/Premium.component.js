// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import VisibilitySensor from "react-visibility-sensor";

// COMPONENTS
import PremiumCompleted from "Components/Home/PremiumCompleted/PremiumCompleted.component";
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";

// HELPER FUNCTIONS
import { scrollToTop } from "Utils/ScrollToTop";
import getPoolTickets from "Utils/PoolTickets";
import getPrizeTicketCollected from "Utils/PrizeTicketCollected";
import convertSecondsToHours from "Utils/TimeConversion";
import OverTimeModeChecker from "Utils/OverTimeModeChecker";

const Premium = ({ data, handleWinnerRevealCard }) => {
    const dispatch = useDispatch();

    const { poolTickets } = useSelector((state) => state.playerTickets);
    const { prizeTicketCollection } = useSelector(
        (state) => state.prizePoolTickets
    );

    const history = useHistory();

    let watcherRef = useRef(null);

    const [timer, setTimer] = useState("0d 0h 0m 0s");

    const dispatchPoolTickets = (isVisible, id) => {
        if (isVisible) {
            dispatch(loadPlayerTickets(id, false));
        }
    };

    useEffect(() => {
        clearInterval(watcherRef);
        watcherRef.current = setInterval(() => {
            let finalTimeRef = convertSecondsToHours(
                data?.gameInfo[0]?.endTimeStamp
            );
            setTimer(finalTimeRef);

            if (finalTimeRef === "Ended") {
                clearInterval(watcherRef.current);
                watcherRef.current = null;
            }
        }, 1000);

        return () => {
            clearInterval(watcherRef.current);
            watcherRef.current = null;
        };
    }, [data?.gameInfo]);

    return (
        <>
            {!data?.completed && (
                <VisibilitySensor
                    resizeCheck={true}
                    scrollCheck={true}
                    partialVisibility="top"
                    onChange={(isVisible) =>
                        dispatchPoolTickets(isVisible, data.prizeId)
                    }
                >
                    <div className="col-12 col-md-6 col-lg-6 col-xl-4 d-flex align-items-center justify-content-center mb-4">
                        <div className="card-wrapper">
                            <Link
                                onClick={scrollToTop}
                                to={{
                                    pathname: `/prize/premium/${data.prizeId}`,
                                    state: {
                                        prevPath: history.location.pathname,
                                    },
                                }}
                            >
                                <picture>
                                    <source
                                        media="(max-width:768px)"
                                        srcSet={data.prizeBG2}
                                    />
                                    <img
                                        src={data.prizeBG}
                                        alt={data.prizeTitle}
                                    />
                                </picture>
                                <div className="prize-info py-3">
                                    <div className="col-12 d-flex align-items-center justify-content-between mb-2">
                                        <div className="prize-title">
                                            {data.prizeTitle}
                                        </div>
                                        <p className="mb-1 token-label d-flex align-items-center">
                                            Your tickets
                                        </p>
                                    </div>
                                    <div className="col-12 d-flex align-items-center justify-content-between">
                                        <div className="prize-subtitle">
                                            {data.prizeSubtitle}
                                        </div>
                                        <p className="mb-0 token-value d-flex align-items-center">
                                            {`\u00A0${
                                                getPoolTickets(
                                                    poolTickets,
                                                    data?.prizeId
                                                )?.toLocaleString() || 0
                                            }`}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`d-flex align-items-center justify-content-center ${
                                        OverTimeModeChecker(
                                            data?.prizeId,
                                            data?.ticketsRequired,
                                            prizeTicketCollection
                                        )
                                            ? "text-danger timer"
                                            : "remaining-tokens"
                                    }`}
                                >
                                    {`\u00A0${
                                        OverTimeModeChecker(
                                            data?.prizeId,
                                            data?.ticketsRequired,
                                            prizeTicketCollection
                                        )
                                            ? timer
                                            : `${
                                                  (
                                                      data?.ticketsRequired -
                                                      getPrizeTicketCollected(
                                                          prizeTicketCollection,
                                                          data?.prizeId
                                                      )
                                                  )?.toLocaleString() || "-"
                                              } tokens remaining`
                                    }`}
                                </div>
                            </Link>
                        </div>
                    </div>
                </VisibilitySensor>
            )}
            {data?.completed && (
                <PremiumCompleted
                    data={data}
                    handleWinnerRevealCard={handleWinnerRevealCard}
                />
            )}
        </>
    );
};

export default Premium;
