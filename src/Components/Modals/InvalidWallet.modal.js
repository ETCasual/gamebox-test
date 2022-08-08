import React from "react";
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
                        <span>
                            {walletAddress?.substring(0, 5)}
                            ....
                            {walletAddress?.substring(walletAddress.length - 4)}
                        </span>
                    </p>
                    <p>
                        Bound wallet address:{" "}
                        <span>
                            {bindWalletAddress?.substring(0, 5)}
                            ....
                            {bindWalletAddress?.substring(
                                bindWalletAddress.length - 4
                            )}
                        </span>
                    </p>
                    <p className="subtitle">
                        Your Froyo Games account bound to a wallet address
                        previously. Please use the same wallet address to
                        connect. If you using MetaMask and is encountering this
                        error repeatly, please try this few steps that may
                        resolves your issues:
                    </p>
                    <ul className="my-4 list-unstyled">
                        <li className="row mb-2">
                            <div className="col-1 step">
                                <p className="mb-0">•</p>
                            </div>
                            <div className="col-10 col-md-10 px-0 instruction">
                                <p className="mb-0">
                                    Please disconnect all accounts from the
                                    MetaMask app.
                                </p>
                            </div>
                        </li>
                        <li className="row mb-2">
                            <div className="col-1 step">
                                <p className="mb-0">•</p>
                            </div>
                            <div className="col-10 col-md-10 px-0 instruction">
                                <p className="mb-0">
                                    Please choose the correct account from the
                                    MetaMask app.
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
