// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import FortuneWheelRules from "Components/Tournaments/FortuneWheel/FortuneWheelRules.component";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadPlayerSpinnerSpin from "redux/thunks/PlayerSpinnerSpin.thunk";
import loadUserDetails from "redux/thunks/UserDetails.thunk";

// HELPER FUNCTION
// import getPoolTickets from "Utils/PoolTickets";

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

    const [isClickedSpin, setIsClickedSpin] = useState(false);
    const [spinBuyProcess, setSpinBuyProcess] = useState(false);
    const [isProbabilityShown, setIsProbabilityShown] = useState(false);
    // const [modalHeight, setModalHeight] = useState({
    //     windowWidth: 0,
    //     wrapper: 0,
    //     cols: 0,
    // });
    const [winAmount, setWinAmount] = useState(-1);

    // DISABLE HTML SCROLL
    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    // RESIZE EVENT
    // useEffect(() => {
    //     window.addEventListener("resize", handleResize);

    //     function handleResize() {
    //         const mainElemHeight =
    //             document.querySelector(".full-wrapper")?.offsetHeight;
    //         setModalHeight({
    //             windowWidth: window.innerWidth,
    //             wrapper: mainElemHeight + 50,
    //             cols: window.innerWidth < 1200 ? "auto" : mainElemHeight + 50,
    //         });
    //         const col2 = document.querySelector(".wrapper-col:nth-child(2)");
    //         const col3 = document.querySelector(".wrapper-col:nth-child(3)");
    //         if (
    //             col2.style.display === "none" ||
    //             col3.style.display === "none"
    //         ) {
    //             col2.style.display = "flex";
    //             col3.style.display = "flex";
    //         }
    //     }
    //     handleResize();

    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);

    function onClickSpinButton() {
        // PREVENT SPAMMING
        if (isClickedSpin) return;

        if (spinner?.freeSpins <= 0) {
            return;
        }

        setIsClickedSpin(true);
        dispatch(loadPlayerSpinnerSpin(prizeId, updateWheelResult));
    }
    function updateWheelResult(_spinner) {
        if (_spinner.enterId === 0) return;

        if (spinBuyProcess) setSpinBuyProcess(false);

        if (_spinner.freeSpins >= 0) {
            setWinAmount(_spinner.winAmount);
        }
    }
    function onSpinFinished() {
        setIsClickedSpin(false);

        dispatch(loadUserDetails());
    }

    return (
        <div className="fortune-wheel d-flex align-items-center justify-content-center">
            <div className="fortune-wheel-container container-fluid">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-10 col-lg-8 col-xl-7 wrapper">
                        <div className="row h-100">
                            {/* FIRST COLUMN */}
                            <div className="col-12 pt-3 align-items-center justify-content-between wrapper-col">
                                {/* FIRST ROW - SPINNER TEXT AND ICONS */}
                                <div className="first-row d-flex flex-column">
                                    <div className="text-icon-wrapper m-auto">
                                        {/* CLOSE BUTTON */}
                                        <img
                                            width="36"
                                            className="close-button"
                                            onClick={() =>
                                                !isClickedSpin
                                                    ? setFortuneWheelShown(
                                                          false
                                                      )
                                                    : null
                                            }
                                            src={`${window.cdn}buttons/button_close.png`}
                                            alt="close-btn"
                                        />
                                        {/* MINIMIZE BUTTON */}
                                        {/* <img
                                            onClick={() =>
                                                !isClickedSpin
                                                    ? setFortuneWheelShown(
                                                          false
                                                      )
                                                    : null
                                            }
                                            src={`${window.cdn}icons/icon_minimize.png`}
                                            alt="arrow-button"
                                        /> */}
                                        <div className="text-wrapper">
                                            {/* <p className="the-spinner-text mb-0 d-block">
                                                The Spinner
                                            </p> */}
                                            <p className="earn-more-tickets-text d-block m-auto">
                                                SPIN & EARN MORE REWARDS HERE!
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* SECOND ROW - PROBABILITY TABLE */}
                                {/* {isProbabilityShown && (
                                    <div className="w-100">
                                        <table className="probability-table mt-3 mb-3 mx-auto">
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
                                                                <img
                                                                    className="icon"
                                                                    src={`${window.cdn}assets/gem_01.png`}
                                                                    alt="gems"
                                                                />                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )} */}
                                {/* <div
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
                                    </div> */}
                            </div>

                            {/* SECOND COLUMN */}
                            <div className="col-12 py-3 d-flex flex-column wrapper-col flex-column align-items-center justify-content-center">
                                <div className="w-100 d-flex mb-3">
                                    {/* SPIN BALANCE */}
                                    {/* <div className="your-balance d-flex flex-column align-items-center justify-content-center mr-auto">
                                        <div className="your-balance-text mb-2">
                                            YOUR SPINS
                                        </div>
                                        <div className="spin-number">
                                            {spinner?.freeSpins > 0
                                                ? spinner?.freeSpins
                                                : 0}
                                        </div>
                                    </div> */}

                                    {/* GEMS BALANCE */}
                                    <div className="your-balance d-flex flex-row align-items-center justify-content-center m-auto">
                                        <div className="your-balance-text ml-3 mr-auto">
                                            YOUR GEMS
                                        </div>
                                        <div className="balance-number d-flex flex-row align-items-center justify-content-center mr-3 ml-auto">
                                            {user?.gems || 0}
                                            <img
                                                className="icon"
                                                src={`${window.cdn}assets/gem_01.png`}
                                                alt="gems"
                                            ></img>
                                        </div>
                                    </div>
                                </div>

                                {/* PROBABILITY DISPLAY BUTTON */}
                                <div className="probability-btn my-1 my-mb-3">
                                    <button
                                        onClick={() =>
                                            setIsProbabilityShown(
                                                !isProbabilityShown
                                            )
                                        }
                                    >
                                        <img
                                            src={`${window.cdn}buttons/button_question_01.png`}
                                            alt="question-mark"
                                        />
                                        <span className="mt-auto mb-auto">
                                            Rewards Informations
                                        </span>
                                    </button>
                                </div>

                                <div className="fortune-wheel-content mt-1">
                                    {!isProbabilityShown && (
                                        <>
                                            {/* FORTUNE WHEEL */}
                                            <FortuneWheelRules
                                                spinnerRules={spinnerRules}
                                                spinLeft={
                                                    spinner?.freeSpins > 0
                                                        ? spinner?.freeSpins
                                                        : 0
                                                }
                                                winAmount={winAmount}
                                                isClickedSpin={isClickedSpin}
                                                onSpinClicked={
                                                    onClickSpinButton
                                                }
                                                onFinished={onSpinFinished}
                                            />

                                            {/* SPINS LEFT INFO */}
                                            <p className="spin-amount-left-wrapper text-center mt-2 mb-0">
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
                                        </>
                                    )}
                                    {isProbabilityShown && (
                                        <table className="probability-table mx-auto mt-3">
                                            <tbody>
                                                <tr className="probability-row">
                                                    <td className="probability-percentage-caption">
                                                        CHANCES
                                                    </td>
                                                    <td className="probability-tickets-text-caption">
                                                        REWARDS
                                                    </td>
                                                </tr>
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
                                                                <img
                                                                    className="icon"
                                                                    src={`${window.cdn}assets/gem_01.png`}
                                                                    alt="gems"
                                                                />{" "}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FortuneWheel;
