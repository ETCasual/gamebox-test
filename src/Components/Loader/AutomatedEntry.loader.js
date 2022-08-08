import React from "react";
import ContentLoader from "react-content-loader";

const AutomatedEntryLoader = (props) => (
    <ContentLoader
        style={{ width: "100%", height: "12.5rem" }}
        speed={2}
        backgroundColor="#d4d4d4"
        foregroundColor="#ecebeb"
        opacity="0.7"
        {...props}
    >
        <rect x="0" y="0" rx="10" ry="10" width="100%" height="12.5rem" />
    </ContentLoader>
);

export default AutomatedEntryLoader;
