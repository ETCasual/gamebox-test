// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

// HELPER FUNCTIONS
import getPoolTickets from "Utils/PoolTickets";
import getPrizeTicketCollected from "Utils/PrizeTicketCollected";
import { useTranslation } from "react-i18next";

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

    const { t } = useTranslation();

    return (
        <>
            {card && (
                <div className="activity-card-wrapper col-12 col-xl-6 mb-3 px-3 px-md-2">
                    {/* CARD WRAPPER */}
                    <Link
                        className="d-flex activity-card col-12 py-2 px-2"
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
                        <div className="ticket-info px-0 pt-2 d-flex flex-column align-items-center justify-content-between col-7 col-md-8 col-lg-9 col-xl-7">
                            {/* PRIZE INFO */}
                            <div className="prize-info w-100">
                                <div className="prize-subtitle px-3">
                                    {card?.prizeSubtitle}
                                </div>
                                <div className="prize-title mt-1 px-3">
                                    {card?.prizeTitle}
                                </div>
                            </div>
                            <div className="ticket-wrapper w-100">
                                {/* YOUR TICKETS */}
                                <div className="your-tickets px-3 mb-1 mb-sm-2 d-flex flex-column align-items-md-start justify-content-start">
                                    <div>
                                        <p className="label mb-0 mb-md-1">
                                            {t("activity.card.ticketTitle")}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="tickets mb-0">
                                            {`${
                                                getPoolTickets(
                                                    poolTickets,
                                                    card?.prizeId
                                                )?.toLocaleString() || 0
                                            }`}
                                        </p>
                                    </div>
                                </div>
                                {/* POOL TICKETS */}
                                <div className="pool-tickets px-3 py-2 d-flex align-items-start justify-content-start">
                                    <p className="mb-0 required-tickets">
                                        <span className="bold-text">{`${(
                                            card?.ticketsRequired -
                                                getPrizeTicketCollected(
                                                    prizeTicketCollection,
                                                    card?.prizeId
                                                ) || 0
                                        ).toLocaleString()}`}</span>

                                        {t("activity.card.remaining")}
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
