import React, { useEffect, useState } from "react";
import useDetectKeyboardOpen from "use-detect-keyboard-open";

const OrientationModal = () => {
    const [orientationStatus, setOrientationStatus] = useState(false);
    const isKeyboardOpen = useDetectKeyboardOpen();

    useEffect(() => {
        window.addEventListener("resize", handleResize, false);

        function handleResize() {
            if (
                navigator.userAgent.includes("Mobile") &&
                window.screen.availWidth > window.screen.availHeight &&
                !isKeyboardOpen
            ) {
                document.querySelector("body").style.overflow = "hidden";
                setOrientationStatus(true);
            } else {
                document.querySelector("body").style.overflow = "visible";
                setOrientationStatus(false);
            }
        }
        handleResize();

        return () => window.removeEventListener("resize", handleResize, false);
    }, [isKeyboardOpen]);

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
                src={`${window.cdn}illustrations/rotatescreen.png`}
                alt="rotate"
            />
        </div>
    );
};

export default OrientationModal;
