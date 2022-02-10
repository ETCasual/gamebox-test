import React from "react";
import ContentLoader from "react-content-loader";

const SubscriptionButtonLoader = (props) => (
    <ContentLoader
        style={{ width: "100%" }}
        backgroundColor="transparent"
        {...props}
    >
        <circle cx={props.cx1} cy={props.cy} r="5" />
        <circle cx={props.cx2} cy={props.cy} r="5" />
        <circle cx={props.cx3} cy={props.cy} r="5" />
    </ContentLoader>
);

export default SubscriptionButtonLoader;
