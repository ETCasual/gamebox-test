// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import VisibilitySensor from "react-visibility-sensor";

// COMPONENTS
import PremiumCompleted from "Components/Home/PremiumCompleted/PremiumCompleted.component";
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

// REDUX
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";
import { loadPrizePoolTickets } from "redux/thunks/PrizePoolTickets.thunk";

// HELPER FUNCTIONS
import getPoolTickets from "Utils/PoolTickets";
import getPrizeTicketCollected from "Utils/PrizeTicketCollected";
import { convertSecondsToHours } from "Utils/TimeConversion";
import OverTimeModeChecker from "Utils/OverTimeModeChecker";

const Premium = ({ data, handleWinnerRevealCard }) => {
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
            {
                <VisibilitySensor
                    resizeCheck={true}
                    scrollCheck={true}
                    offset={{ top: 10 }}
                    partialVisibility="top"
                    onChange={(isVisible) => {
                        dispatchPoolTickets(isVisible);
                    }}
                >
                    <div className="col-6 col-xl-4 px-2 d-flex align-items-center justify-content-center mb-4">
                        <div className="card-wrapper">
                            <Link
                                to={{
                                    pathname: `/prize/premium/${data.prizeId}`,
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
                                <div className="position-relative prize-img mx-2 mt-2">
                                    <ThumbnailMedia
                                        url={data?.prizeBG}
                                        isPlayVideo={isPlayVideo}
                                        setIsPlayVideo={setIsPlayVideo}
                                    />

                                    <div className="info-wrapper p-1 p-sm-3">
                                        <div className="prize-subtitle">
                                            <p className="mb-0">
                                                {`#${data?.prizeId}`}
                                            </p>
                                            {`${data?.prizeSubtitle}`}
                                        </div>
                                        <div className="prize-title mt-2 mb-2">
                                            {data?.prizeTitle}
                                        </div>
                                    </div>
                                </div>

                                {/* TICKET INFO */}
                                <div className="col-12 d-flex align-items-center ticket-info px-2 px-sm-3 py-0 py-sm-2">
                                    <div className="col col-8 px-0">
                                        <div className="py-2 ticket-wrapper d-block">
                                            <div className="your-tickets">
                                                <p className="mb-0 label d-flex align-items-center">
                                                    Your tickets
                                                </p>
                                                <div className="col d-flex flex-row align-items-center px-0">
                                                    <p className="mb-0 tickets d-flex align-items-center">
                                                        {getPoolTickets(
                                                            poolTickets,
                                                            data?.prizeId
                                                        )?.toLocaleString() ||
                                                            0}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="pool-tickets mt-2">
                                                {/* NO OVERTIME */}
                                                {!OverTimeModeChecker(
                                                    data?.prizeId,
                                                    data?.ticketsRequired,
                                                    prizeTicketCollection
                                                ) && (
                                                    <>
                                                        <p className="mb-0 label d-none align-items-end d-sm-flex">
                                                            Draw starts in
                                                        </p>
                                                        <p className="mb-0 label d-flex align-items-end d-sm-none">
                                                            Prize pool
                                                        </p>
                                                        <div className="col d-flex align-items-center px-0">
                                                            <p className="mb-0 d-none d-sm-flex align-items-center current-tickets tickets">
                                                                {getPrizeTicketCollected(
                                                                    prizeTicketCollection,
                                                                    data?.prizeId
                                                                )?.toLocaleString() ||
                                                                    0}
                                                            </p>

                                                            <p className="tickets mb-0 d-none align-items-center d-sm-flex">{`\u00A0/`}</p>
                                                            <p className="tickets mb-0 d-flex align-items-center">
                                                                {`\u00A0${data?.ticketsRequired?.toLocaleString()}`}
                                                            </p>
                                                        </div>
                                                    </>
                                                )}

                                                {/* TOURNAMENT OVERTIME */}
                                                {OverTimeModeChecker(
                                                    data?.prizeId,
                                                    data?.ticketsRequired,
                                                    prizeTicketCollection
                                                ) && (
                                                    <>
                                                        <p className="mb-0 label align-items-end d-sm-flex">
                                                            Draw starts in
                                                        </p>

                                                        <div className="col d-flex align-items-center px-0">
                                                            <p className="mb-0 d-sm-flex align-items-center overtime-text timer">
                                                                {`\u00A0${timer}`}
                                                            </p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="game-icon-wrapper d-flex flex-column justify-content-center position-relative pb-4 pb-sm-5 pr-1">
                                        <div className="game-icon position-relative">
                                            {data.gameInfo.map((e, i) => (
                                                <React.Fragment
                                                    key={`game-icon-${i}`}
                                                >
                                                    <img
                                                        className="img-fluid"
                                                        src={e.gameIcon}
                                                        alt="game-icon"
                                                    />
                                                    <img
                                                        className="play-icon"
                                                        src={`${window.cdn}icons/icon_play.png`}
                                                        alt="play"
                                                    />
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        <div className="play-text text-center px-2 py-1">
                                            PLAY
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {data?.completed && (
                            <PremiumCompleted
                                data={data}
                                handleWinnerRevealCard={handleWinnerRevealCard}
                            />
                        )}
                    </div>
                </VisibilitySensor>
            }
        </>
    );
};

export default Premium;
