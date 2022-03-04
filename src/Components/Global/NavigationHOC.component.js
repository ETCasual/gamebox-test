import React from "react";
import { withRouter } from "react-router-dom";
import Navigation from "Components/Global/Navigation.component";
import { useSelector } from "react-redux";

const NavigationHOC = withRouter(({ location }) => {
    const { user } = useSelector((state) => state.userData);

    const token = localStorage.getItem("froyo-authenticationtoken");
    return (
        <>
            {token !== null &&
            user.id &&
            (location.pathname === "/" ||
                location.pathname === "/activity" ||
                location.pathname === "/winners" ||
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
