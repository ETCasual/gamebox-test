// REACT & REDUX
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
            key={`winner-card-${data.id}`}
            className={`winner-card col ${
                index % 2 === 0 ? "pr-md-2" : "pl-md-2"
            }`}
            onClick={() => onWinnerDetails(data)}
        >
            <div className="wrapper row align-items-center mx-0">
                <div className="winner-info col">
                    <div className="row align-items-center mx-0 pr-0">
                        <div className="col-auto d-flex px-0">
                            <img
                                className={`profile ${
                                    data.isVip ? "vip-frame" : ""
                                }`}
                                onError={(e) => defaultUserImage(e)}
                                src={data.userAvatarUrl}
                                alt="player"
                            />
                        </div>

                        <div className="col px-0 ml-2">
                            <p className="date mb-2">
                                {getDateFormat(data.createdOn * 1000)}
                            </p>
                            <p
                                className={`player-name mb-2 ${
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

                <div className="prize-info col">
                    <div className="row row-cols-2 align-items-center mx-0 pr-0">
                        <div className="col-auto d-flex px-0">
                            <ThumbnailMedia
                                className="prize-thumb"
                                url={data?.prizeImageUrl}
                                isPlayVideo={true}
                                onError={(e) => defaultGameImage(e)}
                            />
                        </div>

                        <div className="col px-0 ml-2">
                            <div className="row row-cols-2">
                                <div className="col-auto px-0 text-left">
                                    <p className="prize-id my-0">{`#${data.prizeId}`}</p>
                                </div>
                                <div className="col-9 pl-2 pr-0">
                                    <p className="prize-title my-auto">
                                        {data.prizeTitle}
                                    </p>
                                    <p className="prize-subtitle my-1">
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
    );
};

export default WinnerCard;
