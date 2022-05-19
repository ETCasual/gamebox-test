import React, { useEffect, useState } from "react";

const OrientationModal = () => {
    const [orientationStatus, setOrientationStatus] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", handleResize, false);

        function handleResize() {
            const isMobile = navigator.userAgent.includes("Mobile");
            if (!isMobile) return;

            let isPortrait = window.matchMedia(
                "(orientation: portrait)"
            ).matches;

            if (!isPortrait) {
                document.querySelector("body").style.overflow = "hidden";
                setOrientationStatus(true);
            } else {
                document.querySelector("body").style.overflow = "visible";
                setOrientationStatus(false);
            }
        }

        handleResize();

        return () => window.removeEventListener("resize", handleResize, false);
    });

    return (
        <div
            className={`${
                orientationStatus ? "orientation" : "d-none"
            } flex-column align-items-center justify-content-center`}
        >
            <img
                className="img-fluid mb-3"
                width={150}
                src={`${window.cdn}logo/logo_gamebox.png`}
                alt="GameBox"
            />
            <p className="title mb-4">
                For best experience, Please switch to portrait orientation.
            </p>
            <img
                width={100}
                src={`${window.cdn}assets/rotate_screen_01.png`}
                alt="rotate"
            />
        </div>
    );
};

export default OrientationModal;
