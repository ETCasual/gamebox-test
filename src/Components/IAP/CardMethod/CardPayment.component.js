// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import getToken from "Utils/GetToken";

// COMPONENTS
import PurchaseContent from "Components/IAP/IAPPurchasingStatus/PurchaseContent.component";
import PurchaseWrapper from "Components/IAP/IAPPurchasingStatus/PurchaseWrapper.component";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadIAPurchaseRequest from "redux/thunks/IAPurchaseRequest.thunk";
import loadUserDetails from "redux/thunks/UserDetails.thunk";

const CardPayment = ({ productInfo, handleBackButton }) => {
    const { ipInfo, exchangeRate } = useSelector((state) => state.exchangeRate);
    const dispatch = useDispatch();

    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [cardType, setCardType] = useState("");
    const [paymentProcessModal, setPaymentProcessModal] = useState(false);
    const [purchasingStatus, setPurchasingStatus] = useState({
        processing: false,
        isSuccess: false,
        isFail: false,
    });

    // GET CLIENT SECRET
    useEffect(() => {
        const getClientSecret = async () => {
            try {
                const { data } = await axios.post(
                    `${
                        process.env.REACT_APP_STRIPE_ENDPOINT
                    }/payments/create?total=${Math.ceil(
                        productInfo?.price * 100
                    )}`,
                    {},
                    {
                        headers: {
                            "x-auth-token": getToken(),
                        },
                    }
                );
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.log(error);
            }
        };
        getClientSecret();
    }, [productInfo?.price]);

    // PAY BUTTON
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        if (!stripe || !elements || productInfo?.price <= 0) return;

        setPaymentProcessModal(true);
        setPurchasingStatus({
            processing: true,
            isSuccess: false,
            isFail: false,
        });
        const { paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        email: email,
                        name: name,
                    },
                },
            }
        );
        if (paymentIntent?.status !== "succeeded") {
            setPurchasingStatus({
                processing: false,
                isSuccess: false,
                isFail: true,
            });
            return;
        }
        setPurchasingStatus({
            processing: false,
            isSuccess: true,
            isFail: false,
        });
        dispatch(
            loadIAPurchaseRequest(
                paymentIntent.id,
                201,
                productInfo?.id,
                productInfo?.price
            )
        );
        setTimeout(() => {
            dispatch(loadUserDetails());
        }, 1000);
    };

    const handleModalCloseButton = () => {
        setPaymentProcessModal(false);
    };

    return (
        <>
            <div className="container-fluid" id="payment-panel">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-8">
                        <div className="row justify-content-between px-2 mt-2">
                            {/* BACK BUTTON */}
                            <div
                                className="d-flex align-items-center back-button"
                                onClick={handleBackButton}
                            >
                                <img
                                    src={`${window.cdn}buttons/button_back.png`}
                                    alt="back-btn"
                                />
                                <span className="ml-2">Back</span>
                            </div>
                            <img
                                width={160}
                                className="img-fluid"
                                src={`${window.cdn}logo/logo_gamebox.png`}
                                alt="Gamebox"
                            />
                        </div>
                        <div className="row mt-5">
                            <div className="col-12 col-lg-5 mb-4 mb-lg-0">
                                <h4 className="mb-3 mb-lg-5">
                                    Payment Summary
                                </h4>
                                <p className="total-title">Total Payment</p>
                                <div className="product mb-3 p-3 d-flex align-items-center justify-content-between">
                                    <p className="product-title mb-0">
                                        {productInfo?.quantity?.toLocaleString() ||
                                            0}{" "}
                                        gems
                                    </p>
                                    <p className="product-price mb-0">
                                        SGD $
                                        {productInfo?.price?.toFixed(2) || 0}
                                    </p>
                                </div>
                                <p className="estimation text-right">
                                    Estimated Price{" "}
                                    <span>
                                        {ipInfo?.currency === "MYR"
                                            ? "RM"
                                            : ipInfo?.currency}{" "}
                                        {(
                                            exchangeRate?.rates[
                                                ipInfo?.currency
                                            ] * productInfo?.price
                                        ).toFixed(2)}
                                    </span>
                                </p>
                            </div>
                            <div className="col d-none d-lg-flex align-items-center justify-content-end">
                                <div className="line"></div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="payment-wrapper">
                                    <h4 className="mb-5">Payment Details</h4>
                                    {/* PAYMENT */}
                                    <form onSubmit={handleSubmit}>
                                        {/* NAME */}
                                        <div className="form-group">
                                            <label>Name on card</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                autoComplete="off"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                        {/* EMAIL */}
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                autoComplete="off"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                        {/* CARD DETAILS */}
                                        <div className="form-group">
                                            <label>Card Information</label>
                                            <div className="col px-0 card-number position-relative">
                                                <CardNumberElement
                                                    onChange={(e) =>
                                                        setCardType(
                                                            e.brand ===
                                                                "unknown"
                                                                ? ""
                                                                : e.brand
                                                        )
                                                    }
                                                />
                                                <div className="img-wrapper">
                                                    {(cardType === "visa" ||
                                                        cardType === "") && (
                                                        <img
                                                            width="32"
                                                            src={`${window.cdn}assets/paymentmethods_Visa.png`}
                                                            alt="visa"
                                                        />
                                                    )}
                                                    {(cardType ===
                                                        "mastercard" ||
                                                        cardType === "") && (
                                                        <img
                                                            width="32"
                                                            src={`${window.cdn}assets/paymentmethods_MasterCard.png`}
                                                            alt="mastercard"
                                                        />
                                                    )}
                                                    {(cardType === "amex" ||
                                                        cardType === "") && (
                                                        <img
                                                            width="32"
                                                            src={`${window.cdn}assets/paymentmethods_AmericanExpress.png`}
                                                            alt="american_express"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="col px-0 expiry-date">
                                                    <CardExpiryElement />
                                                </div>
                                                <div className="col px-0 ccv">
                                                    <CardCvcElement />
                                                    <img
                                                        className="img-wrapper"
                                                        width="32"
                                                        src={`${window.cdn}assets/paymentmethods_CVC.png`}
                                                        alt="cvc"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* PAY BUTTON */}
                                        <button
                                            type="submit"
                                            disabled={!stripe}
                                        >
                                            {`Pay SGD $${
                                                productInfo?.price?.toFixed(
                                                    2
                                                ) || 0
                                            }`}
                                        </button>
                                    </form>
                                    <p className="mt-3 mt-lg-4 mb-2 agreement">
                                        By clicking "pay", you are agreeing to
                                        our terms and conditions, privacy policy
                                        and tournament rules
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {paymentProcessModal && (
                <PurchaseWrapper>
                    <PurchaseContent
                        productInfo={productInfo}
                        purchasingStatus={purchasingStatus}
                        handleModalCloseButton={handleModalCloseButton}
                        handleConfirmAction={handleBackButton}
                    />
                </PurchaseWrapper>
            )}
        </>
    );
};
export default CardPayment;
