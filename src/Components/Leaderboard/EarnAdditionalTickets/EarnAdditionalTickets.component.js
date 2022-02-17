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

            <div className="select-one-option-text">Select only one option</div>

            {/* BOTH OPTIONS*/}
            <div className="option-buttons-container">
                {/* WATCH ADS */}
                <div
                    className={`button-flex-container ${
                        earnAdditionalDisabledStatus.gems
                            ? "opacity-0-5"
                            : "cursor-pointer"
                    }`}
                    onClick={
                        earnAdditionalDisabledStatus.ads ||
                        earnAdditionalDisabledStatus.gem
                            ? null
                            : () => {
                                  setIsWatchAdConfirmationModalShown(true);
                              }
                    }
                >
                    <div className="top-row-flex-container">
                        <div className="left-row">
                            <div className="watch-ads-text">Watch ads</div>
                            <div className="get-additional-text">
                                Get additional
                            </div>
                            <div className="ticket-flex-holder">
                                <div className="ticket-amount">
                                    {currentGameRules.watchAdTickets}
                                </div>
                                <div className="ticket-img">
                                    <img
                                        className="ticket-img "
                                        src={`${window.cdn}icons/tickets.png`}
                                        alt="tickets"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="watch-ads-img-wrapper">
                            <img
                                width="120"
                                height="120"
                                className="watch-ads-img "
                                src={`${window.cdn}illustrations/watch_ads.png`}
                                alt="watch ads"
                            />
                        </div>
                    </div>
                    <div className="bottom-row">
                        for every{" "}
                        <span>{currentGameRules.score} score points</span>
                    </div>
                </div>

                {/* USE GEMS*/}
                <div
                    className={`button-flex-container ${
                        earnAdditionalDisabledStatus.ads
                            ? "opacity-0-5"
                            : "cursor-pointer"
                    }`}
                    onClick={
                        earnAdditionalDisabledStatus.ads ||
                        earnAdditionalDisabledStatus.gems
                            ? null
                            : onClickUseGems
                    }
                >
                    <div className="top-row-flex-container">
                        <div className="left-row">
                            <div className="use-gems-text">
                                Use {currentGameRules.useHowManyGems} Gems
                            </div>
                            <div className="get-additional-text">
                                Get additional
                            </div>
                            <div className="ticket-flex-holder">
                                <div className="ticket-amount">
                                    {currentGameRules.useGemTickets}
                                </div>
                                <div className="ticket-img">
                                    <img
                                        className="ticket-img"
                                        src={`${window.cdn}icons/tickets.png`}
                                        alt="tickets"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="use-gems-img-wrapper">
                            <img
                                width="100"
                                height="100"
                                className="use-gems-img "
                                src={`${window.cdn}illustrations/use_gems.png`}
                                alt="use gems"
                            />
                        </div>
                    </div>
                    <div className="bottom-row">
                        for every{" "}
                        <span>{currentGameRules.score} score points</span>
                    </div>
                </div>
            </div>

            <div className="play-immediately-container">
                <div className="line"></div>
                <div className="play-immediately-text">
                    or start playing immediately
                </div>
                <div className="line"></div>
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
