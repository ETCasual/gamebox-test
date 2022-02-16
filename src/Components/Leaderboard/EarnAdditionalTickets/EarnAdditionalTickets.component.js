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
            <div
                id="earn-additional-tickets"
                className="container py-2 py-md-3 px-0"
            >
                <div className="row justify-content-center">
                    <div className="col-12 col-md-11 col-lg-8 col-xl-8">
                        <div className="row px-3 px-md-0">
                            {/* TITLE & SUBTITLE */}
                            <div className="col-12 text-center">
                                <p className="title mb-1">Earn More Tickets</p>
                                <p className="subtitle mb-1 mb-md-3">
                                    Please select one
                                </p>
                            </div>
                            {/* WATCH ADS */}
                            <div className="col-12 col-md-6 mb-2 mb-md-0 p-0 p-md-3">
                                <div
                                    className={`earn-panel row p-2 ${
                                        earnAdditionalDisabledStatus.gems
                                            ? "opacity-0-5"
                                            : "cursor-pointer"
                                    }`}
                                    onClick={
                                        earnAdditionalDisabledStatus.ads ||
                                        earnAdditionalDisabledStatus.gem
                                            ? null
                                            : () => {
                                                  setIsWatchAdConfirmationModalShown(
                                                      true
                                                  );
                                              }
                                    }
                                >
                                    {/* ICON */}
                                    <div className="col-3 col-md-12 p-0 text-center">
                                        <img
                                            className="watch-ads-img my-3"
                                            src={`${window.cdn}illustrations/watch_ads.png`}
                                            alt="watch ads"
                                        />
                                    </div>
                                    {/* INFO */}
                                    <div className="info-wrapper col-9 col-md-12">
                                        <p className="text-center mb-0 earn-title">
                                            Watch ads and get additional
                                        </p>
                                        <div className="earn-tickets d-flex align-items-center justify-content-center py-1 py-md-2 px-2 my-3 mx-auto">
                                            <p className="mb-0 mr-1">
                                                {
                                                    currentGameRules.watchAdTickets
                                                }
                                            </p>
                                            <img
                                                width="24"
                                                src={`${window.cdn}icons/tickets.png`}
                                                alt="tickets"
                                            />
                                        </div>
                                        <p className="text-center mb-0 earn-desc">
                                            for every{" "}
                                            <span>
                                                {currentGameRules.score} points{" "}
                                            </span>
                                            you score
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* CONSUME GEMS */}
                            <div className="col-12 col-md-6 p-0 p-md-3">
                                <div
                                    className={`earn-panel row p-2 ${
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
                                    {/* ICON */}
                                    <div className="col-3 col-md-12 p-0 text-center">
                                        <img
                                            className="use-gems-img"
                                            src={`${window.cdn}illustrations/use_gems.png`}
                                            alt="watch ads"
                                        />
                                    </div>
                                    {/* INFO */}
                                    <div className="info-wrapper col-9 col-md-12">
                                        <p className="text-center mb-0 earn-title">
                                            {`Use ${currentGameRules.useHowManyGems} gems and get additional`}
                                        </p>
                                        <div className="d-flex align-items-center justify-content-center w-100 my-3">
                                            <div className="earn-tickets d-flex align-items-center justify-content-center py-1 py-md-2 px-2">
                                                <p className="mb-0 mr-1">
                                                    {
                                                        currentGameRules.useGemTickets
                                                    }
                                                </p>
                                                <img
                                                    width="24"
                                                    src={`${window.cdn}icons/tickets.png`}
                                                    alt="tickets"
                                                />
                                            </div>
                                            <p className="mx-1 mx-md-3 mb-0">
                                                {"&"}
                                            </p>
                                            <div className="earn-exp d-flex align-items-center justify-content-center py-1 py-md-2 px-2">
                                                <p className="mb-0 mr-1">
                                                    {currentGameRules.useGemExp}
                                                </p>
                                                <img
                                                    width="14"
                                                    height="14"
                                                    src={`${window.cdn}icons/exp_01.png`}
                                                    alt="exp"
                                                />
                                            </div>
                                        </div>
                                        <p className="text-center mb-0 earn-desc">
                                            for every{" "}
                                            <span>
                                                {currentGameRules.score} points{" "}
                                            </span>
                                            you score
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="mt-2 mt-md-4 text-center note">
                            Earn additional tickets or start playing immediately
                        </p>
                    </div>
                </div>
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
