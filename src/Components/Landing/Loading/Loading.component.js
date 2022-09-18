import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function Loading() {
    const { t } = useTranslation();
    const { loginStatus } = useSelector((state) => state.userData);

    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    return (
        <div className="loading-modal d-flex flex-column align-items-center justify-content-center">
            <img
                width={300}
                src={`${window.cdn}logo/logo_gamebox.png`}
                alt="logo"
            />

            {loginStatus.loading && !loginStatus.ready && (
                <p className="loading-text">{t("loading.loading_user")}</p>
            )}
            {loginStatus.ready && (
                <p className="redirect-text">{t("loading.loaded_user")}</p>
            )}
        </div>
    );
}

export default Loading;
