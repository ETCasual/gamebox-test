// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

// COMPONENTS
import PaymentProcessing from "Components/PaymentGatewayStatus/PaymentProcessing.component";
import PaymentFailed from "Components/PaymentGatewayStatus/PaymentFailed.component";

const FpxPayment = ({ isPaymentShown, productInfo, handleBackButton }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState("");
    const [paymentProcessModal, setPaymentProcessModal] = useState(false);
    const [paymentFailedModal, setPaymentFailedModal] = useState(false);

    // GET CLIENT SECRET
    useEffect(() => {
        const getClientSecret = async () => {
            const { data } = await axios.post(
                `${process.env.REACT_APP_STRIPE_ENDPOINT}/grabpay`,
                {
                    price: Math.ceil(productInfo?.price * 100),
                }
            );
            setClientSecret(data.clientSecret);
        };

        if (productInfo?.type === "gems") getClientSecret();
    }, [productInfo.type, productInfo?.price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setPaymentProcessModal(true);
        const { error, paymentIntent } = await stripe.confirmGrabPayPayment(
            clientSecret,
            {
                payment_method: {
                    billing_details: {
                        email: event.target.email.value,
                        name: event.target.name.value,
                    },
                },
                return_url: `${window.location.origin}/iap?product_info=${productInfo?.id}&qty=${productInfo?.quantity}&return_grabpay=true`,
            }
        );

        if (error) {
            setPaymentProcessModal(false);
            setPaymentFailedModal(true);
            console.log(`Error code: ${error.code}`, error.message);
            return;
        }
        setPaymentProcessModal(false);
        console.log("Success", paymentIntent);
    };

    return (
        <>
            <div className="container-fluid" id="payment-panel">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-8">
                        <div className="row justify-content-between px-2 mt-2">
                            {/* BACK BUTTON */}
                            <button className="d-flex align-items-center justify-content-center p-0">
                                <img
                                    className="back-button"
                                    width="42"
                                    onClick={handleBackButton}
                                    src={`${window.cdn}buttons/button_back.png`}
                                    alt="back-btn"
                                />
                            </button>
                            <img
                                width={110}
                                className="img-fluid"
                                src={`${window.cdn}logo/logo_gamebox.png`}
                                alt="GameBox"
                            />
                        </div>
                        <div className="row mt-5">
                            <div className="col-12 col-lg-5 mb-4 mb-lg-0">
                                <h4 className="mb-3 mb-lg-5">
                                    Payment Summary
                                </h4>
                                <p className="total-title">Total Payment</p>
                                <div className="product p-3 d-flex align-items-center justify-content-between">
                                    <p className="product-title mb-0">
                                        {productInfo?.type === "gems"
                                            ? `${
                                                  productInfo?.quantity
                                              } ${productInfo?.type?.toUpperCase()}`
                                            : productInfo?.details?.productName}
                                    </p>
                                    <p className="product-price mb-0">
                                        {productInfo?.type === "gems"
                                            ? `SGD ${productInfo?.price?.toFixed(
                                                  2
                                              )}`
                                            : `SGD ${productInfo?.details?.price?.toFixed(
                                                  2
                                              )}`}
                                    </p>
                                </div>
                            </div>
                            <div className="col d-none d-lg-flex align-items-center justify-content-end">
                                <div className="line"></div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="payment-wrapper">
                                    <h4 className="mb-5">Payment Details</h4>
                                    <form onSubmit={handleSubmit}>
                                        {/* EMAIL */}
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                placeholder="Email"
                                                required
                                            />
                                        </div>
                                        {/* NAME */}
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Name"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={!stripe}
                                        >
                                            {`Pay SGD ${
                                                productInfo?.type === "gems"
                                                    ? productInfo?.price?.toFixed(
                                                          2
                                                      )
                                                    : productInfo?.details?.price?.toFixed(
                                                          2
                                                      )
                                            }`}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {paymentProcessModal && <PaymentProcessing />}
            {paymentFailedModal && (
                <PaymentFailed setPaymentFailedModal={setPaymentFailedModal} />
            )}
        </>
    );
};

export default FpxPayment;
