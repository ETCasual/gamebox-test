import React from "react";
import ContentLoader from "react-content-loader";

const PaymentProcessLoader = () => {
    return (
        <ContentLoader
            style={{ width: "100%" }}
            height={50}
            backgroundColor="transparent"
            foregroundColor="#df23f9"
        >
            <circle cx="40%" cy="15" r="5" />
            <circle cx="47%" cy="15" r="5" />
            <circle cx="54%" cy="15" r="5" />
            <circle cx="61%" cy="15" r="5" />
        </ContentLoader>
    );
};

export default PaymentProcessLoader;
