// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import _ from "lodash";

// COMPONENTS

// HELPER FUNCTIONS

const LaunchGameMenuModalPopup = ({
    gameId,
    prizeId,
    onCloseClicked,
    earnAdditionalDisabledStatus,
    setEarnAdditionalDisabledStatus,
}) => {
    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    return (
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
                <div className="modal-body-launch-game-menu position-relative">
                    {/* CLOSE BTN */}
                    <img
                        className="close-button"
                        onClick={onCloseClicked}
                        width="36"
                        src={`${window.cdn}buttons/button_close.png`}
                        alt="close-btn"
                    />

                    {/* CARD */}
                </div>
            </div>
        </>
    );
};

export default LaunchGameMenuModalPopup;
