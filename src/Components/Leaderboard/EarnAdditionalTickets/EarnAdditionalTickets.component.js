// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import SubscriptionModal from "Components/Modals/Subscription.modal";
import UseGemConfirmationModal from "Components/Modals/UseGemConfirmation.modal";
import WatchAdConfirmationModal from "Components/Modals/WatchAdConfirmation.modal";
import NoAdsAvailableModal from "Components/Modals/NoAdsAvailable.modal";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadConsumeUserGemsTickets from "redux/thunks/ConsumeUserGemsTickets.thunk";
import { loadEarnAdditionalBenefitStatus } from "redux/thunks/EarnAdditionalTickets.thunk";

const EarnAdditionalTickets = ({
    gameId,
    prizeId,
    earnAdditionalDisabledStatus,
    setEarnAdditionalDisabledStatus,
}) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.userData);
    const { currentGameRules } = useSelector((state) => state.prizes);
    const { earnAdditionalBenefitStatus } = useSelector(
        (state) => state.earnAdditional
    );

    const [isSubscriptionModalShown, setIsSubscriptionModalShown] =
        useState(false);
    const [isUseGemConfirmationModalShown, setIsUseGemConfirmationModalShown] =
        useState(false);
    const [
        isWatchAdConfirmationModalShown,
        setIsWatchAdConfirmationModalShown,
    ] = useState(false);
    const [noAdAvailable, setNoAdAvailable] = useState(false);

    const onClickWatchAds = () => {
        window.adBreak({
            type: "reward", // The type of this placement (See below)
            name: "additional_tickets", // A descriptive name for this placement
            beforeAd: () => {
                console.log("Before AD", prizeId, gameId);
            }, // Prepare for the ad. Mute and pause the game flow
            afterAd: () => {
                console.log("After Ad", prizeId, gameId);
            },
            beforeReward: (showAdFn) => {
                console.log("Before Reward");
                showAdFn();
            },
            adDismissed: () => {
                console.log("Ad Dismissed");
            },
            adViewed: () => {
                console.log("Ad Viewed");
                activateAdditionalTickets();
            },
            adBreakDone: ({ breakStatus }) => {
                console.log("Ad Done", breakStatus);
                setIsWatchAdConfirmationModalShown(false);
                if (breakStatus !== "viewed" && breakStatus !== "dismissed") {
                    setNoAdAvailable(true);
                    activateAdditionalTickets();
                }
            },
        });
    };
    function activateAdditionalTickets() {
        // TODO
        let _earnAdditional = [...earnAdditionalBenefitStatus];
        let idx = _earnAdditional.findIndex((e) => e.prizeId === prizeId);
        if (idx === -1) {
            _earnAdditional.push({
                prizeId: prizeId,
                isAdsSelected: true,
                isGemsSelected: false,
            });
        } else {
            _earnAdditional[idx].prizeId = prizeId;
            _earnAdditional[idx].isAdsSelected = true;
            _earnAdditional[idx].isGemsSelected = false;
        }
        dispatch(loadEarnAdditionalBenefitStatus(_earnAdditional));
        setEarnAdditionalDisabledStatus((prev) => ({
            ...prev,
            gems: false,
            ads: true,
        }));
    }

    const onClickUseGems = () => {
        if (user.gems > 0 && user.gems >= currentGameRules.useHowManyGems) {
            setIsUseGemConfirmationModalShown(true);
        } else setIsSubscriptionModalShown(true);
    };
    const onClickSubscriptionCancel = () => setIsSubscriptionModalShown(false);
    const handleNoAdAvailable = () => setNoAdAvailable(false);

    return (
        <>
            <div className="increase-earning-text">
                Increase your ticket earnings
            </div>

            <div className="select-one-option-text">
                { earnAdditionalDisabledStatus.ads ? "You have chosen to watch ads to boost your ticket earnings" : "" }
                { earnAdditionalDisabledStatus.gems ? "You have chosen to use gems to boost your ticket earnings" : "" }
                { !earnAdditionalDisabledStatus.ads && !earnAdditionalDisabledStatus.gems ? "" : "" }
            </div>

            {/* BOTH OPTIONS*/}
            <div className="option-buttons-container d-flex">
                {/* WATCH ADS */}
                {/* <div
                    className={`button-flex-container p-3 mx-2 mx-md-3 position-relative ${
                        earnAdditionalDisabledStatus.gems
                            ? "opacity-0-2"
                            : "cursor-pointer"
                    }`}
                    onClick={
                        earnAdditionalDisabledStatus.ads ||
                        earnAdditionalDisabledStatus.gems
                            ? null
                            : () => {
                                  setIsWatchAdConfirmationModalShown(true);
                            }
                    }
                >
                    <img
                        className="earn-type-img"
                        src={`${window.cdn}assets/additional_ads_01.png`}
                        alt="watch ads"
                    />
                    <p className="boost-tickets mb-1 mb-md-2">
                        Boost Tickets by
                    </p>
                    <p className="earn-type-text">Watching ads</p>
                    <div className="ticket-holder p-3 d-flex flex-column alig-gn-self-center justify-content-center">
                        <p className="ticket-amount mb-1">
                            +{currentGameRules.watchAdTickets} tickets
                        </p>
                        <p className="score-condition mb-0">
                            every{" "}
                            <span>{currentGameRules.score} score points</span>
                        </p>
                    </div>
                </div> */}
                {/* USE GEMS*/}
                <div
                    className={`button-flex-container p-3 mx-2 mx-md-3 position-relative text-center text-md-left ${
                        earnAdditionalDisabledStatus.ads
                            ? "opacity-0-2" 
                            : earnAdditionalDisabledStatus.gems 
                            ? "button-selected"
                            : "cursor-pointer"
                    }`}
                    onClick={
                        earnAdditionalDisabledStatus.ads ||
                        earnAdditionalDisabledStatus.gems
                            ? null
                            : onClickUseGems
                    }
                >
                    <img
                        className="earn-type-img"
                        src={`${window.cdn}assets/additional_gems_01.png`}
                        alt="use gems"
                    />
                    <p className="boost-tickets mb-1 mb-md-2">
                        Boost Tickets by
                    </p>
                    <p className="earn-type-text">
                        {currentGameRules.useHowManyGems} Gems
                    </p>
                    <div className="ticket-holder p-3 d-flex flex-column alig-gn-self-center justify-content-center">
                        <p className="ticket-amount mb-1">
                            +{currentGameRules.useGemTickets} tickets
                        </p>
                        <p className="score-condition mb-0">
                            every{" "}
                            <span>{currentGameRules.score} score points</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="play-immediately-text-container d-flex align-items-center justify-content-evenly">
                <div className="line" />
                <div className="play-immediately-text text-center">
                    or start playing immediately
                </div>
                <div className="line" />
            </div>
            {isSubscriptionModalShown && (
                <SubscriptionModal
                    handleGetGemsLaterBtn={onClickSubscriptionCancel}
                />
            )}
            {isUseGemConfirmationModalShown && (
                <UseGemConfirmationModal
                    score={currentGameRules.score}
                    useHowManyGems={currentGameRules.useHowManyGems}
                    useGemTickets={currentGameRules.useGemTickets}
                    useGemExp={currentGameRules.useGemExp}
                    handleNo={() => {
                        setIsUseGemConfirmationModalShown(false);
                    }}
                    handleYes={() => {
                        dispatch(
                            loadConsumeUserGemsTickets(
                                currentGameRules.useHowManyGems
                            )
                        );

                        // TODO
                        let _earnAdditional = [...earnAdditionalBenefitStatus];
                        let idx = _earnAdditional.findIndex(
                            (e) => e.prizeId === prizeId
                        );
                        if (idx === -1) {
                            _earnAdditional.push({
                                prizeId: prizeId,
                                isAdsSelected: false,
                                isGemsSelected: true,
                                gems: user.gems,
                                timestamp: Date.now(),
                            });
                        } else {
                            _earnAdditional[idx].prizeId = prizeId;
                            _earnAdditional[idx].isAdsSelected = false;
                            _earnAdditional[idx].isGemsSelected = true;
                            _earnAdditional[idx].gems = user.gems;
                            _earnAdditional[idx].timestamp = Date.now();
                        }
                        dispatch(
                            loadEarnAdditionalBenefitStatus(_earnAdditional)
                        );
                        setEarnAdditionalDisabledStatus((prev) => ({
                            ...prev,
                            gems: true,
                            ads: false,
                        }));
                        setIsUseGemConfirmationModalShown(false);
                    }}
                />
            )}
            {isWatchAdConfirmationModalShown && (
                <WatchAdConfirmationModal
                    score={currentGameRules.score}
                    watchAdExp={currentGameRules.watchAdExp}
                    watchAdTickets={currentGameRules.watchAdTickets}
                    handleNo={() => {
                        setIsWatchAdConfirmationModalShown(false);
                    }}
                    handleYes={() => {
                        onClickWatchAds();
                    }}
                />
            )}
            {noAdAvailable && (
                <NoAdsAvailableModal
                    handleNoAdAvailable={handleNoAdAvailable}
                />
            )}
        </>
    );
};

export default EarnAdditionalTickets;
