// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

// REDUX
import loadWinners from "redux/thunks/Winners.thunk";

// HELPER
import { defaultUserImage } from "Utils/DefaultImage";
import { getDateOrdinalFormat } from "Utils/DateFormat";
import { useTranslation } from "react-i18next";

const FeaturedWinner = ({ prizeId, prizeDrawnTimestamp, prizeUrl }) => {
    const dispatch = useDispatch();

    const { config } = useSelector((state) => state.config);
    // const { winners } = useSelector((state) => state.winners);
    const [prizeWon] = useState({
        userAvatarUrl: `${window.cdn}assets/icons/icon_profile.svg`,
        userNickName: "yoyo",
        prizeTitle: "40,000 $FROYO",
    });

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
    // useEffect(() => {
    //     let prizeWon = null;
    //     winners.forEach((data) => {
    //         prizeWon = data.list.find((x) => x.prizeId === prizeId);
    //     });
    //     setPrizeWon(prizeWon);
    // }, [winners, prizeId]);

    const { t } = useTranslation();

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
                                <div className="align-items-start mt-4">
                                    <div className="congratz-subtitle">
                                        {t("featuredWinner.congratulations")}
                                    </div>
                                </div>
                                <div className="align-items-center mt-4 mb-2">
                                    <img
                                        onError={(e) => defaultUserImage(e)}
                                        className="thumb-media mx-auto my-4"
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
                                        {t("featuredWinner.won")}
                                    </div>
                                    <div className="prize-title mt-2 mb-4">
                                        {prizeWon?.prizeTitle ||
                                            t("featuredWinner.rewards")}
                                    </div>
                                </div>
                                <div className="align-items-end mb-4">
                                    <div className="prize-drawn-title my-1">
                                        {t("featuredWinner.drawnOn")}
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
