import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const GameInstructionsModalPopup = ({ handleInstructionsCloseBtn }) => {
    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    const { t } = useTranslation();

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-small position-relative">
                <img
                    className="close-button"
                    onClick={handleInstructionsCloseBtn}
                    width="36"
                    src={`${window.cdn}buttons/button_close.png`}
                    alt="close-btn"
                />
                <div className="col-12 p-3">
                    <h5 className="title">{t("instructions.prize.title")}</h5>
                    <p className="subtitle">
                        {t("instructions.prize.subtitle")}
                    </p>
                    <ul className="my-4 list-unstyled">
                        <li className="row">
                            <div className="col-3 col-md-2 step">
                                <p className="mb-0">
                                    {t("instructions.prize.step")} 1
                                </p>
                            </div>
                            <div className="col-9 col-md-10 px-0 instruction">
                                <p className="mb-0">
                                    {t("instructions.prize.1")}
                                </p>
                            </div>
                        </li>
                        <li className="row">
                            <div className="col-3 col-md-2 step">
                                <p className="mb-0">
                                    {t("instructions.prize.step")} 2
                                </p>
                            </div>
                            <div className="col-9 col-md-10 px-0 instruction">
                                <p className="mb-0">
                                    {t("instructions.prize.2")}
                                </p>
                            </div>
                        </li>
                        <li className="row">
                            <div className="col-3 col-md-2 step">
                                <p className="mb-0">
                                    {t("instructions.prize.step")} 3
                                </p>
                            </div>
                            <div className="col-9 col-md-10 px-0 instruction">
                                <p className="mb-0">
                                    {t("instructions.prize.3")}
                                </p>
                            </div>
                        </li>
                        <li className="row">
                            <div className="col-3 col-md-2 step">
                                <p className="mb-0">
                                    {t("instructions.prize.step")} 4
                                </p>
                            </div>
                            <div className="col-9 col-md-10 px-0 instruction">
                                <p className="mb-0">
                                    {t("instructions.prize.4")}
                                </p>
                            </div>
                        </li>
                    </ul>
                    <p className="subtitle">
                        {t("instructions.prize.footer.tip")}
                    </p>
                    <h5 className="title">
                        {t("instructions.prize.footer.title")}
                    </h5>
                    <p className="subtitle">
                        {t("instructions.prize.footer.subtitle1")}
                    </p>
                    <p className="subtitle mb-0">
                        {t("instructions.prize.footer.subtitle2")}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GameInstructionsModalPopup;
