import React from "react";
import getFroyoGamesContactUrl from "../../Utils/GetFroyoGamesContact";

const SelectWalletsModalPopup = ({
    handleCloseBtn,
    walletAddress,
    bindWalletAddress,
}) => {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-invalid-wallet position-relative p-4">
                <img
                    className="close-button"
                    onClick={handleCloseBtn}
                    width="36"
                    src={`${window.cdn}buttons/button_close.png`}
                    alt="close-btn"
                />

                <h5 className="title mb-4">Invalid Wallet</h5>
                <div className="col-12 my-3 px-0">
                    <p>
                        Current wallet address:{" "}
                        {!walletAddress && (
                            <span className="highlight-address">[Empty]</span>
                        )}
                        {walletAddress && (
                            <span className="highlight-address">
                                {walletAddress?.substring(0, 5)}
                                ....
                                {walletAddress?.substring(
                                    walletAddress.length - 4
                                )}
                            </span>
                        )}
                    </p>
                    <p>
                        Bound wallet address:{" "}
                        {!bindWalletAddress && (
                            <span className="highlight-address">[Empty]</span>
                        )}
                        {bindWalletAddress && (
                            <span className="highlight-address">
                                {bindWalletAddress?.substring(0, 5)}
                                ....
                                {bindWalletAddress?.substring(
                                    bindWalletAddress.length - 4
                                )}
                            </span>
                        )}
                    </p>
                    <p className="subtitle">
                        Your Froyo Games account was previously bound to another
                        wallet address. Please use the same wallet address when
                        connecting.
                    </p>
                    <p className="subtitle">
                        If you are using Metamask and are frequently
                        encountering this error, please try the following steps:
                    </p>
                    <ul className="my-4 list-unstyled">
                        <li className="row mb-2">
                            <div className="col-1 step">
                                <p className="mb-0">•</p>
                            </div>
                            <div className="col-10 col-md-10 px-0">
                                <p className="mb-0">
                                    Disconnect all accounts on Metamask (click
                                    the
                                    <span className="highlight-tips">
                                        "Connected"
                                    </span>
                                    button on the top left of the Metamask
                                    wallet)
                                </p>
                            </div>
                        </li>
                        <li className="row mb-2">
                            <div className="col-1 step">
                                <p className="mb-0">•</p>
                            </div>
                            <div className="col-10 col-md-10 px-0">
                                <p className="mb-0">
                                    Select the correct account when connecting
                                    to Metamask
                                </p>
                            </div>
                        </li>
                        <li className="row mb-2">
                            <div className="col-1 step">
                                <p className="mb-0">•</p>
                            </div>
                            <div className="col-10 col-md-10 px-0">
                                <p className="mb-0">
                                    To unbind this wallet from your Froyo Games
                                    Account, please{" "}
                                    <a
                                        className="highlight-url"
                                        href={getFroyoGamesContactUrl()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        click here
                                    </a>{" "}
                                    to contact support
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SelectWalletsModalPopup;
