// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import VisibilitySensor from "react-visibility-sensor";

// COMPONENTS
import FeaturedCompleted from "Components/Home/FeaturedCompleted/FeaturedCompleted.component";
// import GenericLoader from "Components/Loader/Generic.loader";
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

// REDUX
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";
import { loadPrizePoolTickets } from "redux/thunks/PrizePoolTickets.thunk";

// HELPER FUNCTIONS
import getPoolTickets from "Utils/PoolTickets";
import getPrizeTicketCollected from "Utils/PrizeTicketCollected";
import { convertSecondsToHours } from "Utils/TimeConversion";
import OverTimeModeChecker from "Utils/OverTimeModeChecker";

const Featured = ({ data, handleWinnerRevealCard }) => {
    const dispatch = useDispatch();

    const { config } = useSelector((state) => state.config);
    const { poolTickets } = useSelector((state) => state.playerTickets);
    const { prizeTicketCollection } = useSelector(
        (state) => state.prizePoolTickets
    );

    const history = useHistory();

    let watcherRef = useRef(null);

    const [timer, setTimer] = useState("0d 0h 0m 0s");
    const [isPlayVideo, setIsPlayVideo] = useState(false);

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
                data?.gameInfo[0]?.endTimeStamp * 1000,
                config.offsetTimestamp ? config.offsetTimestamp : 0
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
    }, [data?.gameInfo, config]);

    return (
        <>
            {!data?.completed && (
                <VisibilitySensor
                    resizeCheck={true}
                    scrollCheck={true}
                    partialVisibility="top"
                    onChange={(isVisible) => {
                        dispatchPoolTickets(isVisible);
                    }}
                >
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <div className="card-wrapper">
                            <Link
                                to={{
                                    pathname: `${`/prize/featured/${data?.prizeId}`}`,
                                    state: {
                                        prevPath: history.location.pathname,
                                    },
                                }}
                                onMouseEnter={(e) => {
                                    // HOVER TO PLAY VIDEO
                                    setIsPlayVideo(true);
                                }}
                                onMouseLeave={(e) => {
                                    // LEAVE HOVER TO PAUSE VIDEO
                                    setIsPlayVideo(false);
                                }}
                                className={
                                    data?.completed ? "disabled" : "enabled"
                                }
                            >
                                {/* PRIZE TITLE, DESCRIPTION & ID */}
                                <div className="prize-info position-relative d-flex flex-wrap p-2 pb-3 p-sm-3">
                                    <div className="prize-img p-0 col-12 col-sm-6 col-xl-5 position-relative">
                                        <ThumbnailMedia
                                            url={data?.prizeBG}
                                            isPlayVideo={isPlayVideo}
                                            setIsPlayVideo={setIsPlayVideo}
                                        />
                                        <div className="info-wrapper position-absolute d-block d-sm-none p-3">
                                            <div className="prize-subtitle">
                                                {data?.prizeSubtitle}
                                            </div>
                                            <div className="prize-title mt-2">
                                                {data?.prizeTitle}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column justify-content-between col-12 col-sm-6 col-xl-7 px-sm-4 px-1">
                                        <div className="info-wrapper pt-3">
                                            <div className="prize-subtitle d-none d-sm-block">
                                                {data?.prizeSubtitle}
                                            </div>
                                            <div className="prize-title mt-2 d-none d-sm-block">
                                                {data?.prizeTitle}
                                            </div>
                                            <div className="prize-description mb-2 mt-0 mt-sm-4 ml-2 ml-sm-0">
                                                {data?.prizeContent}
                                            </div>
                                        </div>
                                        {/* TICKETS INFO */}
                                        <div className="d-flex flex-row align-items-center featured-ticket-info p-3 mt-4">
                                            <div className="col px-0">
                                                <div className="ticket-wrapper align-items-sm-center">
                                                    <div className="your-tickets">
                                                        <p className="mb-0 label d-flex align-self-center">
                                                            Your tickets
                                                        </p>
                                                        <p className="mb-0 tickets d-flex align-items-center">
                                                            {getPoolTickets(
                                                                poolTickets,
                                                                data?.prizeId
                                                            )?.toLocaleString() ||
                                                                0}
                                                        </p>
                                                    </div>
                                                    <div className="pool-tickets mt-3">
                                                        <p className="mb-0 pr-md-2 label d-flex align-items-end">
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
                                                                        ? "overtime-text timer"
                                                                        : "current-tickets tickets"
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
                                                                <p className="tickets mb-0 d-flex align-items-center">
                                                                    {`\u00A0/ ${data?.ticketsRequired?.toLocaleString()}`}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ml-2 game-icon-wrapper d-flex flex-column justify-content-center position-relative pb-4 mr-0 mr-sm-2">
                                                <div className="game-icon position-relative">
                                                    {data.gameInfo?.map(
                                                        (e, i) => (
                                                            <React.Fragment
                                                                key={`game-icon-${i}`}
                                                            >
                                                                <img
                                                                    className="img-fluid"
                                                                    src={
                                                                        e.gameIcon
                                                                    }
                                                                    alt="game-icon"
                                                                />
                                                                <img
                                                                    className="play-icon"
                                                                    src={`${window.cdn}icons/icon_play.png`}
                                                                    alt="play"
                                                                />
                                                            </React.Fragment>
                                                        )
                                                    )}
                                                </div>
                                                <div className="play-text text-center px-2 py-1">
                                                    PLAY
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* {
                                    <div className="tickets-info mb-2 w-100">
                                        <p className="ticket-label mb-2">
                                            Your tickets
                                        </p>
                                        <div className="col-12 d-flex align-items-center justify-content-between pl-0">
                                            <p className="mb-0 your-tickets d-flex align-items-end">
                                                {getPoolTickets(
                                                    poolTickets,
                                                    data?.prizeId
                                                )?.toLocaleString() || 0}
                                            </p>
                                            <div className="d-flex remaining-tickets">
                                                {getPrizeTicketCollected(
                                                    prizeTicketCollection,
                                                    data?.prizeId
                                                ) >= data?.ticketsRequired && (
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
                                                ) < data?.ticketsRequired && (
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
                                            Participate in featured prize
                                            tournaments
                                        </button>
                                    </div>
                                } */}
                            </Link>
                        </div>
                        {data?.completed && (
                            <FeaturedCompleted
                                data={data}
                                handleWinnerRevealCard={handleWinnerRevealCard}
                            />
                        )}
                    </div>
                </VisibilitySensor>
            )}
        </>
    );
};

export default Featured;
