import React from "react";
import ContentLoader from "react-content-loader";

const PremiumLoader = (props) => (
    <ContentLoader
        speed={2}
        width={447}
        height={460}
        viewBox="0 0 447 460"
        backgroundColor="#d4d4d4"
        foregroundColor="#ecebeb"
        opacity="0.7"
        {...props}
    >
        <rect x="0" y="0" rx="17" ry="17" width="447" height="340" />
        <rect x="0" y="345" rx="17" ry="17" width="447" height="110" />
    </ContentLoader>
);

export default PremiumLoader;
