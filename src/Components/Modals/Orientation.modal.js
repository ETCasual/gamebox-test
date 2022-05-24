import React, { useEffect, useState } from "react";
import useDetectKeyboardOpen from "use-detect-keyboard-open";

const OrientationModal = () => {
    const [orientationStatus, setOrientationStatus] = useState(false);
    const isKeyboardOpen = useDetectKeyboardOpen();

    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return "Android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }

        return "unknown";
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize, false);

        function handleResize() {
            const isMobile = navigator.userAgent.includes("Mobile");
            if (!isMobile) return;

            let isPortrait = window.matchMedia(
                "(orientation: portrait)"
            ).matches;

            // Note: In iOS [isKeyboardOpen] always return "true", so have to check separately for iOS
            if (getMobileOperatingSystem() == "iOS" && !isPortrait) {
                document.querySelector("body").style.overflow = "hidden";
                setOrientationStatus(true);
            } else if (!isPortrait && !isKeyboardOpen) {
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
                src={`${window.cdn}assets/rotate_screen_01.png`}
                alt="rotate"
            />
        </div>
    );
};

export default OrientationModal;
