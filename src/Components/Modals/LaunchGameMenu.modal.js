// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS

// HELPER FUNCTIONS

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadConsumeUserGemsTickets from "redux/thunks/ConsumeUserGemsTickets.thunk";
import {
    loadEarnAdditionalBenefitStatus,
    removeEarnAdditionalBenefitStatus,
} from "redux/thunks/EarnAdditionalTickets.thunk";

const LaunchGameMenuModalPopup = ({
    gameId,
    prizeId,
    playCost,
    setEarnAdditionalDisabledStatus,
    isPlayBtnDisabled,
    isLoadingGame,
    onCloseClicked,
    onPlayClicked,
    onInsufficientPayment,
}) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.userData);
    const { config } = useSelector((state) => state.config);
    const { currentGameRules } = useSelector((state) => state.prizes);
    const { earnAdditionalBenefitStatus } = useSelector(
        (state) => state.earnAdditional
    );

    const [isActiveBooster, setIsActiveBooster] = useState(false);
    const [startGameCost, setStartGameCost] = useState(playCost);

    let toggleRef = useRef(null);

    useEffect(() => {
        // Init the earnAdditional status data
        dispatch(removeEarnAdditionalBenefitStatus(prizeId));

        // Disable the scrolling
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, [prizeId, dispatch]);

    useEffect(
        () => {
            const nowTimeStamp = () =>
                Date.now() + (config?.offsetTimestamp || 0);

            const updateEarnAdditionalStatus = () => {
                let _earnAdditional = [...earnAdditionalBenefitStatus];
                let idx = _earnAdditional.findIndex(
                    (e) => e.prizeId === prizeId
                );
                if (idx === -1) {
                    _earnAdditional.push({
                        prizeId: prizeId,
                        isAdsSelected: false,
                        isGemsSelected: isActiveBooster,
                        gems: user.gems,
                        timestamp: nowTimeStamp(),
                    });
                } else {
                    _earnAdditional[idx].prizeId = prizeId;
                    _earnAdditional[idx].isAdsSelected = false;
                    _earnAdditional[idx].isGemsSelected = isActiveBooster;
                    _earnAdditional[idx].gems = user.gems;
                    _earnAdditional[idx].timestamp = nowTimeStamp();
                }
                dispatch(loadEarnAdditionalBenefitStatus(_earnAdditional));
            };

            updateEarnAdditionalStatus();

            setEarnAdditionalDisabledStatus((prev) => ({
                ...prev,
                gems: isActiveBooster,
            }));
        },
        // TODO: Enhance this useEffect
        // ISSUE: Include "earnAdditionalBenefitStatus" would make the useEffect infinite loop
        // eslint-disable-next-line
        [
            isActiveBooster,
            prizeId,
            config,
            dispatch,
            setEarnAdditionalDisabledStatus,
            user.gems,
        ]
    );

    function onUseBoosterYes() {
        setIsActiveBooster(true);
        setStartGameCost(playCost + currentGameRules.useHowManyGems);
        if (toggleRef?.current) {
            toggleRef.current.checked = true;
        }
    }

    function onUseBoosterNo() {
        setIsActiveBooster(false);
        setStartGameCost(playCost);
        if (toggleRef?.current) {
            toggleRef.current.checked = false;
        }
    }

    function onStartPlay() {
        // Check is sufficient gems
        if (user.gems < startGameCost) {
            // Show insufficient popup
            onInsufficientPayment();
            return;
        }

        dispatch(loadConsumeUserGemsTickets(startGameCost));

        onPlayClicked();
    }

    const { t } = useTranslation();

    return (
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
                <div className="modal-body-launch-game-menu position-relative">
                    {/* CLOSE BTN */}
                    <img
                        className="close-button"
                        onClick={onCloseClicked}
                        width="36"
                        src={`${window.cdn}buttons/button_close.png`}
                        alt="close-btn"
                    />

                    <div className="d-flex flex-column align-items-center justify-content-center my-4">
                        <div className="col-12 col-md-8 p-2">
                            <div
                                className={`selections d-flex flex-column mb-2 mx-auto ${
                                    isActiveBooster ? "checked" : ""
                                }
                                    ${!isPlayBtnDisabled ? "" : "opacity-0-5"}
                                `}
                                onClick={() => {
                                    if (isPlayBtnDisabled) return;
                                    isActiveBooster
                                        ? onUseBoosterNo()
                                        : onUseBoosterYes();
                                }}
                            >
                                <div className="title p-1 text-center">
                                    {t("gameMenu.booster.title")}
                                </div>
                                <div className="content d-flex flex-column py-4">
                                    <div className="info-text text-center">
                                        {t("gameMenu.booster.subtitle", {
                                            count: currentGameRules.score,
                                        })}
                                    </div>
                                    <div className="content-tickets d-flex align-items-center justify-content-center">
                                        <span className="tickets my-1">
                                            {t("gameMenu.booster.boostBy", {
                                                count: currentGameRules.useGemTickets,
                                            })}
                                        </span>
                                        <img
                                            className="icon ml-3"
                                            src={`${window.cdn}assets/tickets_06.png`}
                                            alt={"icon"}
                                        />
                                    </div>
                                    <div className="content-toggle d-flex mx-auto mt-3">
                                        <input
                                            ref={toggleRef}
                                            type={"checkbox"}
                                        />
                                        <span className="slider"></span>
                                        <div className="d-flex m-auto position-relative">
                                            <span
                                                className={`toggle-text m-auto ${
                                                    isActiveBooster
                                                        ? "checked"
                                                        : ""
                                                }`}
                                            >
                                                {
                                                    currentGameRules.useHowManyGems
                                                }
                                            </span>
                                            <img
                                                className="icon ml-1"
                                                src={`${window.cdn}assets/gem_01.png`}
                                                alt="gems"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="line"></div>
                            <div
                                className={`buttons ${
                                    isActiveBooster ? "checked" : ""
                                }`}
                            >
                                <button
                                    className={`play-btn d-flex flex-column align-items-center justify-content-center m-auto ${
                                        !isPlayBtnDisabled ? "" : "opacity-0-5"
                                    }`}
                                    disabled={isPlayBtnDisabled}
                                    onClick={onStartPlay}
                                >
                                    {!isLoadingGame && (
                                        <>
                                            {t("gameMenu.start")}
                                            <div className="d-flex mt-2">
                                                <span className="btn-text m-auto">
                                                    {startGameCost}
                                                </span>
                                                <img
                                                    className="icon ml-2"
                                                    src={`${window.cdn}assets/gem_01.png`}
                                                    alt="gems"
                                                />
                                            </div>
                                        </>
                                    )}

                                    {isLoadingGame && (
                                        <div className="p-3">LOADING...</div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LaunchGameMenuModalPopup;
