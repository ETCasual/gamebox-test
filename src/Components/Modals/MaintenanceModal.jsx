import React from "react";
import { useTranslation ,Trans} from "react-i18next";

export const MaintenanceModal = () => {
    const { t } = useTranslation()
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-bind-wallet position-relative p-4">

                This Page is currently under maintenance!
                
                <div className="col-12 my-3 px-0">
                    <p className="subtitle">
                        {t("connect_wallet.bind_wallet_guide.subtitle")}
                    </p>
                    <ul className="my-4 list-unstyled">
                        <li className="row mb-2">
                            <div className="col-1 step">
                                <p className="mb-0">1)</p>
                            </div>
                            <div className="col-10 col-md-10 px-0">
                                <p className="mb-0">
                                    <Trans i18nKey="connect_wallet.bind_wallet_guide.step_1">
                                        Please log in to your account on
                                        <a
                                            className="highlight-url"
                                            href={
                                                process.env
                                                    .REACT_APP_FROYO_WEB_URL
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {{
                                                url: process.env
                                                    .REACT_APP_FROYO_WEB_URL,
                                            }}
                                        </a>
                                    </Trans>
                                </p>
                            </div>
                        </li>

                        <li className="row mb-2">
                            <div className="col-1 step">
                                <p className="mb-0">2)</p>
                            </div>
                            <div className="col-10 col-md-10 px-0">
                                <p className="mb-0">
                                    {t(
                                        "connect_wallet.bind_wallet_guide.step_2"
                                    )}
                                </p>
                            </div>
                        </li>

                        <li className="row mb-2">
                            <div className="col-1 step">
                                <p className="mb-0">3)</p>
                            </div>
                            <div className="col-10 col-md-10 px-0">
                                <p className="mb-0">
                                    {t(
                                        "connect_wallet.bind_wallet_guide.step_3"
                                    )}
                                </p>
                            </div>
                        </li>

                        <li className="row mb-2">
                            <div className="col-1 step">
                                <p className="mb-0">4)</p>
                            </div>
                            <div className="col-10 col-md-10 px-0">
                                <p className="mb-0">
                                    {t(
                                        "connect_wallet.bind_wallet_guide.step_4"
                                    )}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
