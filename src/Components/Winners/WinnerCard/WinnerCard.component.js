// REACT & REDUX
import React from "react";
import { useSelector } from "react-redux";

// COMPONENTS
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

// HELPER FUNCTIONS
import { defaultUserImage, defaultGameImage } from "Utils/DefaultImage";
import { getDateFormat } from "Utils/DateFormat";

const WinnerCard = ({ data, index, onWinnerDetails }) => {
    const { user } = useSelector((state) => state.userData);

    const isCurrentUser = (player) => {
        if (user.id === player.userId) return true;
    };

    return (
        <div
            className="winner-card col-12 col-md-6"
            onClick={() => onWinnerDetails(data)}
        >
            <div
                className={`wrapper row align-items-center justify-content-between ${
                    index % 2 === 0 ? "gap-right" : "gap-left"
                }`}
            >
                <div className="col winner-info">
                    <div className="row align-items-center">
                        <div className="col-4">
                            <img
                                className={`profile ${
                                    data.isVip ? "vip-frame" : ""
                                }`}
                                onError={(e) => defaultUserImage(e)}
                                src={data.userAvatarUrl}
                                alt="player"
                            />
                        </div>

                        <div className="col-8 text-left">
                            <p className="date my-2">
                                {getDateFormat(data.createdOn * 1000)}
                            </p>
                            <p
                                className={`player-name my-2 ${
                                    isCurrentUser(data) ? "my-name" : ""
                                } `}
                            >
                                {isCurrentUser(data)
                                    ? `${data.userNickName || "Player"} (You)`
                                    : data.userNickName ||
                                      `Player ${data.userId}`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* SEPARATOR */}
                <div className="separator d-block" />

                <div className="col prize-info">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-4 pr-0">
                            <ThumbnailMedia
                                key={data.id}
                                className="prize-thumb float-right"
                                url={data?.prizeImageUrl}
                                isPlayVideo={true}
                                onError={(e) => defaultGameImage(e)}
                            />
                        </div>

                        <div className="col-8 pl-2">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row align-items-center mt-1">
                                        <div className="col-3">
                                            <p className="prize-id mb-2 mb-md-1">{`#${data.prizeId}`}</p>
                                        </div>
                                        <div className="col-9 pl-0">
                                            <p className="prize-title mb-2 mb-md-1">
                                                {data.prizeTitle}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-9 offset-3 pl-0">
                                            <p className="prize-subtitle my-0">
                                                {data.prizeSubtitle}
                                            </p>
                                            <p className="prize-total-players mb-0">{`Total players: ${data.totalPlayers}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WinnerCard;
