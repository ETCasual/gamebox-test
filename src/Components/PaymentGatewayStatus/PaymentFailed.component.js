import React from "react";

const PaymentFailed = ({ setPaymentFailedModal }) => {
    return (
        <div className="payment-failed">
            <div className="wrapper d-flex flex-column align-items-center justify-content-center position-relative">
                <p className="title">Payment unsuccessful!</p>
                <p className="subtitle">
                    Uh oh. Something went wrong. Please try again later.
                </p>
                <button
                    className="btn-close"
                    onClick={() => setPaymentFailedModal(false)}
                >
                    CLOSE
                </button>
            </div>
        </div>
    );
};

export default PaymentFailed;
