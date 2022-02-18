import React from "react";
import ContentLoader from "react-content-loader";

const FeaturedLoader = (props) => (
    <div className="col-12 col-md-10 col-lg-8 col-xl-7 mx-auto mb-4">
        <ContentLoader
            style={{ width: "100%", minHeight: "70vh", height:"70vh" }}
            speed={2}
            backgroundColor="#d4d4d4"
            foregroundColor="#ecebeb"
            opacity="0.7"
            {...props}
        >
            <rect x="0" y="0" rx="17" ry="17" width="100%" height="100%" />
            {/* <rect x="0" y="88%" rx="17" ry="17" width="100%" height="10.5%" /> */}
        </ContentLoader>
    </div>
);

export default FeaturedLoader;
