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

    const [winnerData, setWinnerData] = useState([]);
    const [isCardClicked, setIsCardClicked] = useState(false);
    const [noDataLoaded, setNoDataLoaded] = useState(false);

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

    return (
        <>
            {isCardClicked && (
                <SelectedPlayerInfo handleBackButton={handleCloseButton} />
            )}
            {!isCardClicked && (
                <section id="winners">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-md-10 col-lg-8 col-xl-8 mx-auto d-flex flex-column justify-content-center">
                                <div className="w-100 description">
                                    <h1>Winners</h1>
                                    <p>
                                        Champions of the past. You can be one of
                                        them too.
                                    </p>
                                </div>
                                {noDataLoaded && (
                                    <div className="no-result">
                                        <p className="title mb-2">
                                            No Winners yet!
                                        </p>
                                        <p className="subtitle mt-1 mb-0">
                                            Looks like you've not played for any
                                            prizes yet.{" "}
                                        </p>
                                        <p className="subtitle">
                                            <Link to="/">Click here</Link> to
                                            look for one you like.
                                        </p>
                                    </div>
                                )}
                                {!noDataLoaded && winnerData.length <= 0 && (
                                    <WinnerLoader />
                                )}
                                {!noDataLoaded &&
                                    winnerData.map((winner, i) => (
                                        <div
                                            key={`winner-${i}`}
                                            className={`w-100 ${
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
                                                    } mb-2`}
                                                    onClick={() =>
                                                        handleWinnerDetails(
                                                            item.userId
                                                        )
                                                    }
                                                >
                                                    <div className="col px-0 text-center text-md-left">
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
                                                    <div className="col-6 px-">
                                                        <p className="date mb-0">
                                                            {getDateFormat(
                                                                item.createdOn *
                                                                    1000
                                                            )}
                                                        </p>
                                                        <p className="player-name mb-0">
                                                            {isCurrentUser(item)
                                                                ? `${
                                                                      item.userNickName ||
                                                                      "Player"
                                                                  } (You)`
                                                                : item.userNickName ||
                                                                  "Player"}
                                                        </p>
                                                    </div>
                                                    <div className="col-4 col-md-5 px-0 d-flex align-self-center justify-content-center justify-content-md-end">
                                                        <p className="player-reward mb-0">
                                                            {item.prizeTitle}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Index;
