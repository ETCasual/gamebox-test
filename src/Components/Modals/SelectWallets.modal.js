import React, { useState, useEffect } from "react";
import { isBrowser } from "react-device-detect";
const SelectWalletsModalPopup = ({
    handleInstructionsCloseBtn,
    handleConnectMetamask,
    handleConnectWalletConnect,
}) => {
    const [connectGuideShow, setConnectGuideShow] = useState(false);

    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-connect-wallet position-relative p-0">
                <img
                    className="close-button"
                    onClick={handleInstructionsCloseBtn}
                    width="36"
                    src={`${window.cdn}buttons/button_close.png`}
                    alt="close-btn"
                />
                <div className="col-12 p-4 connect-wallet-title-wrapper">
                    <h5 className="title mb-0">CONNECT WALLET</h5>
                </div>
                {!connectGuideShow && (
                    <div className="col-12 my-5 connect-wallet-list">
                        <div className="d-flex align-items-center">
                            {isBrowser && (
                                <div
                                    className="col-6 connect-wallet-item text-center"
                                    onClick={handleConnectMetamask}
                                >
                                    <img
                                        className="icon"
                                        width="64"
                                        height="64"
                                        src={`${window.cdn}logo/logo_metamaskfox_01.png`}
                                        alt="metamask"
                                    />
                                    <p className="wallet-name">Metamask</p>
                                </div>
                            )}
                            <div
                                className="col-6 connect-wallet-item text-center"
                                onClick={handleConnectWalletConnect}
                            >
                                <img
                                    className="icon"
                                    width="64"
                                    height="64"
                                    src={`${window.cdn}logo/logo_walletconnect_01.png`}
                                    alt="metamask"
                                />
                                <p className="wallet-name">WalletConnect</p>
                            </div>
                        </div>
                    </div>
                )}
                {connectGuideShow && (
                    <div className="col-12 my-3 px-4 connect-wallet-guide">
                        <p className="subtitle">
                            Follow this guide to connect your metamask wallet on
                            your mobile.
                        </p>
                        <ul className="my-4 list-unstyled">
                            <li className="row mb-2">
                                <div className="col-2 step">
                                    <p className="mb-0">1.</p>
                                </div>
                                <div className="col-9 col-md-10 px-0 instruction">
                                    <p className="mb-0">
                                        Click on "WalletConnect"
                                    </p>
                                </div>
                            </li>
                            <li className="row mb-2">
                                <div className="col-2 step">
                                    <p className="mb-0">2.</p>
                                </div>
                                <div className="col-9 col-md-10 px-0 instruction">
                                    <p className="mb-0">
                                        Connect to WalletConnect
                                    </p>
                                </div>
                            </li>
                            <li className="row mb-2">
                                <div className="col-2 step">
                                    <p className="mb-0">3.</p>
                                </div>
                                <div className="col-9 col-md-10 px-0 instruction">
                                    <p className="mb-0">Tap on Metamask</p>
                                </div>
                            </li>
                            <li className="row mb-2">
                                <div className="col-2 step">
                                    <p className="mb-0">4.</p>
                                </div>
                                <div className="col-9 col-md-10 px-0 instruction">
                                    <p className="mb-0">
                                        Sign in to your metamask account
                                    </p>
                                </div>
                            </li>
                            <li className="row mb-2">
                                <div className="col-2 step">
                                    <p className="mb-0">5.</p>
                                </div>
                                <div className="col-9 col-md-10 px-0 instruction">
                                    <p className="mb-0">
                                        Select your wallet network by tapping on
                                        the "Wallet" at the top
                                    </p>
                                </div>
                            </li>
                            <li className="row mb-2">
                                <div className="col-2 step">
                                    <p className="mb-0">6.</p>
                                </div>
                                <div className="col-9 col-md-10 px-0 instruction">
                                    <p className="mb-0">
                                        Tap on "Binance Smart Chain"
                                    </p>
                                </div>
                            </li>
                            <li className="row mb-2">
                                <div className="col-2 step">
                                    <p className="mb-0">7.</p>
                                </div>
                                <div className="col-9 col-md-10 px-0 instruction">
                                    <p className="mb-0">Return to GameBox</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
                <div className="connect-wallet-guide-btn d-flex text-center justify-content-center">
                    {!connectGuideShow && (
                        <p
                            className="p-3 w-100"
                            onClick={() => setConnectGuideShow(true)}
                        >
                            Guide to connect to wallet on mobile
                        </p>
                    )}
                    {connectGuideShow && (
                        <p
                            className="p-3 w-100"
                            onClick={() => setConnectGuideShow(false)}
                        >
                            Back
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SelectWalletsModalPopup;
