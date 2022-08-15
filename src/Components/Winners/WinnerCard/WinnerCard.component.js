// REACT & REDUX
import { useSelector } from "react-redux";

// COMPONENTS
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

// HELPER FUNCTIONS
import { defaultUserImage, defaultGameImage } from "Utils/DefaultImage";
import { getDateFormat } from "Utils/DateFormat";

const WinnerCard = ({ data, onWinnerDetails }) => {
    const { user } = useSelector((state) => state.userData);

    const isCurrentUser = (player) => {
        if (user.id === player.userId) return true;
    };

    return (
        <div
            key={`winner-card-${data.id}`}
            className="winner-card col-12 align-items-center row justify-content-between"
            onClick={() => onWinnerDetails(data)}
        >
            <div className="winner-info col-6 col-lg-4 d-flex flex-row align-items-center pl-0">
                {/* WINNER IMAGE */}
                <div className="col-auto px-0">
                    <img
                        className={`profile ${data.isVip ? "vip-frame" : ""}`}
                        onError={(e) => defaultUserImage(e)}
                        src={data.userAvatarUrl}
                        alt="player"
                    />
                </div>

                <div className="col d-flex flex-column justify-content-center">
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
                            : data.userNickName || `Player ${data.userId}`}
                    </p>
                </div>
            </div>

            <div className="prize-info col-6 col-lg-4 d-flex flex-row align-items-center pr-0">
                <ThumbnailMedia
                    className="prize-thumb"
                    url={data?.prizeImageUrl}
                    isPlayVideo={true}
                    onError={(e) => defaultGameImage(e)}
                />

                <div className="col justify-content-center ">
                    <p className="prize-id my-0">{`#${data.prizeId}`}</p>
                    <p className="prize-title">{data.prizeTitle}</p>
                    <p className="prize-total-players mb-0">{`Total players: ${data.totalPlayers}`}</p>
                </div>
            </div>
        </div>
    );
};

export default WinnerCard;
