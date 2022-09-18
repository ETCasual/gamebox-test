import React, { useEffect } from "react";
import getFroyoGamesContactUrl from "Utils/GetFroyoGamesContact";
import { useTranslation } from "react-i18next";

const BlockedUserModal = ({ setBlockedArchivedModal }) => {
    const { t } = useTranslation();

    const getAccountErrorType = () => {
        const type = sessionStorage.getItem("errorType") || null;
        if (type !== null && type === "Blocked") return "Blocked";
        else if (type !== null && type === "Archived") return "Archived";
        else if (type !== null && type === "Unusual") return "Unusual";
        else return false;
    };

    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => {
            sessionStorage.removeItem("errorType");
            document.documentElement.style.overflowY = "visible";
        };
    }, []);

    return (
        <div className="blocked-modal">
            <div className="wrapper p-4 d-flex flex-column align-items-start justify-content-start">
                {getAccountErrorType() === "Blocked" && (
                    <>
                        <h3>{t("blocked_user_modal.blocked.title")}</h3>
                        <p className="mb-3">
                            {t("blocked_user_modal.blocked.desc")}
                        </p>
                    </>
                )}
                {getAccountErrorType() === "Archived" && (
                    <>
                        <h3>{t("blocked_user_modal.archived.title")}</h3>
                        <p className="mb-3">
                            {t("blocked_user_modal.archived.desc")}
                        </p>
                    </>
                )}
                {getAccountErrorType() === "Unusual" && (
                    <>
                        <h3>{t("blocked_user_modal.unusual.title")}</h3>
                        <p className="mb-3">
                            {t("blocked_user_modal.unusual.desc")}
                        </p>
                    </>
                )}

                <p className="mb-3">
                    {t("blocked_user_modal.support")}
                    <span>
                        <a href={getFroyoGamesContactUrl()}>
                            {t("blocked_user_modal.foryo_games")}
                        </a>
                    </span>
                </p>
                <button
                    className="p-3"
                    onClick={() => setBlockedArchivedModal(false)}
                >
                    {t("blocked_user_modal.btn.close")}
                </button>
            </div>
        </div>
    );
};

export default BlockedUserModal;
