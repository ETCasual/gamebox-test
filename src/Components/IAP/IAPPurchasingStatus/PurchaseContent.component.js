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
            title: t("purchase_content_wallet.noWallet.title"),
            subtitle: t("purchase_content_wallet.noWallet.subtitle"),
            button: t("purchase_content_wallet.noWallet.button"),
        },
        insufficent_token: {
            title: t("purchase_content_wallet.insufficent_token.title"),
            subtitle: t("purchase_content_wallet.insufficent_token.subtitle"),
            button: t("purchase_content_wallet.insufficent_token.button"),
            color: t("purchase_content_wallet.insufficent_token.color"),
        },
        before_purchase_confirmation: {
            title: t(
                "purchase_content_wallet.before_purchase_confirmation.title",
                {
                    quantity: productInfo?.quantity,
                    price: productInfo?.price,
                }
            ),
            subtitle: t(
                "purchase_content_wallet.before_purchase_confirmation.subtitle",
                {
                    first: user.walletAddress?.substring(0, 5),
                    last: user.walletAddress?.substring(
                        user.walletAddress.length - 4
                    ),
                }
            ),
            button: t(
                "purchase_content_wallet.before_purchase_confirmation.button",
                {
                    price: productInfo?.price,
                }
            ),
        },
        processing: {
            title: t("purchase_content_wallet.processing.title"),
            subtitle: t("purchase_content_wallet.processing.subtitle"),
        },
        is_success: {
            title: t("purchase_content_wallet.is_success.title"),
            subtitle: t("purchase_content_wallet.is_success.subtitle", {
                quantity: productInfo?.quantity,
            }),
            button: t("purchase_content_wallet.is_success.button"),
        },
        is_fail: {
            title: t("purchase_content_wallet.is_fail.title"),
            subtitle: t("purchase_content_wallet.is_fail.subtitle"),
            button: t("purchase_content_wallet.is_fail.button"),
            color: t("purchase_content_wallet.is_fail.color"),
        },
        process_fail: {
            title: t("purchase_content_wallet.process_fail.title"),
            subtitle: t("purchase_content_wallet.process_fail.subtitle"),
            button: t("purchase_content_wallet.process_fail.button"),
            color: t("purchase_content_wallet.process_fail.color"),
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
                        {content[currentStatus]?.subtitle}
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
                                (purchasingStatus.before_purchase_confirmation ||
                                    purchasingStatus.insufficent_token ||
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
                                        purchasingStatus?.is_fail ||
                                        purchasingStatus?.insufficent_token
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
