// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import VisibilitySensor from "react-visibility-sensor";

// COMPONENTS
import FeaturedCompleted from "Components/Home/FeaturedCompleted/FeaturedCompleted.component";
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";

// HELPER FUNCTIONS
import getPoolTickets from "Utils/PoolTickets";
import getPrizeTicketCollected from "Utils/PrizeTicketCollected";
import convertSecondsToHours from "Utils/TimeConversion";
import OverTimeModeChecker from "Utils/OverTimeModeChecker";
import { scrollToTop } from "Utils/ScrollToTop";

const Featured = ({ data, length, handleWinnerRevealCard }) => {
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
                        dispatchPoolTickets(isVisible, data?.prizeId)
                    }
                >
                    <div
                        className={`container-fluid featured ${
                            length > 1 ? "mb-3" : "mb-4"
                        }`}
                    >
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-10 col-lg-8 col-xl-8 d-flex">
                                <div className="w-100">
                                    <Link
                                        onClick={scrollToTop}
                                        to={{
                                            pathname: `${`/prize/featured/${data?.prizeId}`}`,
                                            state: {
                                                prevPath:
                                                    history.location.pathname,
                                            },
                                        }}
                                    >
                                        <div className="card-wrapper">
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
                                            <div className="overlay"></div>
                                            <div className="badges">
                                                {data?.prizeContent ||
                                                    "Featured"}
                                            </div>
                                            <div className="prize-text">
                                                <div className="card-title pl-3">
                                                    {data?.prizeTitle}
                                                </div>
                                                <div className="card-subtitle pl-3">
                                                    {data?.prizeSubtitle ||
                                                        "Version 2"}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 d-flex flex-row align-items-center ticket-info py-2 py-md-0 px-2 px-md-3">
                                            <div className="col px-0">
                                                <div className="px-2 py-2 py-md-1 ticket-wrapper d-md-flex align-items-md-center justify-content-md-between">
                                                    <div className="your-tickets d-flex justify-content-between">
                                                        <p className="mb-0 px-md-2 label d-flex align-self-end">
                                                            Your tickets
                                                        </p>
                                                        <p className="mb-0 tickets d-flex align-items-end">
                                                            {getPoolTickets(
                                                                poolTickets,
                                                                data?.prizeId
                                                            )?.toLocaleString() ||
                                                                0}
                                                        </p>
                                                    </div>
                                                    <div className="pool-tickets d-flex justify-content-between mt-3 mt-md-0">
                                                        <p className="mb-0 pl-md-1 pr-md-2 label d-flex align-items-end">
                                                            Draw starts in
                                                        </p>
                                                        <div className="d-flex">
                                                            <p
                                                                className={`mb-0 d-flex align-items-center ${
                                                                    OverTimeModeChecker(
                                                                        data?.prizeId,
                                                                        data?.ticketsRequired,
                                                                        prizeTicketCollection
                                                                    )
                                                                        ? "text-danger timer"
                                                                        : "tickets"
                                                                }`}
                                                            >
                                                                {OverTimeModeChecker(
                                                                    data?.prizeId,
                                                                    data?.ticketsRequired,
                                                                    prizeTicketCollection
                                                                )
                                                                    ? timer
                                                                    : getPrizeTicketCollected(
                                                                          prizeTicketCollection,
                                                                          data?.prizeId
                                                                      )?.toLocaleString() ||
                                                                      0}
                                                            </p>
                                                            {!OverTimeModeChecker(
                                                                data?.prizeId,
                                                                data?.ticketsRequired,
                                                                prizeTicketCollection
                                                            ) && (
                                                                <p className="required-tickets mb-0 mt-1 d-flex align-items-center">
                                                                    {`\u00A0/ ${data?.ticketsRequired?.toLocaleString()}`}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pl-2 game-icon d-flex justify-content-center">
                                                {data.gameInfo.map((e, i) => (
                                                    <img
                                                        key={`icon-${i}`}
                                                        className="img-fluid"
                                                        src={e.gameIcon}
                                                        alt="game-icon"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
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
