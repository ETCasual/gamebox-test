import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import IAPItems from "Components/IAP/IAPItems/IAPItems.component";
import CardPayment from "Components/PaymentGateway/CardPayment.component";
import FpxPayment from "Components/PaymentGateway/FpxPayment.component";
import GrabPayment from "Components/PaymentGateway/GrabPayment.component";
import FpxPaymentReturn from "Components/PaymentGatewayStatus/FpxPaymentReturn.component";
import GrabPaymentReturn from "Components/PaymentGatewayStatus/GrabPaymentReturn.component";
import CardPaymentReturn from "Components/PaymentGatewayStatus/CardPaymentReturn.component";
import GenericLoader from "Components/Loader/Generic.loader";

const Index = () => {
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

    const query = new URLSearchParams(useLocation().search);
    const history = useHistory();

    const { ipInfo } = useSelector((state) => state.exchangeRate);
    const { user } = useSelector((state) => state.userData);

    const [isCardPaymentShown, setIsCardPaymentShown] = useState(false);
    const [isFPXPaymentShown, setIsFPXPaymentShown] = useState(false);
    const [isGrabPaymentShown, setIsGrabPaymentShown] = useState(false);
    const [isPaymentMethodShown, setIsPaymentMethodShown] = useState(false);
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
    const [tokenPurchaseText, setTokenPurchaseText] = useState({
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
    const handleGemsPaymentPanel = (id, price, type, quantity) => {
        // setIsPaymentMethodShown(true);

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
            type,
            price,
            id,
            quantity,
        });
    };
    const handleSubscriptionPaymentPanel = (id, details, type) => {
        setIsCardPaymentShown(true);
        setProductInfo({
            type,
            details,
            id,
        });
    };
    // PAYMENT METHOD
    const handleSelectPaymentMethod = (paymentType) => {
        if (paymentType === "card") {
            setIsFPXPaymentShown(false);
            setIsGrabPaymentShown(false);
            setIsCardPaymentShown(true);
        } else if (paymentType === "fpx") {
            setIsCardPaymentShown(false);
            setIsGrabPaymentShown(false);
            setIsFPXPaymentShown(true);
        } else if (paymentType === "grabpay") {
            setIsCardPaymentShown(false);
            setIsFPXPaymentShown(false);
            setIsGrabPaymentShown(true);
        }

        if (
            (productInfo?.type === "gems" && productInfo?.price > 0) ||
            (productInfo?.type === "subscription" &&
                productInfo?.details?.price > 0)
        )
            setIsPaymentMethodShown(false);
    };

    // BACK BUTTON
    const handlePaymentBackButton = (type, panel1, productInfo) => {
        setIsCardPaymentShown(false);
        setIsFPXPaymentShown(false);
        setIsGrabPaymentShown(false);
        if (panel1 && type === "gems")
            history.push({
                pathname: "/iap",
                search: `?return_card=true&qty=${productInfo}&type=${type}`,
            });
        else if (panel1 && type === "subscription")
            history.push({
                pathname: "/iap",
                search: `?return_card=true&type=${type}&title=${productInfo}`,
            });
    };
    const handlePaymentMethodBackButton = () =>
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
            handlePaymentMethodBackButton();
        } else if (tokenPaymentProcess.haveGems) {
            handlePaymentMethodBackButton();
            setTokenPaymentProcess((prev) => ({
                ...prev,
                isProcess: true,
                panel2: true,
            }));
            startProcessDelay();
        } else if (tokenPaymentProcess.insufficent) {
            handlePaymentMethodBackButton();
            startProcessDelay();
        } else if (tokenPaymentProcess.isSuccess) {
            handlePaymentMethodBackButton();
            user.gems+=productInfo.quantity;
        } else if (!tokenPaymentProcess.isSuccess) {
            handlePaymentMethodBackButton();
        }
    };
    const startProcessDelay = () => {
        setTimeout(function () {
            if (tokenPaymentProcess.haveGems) {
                handlePaymentMethodBackButton();
                setTokenPaymentProcess((prev) => ({
                    ...prev,
                    isSuccess: false,
                    // isSuccess: false,
                    panel2: true,
                }));
            } else if (tokenPaymentProcess.insufficent) {
                handlePaymentMethodBackButton();
            }
        }, 1000);
    };
    // CARD PAYMENTS
    if (isCardPaymentShown) {
        return (
            <Elements stripe={stripePromise}>
                <CardPayment
                    productInfo={productInfo}
                    handleBackButton={handlePaymentBackButton}
                />
            </Elements>
        );
    }
    // FPX PAYMENTS
    else if (isFPXPaymentShown) {
        return (
            <Elements stripe={stripePromise}>
                <FpxPayment
                    productInfo={productInfo}
                    handleBackButton={handlePaymentBackButton}
                />
            </Elements>
        );
    }
    // GRAB PAYMENTS
    else if (isGrabPaymentShown) {
        return (
            <Elements stripe={stripePromise}>
                <GrabPayment
                    productInfo={productInfo}
                    handleBackButton={handlePaymentBackButton}
                />
            </Elements>
        );
    }

    // IAP
    else {
        return (
            <>
                {/* SUBSCRIPTION & GEMS */}
                <IAPItems
                    handleGemsPaymentPanel={handleGemsPaymentPanel}
                    handleSubscriptionPaymentPanel={
                        handleSubscriptionPaymentPanel
                    }
                />
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
                                            tokenPurchaseText.insufficent
                                                .button}
                                        {tokenPaymentProcess.noWallet &&
                                            tokenPurchaseText.noWallet.button}
                                    </button>
                                </div>

                                {/* FPX BUTTON */}
                                {/* {ipInfo?.country_name === "Malaysia" && (
                                    <button
                                        className="d-flex align-items-center justify-content-center"
                                        onClick={() =>
                                            handleSelectPaymentMethod("fpx")
                                        }
                                    >
                                        <img
                                            src={`${window.cdn}payment/paymentmethods-01_FPX.png`}
                                            alt="fpx"
                                        />
                                    </button>
                                )} */}
                                {/* CARD BUTTON */}
                                {/* <button
                                    className="d-flex align-items-center justify-content-center"
                                    onClick={() =>
                                        handleSelectPaymentMethod("card")
                                    }
                                >
                                    <img
                                        width="56"
                                        src={`${window.cdn}payment/paymentmethods-04_Visa.png`}
                                        alt="visa"
                                    />
                                    <img
                                        width="56"
                                        src={`${window.cdn}payment/paymentmethods-03_MasterCard.png`}
                                        alt="mastercard"
                                    />
                                    <img
                                        width="48"
                                        src={`${window.cdn}payment/paymentmethods-02._AmericanExpress.png`}
                                        alt="american_express"
                                    />
                                </button> */}
                                {/* GRABPAY BUTTON */}
                                {/* {(ipInfo?.country_name === "Malaysia" ||
                                    ipInfo?.country_name === "Singapore") && (
                                    <button
                                        className="d-flex align-items-center justify-content-center"
                                        onClick={() =>
                                            handleSelectPaymentMethod("grabpay")
                                        }
                                    >
                                        <img
                                            className="grabpay"
                                            src={`${window.cdn}payment/paymentmethods-06_GrabPay-2.png`}
                                            alt="grabpay"
                                        />
                                    </button>
                                )} */}
                            </div>
                            {/* CLOSE BUTTON */}
                            <div
                                className="close-button"
                                onClick={handlePaymentMethodBackButton}
                            >
                                <svg
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 512.001 512.001"
                                >
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
                                            onClick={() =>
                                                handleConfirmAction()
                                            }
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
                                                {
                                                    tokenPurchaseText.isFail
                                                        .button
                                                }
                                            </button>
                                        </div>
                                    )}
                                {/* LOADER */}
                                {tokenPaymentProcess.isProcess && (
                                    <GenericLoader
                                        height="30"
                                        bg="#FF007C"
                                        cx1={
                                            window.innerWidth > 1200
                                                ? "38%"
                                                : "36%"
                                        }
                                        cx2="50%"
                                        cx3={
                                            window.innerWidth > 1200
                                                ? "62%"
                                                : "64%"
                                        }
                                        cy="15"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {/* CARD SUCCESS */}
                {!isCardPaymentShown && query.get("return_card") && (
                    <CardPaymentReturn />
                )}
                {/* FPX SUCCESS */}
                {!isFPXPaymentShown && query.get("return_fpx") && (
                    <Elements stripe={stripePromise}>
                        <FpxPaymentReturn
                            productInfo={productInfo}
                            handleBackButton={handlePaymentBackButton}
                        />
                    </Elements>
                )}
                {/* GRABPAY SUCCESS */}
                {!isGrabPaymentShown && query.get("return_grabpay") && (
                    <Elements stripe={stripePromise}>
                        <GrabPaymentReturn
                            productInfo={productInfo}
                            handleBackButton={handlePaymentBackButton}
                        />
                    </Elements>
                )}
            </>
        );
    }
};

export default Index;
