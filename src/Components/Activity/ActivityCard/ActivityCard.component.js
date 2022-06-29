// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

// HELPER FUNCTIONS
import getPoolTickets from "Utils/PoolTickets";
import getPrizeTicketCollected from "Utils/PrizeTicketCollected";

const ActivityCard = ({ card }) => {
    const { poolTickets } = useSelector((state) => state.playerTickets);
    const { prizeTicketCollection } = useSelector(
        (state) => state.prizePoolTickets
    );

    const history = useHistory();

    const [isPlayVideo, setIsPlayVideo] = useState(false);

    const getPrizeType = (type) => {
        return type === 1 ? "Featured" : type === 2 ? "Premium" : "Daily";
    };

    return (
        <>
            {card && (
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
                            setIsPlayVideo(true);
                        }}
                        onMouseLeave={(e) => {
                            // LEAVE HOVER TO PAUSE VIDEO
                            setIsPlayVideo(false);
                        }}
                    >
                        <div className="card-wrapper">
                            {/* THUMBNAIL MEDIA */}
                            <ThumbnailMedia
                                url={card?.prizeImage}
                                isPlayVideo={isPlayVideo}
                                setIsPlayVideo={setIsPlayVideo}
                            />
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
            )}
        </>
    );
};

export default ActivityCard;
