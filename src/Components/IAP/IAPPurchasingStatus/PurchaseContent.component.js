import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GenericLoader from "Components/Loader/Generic.loader";
import { useTranslation } from "react-i18next";

const PurchaseContent = ({
    type,
    productInfo,
    purchasingStatus,
    handleModalCloseButton,
    handleConfirmAction,
}) => {
    const { user } = useSelector((state) => state.userData);
    const [currentStatus, setCurrentStatus] = useState(null);

    useEffect(() => {
        const value = Object.values(purchasingStatus).find((e) => e === true);
        const key = Object.keys(purchasingStatus).filter((key) => {
            return purchasingStatus[key] === value;
        })[0];
        setCurrentStatus(key);
    }, [purchasingStatus]);

    const { t } = useTranslation();

    const content = {
        noWallet: {
            title: t("purchaseContentWallet.noWallet.title"),
            subTitle: t("purchaseContentWallet.noWallet.subTitle"),
            button: t("purchaseContentWallet.noWallet.button"),
        },
        insufficentToken: {
            title: t("purchaseContentWallet.insufficentToken.title"),
            subTitle: t("purchaseContentWallet.insufficentToken.subTitle"),
            button: t("purchaseContentWallet.insufficentToken.button"),
            color: t("purchaseContentWallet.insufficentToken.color"),
        },
        beforePurchaseConfirmation: {
            title: t("purchaseContentWallet.beforePurchaseConfirmation.title", {
                quantity: productInfo?.quantity,
                price: productInfo?.price,
            }),
            subTitle: t(
                "purchaseContentWallet.beforePurchaseConfirmation.subTitle",
                {
                    first: user.walletAddress?.substring(0, 5),
                    last: user.walletAddress?.substring(
                        user.walletAddress.length - 4
                    ),
                }
            ),
            button: t(
                "purchaseContentWallet.beforePurchaseConfirmation.button",
                {
                    price: productInfo?.price,
                }
            ),
        },
        processing: {
            title: t("purchaseContentWallet.processing.title"),
            subTitle: t("purchaseContentWallet.processing.subTitle"),
        },
        isSuccess: {
            title: t("purchaseContentWallet.isSuccess.title"),
            subTitle: t("purchaseContentWallet.isSuccess.subTitle", {
                quantity: productInfo?.quantity,
            }),
            button: t("purchaseContentWallet.isSuccess.button"),
        },
        isFail: {
            title: t("purchaseContentWallet.isFail.title"),
            subTitle: t("purchaseContentWallet.isFail.subTitle"),
            button: t("purchaseContentWallet.isFail.button"),
            color: t("purchaseContentWallet.isFail.color"),
        },
        processFail: {
            title: t("purchaseContentWallet.processFail.title"),
            subTitle: t("purchaseContentWallet.processFail.subTitle"),
            button: t("purchaseContentWallet.processFail.button"),
            color: t("purchaseContentWallet.processFail.color"),
        },
    };

    return (
        <>
            {purchasingStatus[currentStatus] && (
                <>
                    <p className="title mb-3">
                        {content[currentStatus]?.title}
                    </p>
                    <p
                        className={`subtitle mb-4 ${
                            purchasingStatus.processing
                                ? "text-center w-100"
                                : "text-left"
                        }`}
                    >
                        {content[currentStatus]?.subTitle}
                    </p>
                    {/* GENERIC LOADER */}
                    {purchasingStatus.processing && (
                        <GenericLoader
                            height="30"
                            bg="#FF007C"
                            cx1="43%"
                            cx2="50%"
                            cx3="57%"
                            cy="15"
                        />
                    )}
                    {!purchasingStatus.processing && (
                        <div className="btn-wrapper w-100 d-flex align-items-center justify-content-between mt-3">
                            {type === "froyo" &&
                                (purchasingStatus.beforePurchaseConfirmation ||
                                    purchasingStatus.insufficentToken ||
                                    purchasingStatus.noWallet) && (
                                    <button
                                        className="cancel-button"
                                        onClick={handleModalCloseButton}
                                    >
                                        CANCEL
                                    </button>
                                )}
                            <button
                                style={{
                                    backgroundColor:
                                        purchasingStatus?.isFail ||
                                        purchasingStatus?.insufficentToken
                                            ? "#c40000"
                                            : "#ff3399",
                                }}
                                className="confirm-button"
                                onClick={handleConfirmAction}
                            >
                                {content[currentStatus]?.button}
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default PurchaseContent;
