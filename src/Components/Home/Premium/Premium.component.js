// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import VisibilitySensor from "react-visibility-sensor";

// COMPONENTS
import PremiumCompleted from "Components/Home/PremiumCompleted/PremiumCompleted.component";
import GenericLoader from "Components/Loader/Generic.loader";

// REDUX
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";
import { loadPrizePoolTickets } from "redux/thunks/PrizePoolTickets.thunk";

// HELPER FUNCTIONS
import { scrollToTop } from "Utils/ScrollToTop";
import getPoolTickets from "Utils/PoolTickets";
import getPrizeTicketCollected from "Utils/PrizeTicketCollected";
import convertSecondsToHours from "Utils/TimeConversion";

const Premium = ({ data, handleWinnerRevealCard }) => {
    const dispatch = useDispatch();

    const { poolTickets } = useSelector((state) => state.playerTickets);
    const { prizeTicketCollection } = useSelector(
        (state) => state.prizePoolTickets
    );

    const history = useHistory();

    let watcherRef = useRef(null);

    const [timer, setTimer] = useState("0d 0h 0m 0s");

    useEffect(() => {
        dispatch(loadPlayerTickets(data?.prizeId, true));
        dispatch(
            loadPrizePoolTickets(
                parseInt(data?.prizeId),
                true,
                data?.ticketsRequired
            )
        );
    }, [dispatch, data?.prizeId, data?.ticketsRequired]);

    const dispatchPoolTickets = (isVisible) => {
        if (isVisible) {
            dispatch(loadPlayerTickets(data?.prizeId, false));
            dispatch(
                loadPrizePoolTickets(
                    parseInt(data?.prizeId),
                    false,
                    data?.ticketsRequired
                )
            );
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
                    offset={{ top: 10 }}
                    partialVisibility="top"
                    onChange={(isVisible) => {
                        dispatchPoolTickets(isVisible);
                    }}
                >
                    <div className="col-12 col-md-6 col-lg-6 col-xl-4 px-3 px-md-2 d-flex align-items-center justify-content-center mb-4">
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
                                <p className="prize-id mb-0">
                                    {data.prizeContent}
                                </p>
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
                                        <p className="prize-title mb-0">
                                            {data.prizeTitle}
                                        </p>
                                        <p className="mb-1 ticket-label d-flex align-items-center">
                                            Your tickets
                                        </p>
                                    </div>
                                    <div className="col-12 d-flex align-items-center justify-content-between">
                                        <div className="prize-subtitle">
                                            {data.prizeSubtitle}
                                        </div>
                                        <p className="mb-0 ticket-value d-flex align-items-center">
                                            {`\u00A0${
                                                getPoolTickets(
                                                    poolTickets,
                                                    data?.prizeId
                                                )?.toLocaleString() || 0
                                            }`}
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-center remaining-tickets">
                                    {getPoolTickets(
                                        poolTickets,
                                        data?.prizeId
                                    ) >= data?.ticketsRequired && (
                                        <p className="mb-0 draw-timer d-flex align-items-center justify-content-center">
                                            Draw starts in{" "}
                                            <span className="text-danger ml-1">
                                                {timer}
                                            </span>
                                        </p>
                                    )}
                                    {getPoolTickets(
                                        poolTickets,
                                        data?.prizeId
                                    ) < data?.ticketsRequired && (
                                        <p className="mb-0">
                                            {data?.ticketsRequired -
                                                getPrizeTicketCollected(
                                                    prizeTicketCollection,
                                                    data?.prizeId
                                                ) <=
                                            0 ? (
                                                <GenericLoader
                                                    height="30"
                                                    bg="#FF007C"
                                                    cx1="43%"
                                                    cx2="50%"
                                                    cx3="58%"
                                                    cy="15"
                                                />
                                            ) : (
                                                `${
                                                    (
                                                        data?.ticketsRequired -
                                                        getPrizeTicketCollected(
                                                            prizeTicketCollection,
                                                            data?.prizeId
                                                        )
                                                    )?.toLocaleString() || "-"
                                                } tickets remaining`
                                            )}
                                        </p>
                                    )}
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
