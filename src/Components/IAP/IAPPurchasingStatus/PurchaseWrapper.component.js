import React from "react";

const PurchaseWrapper = ({ children }) => {
    return (
        <div className="payment-methods">
            <div className="wrapper p-3 d-flex flex-column align-items-start justify-content-center position-relative">
                {/* CONTENT */}
                {children}
            </div>
        </div>
    );
};

export default PurchaseWrapper;
