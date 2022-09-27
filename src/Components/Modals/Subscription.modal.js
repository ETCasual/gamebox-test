import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";

const SubscriptionModalPopup = ({ handleGetGemsLaterBtn }) => {
    const history = useHistory();

    const { t } = useTranslation();

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-small">
                <p className="title">{t("subscription.title")}</p>
                <p className="subtitle">{t("subscription.subtitle")}</p>
                <div className="p-0 btn-wrapper d-flex mt-4">
                    <button
                        className="btn-no col p-0"
                        onClick={handleGetGemsLaterBtn}
                    >
                        {t("subscription.btn.later")}
                    </button>
                    <div className="col p-0">
                        <Link
                            to={{
                                pathname: "/iap",
                                state: {
                                    prevPath: history.location.pathname,
                                },
                            }}
                        >
                            <button className="btn-yes w-100">
                                {t("subscription.btn.now")}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionModalPopup;
