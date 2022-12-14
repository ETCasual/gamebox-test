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

// COMPONENTS
import PurchaseContent from "Components/IAP/IAPPurchasingStatus/PurchaseContent.component";
import PurchaseWrapper from "Components/IAP/IAPPurchasingStatus/PurchaseWrapper.component";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadIAPurchaseRequest from "redux/thunks/IAPurchaseRequest.thunk";
import loadUserDetails from "redux/thunks/UserDetails.thunk";
import { getPaymentIntent } from "redux/services/index.service";
import loadGemsList from "redux/thunks/GemsList.thunk";
import { SHOW_TOAST } from "redux/types";
import { useTranslation } from "react-i18next";

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
        is_success: false,
        is_fail: false,
    });

    // GET CLIENT SECRET
    useEffect(() => {
        const totalPrice = Math.ceil(productInfo?.price * 100);
        getPaymentIntent(totalPrice)
            .then((data) => setClientSecret(data))
            .catch((err) => console.log(err));
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
            is_success: false,
            is_fail: false,
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
                is_success: false,
                is_fail: true,
            });
            return;
        }

        dispatch(
            loadIAPurchaseRequest(
                paymentIntent.id,
                201,
                productInfo?.id,
                productInfo?.price,
                ""
            )
        );
        setTimeout(() => {
            dispatch(loadGemsList());
        }, 2000);
        setTimeout(() => {
            setPurchasingStatus({
                processing: false,
                is_success: true,
                is_fail: false,
            });
            dispatch(loadUserDetails());
            dispatch({
                type: SHOW_TOAST,
                payload: {
                    message: "Gems purchased!",
                },
            });
        }, 4000);
    };

    const handleModalCloseButton = () => {
        setPaymentProcessModal(false);
    };

    const { t } = useTranslation();

    return (
        <>
            <div className="container-fluid" id="payment-panel">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-9">
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
                                <span className="ml-2">{t("btn.back")}</span>
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
                                    {t("iap.payment.summary")}
                                </h4>
                                <p className="total-title">
                                    {t("iap.payment.title")}
                                </p>
                                <div className="product mb-3 p-3 d-flex align-items-center justify-content-between">
                                    <p className="product-title mb-0">
                                        {t("iap.payment.gem_count", {
                                            count:
                                                productInfo?.quantity?.toLocaleString() ||
                                                0,
                                        })}
                                    </p>
                                    <p className="product-price mb-0">
                                        {t("iap.payment.currency", {
                                            price:
                                                productInfo?.price?.toFixed(
                                                    2
                                                ) || 0,
                                        })}
                                    </p>
                                </div>
                                <p className="estimation text-right">
                                    {t("iap.payment.estimated_price")}
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
                                    <h4 className="mb-5">
                                        {t("iap.payment.details.title")}
                                    </h4>
                                    {/* PAYMENT */}
                                    <form onSubmit={handleSubmit}>
                                        {/* NAME */}
                                        <div className="form-group">
                                            <label>
                                                {t(
                                                    "iap.payment.details.card.name"
                                                )}
                                            </label>
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
                                            <label>
                                                {t("iap.payment.details.email")}
                                            </label>
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
                                            <label>
                                                {t(
                                                    "iap.payment.details.card.info"
                                                )}
                                            </label>
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
                                            {t("iap.payment.confirm", {
                                                price:
                                                    productInfo?.price?.toFixed(
                                                        2
                                                    ) || 0,
                                            })}
                                        </button>
                                    </form>
                                    <p className="mt-3 mt-lg-4 mb-2 agreement">
                                        {t("iap.payment.tnc")}
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
                        type="credit"
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
