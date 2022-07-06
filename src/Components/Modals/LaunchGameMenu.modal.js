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

                    <div className="d-flex flex-column align-items-center justify-content-center mt-1">
                        <div className="col-10 col-md-8 p-2">
                            <div className="title p-1 m-auto text-center">Game Menu</div>
                            <div className="selections d-flex my-2">
                                <div className="panel mr-1 my-3">selection 1</div>
                                <div className="panel ml-1 my-3">selection 2</div>
                            </div>
                            <div className="buttons">
                                <button
                                    className="play-btn d-flex align-items-center justify-content-center m-auto"
                                // onClick={}
                                >
                                    <p className="my-auto mr-2">Start Play</p>
                                    <div className="d-flex ml-2">
                                        <span className="m-auto">+10</span>
                                        <img
                                            className="icon ml-1"
                                            src={`${window.cdn}assets/gem_01.png`}
                                            alt="gems"
                                        /></div>

                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default LaunchGameMenuModalPopup;
