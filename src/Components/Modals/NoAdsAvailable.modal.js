import { useTranslation } from "react-i18next";

const NoAdsAvailable = ({ handleNoAdAvailable }) => {
    const { t } = useTranslation();
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-small">
                <p className="title">{t("noAds.title")}</p>
                <p className="subtitle">{t("noAds.subtitle")}</p>
                <div className="p-0 btn-wrapper d-flex mt-4">
                    <button
                        className="btn-yes w-100"
                        onClick={handleNoAdAvailable}
                    >
                        {t("noAds.continue")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoAdsAvailable;
