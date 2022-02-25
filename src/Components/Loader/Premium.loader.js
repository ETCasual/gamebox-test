import React from "react";
import ContentLoader from "react-content-loader";

const PremiumLoader = (props) => (
    <ContentLoader
        className="col-12 col-md-6 col-lg-6 col-xl-4 mb-4"
        style={{
            minHeight: "clamp(10rem, 30vh, 20rem)",
        }}
        speed={2}
        width="100%"
        height="100%"
        viewBox="0 0 447 460"
        backgroundColor="#d4d4d4"
        foregroundColor="#ecebeb"
        opacity="0.7"
        {...props}
    >
        <rect x="0" y="0" rx="17" ry="17" width="100%" height="100%" />
    </ContentLoader>
);

export default PremiumLoader;
