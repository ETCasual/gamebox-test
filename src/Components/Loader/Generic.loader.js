import React from "react";
import ContentLoader from "react-content-loader";

const GenericLoader = (props) => (
    <ContentLoader
        style={{ width: "100%" }}
        backgroundColor={props.bg}
        {...props}
    >
        <circle cx={props.cx1} cy={props.cy} r="5" />
        <circle cx={props.cx2} cy={props.cy} r="5" />
        <circle cx={props.cx3} cy={props.cy} r="5" />
    </ContentLoader>
);

export default GenericLoader;
