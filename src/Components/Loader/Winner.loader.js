import React from "react";
import ContentLoader from "react-content-loader";

const WinnerLoader = (props) => (
    <ContentLoader
        className="col-12 mb-4 mb-md-3 px-md-2"
        style={{ height: "10vh" }}
        speed={2}
        height={360}
        backgroundColor="#d4d4d4"
        foregroundColor="#ecebeb"
        opacity="0.7"
        {...props}
    >
        <rect x="0" y="0" rx="17" ry="17" width="100%" height="100%" />
    </ContentLoader>
);

export default WinnerLoader;
