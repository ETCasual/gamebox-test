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
        useState(true);
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
            {/* <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100"> */}
            <div className="mx-auto">
                {/* <div className="row justify-content-center w-100"> */}
                <div className="fortune-wheel-wrapper position-relative">
                    <div className="fortune-wheel-flex-row-container">
                        <div className="navigation-container">
                            <div
                                className="question-mark"
                                onClick={() =>
                                    !isClickedSpin
                                        ? setFortuneWheelShown(false)
                                        : null
                                }
                            >
                                X
                            </div>
                            <div
                                className="question-mark"
                                onClick={() => {
                                    let currentShownFlag = isProbabilityShown;
                                    setIsProbabilityShown(!currentShownFlag);
                                }}
                            >
                                ?
                            </div>
                        </div>
                        <div className="spinner-control-container">
                            <div className="the-spinner-text">The spinner</div>

                            <div className="earn-more-tickets-text">
                                Earn more tickets here
                            </div>

                            <div className="spin-amount-left-text-container">
                                <span className="you-have-text">{`You have `}</span>
                                <span className="spin-number">
                                    {spinner?.freeSpins > 0
                                        ? spinner?.freeSpins
                                        : 0}
                                </span>
                                <span className="spins-left-text">{` spins left`}</span>
                            </div>

                            <div className="ticket-amount-outer">
                                <div className="ticket-amount-inner">
                                    <div className="your-tickets-text">
                                        Your tickets
                                    </div>
                                    <div className="ticket-number">
                                        {getPoolTickets(
                                            poolTickets,
                                            prizeId
                                        )?.toLocaleString() || 0}
                                    </div>
                                </div>
                            </div>

                            {spinner?.freeSpins <= 0 &&
                                user?.gems >= config.useGems &&
                                !isClickedSpin && (
                                    <div
                                        className="use-gems-button"
                                        disabled={spinBuyProcess ? true : false}
                                        onClick={() =>
                                            spinner?.freeSpins <= 0
                                                ? setIsBuySpinConfirmModalShown(
                                                      true
                                                  )
                                                : null
                                        }
                                    >
                                        <div className="use-gems-text">
                                            Use {config.useGems} Gems
                                        </div>
                                        <div className="get-spins-text">
                                            Get {config.useGemsSpin} more spins
                                        </div>
                                    </div>
                                )}

                            {spinner?.freeSpins <= 0 &&
                                user?.gems <= config.useGems &&
                                !isClickedSpin && (
                                    <Link
                                        to={"/iap"}
                                        className="purchase-gems-button"
                                    >
                                        <div className="insufficient-gems-text">
                                            Insufficient gems.
                                        </div>
                                        <div className="purchase-text">
                                            Click here to purchase.
                                        </div>
                                    </Link>
                                )}

                            {isProbabilityShown && (
                                <table className="probability-table">
                                    {spinnerRules?.map((rule, idx) => (
                                        <tr
                                            className="probability-row"
                                            id={idx}
                                        >
                                            <td className="probability-percentage">
                                                {rule?.probability}%
                                            </td>
                                            <td className="probability-tickets-text">
                                                {rule?.tickets} tickets
                                            </td>
                                        </tr>
                                    ))}
                                </table>
                            )}
                        </div>
                        <div className="fortune-wheel-container"></div>
                    </div>
                </div>
                {/* </div> */}
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
