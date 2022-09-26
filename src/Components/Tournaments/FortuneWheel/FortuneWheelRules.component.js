import React, { useState, useEffect, useRef } from "react";
import Winwheel from "winwheel";
import TweenMax from "gsap/all";
import { useTranslation } from "react-i18next";
import { Timer } from "Utils/hooks/useDelay";

const FortuneWheelRules = ({
    spinnerRules,
    spinLeft,
    winAmount,
    isClickedSpin,
    onSpinClicked,
    isEndSpin,
    setIsEndSpin,
    onFinished = null,
}) => {
    // Pre-Method
    const getShuffleSpinner = () => {
        let tempList = [...spinnerRules];
        // Shuffle the spinner numbers
        for (let i = 10; i > 0; i--) {
            let randNum = Math.floor(Math.random() * i);
            [tempList[i - 1], tempList[randNum]] = [
                tempList[randNum],
                tempList[i - 1],
            ];
        }
        return tempList;
    };

    const [shuffleSpinner] = useState(getShuffleSpinner());

    const segmentAngleRef = useRef(360 / shuffleSpinner.length);
    const numOfSpinsRef = useRef(8);

    const ticketList = useRef([]);
    const wheelRef = useRef(null);
    const onFinishedRef = useRef(onFinished);

    const isAbleToSpin = spinLeft > 0;

    const [isSpinning, setIsSpinning] = useState(false);
    const delay = useRef(null);

    useEffect(() => {
        // Update tickets list
        ticketList.current = shuffleSpinner.map((x) => x.tickets);

        // Add TweenMax into global var
        window.TweenMax = TweenMax;

        // SETUP WHEEL
        const [fillStyle, strokeStyle] = normalSegmentStyles();

        wheelRef.current = new Winwheel({
            numSegments: shuffleSpinner.length,
            outerRadius: 190,
            innerRadius: 130,
            textFontSize: 24,
            textMargin: 0,
            textOrientation: "curved",
            textAligment: "center",
            fillStyle: fillStyle,
            strokeStyle: strokeStyle,
            lineWidth: 2,
            textFillStyle: "white",
            textFontFamily: "'Open Sans',sans-serif",
            rotationAngle: -segmentAngleRef.current / 2,
            responsive: true,
            segments: ticketList.current.map((data) => {
                return {
                    text: data.toString(),
                };
            }),
            animation: {
                type: "spinToStop",
                duration: 3,
                easing: "Power2.easeInOut",
                spins: numOfSpinsRef.current, // Number of complete spins.
                direction: "clockwise",
            },
            // #DEBUG pointer guide on.
            // pointerGuide: {
            //     display: true,
            //     strokeStyle: "red",
            //     lineWidth: 3,
            // },
        });
    }, [shuffleSpinner]);

    useEffect(() => {
        if (!isClickedSpin) setIsSpinning(false);
    }, [isClickedSpin]);

    useEffect(() => {
        const resetWheel = () => {
            wheelRef.current.stopAnimation(false);
            let winningSegmentNumber =
                wheelRef.current.getIndicatedSegmentNumber();

            const [fillStyle, strokeStyle] = normalSegmentStyles();
            wheelRef.current.segments[winningSegmentNumber].fillStyle =
                fillStyle;
            wheelRef.current.segments[winningSegmentNumber].strokeStyle =
                strokeStyle;

            wheelRef.current.draw();
        };

        const startSpin = () => {
            let winSegments = ticketList.current.reduce((a, e, i) => {
                if (e === winAmount) {
                    a.push(i);
                }
                return a;
            }, []);

            if (winSegments.length === 0) return;

            // Random pick a winning segment
            const randIndex = Math.floor(Math.random() * winSegments.length);
            let resultAngle =
                segmentAngleRef.current * winSegments[randIndex] +
                segmentAngleRef.current / 2;

            resetWheel();

            wheelRef.current.animation.stopAngle = resultAngle;

            // To make the spin continously spin for next spin
            wheelRef.current.animation.spins += numOfSpinsRef.current;

            wheelRef.current.startAnimation();

            // Wait for wheel finish spin
            delay.current = new Timer(() => {
                // Highlight winning segment
                let winningSegmentNumber =
                    wheelRef.current.getIndicatedSegmentNumber();

                const [fillStyle, strokeStyle] = winSegmentStyles();
                wheelRef.current.segments[winningSegmentNumber].fillStyle =
                    fillStyle;
                wheelRef.current.segments[winningSegmentNumber].strokeStyle =
                    strokeStyle;

                wheelRef.current.draw();

                if (onFinishedRef.current) {
                    setIsEndSpin(true);
                    onFinishedRef.current();
                }
            }, wheelRef.current.animation.duration * 1000);
        };

        if (!isSpinning && isClickedSpin && winAmount !== -1) {
            setIsSpinning(true);
            startSpin();
        }
    }, [isClickedSpin, winAmount, isSpinning, setIsEndSpin]);

    //#region Methods

    const normalSegmentStyles = () => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const canvasCenter = canvas.height / 2;

        let fillStyle = ctx.createRadialGradient(
            canvasCenter,
            canvasCenter,
            50,
            canvasCenter,
            canvasCenter,
            250
        );
        fillStyle.addColorStop(0.4, "#eea908");
        fillStyle.addColorStop(0.65, "#fbd886");
        fillStyle.addColorStop(0.75, "#eea908");
        fillStyle.addColorStop(0.8, "#eea908");

        let strokeStyle = "#eea908";

        return [fillStyle, strokeStyle];
    };

    const winSegmentStyles = () => {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let canvasCenter = canvas.height / 2;

        let fillStyle = ctx.createRadialGradient(
            canvasCenter,
            canvasCenter,
            50,
            canvasCenter,
            canvasCenter,
            250
        );

        fillStyle.addColorStop(0.4, "#ee088b");
        fillStyle.addColorStop(0.65, "#fb86e0");
        fillStyle.addColorStop(0.75, "#ee088b");
        fillStyle.addColorStop(0.8, "#ee088b");

        let strokeStyle = "#ee087fff";

        return [fillStyle, strokeStyle];
    };

    //#endregion

    const [isFirstLoad, setIsFirstLoad] = useState(true);

    useEffect(() => {
        const detectVisiblity = () => {
            if (
                document.visibilityState === "visible" &&
                !isFirstLoad &&
                isSpinning
            ) {
                wheelRef.current.resumeAnimation();
                delay.current.resume();
            } else if (document.visibilityState === "hidden" && isSpinning) {
                wheelRef.current.pauseAnimation();
                delay.current.pause();
                setIsFirstLoad(false);
            }
        };

        document.addEventListener("visibilitychange", detectVisiblity, this);

        return () =>
            document.removeEventListener(
                "visibilitychange",
                detectVisiblity,
                this
            );
    }, [isFirstLoad, isSpinning]);

    const { t } = useTranslation();

    return (
        <div className="fortune-wheel-wrapper position-relative px-5">
            <div className="fortune-wheel-holder">
                <canvas
                    id="canvas"
                    width="400"
                    height="400"
                    data-responsiveminwidth="180"
                    data-responsivescaleheight="true"
                ></canvas>
                <div className="inner-circle"></div>
                {/* SPIN BUTTON*/}
                <div
                    className={`spin-button ${
                        !isAbleToSpin || isClickedSpin ? "opacity-0-5" : ""
                    }`}
                >
                    <button
                        disabled={!isAbleToSpin || isClickedSpin ? true : false}
                        onClick={onSpinClicked}
                    >
                        {t("spinner.fortune_wheel.spin")}
                        <br />
                        &
                        <br />
                        {t("spinner.fortune_wheel.win")}
                        {/* <br />
                        <span className="spins-left-text">{spinLeft}</span> */}
                    </button>
                </div>
                {/* TRIANGLE POINTER */}
                <img
                    className="img-fluid pointer-img"
                    src={`${window.cdn}spinner/spinner_arrow_01.png`}
                    alt="fortune-wheel"
                />
            </div>
        </div>
    );
};

export default FortuneWheelRules;
