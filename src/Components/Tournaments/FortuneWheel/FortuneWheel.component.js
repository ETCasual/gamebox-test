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
    const [modalHeight, setModalHeight] = useState({
        windowWidth: 0,
        wrapper: 0,
        cols: 0,
    });
    const spinDuration = 3;

    useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        function handleResize() {
            const elem = document.querySelector(".full-wrapper")?.offsetHeight;
            setModalHeight({
                windowWidth: window.innerWidth,
                wrapper: (window.innerWidth >= 1200 ? 25 : 0) + elem,
                cols: window.innerWidth < 1200 ? "auto" : elem + 25,
            });
        }
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
            const elem = document.querySelector(
                ".fortune-wheel-svg-wrapper svg"
            );
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
    const handleProbabilityInfo = () => {
        let currentShownFlag = isProbabilityShown;
        setIsProbabilityShown(!currentShownFlag);
        if (modalHeight.windowWidth < 1200) {
            const col1 = document.querySelector(".wrapper-col:nth-child(1)");
            const col2 = document.querySelector(".wrapper-col:nth-child(2)");
            const col3 = document.querySelector(".wrapper-col:nth-child(3)");
            const tapBackButton = document.querySelector(".tap-btn");
            tapBackButton.style.display = !currentShownFlag ? "block" : "none";
            col2.style.display = !currentShownFlag ? "none" : "flex";
            col3.style.display = !currentShownFlag ? "none" : "flex";

            col1.style.height = !currentShownFlag ? "90vh" : "auto";
        }
    };

    return (
        <div
            className="fortune-wheel d-flex align-items-center justify-content-center"
            style={{ height: `${modalHeight.wrapper}px` }}
        >
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div
                        className="col-12 col-md-10 col-lg-8 col-xl-7 wrapper"
                        style={{ height: `${modalHeight.wrapper}px` }}
                    >
                        <div className="row">
                            {/* FIRST COLUMN */}
                            <div
                                className="col-12 col-xl-1 py-3 flex-column align-items-center justify-content-start align-items-xl-center justify-content-xl-between wrapper-col"
                                style={{ height: modalHeight.cols }}
                            >
                                {/* BACK BUTTON */}
                                <div className="w-100 d-flex aling-items-start justify-content-between">
                                    <div className="text-icon-wrapper d-flex align-items-center justify-content-between">
                                        <img
                                            width={20}
                                            onClick={() =>
                                                !isClickedSpin
                                                    ? setFortuneWheelShown(
                                                          false
                                                      )
                                                    : null
                                            }
                                            src={`${window.cdn}icons/arrow_bottom_icon.png`}
                                            alt="arrow-button"
                                        />
                                        <div className="text-wrapper ml-3">
                                            <p className="the-spinner-text mb-0 d-block d-xl-none">
                                                The spinner
                                            </p>
                                            <p className="earn-more-tickets-text my-1 d-block d-xl-none">
                                                Earn more tickets here
                                            </p>
                                        </div>
                                    </div>

                                    {/* PROBABILITY DISPLAY BUTTON */}
                                    <img
                                        width={20}
                                        height={20}
                                        onClick={handleProbabilityInfo}
                                        src={`${window.cdn}icons/icon_question_01.png`}
                                        alt="question-mark"
                                    />
                                </div>
                                <div className="w-100">
                                    {/* PROBABILITY TABLE */}
                                    {isProbabilityShown && (
                                        <table className="probability-table d-block d-lg-none mt-4 mb-3 mx-auto">
                                            {spinnerRules?.map((rule, idx) => (
                                                <tr
                                                    className="probability-row"
                                                    id={idx}
                                                    key={`prob-${idx}`}
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
                                    <div
                                        className="tap-btn w-100 text-center"
                                        onClick={handleProbabilityInfo}
                                    >
                                        <img
                                            className="mb-2"
                                            width={14}
                                            src={`${window.cdn}icons/arrow-top.png`}
                                            alt="arrow-top"
                                        />
                                        <p className=" mb-0">
                                            Tap here to return to spinner
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* SECOND COLUMN */}
                            <div
                                className="col-12 col-xl-4 py-3 wrapper-col position-relative flex-column align-items-center justify-content-start"
                                style={{ height: modalHeight.cols }}
                            >
                                <div className="spin-and-tickets-info">
                                    <p className="the-spinner-text mb-0 d-none d-xl-block">
                                        The spinner
                                    </p>
                                    <p className="earn-more-tickets-text my-2 d-none d-xl-block">
                                        Earn more tickets here
                                    </p>
                                    <p className="spin-amount-left-wrapper mb-3 d-none d-xl-block">
                                        <span className="you-have-text">
                                            You have
                                        </span>
                                        <span className="spin-number">
                                            {spinner?.freeSpins > 0
                                                ? spinner?.freeSpins
                                                : 0}
                                        </span>
                                        <span className="spins-left-text">
                                            spins left
                                        </span>
                                    </p>
                                    <div className="your-tickets d-flex flex-column align-items-center justify-content-center p-3">
                                        <div className="your-tickets-text mb-2">
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

                                {/* USE GEMS BUTTON */}
                                {spinner?.freeSpins <= 0 &&
                                    user?.gems >= config.useGems &&
                                    !isClickedSpin && (
                                        <div
                                            className="use-gems-button"
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
                                            <div className="use-gems-text">
                                                Use {config.useGems} Gems
                                            </div>
                                            <div className="get-spins-text">
                                                Get {config.useGemsSpin} more
                                                spins
                                            </div>
                                        </div>
                                    )}

                                {/* PURCHASE GEMS BUTTON */}
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

                                {/* PROBABILITY TABLE */}
                                {isProbabilityShown && (
                                    <table className="probability-table mt-auto d-none d-lg-block">
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

                            {/* THIRD COLUMN */}
                            <div
                                className="col-12 col-xl-7 py-0 py-lg-3 wrapper-col flex-column align-items-center justify-content-center"
                                style={{ height: modalHeight.cols }}
                            >
                                <div className="fortune-wheel-svg-wrapper position-relative">
                                    <FortuneWheelSVG
                                        spinnerRules={spinnerRules}
                                    />

                                    {/* SPIN BUTTON*/}
                                    <div className="spin-button">
                                        <button
                                            disabled={
                                                spinner.freeSpins <= 0 ||
                                                isClickedSpin
                                                    ? true
                                                    : false
                                            }
                                            onClick={onClickSpinButton}
                                            className="spin-button-inner-orange d-flex align-items-center justify-content-center"
                                        >
                                            SPIN
                                        </button>
                                    </div>

                                    {/* TRIANGLE POINTER */}
                                    <img
                                        className="img-fluid pointer-img"
                                        src={`${window.cdn}icons/spinner_icon.png`}
                                        alt="fortune-wheel"
                                    />
                                </div>
                                <p className="spin-amount-left-wrapper mb-3 d-block d-xl-none">
                                    <span className="you-have-text">
                                        You have
                                    </span>
                                    <span className="spin-number">
                                        {spinner?.freeSpins > 0
                                            ? spinner?.freeSpins
                                            : 0}
                                    </span>
                                    <span className="spins-left-text">
                                        spins left
                                    </span>
                                </p>
                            </div>
                        </div>
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
        </div>
    );
};

export default FortuneWheel;
