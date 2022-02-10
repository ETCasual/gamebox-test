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

const Index = () => {
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

    const query = new URLSearchParams(useLocation().search);
    const history = useHistory();

    const { ipInfo } = useSelector((state) => state.exchangeRate);

    const [isCardPaymentShown, setIsCardPaymentShown] = useState(false);
    const [isFPXPaymentShown, setIsFPXPaymentShown] = useState(false);
    const [isGrabPaymentShown, setIsGrabPaymentShown] = useState(false);
    const [isPaymentMethodShown, setIsPaymentMethodShown] = useState(false);
    const [productInfo, setProductInfo] = useState({});

    // PAYMENT
    const handleGemsPaymentPanel = (id, price, type, quantity) => {
        setIsPaymentMethodShown(true);
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
    const handlePaymentBackButton = (type, status, productInfo) => {
        setIsCardPaymentShown(false);
        setIsFPXPaymentShown(false);
        setIsGrabPaymentShown(false);
        if (status && type === "gems")
            history.push({
                pathname: "/iap",
                search: `?return_card=true&qty=${productInfo}&type=${type}`,
            });
        else if (status && type === "subscription")
            history.push({
                pathname: "/iap",
                search: `?return_card=true&type=${type}&title=${productInfo}`,
            });
    };
    const handlePaymentMethodBackButton = () => setIsPaymentMethodShown(false);

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
                {isPaymentMethodShown && (
                    <div className="payment-methods">
                        <div className="wrapper d-flex flex-column align-items-start justify-content-start position-relative">
                            <p className="mb-4">Please select payment method</p>
                            <div className="btn-wrapper w-100">
                                {/* FPX BUTTON */}
                                {/* {ipInfo?.country_name === "Malaysia" && (
                                    <button
                                        className="d-flex align-items-center justify-content-center"
                                        onClick={() =>
                                            handleSelectPaymentMethod("fpx")
                                        }
                                    >
                                        <img
                                            src={`${window.cdn}art_assets/payment/paymentmethods-01_FPX.png`}
                                            alt="fpx"
                                        />
                                    </button>
                                )} */}
                                {/* CARD BUTTON */}
                                <button
                                    className="d-flex align-items-center justify-content-center"
                                    onClick={() =>
                                        handleSelectPaymentMethod("card")
                                    }
                                >
                                    <img
                                        width="56"
                                        src={`${window.cdn}art_assets/payment/paymentmethods-04_Visa.png`}
                                        alt="visa"
                                    />
                                    <img
                                        width="56"
                                        src={`${window.cdn}art_assets/payment/paymentmethods-03_MasterCard.png`}
                                        alt="mastercard"
                                    />
                                    <img
                                        width="48"
                                        src={`${window.cdn}art_assets/payment/paymentmethods-02._AmericanExpress.png`}
                                        alt="american_express"
                                    />
                                </button>
                                {/* GRABPAY BUTTON */}
                                {(ipInfo?.country_name === "Malaysia" ||
                                    ipInfo?.country_name === "Singapore") && (
                                    <button
                                        className="d-flex align-items-center justify-content-center"
                                        onClick={() =>
                                            handleSelectPaymentMethod("grabpay")
                                        }
                                    >
                                        <img
                                            className="grabpay"
                                            src={`${window.cdn}art_assets/payment/paymentmethods-06_GrabPay-2.png`}
                                            alt="grabpay"
                                        />
                                    </button>
                                )}
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
