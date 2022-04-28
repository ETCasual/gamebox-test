// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import VisibilitySensor from "react-visibility-sensor";

// COMPONENTS
import FeaturedCompleted from "Components/Home/FeaturedCompleted/FeaturedCompleted.component";
import GenericLoader from "Components/Loader/Generic.loader";

// REDUX
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";
import { loadPrizePoolTickets } from "redux/thunks/PrizePoolTickets.thunk";

// HELPER FUNCTIONS
import getPoolTickets from "Utils/PoolTickets";
import getPrizeTicketCollected from "Utils/PrizeTicketCollected";
import convertSecondsToHours from "Utils/TimeConversion";

const Featured = ({ data, length, handleWinnerRevealCard }) => {
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
                    partialVisibility="top"
                    onChange={(isVisible) => dispatchPoolTickets(isVisible)}
                >
                    <div
                        className={`container-fluid featured ${
                            length > 1 ? "mb-3" : "mb-5"
                        }`}
                        style={{
                            backgroundImage: `url(${
                                navigator.userAgent.indexOf("Firefox") > -1
                                    ? ""
                                    : data.prizeBG
                            })`,
                        }}
                    >
                        <div className="overlay" />
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-10 col-lg-8 col-xl-4">
                                <Link
                                    className="w-100"
                                    to={{
                                        pathname: `${`/prize/featured/${data?.prizeId}`}`,
                                        state: {
                                            prevPath: history.location.pathname,
                                        },
                                    }}
                                >
                                    <div className="card-wrapper d-flex flex-column flex-md-row">
                                        <div className="col-12 pl-0 d-flex flex-column align-items-start justify-content-center position-relative p-3">
                                            <p className="prize-type">
                                                Featured Reward
                                            </p>
                                            {/* PRIZE TITLE, DESCRIPTION & ID */}
                                            <div className="prize-info position-relative d-flex align-self-center">
                                                <img
                                                    src={data.prizeBG}
                                                    alt={data.prizeTitle}
                                                />
                                                <div className="info-wrapper">
                                                    <div className="prize-id">
                                                        {data?.prizeSubtitle}
                                                    </div>
                                                    <div className="prize-title mt-2 mb-2">
                                                        {data?.prizeTitle}
                                                    </div>
                                                    <div className="prize-subtitle">
                                                        {data?.prizeContent}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* TICKETS INFO */}
                                            <div className="tickets-info mb-2 w-100">
                                                {/* LABEL */}
                                                <p className="ticket-label mb-2">
                                                    Your tickets
                                                </p>
                                                <div className="col-12 d-flex align-items-center justify-content-between pl-0">
                                                    {/* YOUR TICKETS */}
                                                    <p className="mb-0 your-tickets d-flex align-items-end">
                                                        {getPoolTickets(
                                                            poolTickets,
                                                            data?.prizeId
                                                        )?.toLocaleString() ||
                                                            0}
                                                    </p>
                                                    <div className="d-flex remaining-tickets">
                                                        {getPrizeTicketCollected(
                                                            prizeTicketCollection,
                                                            data?.prizeId
                                                        ) >=
                                                            data?.ticketsRequired && (
                                                            <p className="mb-0 draw-timer d-flex align-items-center">
                                                                Draw starts in{" "}
                                                                <span className="text-danger ml-1">
                                                                    {timer}
                                                                </span>
                                                            </p>
                                                        )}
                                                        {getPrizeTicketCollected(
                                                            prizeTicketCollection,
                                                            data?.prizeId
                                                        ) <
                                                            data?.ticketsRequired && (
                                                            <p className="mb-0 d-flex align-items-center">
                                                                {data?.ticketsRequired -
                                                                    getPrizeTicketCollected(
                                                                        prizeTicketCollection,
                                                                        data?.prizeId
                                                                    ) <=
                                                                0 ? (
                                                                    <GenericLoader
                                                                        height="30"
                                                                        bg="#FF007C"
                                                                        cx1="80%"
                                                                        cx2="88%"
                                                                        cx3="96%"
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
                                                                        )?.toLocaleString() ||
                                                                        "-"
                                                                    } tickets remaining`
                                                                )}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <button className="btn-participate w-100 p-3 mt-4">
                                                    Participate in featured prize tournaments
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </VisibilitySensor>
            )}
            {data?.completed && (
                <FeaturedCompleted
                    data={data}
                    handleWinnerRevealCard={handleWinnerRevealCard}
                />
            )}
        </>
    );
};

export default Featured;
