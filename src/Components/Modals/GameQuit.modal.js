import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";

const GameQuitModal = ({ onActionCallback, isShowWarningMessage = true }) => {
    const { t } = useTranslation();

    return (
        <>
            {
                <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
                    <div className="game-quit-panel col-12 col-md-8 col-xl-6 col-xxl-5 position-relative">
                        {/* CARD */}
                        <div className="row justify-content-center mt-3 mt-sm-3 px-0">
                            <div className="col-10 col-lg-8 mb-4 px-0 ">
                                {/*EXTRA MARGIN */}
                                <p className="my-5"></p>
                                <p className="text-center panel-title text-danger">
                                    {t("quit_modal.title")}
                                </p>

                                {isShowWarningMessage && (
                                    <p className="game-warning-text text-center  mb-0">
                                        <Trans i18nKey="quit_modal.subtitle">
                                            0
                                            <span className="text-danger">
                                                1
                                            </span>
                                            2
                                        </Trans>
                                    </p>
                                )}

                                {/*EXTRA MARGIN */}
                                <p className="mt-2"></p>

                                <button
                                    className="yes-button d-block bg-danger mx-auto text-center  mt-5 py-2"
                                    onClick={() => onActionCallback("yes")}
                                >
                                    {t("quit_modal.confirm")}
                                </button>

                                <button
                                    className="cancel-button d-block text-center mx-auto mt-3 py-2"
                                    onClick={() => onActionCallback("no")}
                                >
                                    {t("quit_modal.cancel")}
                                </button>
                                {/*EXTRA MARGIN */}
                                <p className="my-5"></p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default GameQuitModal;
