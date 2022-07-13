import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GenericLoader from "Components/Loader/Generic.loader";

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

    const content = {
        noWallet: {
            title: "Wallet not connected.",
            subTitle: "Please connect your wallet to continue.",
            button: "CONNECT WALLET",
        },
        insufficentToken: {
            title: "Insufficient Froyo Tokens.",
            subTitle: "Please purchase Froyo Tokens to continue.",
            button: "PURCHASE FROYO TOKENS",
            color: "red",
        },
        beforePurchaseConfirmation: {
            title: `Purchase ${productInfo?.quantity} gems with ${productInfo?.price} froyo tokens`,
            subTitle:
                "Froyo Tokens will be deducted from your wallet " +
                user.walletAddress?.substring(0, 5) +
                "..." +
                user.walletAddress?.substring(user.walletAddress.length - 4) +
                ".",
            button: `USE ${productInfo?.price} FROYO TOKENS`,
        },
        processing: {
            title: "",
            subTitle: "Processing your purchase",
        },
        isSuccess: {
            title: "Purchase successful.",
            subTitle: `You have successfully purchased ${productInfo?.quantity} gems.`,
            button: "CONTINUE",
        },
        isFail: {
            title: "Purchase unsuccessful.",
            subTitle: "Something went wrong. Please try again later.",
            button: "CLOSE",
            color: "red",
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
