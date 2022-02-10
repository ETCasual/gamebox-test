// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { gsap } from "gsap";

// COMPONENTS
import FortuneWheelSVG from "Components/Tournaments/FortuneWheel/FortuneWheelSVG.component";
import BuySpinConfirmModal from "Components/Modals/BuySpinConfirm.modal";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadPlayerSpinnerSpin from "redux/thunks/PlayerSpinnerSpin.thunk";
import loadPurchaseSpins from "redux/thunks/PurchaseSpins.thunk";
import loadConsumeUserGems from "redux/thunks/ConsumeUserGems.thunk";
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";
import loadPrizePoolTickets from "redux/thunks/PrizePoolTickets.thunk";

// HELPER FUNCTION
import getPoolTickets from "Utils/PoolTickets";

const FortuneWheel = ({
    prizeId,
    setIsTicketsUpdated,
    ticketsRequired,
    setFortuneWheelShown,
}) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userData);
    const { spinnerRules } = useSelector((state) => state.spinnerRules);
    const { spinner } = useSelector((state) => state.playerSpinnerInfo);
    const { config } = useSelector((state) => state.config);
    const { poolTickets } = useSelector((state) => state.playerTickets);

    const [spinnerDict, setSpinnerDict] = useState({});
    const [isClickedSpin, setIsClickedSpin] = useState(false);
    const [spinBuyProcess, setSpinBuyProcess] = useState(false);
    const [wheelRotation, setWheelRotation] = useState(0);
    const [isBuySpinConfirmModalShown, setIsBuySpinConfirmModalShown] =
        useState(false);
    const [isProbabilityShown, setIsProbabilityShown] = useState(false);
    const spinDuration = 3;

    useEffect(() => {
        setTimeout(() => {
            let _spinnerDict = {};
            spinnerRules.forEach((e, i) => {
                Object.assign(_spinnerDict, {
                    [e.tickets]: 360 - 36 * i,
                });
            });
            setSpinnerDict(_spinnerDict);
        }, 200);
    }, [spinnerRules, config]);

    function onClickSpinButton() {
        if (isClickedSpin) return;

        setIsClickedSpin(true);
        dispatch(loadPlayerSpinnerSpin(prizeId, spinWheel));
    }
    function spinWheel(_spinner) {
        if (_spinner.enterId === 0) return;

        if (spinBuyProcess) setSpinBuyProcess(false);

        if (_spinner.freeSpins >= 0) {
            const elem = document.querySelector(".spin-wrapper svg");
            const tl = gsap.timeline();

            tl.to(elem, {
                duration: spinDuration,
                rotate: `${startUpSpin(spinDuration)}deg`,
                ease: "power2.easeOut",
            }).to(
                elem,
                {
                    duration: spinDuration,
                    rotate: `${finishSpin(
                        spinnerDict[_spinner.winAmount],
                        spinDuration
                    )}deg`,
                    ease: "power2.easeOut",
                    onComplete: () => {
                        setIsClickedSpin(false);
                        dispatch(loadPlayerTickets(prizeId, true));
                        dispatch(
                            loadPrizePoolTickets(prizeId, true, ticketsRequired)
                        );
                        let finishedSpinningRotation = parseInt(
                            elem.style.transform
                                .match(/rotate\((.+)\)/)[1]
                                .split("deg")[0]
                        );
                        setWheelRotation(finishedSpinningRotation);
                        setIsTicketsUpdated(true);
                        setTimeout(() => setIsTicketsUpdated(false), 1000);
                    },
                },
                // The second to() will interrupt the first to() after the first to() has played for 10%, since the interruption is =-0.9;
                `=${(spinDuration * -0.9).toString()}`
            );
        }
    }
    function startUpSpin(startUpDuration) {
        // Spins to current rotation + (start Up Duration * 360) degrees
        // Example, currently is at 284 degree, spins 3 more seconds => 284 + (3 * 360) => 1364
        let startUpSpinDegree = wheelRotation + startUpDuration * 360;
        return startUpSpinDegree.toString();
    }
    function finishSpin(rotationToGetTicket, finishDuration) {
        // Calculate how many rounds has been spun until now
        // Example, if current wheel is at 1500, the iteration is Math.floor(1500/360) => 4
        let currentIteration = Math.floor(wheelRotation / 360);

        // Final rotation angle = Iteration * 360 + finish duration * 360 + rotation to get ticket
        let finishSpinDegree =
            rotationToGetTicket + (finishDuration + currentIteration) * 360;
        return finishSpinDegree.toString();
    }
    const handleBuySpinModalYesButton = () => {
        setSpinBuyProcess(true);

        dispatch(loadConsumeUserGems(config.useGems));
        dispatch(loadPurchaseSpins(true));

        setIsBuySpinConfirmModalShown(false);
        setIsClickedSpin(false);
    };

    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
                <div className="row justify-content-center w-100">
                    <div className="col-12 col-md-8 col-lg-6 fortune-wheel-wrapper position-relative">
                        {/* CLOSE BUTTON */}
                        <img
                            onClick={() =>
                                !isClickedSpin
                                    ? setFortuneWheelShown(false)
                                    : null
                            }
                            className="close-button"
                            width="38"
                            src={`${window.cdn}art_assets/buttons/button_close_01.png`}
                            alt="close-btn"
                        />
                        {!isProbabilityShown && (
                            <>
                                {/* PROBABILITY INFO ICON */}
                                <img
                                    width="20"
                                    onClick={() =>
                                        !isClickedSpin
                                            ? setIsProbabilityShown(true)
                                            : null
                                    }
                                    className="spinner-info-icon"
                                    src={`${window.cdn}art_assets/buttons/button_info.png`}
                                    alt="spinner-info-icon"
                                />
                                {/* TICKETS */}
                                <div className="col-12 tickets d-flex flex-column align-items-center justify-content-center mt-4">
                                    {/* TITLE */}
                                    <p className="text-center title">
                                        Daily Spinner
                                    </p>
                                    {/* TICKETS */}
                                    <div className="tickets-wrapper d-flex flex-column align-items-center justify-content-center">
                                        <p className="text-center mb-1 ticket-text">
                                            Your Tickets
                                        </p>
                                        <p className="text-center mb-0 ticket-value">
                                            {getPoolTickets(
                                                poolTickets,
                                                prizeId
                                            )?.toLocaleString() || 0}
                                            <img
                                                width="24"
                                                className="ml-2"
                                                src={`${window.cdn}art_assets/icons/tickets.png`}
                                                alt="tickets"
                                            />
                                        </p>
                                    </div>
                                </div>
                                {/* FORTUNE WHEEL */}
                                <div className="col-12 wheel-spinner d-flex flex-column mt-5">
                                    <div className="spin-wrapper mx-auto">
                                        <FortuneWheelSVG
                                            spinnerRules={spinnerRules}
                                        />
                                        <img
                                            className="img-fluid pointer-img"
                                            src={`${window.cdn}art_assets/icons/spinner_icon.png`}
                                            alt="fortune-wheel"
                                        />
                                        <div className="spin-shadow"></div>
                                        <div className="btn-spin-wrapper d-flex justify-content-center align-items-center">
                                            <button
                                                disabled={
                                                    spinner.freeSpins <= 0 ||
                                                    isClickedSpin
                                                        ? true
                                                        : false
                                                }
                                                className={`btn-spin my-3 text-white ${
                                                    spinner.freeSpins <= 0 ||
                                                    isClickedSpin
                                                        ? "opacity-0-5"
                                                        : ""
                                                }`}
                                                onClick={onClickSpinButton}
                                            >
                                                SPIN
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* AVAIABLE SPINS */}
                                <div
                                    className={`col-12 d-flex justify-content-center spin-available mt-4 ${
                                        spinner?.freeSpins <= 0 &&
                                        !isClickedSpin
                                            ? "mb-3"
                                            : "mb-5"
                                    }`}
                                >
                                    <p className="mb-0">
                                        You have{" "}
                                        <span className="count">
                                            {spinner?.freeSpins > 0
                                                ? spinner?.freeSpins
                                                : 0}
                                        </span>{" "}
                                        spins left today
                                    </p>
                                </div>
                                {/* BUY MORE SPINS */}
                                {spinner?.freeSpins <= 0 &&
                                    user?.gems >= config.useGems &&
                                    !isClickedSpin && (
                                        <button
                                            className="buy-more-spins mb-3"
                                            disabled={
                                                spinBuyProcess ? true : false
                                            }
                                            onClick={() =>
                                                spinner?.freeSpins <= 0
                                                    ? setIsBuySpinConfirmModalShown(
                                                          true
                                                      )
                                                    : null
                                            }
                                        >
                                            Get {config.useGemsSpin} more spins
                                            with {config.useGems} gems
                                        </button>
                                    )}
                                {/* INSUFFICIENT GEMS */}
                                {spinner?.freeSpins <= 0 &&
                                    user?.gems <= config.useGems &&
                                    !isClickedSpin && (
                                        <Link
                                            to={"/iap"}
                                            className="buy-more-gems mb-3 d-flex flex-column align-items-center justify-content-center"
                                        >
                                            Insufficient gems.
                                            <span className="pt-1">
                                                Click here to purchase
                                            </span>
                                        </Link>
                                    )}
                            </>
                        )}
                        {/* PROBABLITIES */}
                        {isProbabilityShown && (
                            <div className="spinner-rules h-100 col-12 py-3">
                                <p className="mt-3 mb-4 title">
                                    Spinner Chances
                                </p>
                                <div className="col-6 col-md-5 p-0 probability">
                                    <ul className="list-unstyled">
                                        {spinnerRules?.map((rule, idx) => (
                                            <li key={`prob-${idx}`}>
                                                <div className="wrapper d-flex align-items-center justify-content-between">
                                                    <p>{rule?.probability}%</p>
                                                    <p>
                                                        {rule?.tickets} tickets
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="separator"></div>
                                <button
                                    className="d-flex align-items-center justify-content-center text-white pt-4 pb-3 w-100"
                                    onClick={() => setIsProbabilityShown(false)}
                                >
                                    Back
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* POPUP MODAL FOR BUYING SPINS WITH GEMS */}
            {isBuySpinConfirmModalShown && (
                <BuySpinConfirmModal
                    handleYes={handleBuySpinModalYesButton}
                    handleNo={() => {
                        setIsBuySpinConfirmModalShown(false);
                    }}
                    gemAmount={config.useGems}
                    spinAmount={config.useGemsSpin}
                />
            )}
        </>
    );
};

export default FortuneWheel;
