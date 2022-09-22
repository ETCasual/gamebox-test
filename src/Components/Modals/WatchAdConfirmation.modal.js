import { useTranslation } from "react-i18next";

const WatchAdConfirmationModalPopup = ({ handleNo, handleYes }) => {
    const { t } = useTranslation();

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-small">
                <p className="title"> {t("ads.title")}</p>
                <p className="subtitle">{t("ads.subtitle")}</p>
                <div className="p-0 btn-wrapper d-flex mt-4">
                    <button className="btn-no col" onClick={handleNo}>
                        {t("btn.no")}
                    </button>
                    <button className="btn-yes col" onClick={handleYes}>
                        {t("btn.yes")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WatchAdConfirmationModalPopup;
