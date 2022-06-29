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
import getPoolTickets from "Utils/PoolTickets";
import getPrizeTicketCollected from "Utils/PrizeTicketCollected";
import convertSecondsToHours from "Utils/TimeConversion";
import OverTimeModeChecker from "Utils/OverTimeModeChecker";
import getFileType from "Utils/GetFileType";

const Premium = ({ data, handleWinnerRevealCard }) => {
    const dispatch = useDispatch();

    const { config } = useSelector((state) => state.config);
    const { poolTickets } = useSelector((state) => state.playerTickets);
    const { prizeTicketCollection } = useSelector(
        (state) => state.prizePoolTickets
    );
    const history = useHistory();

    let watcherRef = useRef(null);
    let thumbPrizeRef = useRef(null);

    const [timer, setTimer] = useState("0d 0h 0m 0s");
    const [thumbFileType, setThumbFileType] = useState("");
    const [isMobile, setIsMobile] = useState(
        navigator.userAgent.includes("Mobile")
    );

    useEffect(() => {
        dispatch(loadPlayerTickets(data?.prizeId, true));
        dispatch(
            loadPrizePoolTickets(
                parseInt(data?.prizeId),
                true,
                data?.ticketsRequired
            )
        );

        // Read the prize thumbnail file type
        setThumbFileType(getFileType(data?.prizeBG));
    }, [dispatch, data?.prizeId, data?.ticketsRequired, data?.prizeBG]);

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
                    offset={{ top: 10 }}
                    partialVisibility="top"
                    onChange={(isVisible) => {
                        dispatchPoolTickets(isVisible);

                        if (!isMobile) return;

                        if (thumbPrizeRef.current?.localName === "video") {
                            if (isVisible) {
                                thumbPrizeRef.current?.play();
                            } else {
                                thumbPrizeRef.current?.pause();
                            }
                        }
                    }}
                >
                    <div className="col-12 col-sm-6 col-md-6 col-xl-4 px-3 px-sm-2 d-flex align-items-center justify-content-center mb-4">
                        <div className="card-wrapper">
                            <Link
                                to={{
                                    pathname: `/prize/premium/${data.prizeId}`,
                                    state: {
                                        prevPath: history.location.pathname,
                                    },
                                }}
                            >
                                <div className="position-relative">
                                    {/* VIDEO */}
                                    {thumbFileType === "mp4" && (
                                        <video
                                            ref={thumbPrizeRef}
                                            // autoPlay
                                            loop
                                            muted
                                            playsInline
                                            preload="metadata"
                                            onMouseEnter={(e) => {
                                                e.target.play();
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.pause();
                                            }}
                                        >
                                            <source
                                                src={data?.prizeBG}
                                                type="video/mp4"
                                            />
                                        </video>
                                    )}

                                    {/* PNG, JPG, GIF */}
                                    {(thumbFileType === "gif" ||
                                        thumbFileType === "png" ||
                                        thumbFileType === "jpg" ||
                                        thumbFileType === "jpeg") && (
                                        <picture ref={thumbPrizeRef}>
                                            <source
                                                media="(max-width:768px)"
                                                srcSet={data?.prizeBG2}
                                            />
                                            <img
                                                src={data?.prizeBG}
                                                alt={data?.prizeTitle}
                                            />
                                        </picture>
                                    )}

                                    <div className="info-wrapper p-3">
                                        <div className="prize-title mt-2 mb-2">
                                            {data?.prizeTitle}
                                        </div>
                                        <div className="prize-subtitle">
                                            {data?.prizeSubtitle}
                                        </div>
                                    </div>
                                </div>

                                {/* TICKET INFO */}
                                <div className="col-12 d-flex flex-row align-items-center ticket-info">
                                    <div className="col px-0">
                                        {/* MOBILE */}
                                        <div className="px-2 py-2 ticket-wrapper d-block d-sm-none">
                                            <div className="your-tickets d-flex justify-content-end">
                                                <div className="col d-flex justify-content-between px-0">
                                                    <p className="mb-0 px-md-2 label d-flex align-self-end">
                                                        Your tickets
                                                    </p>
                                                </div>
                                                <p className="mb-0 tickets d-flex align-items-center">
                                                    {getPoolTickets(
                                                        poolTickets,
                                                        data?.prizeId
                                                    )?.toLocaleString() || 0}
                                                </p>
                                            </div>
                                            <div className="pool-tickets d-flex justify-content-end mt-3">
                                                <div className="col d-flex justify-content-between px-0">
                                                    <p className="mb-0 mb-md-1 pl-md-1 pr-md-2 label d-flex align-items-end">
                                                        Draw starts in
                                                    </p>
                                                </div>

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
                                                    {!OverTimeModeChecker(
                                                        data?.prizeId,
                                                        data?.ticketsRequired,
                                                        prizeTicketCollection
                                                    ) && (
                                                        <span className="required-tickets">
                                                            {`\u00A0/ ${data?.ticketsRequired?.toLocaleString()}`}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        {/* DESKTOP */}
                                        <div className="px-2 py-2 ticket-wrapper d-none d-sm-block">
                                            <div className="your-tickets">
                                                <p className="mb-1 label d-flex align-items-center">
                                                    Your tickets
                                                </p>
                                                <div className="col d-flex flex-row align-items-center px-0">
                                                    <p className="mb-0 tickets d-flex align-items-center">
                                                        {`\u00A0${
                                                            getPoolTickets(
                                                                poolTickets,
                                                                data?.prizeId
                                                            )?.toLocaleString() ||
                                                            0
                                                        }`}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="pool-tickets mt-2">
                                                <p className="mb-1 label d-flex align-items-end">
                                                    Draw starts in
                                                </p>
                                                <div className="col d-flex align-items-center px-0">
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
                                                        {`\u00A0${
                                                            OverTimeModeChecker(
                                                                data?.prizeId,
                                                                data?.ticketsRequired,
                                                                prizeTicketCollection
                                                            )
                                                                ? timer
                                                                : getPrizeTicketCollected(
                                                                      prizeTicketCollection,
                                                                      data?.prizeId
                                                                  )?.toLocaleString() ||
                                                                  0
                                                        }`}
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
                                    <div className="ml-2 game-icon d-flex justify-content-center position-relative">
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

                                {false && (
                                    <>
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
                                            {getPrizeTicketCollected(
                                                prizeTicketCollection,
                                                data?.prizeId
                                            ) >= data?.ticketsRequired && (
                                                <p className="mb-0 draw-timer d-flex align-items-center justify-content-center">
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
                                                            )?.toLocaleString() ||
                                                            "-"
                                                        } tickets remaining`
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </>
                                )}
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
