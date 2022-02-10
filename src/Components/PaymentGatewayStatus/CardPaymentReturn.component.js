// REACT & REDUX
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// COMPONENT
import PaymentProcessLoader from "Components/Loader/PaymentProcess.loader";

const CardPaymentReturn = () => {
    const query = new URLSearchParams(useLocation().search);

    const { user } = useSelector((state) => state.userData);

    const type = query.get("type");
    const qty = query.get("qty");
    const title = query.get("title");

    return (
        <div className="payment-success">
            {user.id <= 0 && (
                <div className="wrapper d-flex flex-column align-items-center justify-content-center position-relative">
                    <p className="subtitle mb-4">Processing your payment</p>
                    <PaymentProcessLoader />
                </div>
            )}
            {user.id > 0 && (
                <div className="wrapper d-flex flex-column align-items-center justify-content-center position-relative">
                    <p className="title">Payment completed!</p>
                    <p className="subtitle">
                        {type === "gems" &&
                            `You have successfully topped up ${qty} gems.`}
                        {type === "subscription" &&
                            `You have successfully subscribed to ${title} package.`}
                    </p>
                    <Link to="/iap" className="btn-continue">
                        <button>Continue</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CardPaymentReturn;
