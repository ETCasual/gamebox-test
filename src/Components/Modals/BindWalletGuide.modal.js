import React from "react";

const BindWalletGuideModalPopup = ({ handleCloseBtn }) => {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-bind-wallet position-relative p-4">
                <img
                    className="close-button"
                    onClick={handleCloseBtn}
                    width="36"
                    src={`${window.cdn}buttons/button_close.png`}
                    alt="close-btn"
                />

                {/* <h5 className="title mb-4">Please Bind Your Wallet</h5> */}
                <div className="col-12 my-3 px-0">
                    <p className="subtitle">
                        Your Froyo Account is not currently bound to a wallet.
                        Please follow these simple steps to successfully connect
                        your wallet to Gamebox.
                    </p>
                    <ul className="my-4 list-unstyled">
                        <li className="row mb-2">
                            <div className="col-1 step">
                                <p className="mb-0">1)</p>
                            </div>
                            <div className="col-10 col-md-10 px-0">
                                <p className="mb-0">
                                    Please log in to your account on{" "}
                                    <a
                                        className="highlight-url"
                                        href={
                                            process.env.REACT_APP_FROYO_WEB_URL
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {process.env.REACT_APP_FROYO_WEB_URL}
                                    </a>
                                </p>
                            </div>
                        </li>

                        <li className="row mb-2">
                            <div className="col-1 step">
                                <p className="mb-0">2)</p>
                            </div>
                            <div className="col-10 col-md-10 px-0">
                                <p className="mb-0">
                                    Ensure you have the Metamask browser
                                    extension installed and set up. You can also
                                    use any WalletConnect-compatible wallet.
                                </p>
                            </div>
                        </li>

                        <li className="row mb-2">
                            <div className="col-1 step">
                                <p className="mb-0">3)</p>
                            </div>
                            <div className="col-10 col-md-10 px-0">
                                <p className="mb-0">
                                    Bind your wallet to your Froyo Games account
                                    by signing a message with your wallet.
                                </p>
                            </div>
                        </li>

                        <li className="row mb-2">
                            <div className="col-1 step">
                                <p className="mb-0">4)</p>
                            </div>
                            <div className="col-10 col-md-10 px-0">
                                <p className="mb-0">
                                    Once successfully bound, your wallet should
                                    be connected to your account when accessing
                                    the Gamebox platform.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BindWalletGuideModalPopup;
