// REACT & REDUX
import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import SelectedPlayerInfo from "Components/Winners/SelectedPlayerInfo/SelectedPlayerInfo.component";
import WinnerLoader from "Components/Loader/Winner.loader";
import WinnerCard from "./WinnerCard/WinnerCard.component";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadWinners from "redux/thunks/Winners.thunk";
import loadPlayerDetails from "redux/thunks/PlayerDetails.thunk";
import loadPlayerHighScore from "redux/thunks/PlayerHighScore.thunk";

const Index = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userData);
    const { winners } = useSelector((state) => state.winners);
    const history = useHistory();

    let timeOutRef = useRef(null);
    // let winnerCardPrizeInfoRef = useRef(null);

    const [winnerData, setWinnerData] = useState([]);
    const [isCardClicked, setIsCardClicked] = useState(false);
    const [noDataLoaded, setNoDataLoaded] = useState(false);
    // const [winnerHoverCardData, setWinnerHoverCardData] = useState(null);

    useEffect(() => {
        clearInterval(timeOutRef.current);
        timeOutRef.current = setTimeout(() => {
            if (winnerData.length <= 0) setNoDataLoaded(true);
            else setNoDataLoaded(false);
        }, 3000);
        return () => {
            clearTimeout(timeOutRef.current);
            timeOutRef.current = null;
        };
    }, [winnerData]);

    useEffect(() => {
        if (user.id) dispatch(loadWinners());
    }, [dispatch, user.id]);

    useEffect(() => {
        setWinnerData(winners);
    }, [winners]);

    const isCurrentUser = (player) => {
        if (user.id === player.userId) return true;
    };
    const handleWinnerDetails = (player) => {
        const playerId = player.userId;
        if (!isCurrentUser(player)) {
            dispatch(loadPlayerDetails(playerId));
            dispatch(loadPlayerHighScore(playerId));
            setIsCardClicked(true);
        } else {
            history.push(`/profile/rewards`);
        }
    };
    const handleCloseButton = () => setIsCardClicked(false);

    // const handleMouseHover = (type, item = null) => {
    //     if (type === "enter") {
    //         winnerCardPrizeInfoRef.current.style.opacity = 1;
    //         winnerCardPrizeInfoRef.current.style.visibility = "visible";
    //         setWinnerHoverCardData({
    //             title: item.prizeTitle,
    //             subtitle: item.prizeSubtitle,
    //             imageUrl: item.prizeImageUrl,
    //             totalPlayers: item.totalPlayers,
    //         });
    //         return;
    //     }
    //     winnerCardPrizeInfoRef.current.style.opacity = 0;
    //     winnerCardPrizeInfoRef.current.style.visibility = "hidden";
    // };

    return (
        <>
            {isCardClicked && (
                <SelectedPlayerInfo handleBackButton={handleCloseButton} />
            )}
            {!isCardClicked && (
                <section id="winners">
                    <div className="container-fluid px-0">
                        <div className="col-12 col-md-10 col-lg-8 mx-auto content-min-height">
                            {/* Winners */}
                            <h1 className="main-title mb-4">Latest Winners</h1>
                            {noDataLoaded && (
                                <div className="no-result">
                                    <p className="title mb-2">
                                        No Winners found yet!
                                    </p>
                                    <p className="subtitle mt-1 mb-0">
                                        Looks like you've not played for any
                                        prizes yet.{" "}
                                    </p>
                                    <p className="subtitle">
                                        <Link to="/">Click here</Link> to look
                                        for one you like.
                                    </p>
                                </div>
                            )}

                            {!noDataLoaded && winnerData.length <= 0 && (
                                <WinnerLoader />
                            )}

                            {!noDataLoaded && (
                                <>
                                    {winnerData?.map((winner, i) => (
                                        <React.Fragment key={`winner-${i}`}>
                                            <p
                                                className={`${
                                                    i === 0
                                                        ? "mt-primary"
                                                        : "mt-secondary"
                                                } month-year mb-4`}
                                            >
                                                {winner?.monthYear}
                                            </p>
                                            <div className="row row-cols-1 row-cols-md-2">
                                                {winner.list.map(
                                                    (item, index) => (
                                                        <WinnerCard
                                                            data={item}
                                                            index={index}
                                                            onWinnerDetails={
                                                                handleWinnerDetails
                                                            }
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </>
    );

    // COMMENTED DUE TO CHANGED THE UI LAYOUT
    // return (
    //     <>
    //         {isCardClicked && (
    //             <SelectedPlayerInfo handleBackButton={handleCloseButton} />
    //         )}
    //         {!isCardClicked && (
    //             <section id="winners">
    //                 <div className="container-fluid px-0">
    //                     <div className="col-12 col-md-10 col-lg-9 mx-auto">
    //                         <h1 className="main-title mb-2">Latest Winners</h1>
    //                         {noDataLoaded && (
    //                             <div className="no-result">
    //                                 <p className="title mb-2">
    //                                     No Winners found yet!
    //                                 </p>
    //                                 <p className="subtitle mt-1 mb-0">
    //                                     Looks like you've not played for any
    //                                     prizes yet.{" "}
    //                                 </p>
    //                                 <p className="subtitle">
    //                                     <Link to="/">Click here</Link> to look
    //                                     for one you like.
    //                                 </p>
    //                             </div>
    //                         )}
    //                         <div className="content-min-height row mx-0">
    //                             <div className="col-12 col-xl-6 pl-0">
    //                                 {!noDataLoaded &&
    //                                     winnerData.length <= 0 && (
    //                                         <WinnerLoader />
    //                                     )}
    //                                 {!noDataLoaded &&
    //                                     winnerData.map((winner, i) => (
    //                                         <div
    //                                             key={`winner-${i}`}
    //                                             className={`winner-card-wrapper ${
    //                                                 i !== 0 ? "mt-4" : "mt-2"
    //                                             }`}
    //                                         >
    //                                             <p className="mt-2 mt-md-4 mb-2 mb-md-3 month-year">
    //                                                 {winner.monthYear}
    //                                             </p>
    //                                             {winner.list.map((item, i) => (
    //                                                 <div
    //                                                     key={`winner-card-${i}`}
    //                                                     className={`col-12 px-2 px-md-3 d-flex flex-row align-items-center justify-content-between winner-card`}
    //                                                     onClick={() =>
    //                                                         handleWinnerDetails(
    //                                                             item
    //                                                         )
    //                                                     }
    //                                                     onMouseEnter={() =>
    //                                                         handleMouseHover(
    //                                                             "enter",
    //                                                             item
    //                                                         )
    //                                                     }
    //                                                     onMouseLeave={() =>
    //                                                         handleMouseHover(
    //                                                             "leave"
    //                                                         )
    //                                                     }
    //                                                 >
    //                                                     {/* WINNER IMAGE */}
    //                                                     <div className="col-auto px-0 text-center text-md-left">
    //                                                         <img
    //                                                             className={
    //                                                                 item.isVip
    //                                                                     ? "vip-frame"
    //                                                                     : ""
    //                                                             }
    //                                                             onError={(e) =>
    //                                                                 defaultUserImage(
    //                                                                     e
    //                                                                 )
    //                                                             }
    //                                                             src={
    //                                                                 item.userAvatarUrl
    //                                                             }
    //                                                             alt="player"
    //                                                         />
    //                                                     </div>
    //                                                     {/* WINNER NAME & DATE */}
    //                                                     <div className="col-6">
    //                                                         <p className="date mb-1">
    //                                                             {getDateFormat(
    //                                                                 item.createdOn *
    //                                                                     1000
    //                                                             )}
    //                                                         </p>
    //                                                         <p
    //                                                             className={`player-name mb-0 ${
    //                                                                 isCurrentUser(
    //                                                                     item
    //                                                                 )
    //                                                                     ? "my-name"
    //                                                                     : ""
    //                                                             } `}
    //                                                         >
    //                                                             {isCurrentUser(
    //                                                                 item
    //                                                             )
    //                                                                 ? `${
    //                                                                       item.userNickName ||
    //                                                                       "Player"
    //                                                                   } (You)`
    //                                                                 : item.userNickName ||
    //                                                                   `Player ${item.userId}`}
    //                                                         </p>
    //                                                     </div>
    //                                                     {/* REWARD NAME */}
    //                                                     <div className="col-4 col-md-5 text-right">
    //                                                         <p className="player-reward mb-0">
    //                                                             {
    //                                                                 item.prizeTitle
    //                                                             }
    //                                                         </p>
    //                                                     </div>
    //                                                 </div>
    //                                             ))}
    //                                         </div>
    //                                     ))}
    //                             </div>
    //                             <div className="col-6 d-none d-lg-block positive-relative">
    //                                 <div
    //                                     className="winner-card-prize-info d-flex"
    //                                     ref={winnerCardPrizeInfoRef}
    //                                 >
    //                                     {/* THUMBNAIL MEDIA */}
    //                                     <ThumbnailMedia
    //                                         url={winnerHoverCardData?.imageUrl}
    //                                         isPlayVideo={true}
    //                                     />

    //                                     {/* INFO */}
    //                                     <div className="col p-3 info d-flex flex-column align-items-start justify-content-between">
    //                                         <div className="prize-info">
    //                                             <div className="prize-title">
    //                                                 {winnerHoverCardData?.title}
    //                                             </div>
    //                                             <div className="prize-subtitle mt-1">
    //                                                 {
    //                                                     winnerHoverCardData?.subtitle
    //                                                 }
    //                                             </div>
    //                                         </div>

    //                                         <div className="participants">
    //                                             <p className="mb-1 total-label">
    //                                                 Total participated players
    //                                             </p>
    //                                             <p className="mb-0 total-player">
    //                                                 {winnerHoverCardData?.totalPlayers?.toLocaleString()}
    //                                             </p>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </section>
    //         )}
    //     </>
    // );
};

export default Index;
