// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gsap } from "gsap";

// COMPONENTS
import FortuneWheelRules from "Components/Tournaments/FortuneWheel/FortuneWheelRules.component";
import BuySpinConfirmModal from "Components/Modals/BuySpinConfirm.modal";
import InsufficientGemsModal from "Components/Modals/InsufficientGems.modal";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadPlayerSpinnerSpin from "redux/thunks/PlayerSpinnerSpin.thunk";
import loadPurchaseSpins from "redux/thunks/PurchaseSpins.thunk";
import loadConsumeUserGems from "redux/thunks/ConsumeUserGems.thunk";
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";
import { loadPrizePoolTickets } from "redux/thunks/PrizePoolTickets.thunk";

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

    const [outOfSpins, setOutOfSpins] = useState(false);
    const [outOfGems, setOutOfGems] = useState(false);
    const [isClickedSpin, setIsClickedSpin] = useState(false);
    const [spinBuyProcess, setSpinBuyProcess] = useState(false);
    const [, setIsBuySpinConfirmModalShown] = useState(false);
    const [isProbabilityShown, setIsProbabilityShown] = useState(false);
    const [modalHeight, setModalHeight] = useState({
        windowWidth: 0,
        wrapper: 0,
        cols: 0,
    });
    const [winAmount, setWinAmount] = useState(-1);

    const spinnerRef = useRef(spinner);
    const userGemsRef = useRef(user?.gems);
    const ConfigGemsRef = useRef(config.useGems);

    // FETCH LATEST TICKETS
    useEffect(() => {
        // TICKETS API
        dispatch(loadPlayerTickets(prizeId, true));
        dispatch(loadPrizePoolTickets(prizeId, true, ticketsRequired));
    }, []);

    // CHECK SPINS AVAILABILITY & CHECK GEMS AVAILABILITY
    useEffect(() => {
        if (
            spinnerRef.current.freeSpins <= 0 &&
            userGemsRef.current < ConfigGemsRef.current
        ) {
            setOutOfGems(true);
        } else if (spinnerRef.current.freeSpins <= 0) {
            setOutOfSpins(true);
        }
    }, []);

    // DISABLE HTML SCROLL
    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    // RESIZE EVENT
    useEffect(() => {
        window.addEventListener("resize", handleResize);

        function handleResize() {
            const mainElemHeight =
                document.querySelector(".full-wrapper")?.offsetHeight;
            setModalHeight({
                windowWidth: window.innerWidth,
                wrapper: mainElemHeight + 50,
                cols: window.innerWidth < 1200 ? "auto" : mainElemHeight + 50,
            });
            const col2 = document.querySelector(".wrapper-col:nth-child(2)");
            const col3 = document.querySelector(".wrapper-col:nth-child(3)");
            if (
                col2.style.display === "none" ||
                col3.style.display === "none"
            ) {
                col2.style.display = "flex";
                col3.style.display = "flex";
            }
        }
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function onClickSpinButton() {
        // PREVENT SPAMMING
        if (isClickedSpin) return;

        if (spinner?.freeSpins <= 0 && user?.gems <= config.useGems) {
            setOutOfGems(true);
            return;
        }

        if (spinner?.freeSpins <= 0) {
            setOutOfSpins(true);
            return;
        }

        setIsClickedSpin(true);
        dispatch(loadPlayerSpinnerSpin(prizeId, updateWheelResult));

        const randWin =
            spinnerRules[Math.floor(Math.random() * spinnerRules.length)];
        setWinAmount(randWin.tickets);
    }
    function updateWheelResult(_spinner) {
        console.log(_spinner);
        if (_spinner.enterId === 0) return;

        if (spinBuyProcess) setSpinBuyProcess(false);

        if (_spinner.freeSpins >= 0) {
            setWinAmount(_spinner.winAmount);
        }
    }
    function onSpinFinished() {
        setIsClickedSpin(false);

        // TICKETS API
        dispatch(loadPlayerTickets(prizeId, true));
        dispatch(loadPrizePoolTickets(prizeId, true, ticketsRequired));

        // ALLOWS COMPONENT RENDER TO REFLECT LATEST TICKETS
        setIsTicketsUpdated(true);
        setTimeout(() => setIsTicketsUpdated(false), 1000);
    }
    const handleBuySpinModalYesButton = () => {
        setSpinBuyProcess(true);

        dispatch(loadConsumeUserGems(config.useGems));
        dispatch(loadPurchaseSpins(true));

        setIsBuySpinConfirmModalShown(false);
        setOutOfSpins(false);
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
            col1.style.height = "auto";
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
                                className="col-12 col-xl-1 py-3 flex-column align-items-center justify-content-start justify-content-xl-between wrapper-col"
                                style={{ height: modalHeight.cols }}
                            >
                                {/* FIRST ROW - SPINNER TEXT AND ICONS */}
                                <div className="first-row w-100 d-flex flex-xl-column align-items-start align-items-xl-center justify-content-between">
                                    <div className="text-icon-wrapper d-flex align-items-center justify-content-between">
                                        <img
                                            onClick={() =>
                                                !isClickedSpin
                                                    ? setFortuneWheelShown(
                                                          false
                                                      )
                                                    : null
                                            }
                                            src={`${window.cdn}icons/icon_minimize.png`}
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
                                        className="probability-btn"
                                        width={20}
                                        height={20}
                                        onClick={handleProbabilityInfo}
                                        src={`${window.cdn}buttons/button_question_01.png`}
                                        alt="question-mark"
                                    />
                                </div>
                                {/* SECOND ROW - PROBABILITY TABLE */}
                                <div className="w-100">
                                    {isProbabilityShown && (
                                        <table className="probability-table d-block d-lg-none mt-3 mb-3 mx-auto">
                                            <tbody>
                                                {spinnerRules?.map(
                                                    (rule, idx) => (
                                                        <tr
                                                            className="probability-row"
                                                            id={idx}
                                                            key={`prob-${idx}`}
                                                        >
                                                            <td className="probability-percentage">
                                                                {
                                                                    rule?.probability
                                                                }
                                                                %
                                                            </td>
                                                            <td className="probability-tickets-text">
                                                                {rule?.tickets}{" "}
                                                                tickets
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    )}
                                    <div
                                        className="tap-btn w-100 text-center d-xl-none"
                                        onClick={handleProbabilityInfo}
                                    >
                                        <img
                                            className="mb-2"
                                            width={14}
                                            src={`${window.cdn}icons/icon_arrow_up.png`}
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
                                    <p className="spin-amount-left-wrapper my-3 d-none d-xl-block">
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

                                {/* PROBABILITY TABLE */}
                                {isProbabilityShown && (
                                    <table className="probability-table mt-auto d-none d-lg-block">
                                        <tbody>
                                            {spinnerRules?.map((rule, idx) => (
                                                <tr
                                                    className="probability-row"
                                                    id={idx}
                                                    key={`prob-d-${idx}`}
                                                >
                                                    <td className="probability-percentage">
                                                        {rule?.probability}%
                                                    </td>
                                                    <td className="probability-tickets-text">
                                                        {rule?.tickets} tickets
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                            {/* THIRD COLUMN */}
                            <div
                                className="col-12 col-xl-7 py-0 py-lg-3 wrapper-col flex-column align-items-center justify-content-center"
                                style={{ height: modalHeight.cols }}
                            >
                                <FortuneWheelRules
                                    spinnerRules={spinnerRules}
                                    winAmount={winAmount}
                                    isClickedSpin={isClickedSpin}
                                    onSpinClicked={onClickSpinButton}
                                    onFinished={onSpinFinished}
                                />
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

            {/* USE GEMS BUTTON */}
            {outOfSpins && (
                <BuySpinConfirmModal
                    handleYes={handleBuySpinModalYesButton}
                    handleNo={() => {
                        setOutOfSpins(false);
                    }}
                    gemAmount={config.useGems}
                    spinAmount={config.useGemsSpin}
                />
            )}

            {/* PURCHASE GEMS BUTTON */}
            {outOfGems && <InsufficientGemsModal setOutOfGems={setOutOfGems} />}
        </div>
    );
};

export default FortuneWheel;
