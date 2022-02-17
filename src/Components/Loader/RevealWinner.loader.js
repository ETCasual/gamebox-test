import React from "react";
import ContentLoader from "react-content-loader";

const RevealWinnerLoader = ({ cx1, cx2, cx3, cx4 }) => (
    <ContentLoader
        style={{ width: "100%", height: "5vh" }}
        speed={1.5}
        backgroundColor="transparent"
        foregroundColor="#8E21EC"
    >
        <circle cx={cx1} cy={20} r="5" />
        <circle cx={cx2} cy={20} r="5" />
        <circle cx={cx3} cy={20} r="5" />
        <circle cx={cx4} cy={20} r="5" />
    </ContentLoader>
);
export default RevealWinnerLoader;
