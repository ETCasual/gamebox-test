import React from "react";
import { useTranslation, Trans } from "react-i18next";
import getFroyoGamesContactUrl from "../../Utils/GetFroyoGamesContact";

const SelectWalletsModalPopup = ({
    handleCloseBtn,
    walletAddress,
    bindWalletAddress,
}) => {
    const { t } = useTranslation();

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

                <h5 className="title mb-4">
                    {t("connect_wallet.invalid_wallet.title")}
                </h5>
                <div className="col-12 my-3 px-0">
                    <p>
                        {t("connect_wallet.invalid_wallet.current_wallet")}
                        {!walletAddress && (
                            <span className="highlight-address">
                                {t("connect_wallet.invalid_wallet.empty")}
                            </span>
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
                        {t("connect_wallet.invalid_wallet.bound_wallet")}
                        {!bindWalletAddress && (
                            <span className="highlight-address">
                                {t("connect_wallet.invalid_wallet.empty")}
                            </span>
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
                        {t("connect_wallet.invalid_wallet.desc_1")}
                    </p>
                    <p className="subtitle">
                        {t("connect_wallet.invalid_wallet.desc_2")}
                    </p>
                    <ul className="my-4 list-unstyled">
                        <li className="row mb-2">
                            <div className="col-1 step">
                                <p className="mb-0">•</p>
                            </div>
                            <div className="col-10 col-md-10 px-0">
                                <p className="mb-0">
                                    <Trans i18nKey="connect_wallet.invalid_wallet.step_1">
                                        Disconnect all accounts on Metamask
                                        (click the
                                        <span className="highlight-tips">
                                            "Connected"
                                        </span>
                                        button on the top left of the Metamask
                                        wallet)
                                    </Trans>
                                </p>
                            </div>
                        </li>
                        <li className="row mb-2">
                            <div className="col-1 step">
                                <p className="mb-0">•</p>
                            </div>
                            <div className="col-10 col-md-10 px-0">
                                <p className="mb-0">
                                    {t("connect_wallet.invalid_wallet.step_2")}
                                </p>
                            </div>
                        </li>
                        <li className="row mb-2">
                            <div className="col-1 step">
                                <p className="mb-0">•</p>
                            </div>
                            <div className="col-10 col-md-10 px-0">
                                <p className="mb-0">
                                    <Trans i18nKey="connect_wallet.invalid_wallet.step_3">
                                        To unbind this wallet from your Froyo
                                        Games Account, please
                                        <a
                                            className="highlight-url"
                                            href={getFroyoGamesContactUrl()}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            click here
                                        </a>
                                        to contact support
                                    </Trans>
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
