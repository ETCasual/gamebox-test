// REACT, REDUX & 3RD PARTY LIBRARY
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useStripe } from "@stripe/react-stripe-js";

// COMPONENTS
import PaymentProcessLoader from "Components/Loader/PaymentProcess.loader";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadIAPurchaseRequest from "redux/thunks/IAPurchaseRequest.thunk";
import loadUserDetails from "redux/thunks/UserDetails.thunk";

const FpxPaymentReturn = () => {
    const { user } = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    const [success, setSuccess] = useState(false);

    const stripe = useStripe();

    const query = new URLSearchParams(useLocation().search);
    const clientSecret = query.get("payment_intent_client_secret");
    const productInfo = query.get("product_info");
    const quantity = query.get("qty");

    useEffect(() => {
        let timerOut;
        if (!stripe) return;

        const fetchPaymentIntent = async () => {
            const { error, paymentIntent } = await stripe.retrievePaymentIntent(
                clientSecret
            );
            if (error) {
                console.log(error.message);
                return;
            }

            setSuccess(true);
            dispatch(
                loadIAPurchaseRequest(
                    paymentIntent.client_secret,
                    paymentIntent.id,
                    201,
                    productInfo,
                    paymentIntent.amount / 100
                )
            );
            setTimeout(() => {
                dispatch(loadUserDetails());
            }, 1000);
        };

        if (user.id > 0) fetchPaymentIntent();

        return () => clearTimeout(timerOut);
    }, [clientSecret, productInfo, stripe, dispatch, user.id]);

    return (
        <div className="payment-success">
            {user.id <= 0 && (
                <div className="wrapper d-flex flex-column align-items-center justify-content-center position-relative">
                    <p className="subtitle mb-4">Processing your payment</p>
                    <PaymentProcessLoader />
                </div>
            )}
            {user.id > 0 && success && (
                <div className="wrapper d-flex flex-column align-items-center justify-content-center position-relative">
                    <p className="title">Payment completed!</p>
                    <p className="subtitle">
                        You have successfully topped up {quantity} gems.
                    </p>
                    <Link to="/iap" className="btn-continue">
                        <button>Continue</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default FpxPaymentReturn;
