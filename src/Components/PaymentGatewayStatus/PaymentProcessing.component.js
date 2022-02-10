import React from "react";

// COMPONENT
import PaymentProcessLoader from "Components/Loader/PaymentProcess.loader";

const PaymentProcessing = () => {
    return (
        <div className="payment-process">
            <div className="wrapper d-flex flex-column align-items-center justify-content-center position-relative">
                <p className="subtitle mb-4">Processing your payment</p>
                <PaymentProcessLoader />
            </div>
        </div>
    );
};

export default PaymentProcessing;
