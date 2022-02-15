import React, { useState } from "react";
import { useSelector } from "react-redux";

import IAPItems from "Components/IAP/IAPItems/IAPItems.component";
import GenericLoader from "Components/Loader/Generic.loader";

const Index = () => {
    const { user } = useSelector((state) => state.userData);

    const [productInfo, setProductInfo] = useState({});

    // SIMULATION STATES
    const [tokenPaymentProcess, setTokenPaymentProcess] = useState({
        insufficent: false,
        haveGems: false,
        noWallet: true,
        isProcess: false,
        isSuccess: false,
        panel1: false,
        panel2: false,
    });
    const [tokenPurchaseText] = useState({
        insufficent: {
            title: "Insufficient Froyo Tokens.",
            subTitle: "Please purchase Froyo Tokens to continue.",
            button: "Purchase Froyo Tokens",
        },
        haveGems: {
            subTitle:
                "Froyo Tokens will be deducted from your wallet ending …04O4.",
        },
        noWallet: {
            title: "Wallet not connected.",
            subTitle: "Please connect your wallet to continue.",
            button: "Connect wallet",
        },
        isSuccess: {
            title: "Purchase successful.",
            subTitle: "You have successfully purchased 100 gems.",
            button: "Continue",
        },
        isFail: {
            title: "Purchase unsuccessful.",
            subTitle: "Something went wrong. Please try again later.",
            button: "Close",
        },
        isProcess: {
            title: "",
            subTitle: "Processing your purchase",
        },
    });

    // PAYMENT
    const handleGemsPaymentPanel = (id, price, quantity) => {
        if (tokenPaymentProcess.noWallet) {
            setTokenPaymentProcess((prev) => ({
                ...prev,
                noWallet: true,
                panel1: true,
            }));
        } else if (user.gems > 0) {
            setTokenPaymentProcess((prev) => ({
                ...prev,
                haveGems: true,
                panel1: true,
            }));
        } else {
            setTokenPaymentProcess((prev) => ({
                ...prev,
                insufficent: true,
                panel1: true,
            }));
        }
        setProductInfo({
            id,
            price,
            quantity,
        });
    };
    const handleModalCloseButton = () =>
        setTokenPaymentProcess({
            insufficent: false,
            haveGems: false,
            noWallet: false,
            isProcess: false,
            isSuccess: false,
            panel1: false,
            panel2: false,
        });

    // PROCESS CONFIRM ACTION
    const handleConfirmAction = () => {
        if (tokenPaymentProcess.noWallet) {
            handleModalCloseButton();
        } else if (tokenPaymentProcess.haveGems) {
            handleModalCloseButton();
            setTokenPaymentProcess((prev) => ({
                ...prev,
                isProcess: true,
                panel2: true,
            }));
            startProcessDelay();
        } else if (tokenPaymentProcess.insufficent) {
            handleModalCloseButton();
            startProcessDelay();
        } else if (tokenPaymentProcess.isSuccess) {
            handleModalCloseButton();
            user.gems += productInfo.quantity;
        } else if (!tokenPaymentProcess.isSuccess) {
            handleModalCloseButton();
        }
    };
    const startProcessDelay = () => {
        setTimeout(function () {
            if (tokenPaymentProcess.haveGems) {
                handleModalCloseButton();
                setTokenPaymentProcess((prev) => ({
                    ...prev,
                    isSuccess: false,
                    // isSuccess: false,
                    panel2: true,
                }));
            } else if (tokenPaymentProcess.insufficent) {
                handleModalCloseButton();
            }
        }, 1000);
    };

    return (
        <>
            {/* SUBSCRIPTION & GEMS */}
            <IAPItems handleGemsPaymentPanel={handleGemsPaymentPanel} />

            {/* PAYMENT METHODS MODAL */}
            {tokenPaymentProcess.panel1 && (
                <div className="payment-methods">
                    <div className="wrapper d-flex flex-column align-items-start justify-content-start position-relative">
                        <div className="btn-wrapper w-100">
                            <p className="pt-2 mb-4  title pl-2">
                                {tokenPaymentProcess.haveGems &&
                                    "Purchase " +
                                        productInfo.quantity +
                                        " gems with " +
                                        productInfo.price?.toFixed(0) +
                                        " Froyo Tokens?"}
                                {tokenPaymentProcess.insufficent &&
                                    tokenPurchaseText.insufficent.title}
                                {tokenPaymentProcess.noWallet &&
                                    tokenPurchaseText.noWallet.title}
                            </p>
                            <p className="subtitle pl-2 mb-4">
                                {tokenPaymentProcess.haveGems &&
                                    tokenPurchaseText.haveGems.subTitle}
                                {tokenPaymentProcess.insufficent &&
                                    tokenPurchaseText.insufficent.subTitle}
                                {tokenPaymentProcess.noWallet &&
                                    tokenPurchaseText.noWallet.subTitle}
                            </p>
                            <div className="p-0 btn-wrapper d-flex justify-content-between mt-4">
                                <button
                                    className="col btn-no cancel-button"
                                    onClick={() =>
                                        setTokenPaymentProcess({
                                            haveGems: false,
                                            isProcess: false,
                                            insufficent: false,
                                            panel1: false,
                                        })
                                    }
                                >
                                    Cancel
                                </button>
                                <button
                                    className="col confirm-button"
                                    onClick={() => handleConfirmAction()}
                                >
                                    {tokenPaymentProcess.haveGems &&
                                        "Use " +
                                            productInfo.price?.toFixed(0) +
                                            " Froyo Tokens"}
                                    {tokenPaymentProcess.insufficent &&
                                        tokenPurchaseText.insufficent.button}
                                    {tokenPaymentProcess.noWallet &&
                                        tokenPurchaseText.noWallet.button}
                                </button>
                            </div>
                        </div>
                        {/* CLOSE BUTTON */}
                        <div
                            className="close-button"
                            onClick={handleModalCloseButton}
                        >
                            <svg x="0px" y="0px" viewBox="0 0 512.001 512.001">
                                <path
                                    fill="white"
                                    d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
                 L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
                 c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
                 l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
                 L284.286,256.002z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
            {tokenPaymentProcess.panel2 && (
                <div className="payment-result">
                    <div className="wrapper d-flex flex-column align-items-start justify-content-start position-relative">
                        <div className="btn-wrapper w-100">
                            {/* TITLE */}
                            {tokenPaymentProcess.isSuccess && (
                                <p className="pt-2 mb-4  title pl-2 success-title">
                                    {tokenPurchaseText.isSuccess.title}
                                </p>
                            )}
                            {!tokenPaymentProcess.isSuccess &&
                                !tokenPaymentProcess.isProcess && (
                                    <p className="pt-2 mb-4  fail-title pl-2 fail-title">
                                        {tokenPurchaseText.isFail.title}
                                    </p>
                                )}

                            {/* SUBTITLE */}
                            {tokenPaymentProcess.isSuccess && (
                                <p className="subtitle pl-2 mb-4">
                                    {tokenPurchaseText.isSuccess.subTitle}
                                </p>
                            )}
                            {tokenPaymentProcess.isProcess && (
                                <p className="process-subtitle">
                                    {tokenPurchaseText.isProcess.subTitle}
                                </p>
                            )}
                            {!tokenPaymentProcess.isSuccess &&
                                !tokenPaymentProcess.isProcess && (
                                    <p className="subtitle pl-2 mb-4">
                                        {tokenPurchaseText.isFail.subTitle}
                                    </p>
                                )}

                            {/* BUTTON */}
                            {tokenPaymentProcess.isSuccess && (
                                <div className="p-0 btn-wrapper d-flex justify-content-center mt-4">
                                    <button
                                        className="col confirm-button"
                                        onClick={() => handleConfirmAction()}
                                    >
                                        {tokenPurchaseText.isSuccess.button}
                                    </button>
                                </div>
                            )}
                            {!tokenPaymentProcess.isSuccess &&
                                !tokenPaymentProcess.isProcess && (
                                    <div className="p-0 btn-wrapper d-flex justify-content-center mt-4">
                                        <button
                                            className="col fail-button"
                                            onClick={() =>
                                                handleConfirmAction()
                                            }
                                        >
                                            {tokenPurchaseText.isFail.button}
                                        </button>
                                    </div>
                                )}
                            {/* LOADER */}
                            {tokenPaymentProcess.isProcess && (
                                <GenericLoader
                                    height="30"
                                    bg="#FF007C"
                                    cx1={
                                        window.innerWidth > 1200 ? "38%" : "36%"
                                    }
                                    cx2="50%"
                                    cx3={
                                        window.innerWidth > 1200 ? "62%" : "64%"
                                    }
                                    cy="15"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Index;
