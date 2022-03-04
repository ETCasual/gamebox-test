import React from "react";
import { withRouter } from "react-router-dom";
import Navigation from "Components/Global/Navigation.component";

const NavigationHOC = withRouter(({ location }) => {
    let token = localStorage.getItem("froyo-authenticationtoken");
    return (
        <>
            {token !== null &&
            (location.pathname === "/" ||
                location.pathname === "/activity" ||
                location.pathname === "/winners" ||
                location.pathname === "/offerwall" ||
                location.pathname === "/notifications" ||
                location.pathname === "/iap" ||
                location.pathname === "/profile") ? (
                <Navigation />
            ) : (
                ""
            )}
        </>
    );
});

export default NavigationHOC;
