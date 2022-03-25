// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import OnBoarding from "Components/Home/OnBoarding/OnBoarding.component";
import Featured from "Components/Home/Featured/Featured.component";
import AutomatedEntry from "Components/Home/AutomatedEntry/AutomatedEntry.component";
import Premium from "Components/Home/Premium/Premium.component";
import PrizeModal from "Components/Modals/PrizeModal.component";
import FeaturedLoader from "Components/Loader/Featured.loader";
import AutomatedEntryLoader from "Components/Loader/AutomatedEntry.loader";
import PremiumLoader from "Components/Loader/Premium.loader";
import StayTune from "Components/Home/StayTune/StayTune.component";
import RevealCardModal from "Components/Modals/RevealCardModal.component";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";
import loadPrizePoolTickets from "redux/thunks/PrizePoolTickets.thunk";
import loadNotifications from "redux/thunks/Notifcations.thunk";

const Index = () => {
    const { prizes } = useSelector((state) => state.prizes);
    const { user } = useSelector((state) => state.userData);
    const { notificationList } = useSelector((state) => state.notifications);
    const { unClaimedPrizes } = useSelector((state) => state.unClaimedPrizes);

    const dispatch = useDispatch();

    let timeOutRef1 = useRef(null);
    let timeOutRef2 = useRef(null);

    const history = useHistory();

    const [noDataLoaded, setNoDataLoaded] = useState({
        feature: false,
        premium: false,
        automated: false,
        all: false,
    });
    const [FeaturedData, setFeaturedData] = useState([]);
    const [PremiumData, setPremiumData] = useState([]);
    const [automatedEntryData, setAutomatedEntryData] = useState([]);
    const [winnerAnnouncementData, setWinnerAnnouncementData] = useState([]);
    const [isWinnerAnnouncementShown, setIsWinnerAnnouncementShown] =
        useState(false);
    const [revealCardModalData, setRevealCardModalData] = useState([]);
    const [isRevealCardModalShown, setIsRevealCardModalShown] = useState(false);
    const [isOnBoardingShown, setIsOnBoardingShown] = useState(false);

    // ONBOARDING
    useEffect(() => {
        const isNewUser = Boolean(localStorage.getItem("isNewUser")) || false;
        if (isNewUser) setIsOnBoardingShown(true);
    }, [setIsOnBoardingShown]);

    // STAY TUNED
    useEffect(() => {
        clearTimeout(timeOutRef2.current);
        timeOutRef2.current = setTimeout(() => {
            if (
                prizes.featuredData.length <= 0 &&
                prizes.premiumData.length <= 0 &&
                prizes.automatedEntryData.length <= 0
            )
                setNoDataLoaded((prev) => ({ ...prev, all: true }));

            setNoDataLoaded((prev) => ({
                ...prev,
                feature: prizes.featuredData.length <= 0 ? true : false,
                premium: prizes.premiumData.length <= 0 ? true : false,
                automated: prizes.automatedEntryData.length <= 0 ? true : false,
            }));
        }, 7000);
        return () => {
            clearTimeout(timeOutRef2.current);
            timeOutRef2.current = null;
        };
    }, [prizes.featuredData, prizes.premiumData, prizes.automatedEntryData]);

    // SETTING PRIZES (FEATURE & PREMIUM) TO STATE
    useEffect(() => {
        const sessionTimeStamp = parseInt(
            sessionStorage.getItem("sessionTimeStamp")
        );
        const diff = Date.now() - sessionTimeStamp;
        // if (diff <= 15000) console.log("HOME PAGE TIMER CALLING TICKETS", diff);

        clearTimeout(timeOutRef1.current);
        timeOutRef1.current = setTimeout(() => {
            if (
                prizes.featuredData.length > 0 ||
                prizes.premiumData.length > 0
            ) {
                let _fData = [];
                let _pData = [];
                const prizeList =
                    JSON.parse(localStorage.getItem("prizeDetailList")) || [];

                for (let i = 0; i < prizeList.length; i++) {
                    const element = prizeList[i];
                    if (
                        (!element.completed || element.completed) &&
                        !element.seen
                    ) {
                        if (element.type === 1) {
                            _fData.push(element);
                            if (diff <= 15000) {
                                dispatch(
                                    loadPlayerTickets(element.prizeId, true)
                                );
                                dispatch(
                                    loadPrizePoolTickets(
                                        element.prizeId,
                                        true,
                                        element.ticketsRequired
                                    )
                                );
                            }
                        } else if (element.type === 2) {
                            _pData.push(element);
                            if (diff <= 15000) {
                                dispatch(
                                    loadPlayerTickets(element.prizeId, true)
                                );
                                dispatch(
                                    loadPrizePoolTickets(
                                        element.prizeId,
                                        true,
                                        element.ticketsRequired
                                    )
                                );
                            }
                        }
                    }
                }
                setFeaturedData(_fData);
                setPremiumData(_pData);
            }
        }, 500);

        return () => {
            clearTimeout(timeOutRef1.current);
            timeOutRef1.current = null;
        };
    }, [dispatch, prizes.featuredData, prizes.premiumData]);

    // SETTING PRIZE AUTOMATED TO STATE
    useEffect(() => {
        setAutomatedEntryData(prizes.automatedEntryData);
    }, [prizes.automatedEntryData]);

    // WINNER ANNOUNCEMENT WHEN RE-LOGIN
    useEffect(() => {
        setTimeout(() => {
            let isAuthValid = JSON.parse(sessionStorage.getItem("isAuthValid"));
            if (isAuthValid === null || isAuthValid) {
                let _arr = [];
                notificationList.forEach((n) => {
                    n?.list?.forEach((e) => {
                        if (e.type === "winner" && e.seen) {
                            _arr.push(e);
                            setWinnerAnnouncementData(_arr);
                            setIsWinnerAnnouncementShown(true);
                        } else if (e.type === "winner" && e.seen) {
                            const _localPrizes =
                                JSON.parse(
                                    localStorage.getItem("prizeDetailList")
                                ) || [];
                            let idx = _localPrizes.findIndex(
                                (local) => local.prizeId === e.prizeId
                            );
                            if (idx > -1 && !_localPrizes[idx].seen) {
                                _arr.push(e);
                                setWinnerAnnouncementData(_arr);
                                setIsWinnerAnnouncementShown(true);
                            }
                        } else {
                            console.log("All notification are seen!");
                        }
                        sessionStorage.setItem("isAuthValid", false);
                    });
                });
            }
        }, 1000);
    }, [notificationList]);

    // WINNER ANNOUNCEMENT CONTINUE TO HOMEPAGE BUTTON
    const handleBackButton = (prizeId) => {
        helperFunctionWinnerAnnoucement(prizeId);
        setIsWinnerAnnouncementShown(false);
    };
    // WINNER ANNOUNCEMENT CLAIM REWARD BUTTON
    const handleClaimRewardBtn = (prizeId) => {
        helperFunctionWinnerAnnoucement(prizeId);
        const idx = unClaimedPrizes.findIndex((e) => e.prizeId === prizeId);
        if (idx > -1) {
            history.push(`/claim/${unClaimedPrizes[idx]?.id}`);
        } else {
            console.log(
                "Possible prize matching failure point prize Id: ",
                prizeId
            );
        }
    };
    function helperFunctionWinnerAnnoucement(prizeId) {
        if (user.isNotifyAllowed) dispatch(loadNotifications());
        sessionStorage.setItem("isAuthValid", false);
        const pl = JSON.parse(localStorage.getItem("prizeDetailList")) || [];
        let idx = pl.findIndex((p) => p.prizeId === prizeId);
        if (idx > -1) {
            pl.splice(idx, 1);
            localStorage.setItem("prizeDetailList", JSON.stringify(pl));
        } else {
            console.log(
                "Possible prize detail list matching failure point prizeId: ",
                prizeId
            );
        }
    }

    // REVEAL CARD ONCLICK
    function handleWinnerRevealCard(prizeType) {
        console.log('object');
        let _arr = [];
        let data =
            prizeType === 1 ? FeaturedData : prizeType === 2 ? PremiumData : [];

        if (data.length > 0) {
            notificationList.forEach((n) => {
                n?.list?.forEach((e) => {
                    let idx = data.findIndex(
                        (d) => d.prizeId === e.prizeId && d.type === prizeType
                    );
                    console.log(idx);
                    if (idx > -1 && e.type === "winner") {
                        _arr.push(e);
                    }
                });
            });
            setRevealCardModalData(_arr);
            setIsRevealCardModalShown(true);
        }
        // TODO:: SHOW MODAL THAT SOMETHING WENT WRONG / SOMETHING SUITABLE MESSAGE
        return;
    }
    // REVEAL CARD MODAL CONTINUE TO HOMEPAGE BUTTON
    const handleRevealBackButton = (prizeId) => {
        updateLocalPrizeList(prizeId);
        setIsRevealCardModalShown(false);
    };
    // REVEAL CARD MODAL CLAIM REWARD BUTTON
    const handleRevealClaimRewardBtn = (prizeId) => {
        updateLocalPrizeList(prizeId);
        const idx = unClaimedPrizes.findIndex((e) => e.prizeId === prizeId);
        if (idx > -1) history.push(`/claim/${unClaimedPrizes[idx]?.id}`);
    };
    function updateLocalPrizeList(prizeId) {
        // UPDATE LOCALSTORAGE
        const localPrizes =
            JSON.parse(localStorage.getItem("prizeDetailList")) || [];

        let idx = localPrizes.findIndex((e) => e.prizeId === prizeId);
        if (idx > -1) {
            localPrizes[idx].seen = true;
            localPrizes[idx].completed = true;
            localStorage.setItem(
                "prizeDetailList",
                JSON.stringify(localPrizes)
            );

            // UPDATE STATE
            const updateLocalPrizes =
                JSON.parse(localStorage.getItem("prizeDetailList")) || [];
            let featureArr = [];
            let premiumArr = [];
            updateLocalPrizes.forEach((e) => {
                if (e.type === 1 && (e.completed || !e.completed) && !e.seen)
                    featureArr.push(e);
                else if (
                    e.type === 2 &&
                    (e.completed || !e.completed) &&
                    !e.seen
                )
                    premiumArr.push(e);
            });
            setFeaturedData(featureArr);
            setPremiumData(premiumArr);
        }
    }

    // ON CLICK FINISH BUTTON ONBOARDING
    const handleOnBoardingClose = () => {
        setIsOnBoardingShown(false);
        localStorage.removeItem("isNewUser");
    };

    return (
        <>
            {/* STAY TUNE & PLAY GAMES */}
            {noDataLoaded.all && <StayTune />}

            {/* IF PRIZE AVAILABLE */}
            {!noDataLoaded.all && (
                <section id="home">
                    {/* FEATURED CONTENT LOADER */}
                    {!noDataLoaded.feature && (
                        <>
                            {FeaturedData?.length <= 0 && <FeaturedLoader />}
                            {/* FEATURED CARD */}
                            {FeaturedData?.map((prize, index) => {
                                return (
                                    !prize.seen && (
                                        <React.Fragment
                                            key={`featuredPrize-${index}`}
                                        >
                                            <Featured
                                                data={prize}
                                                length={FeaturedData?.length}
                                                handleWinnerRevealCard={
                                                    handleWinnerRevealCard
                                                }
                                            />
                                        </React.Fragment>
                                    )
                                );
                            })}
                        </>
                    )}

                    {/* AUTOMATED */}
                    {!noDataLoaded.automated && (
                        <div
                            className="container-fluid mb-5 automatedEntry"
                            style={{
                                paddingTop: `${
                                    noDataLoaded?.feature ? "6rem" : 0
                                }`,
                            }}
                        >
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 col-lg-8 col-xl-7 d-xl-flex">
                                    <div className="col-12 col-xl-6 px-0">
                                        <div className="description w-100">
                                            <h2 className="mb-3">
                                                Bonus Rewards
                                            </h2>
                                        </div>
                                        {automatedEntryData.length <= 0 && (
                                            <AutomatedEntryLoader />
                                        )}
                                        {automatedEntryData?.map(
                                            (prize, index) => (
                                                <React.Fragment
                                                    key={`automatedEntry-${index}`}
                                                >
                                                    <AutomatedEntry
                                                        data={prize}
                                                    />
                                                </React.Fragment>
                                            )
                                        )}
                                    </div>
                                    <div className="col-12 col-xl-6 px-0" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PREMIUM & PREMIUM COMPLETED*/}
                    {!noDataLoaded.premium && (
                        <div
                            className="container-fluid premium"
                            style={{
                                paddingTop: `${
                                    noDataLoaded?.feature ||
                                    noDataLoaded?.automated
                                        ? "6rem"
                                        : 0
                                }`,
                            }}
                        >
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 col-lg-8 col-xl-7 mx-lg-auto">
                                    <div className="row">
                                        <div className="col-12 description">
                                            <h2 className="mb-3">
                                                Premium NFT Rewards
                                            </h2>
                                        </div>
                                        {PremiumData.length <= 0 && (
                                            <PremiumLoader />
                                        )}
                                        {PremiumData?.map((prize, index) => {
                                            return (
                                                !prize.seen && (
                                                    <React.Fragment
                                                        key={`premiumPrize-${index}`}
                                                    >
                                                        <Premium
                                                            data={prize}
                                                            handleWinnerRevealCard={
                                                                handleWinnerRevealCard
                                                            }
                                                        />
                                                    </React.Fragment>
                                                )
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            )}

            {/* WINNER ANNOUNCEMENTS */}
            {isWinnerAnnouncementShown && (
                <PrizeModal
                    data={winnerAnnouncementData}
                    user={user}
                    handleClaimRewardBtn={handleClaimRewardBtn}
                    handleBackButton={handleBackButton}
                />
            )}

            {/* REVEAL CARD */}
            {isRevealCardModalShown && (
                <RevealCardModal
                    data={revealCardModalData}
                    user={user}
                    updateLocalPrizeList={updateLocalPrizeList}
                    handleRevealBackButton={handleRevealBackButton}
                    handleRevealClaimRewardBtn={handleRevealClaimRewardBtn}
                />
            )}

            {/* ONBOARDING */}
            {isOnBoardingShown && (
                <OnBoarding handleOnBoardingClose={handleOnBoardingClose} />
            )}
        </>
    );
};

export default Index;
