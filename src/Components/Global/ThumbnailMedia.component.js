// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import VisibilitySensor from "react-visibility-sensor";

// HELPER FUNCTIONS
import getFileType from "Utils/GetFileType";

const ThumbnailMedia = ({
    url,
    isPlayVideo,
    setIsPlayVideo,
    onError = null,
    className = "",
}) => {
    const [thumbFileType] = useState(getFileType(url));
    const [isMobile, setIsMobile] = useState(
        navigator.userAgent.includes("Mobile")
    );

    let videoRef = useRef(null);

    useEffect(() => {
        // Check is mobile platform
        setIsMobile(navigator.userAgent.includes("Mobile"));
    }, [url]);

    useEffect(() => {
        if (isPlayVideo) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    }, [isPlayVideo]);

    const renderVideoElement = (
        <video
            ref={videoRef}
            loop
            playsInline
            preload="metadata"
            muted // For autoplay
            onCanPlayThrough={(e) => {
                if (isPlayVideo) {
                    e.target.play();
                }
            }}
            onError={(e) => (onError ? onError(e) : null)}
            className={className}
        >
            <source src={url} type="video/mp4" />
        </video>
    );

    const renderImageElement = (
        <picture>
            <source media="(max-width:768px)" srcSet={url} />
            <img
                src={url}
                alt={url}
                onError={(e) => (onError ? onError(e) : null)}
                className={className}
            />
        </picture>
    );

    return (
        <>
            {/* VIDEO */}
            {thumbFileType === "mp4" &&
                (isMobile ? (
                    <VisibilitySensor
                        resizeCheck={true}
                        scrollCheck={true}
                        // offset={{ top: 10 }}
                        partialVisibility="top"
                        onChange={(isVisible) => {
                            setIsPlayVideo(isVisible);
                        }}
                    >
                        {renderVideoElement}
                    </VisibilitySensor>
                ) : (
                    renderVideoElement
                ))}

            {/* IMAGE, GIF */}
            {(thumbFileType === "gif" ||
                thumbFileType === "png" ||
                thumbFileType === "jpg" ||
                thumbFileType === "jpeg") &&
                renderImageElement}
        </>
    );
};

export default ThumbnailMedia;
