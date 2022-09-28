import React from "react";
import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";

export const MaintenanceModal = () => {
    const { t } = useTranslation();

    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);
    
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-maintenance position-relative p-4">
                <img
                    className="maintenance-img"
                    alt="img"
                    width={"50%"}
                    src="https://cdni.iconscout.com/illustration/premium/thumb/designer-designing-smart-watch-interface-4550673-3781700.png?w=420&h=0&f=png"
                />
                <div className="col-12 my-3 px-0">
                    <p className="title">
                        {t("maintenance.title").toUpperCase()}
                    </p>
                    <div className="col">
                        <p className="text-center">
                            <Trans i18nKey={"maintenance.subtitle"}>
                                <>0</>
                                <br/>
                                <>2</>
                                <a className="highlight-url" href="/gamebox">
                                    3
                                </a>
                                <>4</>
                                <br/>
                                <>6</>
                            </Trans>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
