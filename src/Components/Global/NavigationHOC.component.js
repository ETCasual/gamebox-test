import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import Navigation from "Components/Global/Navigation.component";

import getToken from "Utils/GetToken";

const NavigationHOC = withRouter(({ location }) => {
    const { user } = useSelector((state) => state.userData);

    const token = getToken();
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
