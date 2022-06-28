// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import VisibilitySensor from "react-visibility-sensor";

// HELPER FUNCTIONS
import getPoolTickets from "Utils/PoolTickets";
import getPrizeTicketCollected from "Utils/PrizeTicketCollected";
import getFileType from "Utils/GetFileType";
import { useEffect } from "react";

const ActivityCard = ({ card }) => {
    const { poolTickets } = useSelector((state) => state.playerTickets);
    const { prizeTicketCollection } = useSelector(
        (state) => state.prizePoolTickets
    );

    const history = useHistory();

    const [isMobile, setIsMobile] = useState(
        navigator.userAgent.includes("Mobile")
    );

    let thumbPrizeRef = useRef(null);

    useEffect(() => {
        setIsMobile(navigator.userAgent.includes("Mobile"));
    }, [setIsMobile]);

    const getPrizeType = (type) => {
        return type === 1 ? "Featured" : type === 2 ? "Premium" : "Daily";
    };

    return (
        <>
            {card && (
                <VisibilitySensor
                    resizeCheck={true}
                    scrollCheck={true}
                    offset={{ top: 50 }}
                    partialVisibility="top"
                    onChange={(isVisible) => {
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
                    <div className="activity-card col-12 col-xl-6 mb-3 px-3 px-md-2">
                        {/* CARD WRAPPER */}
                        <Link
                            className="d-flex"
                            to={{
                                pathname: `/prize/${getPrizeType(
                                    card?.prizeType
                                )?.toLowerCase()}/${card?.prizeId}`,
                                state: {
                                    prevPath: history.location.pathname,
                                },
                            }}
                            onMouseEnter={(e) => {
                                // HOVER TO PLAY VIDEO
                                if (
                                    thumbPrizeRef.current?.localName === "video"
                                ) {
                                    thumbPrizeRef.current?.play();
                                }
                            }}
                            onMouseLeave={(e) => {
                                // LEAVE HOVER TO PAUSE VIDEO
                                if (
                                    thumbPrizeRef.current?.localName === "video"
                                ) {
                                    thumbPrizeRef.current?.pause();
                                }
                            }}
                        >
                            {/* IMAGE (OLD VERSION OF LOADING THUMBNAIL IMG) */}
                            {/* <div
                className="card-wrapper col-5 col-md-4 col-lg-3 col-xl-5"
                style={{
                    backgroundImage: `url("${card?.prizeImage}")`,
                }}
            /> */}

                            {/* IMAGE */}
                            {/* VIDEO */}
                            <div className="card-wrapper">
                                {/* Read the prize thumbnail file type */}
                                {getFileType(card?.prizeImage) === "mp4" && (
                                    <video
                                        ref={thumbPrizeRef}
                                        // autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                    >
                                        <source
                                            src={card?.prizeImage}
                                            type="video/mp4"
                                        />
                                    </video>
                                )}

                                {(getFileType(card?.prizeImage) === "gif" ||
                                    getFileType(card?.prizeImage) === "png" ||
                                    getFileType(card?.prizeImage) === "jpg" ||
                                    getFileType(card?.prizeImage) ===
                                        "jpeg") && (
                                    <img
                                        ref={thumbPrizeRef}
                                        src={card?.prizeImage}
                                        alt={card?.prizeImage}
                                    />
                                )}
                            </div>

                            {/* INFO */}
                            <div className="ticket-info px-0 pt-3 d-flex flex-column align-items-center justify-content-between col-7 col-md-8 col-lg-9 col-xl-7">
                                {/* PRIZE INFO */}
                                <div className="prize-info w-100">
                                    <div className="prize-title px-3">
                                        {card?.prizeTitle}
                                    </div>
                                    <div className="prize-subtitle mt-1 px-3">
                                        {card?.prizeSubtitle}
                                    </div>
                                </div>
                                <div className="ticket-wrapper w-100">
                                    {/* YOUR TICKETS */}
                                    <div className="your-tickets px-3 mb-2 d-flex flex-md-column align-items-center align-items-md-start justify-content-between justify-content-md-start">
                                        <p className="label mb-0 mb-md-1">
                                            Your tickets
                                        </p>
                                        <p className="tickets mb-0">
                                            {`${
                                                getPoolTickets(
                                                    poolTickets,
                                                    card?.prizeId
                                                )?.toLocaleString() || 0
                                            }`}
                                        </p>
                                    </div>
                                    {/* POOL TICKETS */}
                                    <div className="pool-tickets px-2 py-3 d-flex align-items-center justify-content-center">
                                        <p className="mb-0 required-tickets">
                                            {`\u00A0${(
                                                card?.ticketsRequired -
                                                    getPrizeTicketCollected(
                                                        prizeTicketCollection,
                                                        card?.prizeId
                                                    ) || 0
                                            ).toLocaleString()}`}{" "}
                                            tickets remaining
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </VisibilitySensor>
            )}
        </>
    );
};

export default ActivityCard;
