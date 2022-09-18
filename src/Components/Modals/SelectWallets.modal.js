import React, { useState, useEffect } from "react";
import { isBrowser } from "react-device-detect";
import { useTranslation } from "react-i18next";

const SelectWalletsModalPopup = ({
    handleInstructionsCloseBtn,
    handleConnectMetamask,
    handleConnectWalletConnect,
}) => {
    const { t } = useTranslation();

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
                    <h5 className="title mb-0">
                        {t("connect_wallet.select_wallets.connect_wallet")}
                    </h5>
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
                                    <p className="wallet-name">
                                        {t(
                                            "connect_wallet.select_wallets.provider.metamask"
                                        )}
                                    </p>
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
                                <p className="wallet-name">
                                    {t(
                                        "connect_wallet.select_wallets.provider.wallet_connect"
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                {connectGuideShow && (
                    <div className="col-12 my-3 px-4 connect-wallet-guide">
                        <p className="subtitle">
                            {t("connect_wallet.select_wallets.guide.subtitle")}
                        </p>
                        <ul className="my-4 list-unstyled">
                            <li className="row mb-2">
                                <div className="col-2 step">
                                    <p className="mb-0">1.</p>
                                </div>
                                <div className="col-9 col-md-10 px-0 instruction">
                                    <p className="mb-0">
                                        {t(
                                            "connect_wallet.select_wallets.guide.step_1"
                                        )}
                                    </p>
                                </div>
                            </li>
                            <li className="row mb-2">
                                <div className="col-2 step">
                                    <p className="mb-0">2.</p>
                                </div>
                                <div className="col-9 col-md-10 px-0 instruction">
                                    <p className="mb-0">
                                        {t(
                                            "connect_wallet.select_wallets.guide.step_2"
                                        )}
                                    </p>
                                </div>
                            </li>
                            <li className="row mb-2">
                                <div className="col-2 step">
                                    <p className="mb-0">3.</p>
                                </div>
                                <div className="col-9 col-md-10 px-0 instruction">
                                    <p className="mb-0">
                                        {t(
                                            "connect_wallet.select_wallets.guide.step_3"
                                        )}
                                    </p>
                                </div>
                            </li>
                            <li className="row mb-2">
                                <div className="col-2 step">
                                    <p className="mb-0">4.</p>
                                </div>
                                <div className="col-9 col-md-10 px-0 instruction">
                                    <p className="mb-0">
                                        {t(
                                            "connect_wallet.select_wallets.guide.step_4"
                                        )}
                                    </p>
                                </div>
                            </li>
                            <li className="row mb-2">
                                <div className="col-2 step">
                                    <p className="mb-0">5.</p>
                                </div>
                                <div className="col-9 col-md-10 px-0 instruction">
                                    <p className="mb-0">
                                        {t(
                                            "connect_wallet.select_wallets.guide.step_5"
                                        )}
                                    </p>
                                </div>
                            </li>
                            <li className="row mb-2">
                                <div className="col-2 step">
                                    <p className="mb-0">6.</p>
                                </div>
                                <div className="col-9 col-md-10 px-0 instruction">
                                    <p className="mb-0">
                                        {t(
                                            "connect_wallet.select_wallets.guide.step_6"
                                        )}
                                    </p>
                                </div>
                            </li>
                            <li className="row mb-2">
                                <div className="col-2 step">
                                    <p className="mb-0">7.</p>
                                </div>
                                <div className="col-9 col-md-10 px-0 instruction">
                                    <p className="mb-0">
                                        {t(
                                            "connect_wallet.select_wallets.guide.step_7"
                                        )}
                                    </p>
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
                            {t(
                                "connect_wallet.select_wallets.guide.mobile_guide"
                            )}
                        </p>
                    )}
                    {connectGuideShow && (
                        <p
                            className="p-3 w-100"
                            onClick={() => setConnectGuideShow(false)}
                        >
                            {t("connect_wallet.select_wallets.btn.back")}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SelectWalletsModalPopup;
