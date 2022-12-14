// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import OnBoarding from "Components/Home/OnBoarding/OnBoarding.component";
import Featured from "Components/Home/Featured/Featured.component";
// import FeaturedWinner from "Components/Home/Featured/FeaturedWinner.component";
import AutomatedEntry from "Components/Home/AutomatedEntry/AutomatedEntry.component";
import Premium from "Components/Home/Premium/Premium.component";
import WinnerAnnouncementModal from "Components/Modals/WinnerAnnouncementModal.component";
import FeaturedLoader from "Components/Loader/Featured.loader";
import SpinnerEntry from "./SpinnerEntry/SpinnerEntry.component";
import AutomatedEntryLoader from "Components/Loader/AutomatedEntry.loader";
import PremiumLoader from "Components/Loader/Premium.loader";
import StayTune from "Components/Home/StayTune/StayTune.component";
import RevealCardModal from "Components/Modals/RevealCardModal.component";
import VipPassRedemption from "Components/Home/VipPass/VipPassRedemption.component";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";
import { loadPrizePoolTickets } from "redux/thunks/PrizePoolTickets.thunk";
import { loadUpdateNotificationSeen } from "redux/thunks/Notifcations.thunk";
import { loadUnClaimedPrizes } from "redux/thunks/UnClaimedPrizes.thunk";
import { useTranslation } from "react-i18next";

const Index = () => {
    const { prizes } = useSelector((state) => state.prizes);
    const { user } = useSelector((state) => state.userData);
    const { config } = useSelector((state) => state.config);
    const { winnerAnnouncementNotificationList } = useSelector(
        (state) => state.notifications
    );
    const { unClaimedPrizes } = useSelector((state) => state.unClaimedPrizes);

    const dispatch = useDispatch();

    const [noDataLoaded, setNoDataLoaded] = useState({
        feature: true,
        premium: true,
        automated: true,
        all: false,
    });
    const [isLoadingDone, setIsLoadingDone] = useState(false);
    const [FeaturedData, setFeaturedData] = useState([]);
    const [PremiumData, setPremiumData] = useState([]);
    const [automatedEntryData, setAutomatedEntryData] = useState([]);
    const [winnerAnnouncementData, setWinnerAnnouncementData] = useState([]);
    const [isWinnerAnnouncementShown, setIsWinnerAnnouncementShown] =
        useState(false);
    const [revealCardModalData, setRevealCardModalData] = useState([]);
    const [isRevealCardModalShown, setIsRevealCardModalShown] = useState(false);
    const [isOnBoardingShown, setIsOnBoardingShown] = useState(false);

    //VIP PASS
    const [isVipPassRedeemable, setIsVipPassRedeemable] = useState(false);
    const [vipPassData, setVipPassData] = useState(null);

    // ONBOARDING
    useEffect(() => {
        const isNewUser = Boolean(localStorage.getItem("isNewUser")) || false;
        if (isNewUser) setIsOnBoardingShown(true);
    }, [setIsOnBoardingShown]);

    // FETCH VIP PASS FROM REWARDS API
    useEffect(() => {
        setVipPassData(null);
        if (user.id) {
            dispatch(loadUnClaimedPrizes());
        }
    }, [user.id, dispatch]);

    useEffect(() => {
        if (unClaimedPrizes) {
            const vipPassPrizes = unClaimedPrizes.filter(
                (unclaimPrize) => unclaimPrize.prizeType === 6
            );
            setIsVipPassRedeemable(vipPassPrizes.length > 0);
            if (vipPassPrizes.length > 0) {
                setVipPassData(vipPassPrizes[0]);
            }
        } else {
            setIsVipPassRedeemable(false);
        }
    }, [unClaimedPrizes]);

    // SETUP PRIZES FROM CACHE
    useEffect(() => {
        setNoDataLoaded((prev) => ({
            ...prev,
            feature: FeaturedData.length <= 0 ? true : false,
            premium: PremiumData.length <= 0 ? true : false,
        }));
    }, [FeaturedData, PremiumData]);

    // UPDATE PRIZE FROM SERVER
    useEffect(() => {
        let isAll = false;
        if (
            prizes.featuredData.length <= 0 &&
            prizes.premiumData.length <= 0 &&
            prizes.automatedEntryData.length <= 0
        ) {
            isAll = true;
        }
        setNoDataLoaded((prev) => ({
            ...prev,
            feature: prizes.featuredData.length <= 0 ? true : false,
            premium: prizes.premiumData.length <= 0 ? true : false,
            automated: prizes.automatedEntryData.length <= 0 ? true : false,
            all: isAll,
        }));

        let timer = null;
        clearTimeout(timer);
        timer = setTimeout(() => {
            setIsLoadingDone(true);
        }, 500);

        return () => clearTimeout(timer);
    }, [prizes.featuredData, prizes.premiumData, prizes.automatedEntryData]);

    // SETTING PRIZES (FEATURE & PREMIUM) TO STATE
    useEffect(() => {
        const nowTimeStamp = () => Date.now() + (config?.offsetTimestamp || 0);

        const sessionTimeStamp = parseInt(
            sessionStorage.getItem("sessionTimeStamp")
        );
        const diff = nowTimeStamp() - sessionTimeStamp;
        // if (diff <= 15000) console.log("HOME PAGE TIMER CALLING TICKETS", diff);

        if (prizes.featuredData.length > 0 || prizes.premiumData.length > 0) {
            let _fData = [];
            let _pData = [];
            const prizeList =
                JSON.parse(sessionStorage.getItem("prizeDetailList")) || [];

            for (let i = 0; i < prizeList.length; i++) {
                const element = prizeList[i];
                if (element.seen && !element.isRepeat) {
                    continue;
                }

                if (element.type === 1) {
                    _fData.push(element);
                    if (diff <= 15000) {
                        dispatch(loadPlayerTickets(element.prizeId, true));
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
                        dispatch(loadPlayerTickets(element.prizeId, true));
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
            setFeaturedData(_fData);
            setPremiumData(_pData);
        }
    }, [
        dispatch,
        prizes.featuredData,
        prizes.premiumData,
        config?.offsetTimestamp,
    ]);

    // SETTING PRIZE AUTOMATED TO STATE
    useEffect(() => {
        setAutomatedEntryData(prizes.automatedEntryData);
    }, [prizes.automatedEntryData]);

    // WINNER ANNOUNCEMENT WHEN RE-LOGIN
    useEffect(() => {
        setTimeout(() => {
            let showAnnouncement = JSON.parse(
                sessionStorage.getItem("showAnnouncement") || null
            );
            if (showAnnouncement === null) {
                let _arr = [];
                winnerAnnouncementNotificationList.forEach((n, nIdx) => {
                    n?.list?.forEach((e, idx) => {
                        if (
                            winnerAnnouncementNotificationList.length - 1 ===
                                nIdx &&
                            n.list.length - 1 === idx
                        ) {
                            sessionStorage.setItem("showAnnouncement", 0);
                        }

                        if (e.type === "winner" && !e.seen) {
                            _arr.push(e);
                            setWinnerAnnouncementData(_arr);
                            setIsWinnerAnnouncementShown(true);
                        }
                    });
                });
            }
        }, 1000);
    }, [winnerAnnouncementNotificationList, dispatch]);

    // ON CLICK FINISH BUTTON ONBOARDING
    const handleOnBoardingClose = () => {
        setIsOnBoardingShown(false);
        localStorage.removeItem("isNewUser");
    };

    // WINNER ANNOUNCEMENT CLOSE BUTTON
    const handleBackButton = (prizeId, id) => {
        dispatch(loadUpdateNotificationSeen(id));
        helperFunctionWinnerAnnoucement(prizeId);
        setIsWinnerAnnouncementShown(false);
    };
    function helperFunctionWinnerAnnoucement(prizeId) {
        sessionStorage.setItem("showAnnouncement", 0);
        const pl = JSON.parse(sessionStorage.getItem("prizeDetailList")) || [];
        let idx = pl.findIndex((p) => p.prizeId === prizeId);
        if (idx > -1) {
            pl.splice(idx, 1);
            sessionStorage.setItem("prizeDetailList", JSON.stringify(pl));
        } else {
            console.log(
                "Possible prize detail list matching failure point prizeId: ",
                prizeId
            );
        }
    }

    // REVEAL CARD ONCLICK SHOW MODAL
    function handleWinnerRevealCard(prizeId) {
        let _arr = [];
        let winnerList = [];
        if (winnerAnnouncementNotificationList?.length > 0) {
            winnerList = winnerAnnouncementNotificationList[0];
            _arr = winnerList?.list?.filter(
                (l) => l.prizeId === prizeId && l.type === "winner"
            );
            const _prizeList =
                JSON.parse(sessionStorage.getItem("prizeDetailList")) || [];

            if (_arr.length > 0) {
                // ONLY SHOW LATEST WINNER
                setRevealCardModalData([_arr[0]]);

                setIsRevealCardModalShown(true);
            } else {
                // Broken prizes
                let featureArr = _prizeList.filter(
                    (p) => p.type === 1 && p.prizeId !== prizeId
                );
                let premiumArr = _prizeList.filter(
                    (p) => p.type === 2 && p.prizeId !== prizeId
                );
                setFeaturedData(featureArr);
                setPremiumData(premiumArr);
            }
            // UPDATE LOCALSTORAGE
            // Before update complete and seen, check if prize is on repeat
            let idx = _prizeList.findIndex((e) => e.prizeId === prizeId);
            if (idx > -1) {
                if (!_prizeList[idx].isRepeat) {
                    _prizeList[idx].seen = true;
                    _prizeList[idx].completed = true;
                    sessionStorage.setItem(
                        "prizeDetailList",
                        JSON.stringify(_prizeList)
                    );
                } else {
                    _prizeList[idx].seen = false;
                    _prizeList[idx].completed = false;
                    sessionStorage.setItem(
                        "prizeDetailList",
                        JSON.stringify(_prizeList)
                    );
                }
            }
        }
        // winnerAnnouncementNotificationList.forEach((n) => {
        //     _arr = n?.list?.filter(
        //         (l) => l.prizeId === prizeId && l.type === "winner"
        //     );
        //     const _prizeList =
        //         JSON.parse(sessionStorage.getItem("prizeDetailList")) || [];

        //     if (_arr.length > 0) {
        //         // ONLY SHOW LATEST WINNER
        //         setRevealCardModalData(_arr);

        //         setIsRevealCardModalShown(true);
        //     } else {
        //         // Broken prizes
        //         let featureArr = _prizeList.filter(
        //             (p) => p.type === 1 && p.prizeId !== prizeId
        //         );
        //         let premiumArr = _prizeList.filter(
        //             (p) => p.type === 2 && p.prizeId !== prizeId
        //         );
        //         setFeaturedData(featureArr);
        //         setPremiumData(premiumArr);
        //     }
        //     // UPDATE LOCALSTORAGE
        //     // Before update complete and seen, check if prize is on repeat
        //     let idx = _prizeList.findIndex((e) => e.prizeId === prizeId);
        //     if (idx > -1) {
        //         if (_prizeList[idx].repeatedOn.length === 0) {
        //             _prizeList[idx].seen = true;
        //             _prizeList[idx].completed = true;
        //             sessionStorage.setItem(
        //                 "prizeDetailList",
        //                 JSON.stringify(_prizeList)
        //             );
        //         } else {
        //             _prizeList[idx].seen = false;
        //             _prizeList[idx].completed = false;
        //             sessionStorage.setItem(
        //                 "prizeDetailList",
        //                 JSON.stringify(_prizeList)
        //             );
        //         }
        //     }
        // });
        // TODO:: SHOW MODAL THAT SOMETHING WENT WRONG / SOMETHING SUITABLE MESSAGE
        return;
    }

    // REVEAL CARD MODAL CONTINUE TO HOMEPAGE BUTTON
    const handleRevealBackButton = (id) => {
        dispatch(loadUpdateNotificationSeen(id));

        const updateLocalPrizes =
            JSON.parse(sessionStorage.getItem("prizeDetailList")) || [];
        let featureArr = updateLocalPrizes.filter(
            (p) => p.type === 1 && !p.seen
        );
        let premiumArr = updateLocalPrizes.filter(
            (p) => p.type === 2 && !p.seen
        );
        setFeaturedData(featureArr);
        setPremiumData(premiumArr);

        setIsRevealCardModalShown(false);
    };

    const { t } = useTranslation();

    return (
        <>
            <section id="home">
                {/* TOP BANNERS */}
                <div className="container-fluid mb-4 bonus">
                    <div className="row justify-content-center px-1 py-4">
                        <div className="col-12 col-md-10 col-lg-8">
                            <div className="row d-flex">
                                {/* FORTUNE WHEEL */}
                                <div className="col-sm d-flex flex-column px-2 mb-3 mb-sm-0">
                                    <SpinnerEntry />
                                </div>

                                {/* AUTOMATED LOADER */}
                                {!isLoadingDone && (
                                    <div className="col-sm d-flex flex-column px-2 mb-3 mb-sm-0">
                                        <AutomatedEntryLoader />
                                    </div>
                                )}

                                {/* AUTOMATED CARD */}
                                {isLoadingDone && !noDataLoaded.automated && (
                                    <div className="col-sm d-flex flex-column px-2 mb-3 mb-sm-0">
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* STAY TUNE & PLAY GAMES */}
                {isLoadingDone && noDataLoaded.all && <StayTune />}

                {/* VIP PASS REDEMPTION */}
                {isVipPassRedeemable && (
                    <div className="container-fluid mb-5 vip-pass">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-10 col-lg-8 mx-lg-auto px-2">
                                <div className="row">
                                    <div className="col-12">
                                        <h2 className="section-title mb-3">
                                            {t("home_page.limited_time_reward")}
                                        </h2>
                                    </div>

                                    <VipPassRedemption data={vipPassData} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* IF PRIZE AVAILABLE */}
                {!noDataLoaded.all && (
                    <div className="content-min-height">
                        {/* FEATURED CONTENT LOADER */}

                        {!noDataLoaded.feature && (
                            <div className="container-fluid mb-5 featured">
                                <div className="row justify-content-center">
                                    <div className="col-12 col-md-10 col-lg-8 mx-lg-auto px-2">
                                        <div className="row">
                                            <div className="col-12">
                                                <h2 className="section-title mb-3">
                                                    {t(
                                                        "home_page.featured_rewards"
                                                    )}
                                                </h2>
                                            </div>

                                            {/* LOADER */}
                                            {!isLoadingDone && (
                                                <FeaturedLoader />
                                            )}

                                            {/* FEATURED CARD */}
                                            {isLoadingDone &&
                                                FeaturedData?.map(
                                                    (prize, index) => {
                                                        return (
                                                            <React.Fragment
                                                                key={`featuredPrize-${index}`}
                                                            >
                                                                <Featured
                                                                    data={prize}
                                                                    handleWinnerRevealCard={
                                                                        handleWinnerRevealCard
                                                                    }
                                                                />
                                                            </React.Fragment>
                                                        );
                                                    }
                                                )}

                                            {/* <React.Fragment
                                            key={`featuredPrize-winner`}
                                        >
                                            <FeaturedWinner
                                                prizeId={36}
                                                prizeDrawnTimestamp={
                                                    1658782800000
                                                }
                                                prizeUrl={
                                                    "https://gamebox-froyo.s3.ap-southeast-1.amazonaws.com/app/rewards/froyotoken/img/froyo_01_won.jpg"
                                                }
                                            />
                                        </React.Fragment> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PREMIUM & PREMIUM COMPLETED*/}
                        {!noDataLoaded.premium && (
                            <div className="container-fluid premium">
                                <div className="row justify-content-center">
                                    <div className="col-12 col-md-10 col-lg-8 mx-lg-auto">
                                        <div className="row">
                                            <div className="col-12 description">
                                                <h2 className="section-title mb-3">
                                                    {t("home_page.premium")}
                                                </h2>
                                            </div>
                                            {/* LOADER */}
                                            {!isLoadingDone && (
                                                <PremiumLoader />
                                            )}

                                            {/* PREMIUM CARD */}
                                            {isLoadingDone &&
                                                PremiumData?.map(
                                                    (prize, index) => {
                                                        return (
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
                                                        );
                                                    }
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* WINNER ANNOUNCEMENTS */}
            {isWinnerAnnouncementShown && (
                <WinnerAnnouncementModal
                    data={winnerAnnouncementData}
                    user={user}
                    handleBackButton={handleBackButton}
                />
            )}

            {/* REVEAL CARD */}
            {isRevealCardModalShown && (
                <RevealCardModal
                    data={revealCardModalData}
                    user={user}
                    handleRevealBackButton={handleRevealBackButton}
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
