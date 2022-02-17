// REACT & REDUX
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import SelectedPlayerInfo from "Components/Winners/SelectedPlayerInfo/SelectedPlayerInfo.component";
import WinnerLoader from "Components/Loader/Winner.loader";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadWinners from "redux/thunks/Winners.thunk";
import loadPlayerDetails from "redux/thunks/PlayerDetails.thunk";
import loadPlayerHighScore from "redux/thunks/PlayerHighScore.thunk";

// HELPER FUNCTIONS
import { defaultUserImage } from "Utils/DefaultImage";
import getDateFormat from "Utils/DateFormat";

const Index = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userData);
    const { winners } = useSelector((state) => state.winners);

    let timeOutRef = useRef(null);
    let winnerCardPrizeInfoRef = useRef(null);

    const [winnerData, setWinnerData] = useState([]);
    const [isCardClicked, setIsCardClicked] = useState(false);
    const [noDataLoaded, setNoDataLoaded] = useState(false);
    const [winnerHoverCardData, setWinnerHoverCardData] = useState(null);

    useEffect(() => {
        clearInterval(timeOutRef.current);
        timeOutRef.current = setTimeout(() => {
            if (winnerData.length <= 0) setNoDataLoaded(true);
        }, 10000);
        return () => {
            clearTimeout(timeOutRef.current);
            timeOutRef.current = null;
        };
    }, [winnerData]);

    useEffect(() => {
        if (user.id > 0) dispatch(loadWinners());
    }, [dispatch, user.id]);

    useEffect(() => {
        setWinnerData(winners);
    }, [winners]);

    const isCurrentUser = (player) => {
        if (user.id === player.userId) return true;
    };
    const handleWinnerDetails = (playerId) => {
        dispatch(loadPlayerDetails(playerId));
        dispatch(loadPlayerHighScore(playerId));
        setIsCardClicked(true);
    };
    const handleCloseButton = () => setIsCardClicked(false);

    const handleMouseHover = (type, item = null) => {
        if (type === "enter") {
            winnerCardPrizeInfoRef.current.style.opacity = 1;
            winnerCardPrizeInfoRef.current.style.visibility = "visible";
            setWinnerHoverCardData({
                title: item.prizeTitle,
                imageUrl: item.prizeImageUrl,
            });
            return;
        }
        winnerCardPrizeInfoRef.current.style.opacity = 0;
        winnerCardPrizeInfoRef.current.style.visibility = "hidden";
    };

    return (
        <>
            {isCardClicked && (
                <SelectedPlayerInfo handleBackButton={handleCloseButton} />
            )}
            {!isCardClicked && (
                <section id="winners">
                    <div className="container-fluid">
                        <div className="col-12 col-md-10 col-lg-8 col-xl-7 mx-auto">
                            <div className="row">
                                <div className="col-12 col-lg-6 pl-2">
                                    <h1 className="main-title mb-2">
                                        Latest Winners
                                    </h1>
                                    {noDataLoaded && (
                                        <div className="no-result">
                                            <p className="title mb-2">
                                                No Winners found yet!
                                            </p>
                                            <p className="subtitle mt-1 mb-0">
                                                Looks like you've not played for
                                                any prizes yet.{" "}
                                            </p>
                                            <p className="subtitle">
                                                <Link to="/">Click here</Link>{" "}
                                                to look for one you like.
                                            </p>
                                        </div>
                                    )}
                                    {!noDataLoaded &&
                                        winnerData.length <= 0 && (
                                            <WinnerLoader />
                                        )}
                                    {!noDataLoaded &&
                                        winnerData.map((winner, i) => (
                                            <div
                                                key={`winner-${i}`}
                                                className={`winner-card-wrapper ${
                                                    i !== 0 ? "mt-4" : "mt-2"
                                                }`}
                                            >
                                                <p className="mt-2 mt-md-4 mb-2 mb-md-3 month-year">
                                                    {winner.monthYear}
                                                </p>
                                                {winner.list.map((item, i) => (
                                                    <div
                                                        key={`winner-card-${i}`}
                                                        className={`col-12 px-2 px-md-3 d-flex flex-row align-items-center justify-content-between ${
                                                            isCurrentUser(item)
                                                                ? "winner-card active"
                                                                : "winner-card"
                                                        }`}
                                                        onClick={() =>
                                                            handleWinnerDetails(
                                                                item.userId
                                                            )
                                                        }
                                                        onMouseEnter={() =>
                                                            handleMouseHover(
                                                                "enter",
                                                                item
                                                            )
                                                        }
                                                        onMouseLeave={() =>
                                                            handleMouseHover(
                                                                "leave"
                                                            )
                                                        }
                                                    >
                                                        {/* WINNER IMAGE */}
                                                        <div className="col-auto px-0 text-center text-md-left">
                                                            <img
                                                                onError={(e) =>
                                                                    defaultUserImage(
                                                                        e
                                                                    )
                                                                }
                                                                width="56"
                                                                src={
                                                                    item.userAvatarUrl
                                                                }
                                                                alt="player"
                                                            />
                                                        </div>
                                                        {/* WINNER NAME & DATE */}
                                                        <div className="col-6">
                                                            <p className="date mb-1">
                                                                {getDateFormat(
                                                                    item.createdOn *
                                                                        1000
                                                                )}
                                                            </p>
                                                            <p className="player-name mb-0">
                                                                {isCurrentUser(
                                                                    item
                                                                )
                                                                    ? `${
                                                                          item.userNickName ||
                                                                          "Player"
                                                                      } (You)`
                                                                    : item.userNickName ||
                                                                      "Player"}
                                                            </p>
                                                        </div>
                                                        {/* REWARD NAME */}
                                                        <div className="col-4 col-md-5 text-right">
                                                            <p className="player-reward mb-0">
                                                                {
                                                                    item.prizeTitle
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                </div>
                                <div className="col-6 d-none d-lg-block">
                                    <div
                                        className="winner-card-prize-info d-flex"
                                        ref={winnerCardPrizeInfoRef}
                                    >
                                        {/* IMAGE */}
                                        <div
                                            className="col prize-img"
                                            style={{
                                                backgroundImage: `url("${winnerHoverCardData?.imageUrl}")`,
                                            }}
                                        />
                                        {/* INFO */}
                                        <div className="col p-3 info d-flex flex-column align-items-start justify-content-between">
                                            <div className="prize-info">
                                                <div className="prize-title">
                                                    {winnerHoverCardData?.title}
                                                </div>
                                                <div className="prize-subtitle mt-1">
                                                    {winnerHoverCardData?.subtitle ||
                                                        "Subtitle"}
                                                </div>
                                            </div>

                                            <div className="participants">
                                                <p className="mb-1 total-label">
                                                    Total participated players
                                                </p>
                                                <p className="mb-0 total-player">
                                                    800,001
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Index;
