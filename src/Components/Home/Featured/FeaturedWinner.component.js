// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

// REDUX
import loadWinners from "redux/thunks/Winners.thunk";

// HELPER
import { defaultUserImage } from "Utils/DefaultImage";
import { getDateOrdinalFormat } from "Utils/DateFormat";

const FeaturedWinner = ({ prizeId, prizeDrawnTimestamp, prizeUrl }) => {
    const dispatch = useDispatch();

    const { config } = useSelector((state) => state.config);
    const { winners } = useSelector((state) => state.winners);
    const [prizeWon, setPrizeWon] = useState();

    const [timer, setTimer] = useState("");
    const [isPlayVideo, setIsPlayVideo] = useState(false);

    // CALCULATE THE PRIZR DRAWN TIME
    useEffect(() => {
        const endDate = getDateOrdinalFormat(prizeDrawnTimestamp);
        setTimer(endDate);
    }, [config, prizeDrawnTimestamp]);

    // LOAD WINNERS
    useEffect(() => {
        dispatch(loadWinners());
    }, [dispatch]);

    // GET PRIZR WON INFO
    useEffect(() => {
        let prizeWon = null;
        winners.forEach((data) => {
            prizeWon = data.list.find((x) => x.prizeId === prizeId);
        });
        setPrizeWon(prizeWon);
    }, [winners, prizeId]);

    return (
        <>
            <div className="col-12 d-flex align-items-center justify-content-center">
                <div className="winner-card-wrapper">
                    {/* PRIZE TITLE, DESCRIPTION & ID */}
                    <div className="prize-info position-relative d-flex flex-wrap p-2 pb-3 p-sm-3">
                        <div className="prize-img p-0 col-12 col-sm-6 position-relative">
                            <ThumbnailMedia
                                url={prizeUrl}
                                isPlayVideo={isPlayVideo}
                                setIsPlayVideo={setIsPlayVideo}
                            />
                        </div>
                        <div className="col-12 col-sm-6 px-sm-4 px-1">
                            <div className="info-wrapper d-flex flex-column justify-content-between text-center pt-3">
                                <div className="align-items-start">
                                    <div className="congratz-subtitle">
                                        Congratulations!
                                    </div>
                                </div>
                                <div className="align-items-center mt-4 mb-2">
                                    <img
                                        onError={(e) => defaultUserImage(e)}
                                        className="thumb-media mx-auto"
                                        src={
                                            prizeWon?.userAvatarUrl ||
                                            `${window.cdn}icons/icon_profile.svg`
                                        }
                                        alt="profile"
                                    />
                                    <div className="winner-name my-2 mx-auto">
                                        {prizeWon?.userNickName || "..."}
                                    </div>
                                    <div className="winner-subtitle mt-3">
                                        won the
                                    </div>
                                    <div className="prize-title mt-2 mb-4">
                                        {prizeWon?.prizeTitle || "REWARDS"}
                                    </div>
                                </div>
                                <div className="align-items-end">
                                    <div className="prize-drawn-title my-1">
                                        Prize drawn on
                                    </div>
                                    <div className="prize-drawn-text my-1">
                                        {timer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeaturedWinner;
