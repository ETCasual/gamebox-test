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
                            length > 1 ? "mb-3" : "mb-5"
                        }`}
                    >
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-10 col-lg-8 col-xl-7 d-flex">
                                <Link
                                    className="w-100"
                                    onClick={scrollToTop}
                                    to={{
                                        pathname: `${`/prize/featured/${data?.prizeId}`}`,
                                        state: {
                                            prevPath: history.location.pathname,
                                        },
                                    }}
                                >
                                    <div className="card-wrapper d-flex flex-column flex-md-row">
                                        {/* PRIZE TYPE */}
                                        <div className="prize-type">
                                            Featured NFT
                                        </div>
                                        <div className="col-12 col-md-6 pl-0 d-flex flex-column align-items-start justify-content-end position-relative p-3 order-2 order-md-1">
                                            {/* PRIZE TITLE, DESCRIPTION & ID */}
                                            <div className="prize-text mb-2 w-100">
                                                <div className="prize-id">
                                                    ID: {data?.prizeContent}
                                                </div>
                                                <div className="prize-title mt-2 mb-2 mb-md-3">
                                                    {data?.prizeTitle}
                                                </div>
                                                <div className="prize-subtitle">
                                                    {data?.prizeSubtitle}
                                                </div>

                                                {/* HR SEPARATOR */}
                                                <hr className="separator" />

                                                {/* TICKETS INFO */}
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
                                                    <div className="d-flex">
                                                        {/* TOTAL POOL TICKETS COLLECTED */}
                                                        <p
                                                            className={`mb-0 d-flex align-items-center ${
                                                                OverTimeModeChecker(
                                                                    data?.prizeId,
                                                                    data?.ticketsRequired,
                                                                    prizeTicketCollection
                                                                )
                                                                    ? "text-danger timer"
                                                                    : "remaining-tickets"
                                                            }`}
                                                        >
                                                            {OverTimeModeChecker(
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
                                                                      )?.toLocaleString() ||
                                                                      "-"
                                                                  } tickets remaining`}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-end px-0 order-1 order-md-2">
                                            <picture className="d-flex align-items-center justify-content-center justify-content-md-end w-100 h-100">
                                                <source
                                                    media="(max-width:768px)"
                                                    srcSet={data.prizeBG2}
                                                />
                                                <img
                                                    src={data.prizeBG}
                                                    alt={data.prizeTitle}
                                                />
                                            </picture>
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
