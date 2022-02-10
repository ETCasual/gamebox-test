import React from "react";
import ContentLoader from "react-content-loader";

const WinnerLoader = (props) => {
    return (
        <ContentLoader
            className="mt-2 mt-md-5"
            style={{ width: "100%" }}
            speed={2}
            backgroundColor="#d4d4d4"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="7" y="10" rx="3" ry="3" width="100" height="7" />
            <rect x="90" y="60" rx="3" ry="3" width="100" height="7" />
            <rect x="90" y="80" rx="3" ry="3" width="70" height="7" />
            <rect x="80%" y="80" rx="3" ry="3" width="100" height="7" />
            <circle cx="40" cy="75" r="35" />
        </ContentLoader>
    );
};

export default WinnerLoader;
