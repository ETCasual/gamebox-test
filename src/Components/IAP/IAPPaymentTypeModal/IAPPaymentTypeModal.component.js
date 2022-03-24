import React from "react";

const IAPPaymentTypeModal = ({
    handleFroyoPurchasingStatus,
    handleCardPaymentModal,
}) => {
    return (
        <div className="payment-type-modal">
            <div className="payment-type-card d-flex flex-column align-items-center justify-content-center">
                <button className="mb-3" onClick={handleFroyoPurchasingStatus}>
                    Froyo Token
                </button>
                <button onClick={handleCardPaymentModal}>
                    Credit / Debit Card
                </button>
            </div>
        </div>
    );
};

export default IAPPaymentTypeModal;
