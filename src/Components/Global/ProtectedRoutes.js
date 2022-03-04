import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Landing from "Pages/Landing.page";
import Password from "Pages/Password.page";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useSelector((state) => state.userData);

    const [signingInUser, setSigningInUser] = useState({
        loading: false,
        ready: false,
        noAuth: false,
    });

    useEffect(() => {
        let timeOut = null;
        const token = localStorage.getItem("froyo-authenticationtoken")?.replaceAll('"', '') || null;
        const items =
            JSON.parse(localStorage.getItem("prizeDetailList")) || null;

        if (token !== null && user.id < 0)
            setSigningInUser((prev) => ({ ...prev, loading: true }));
        else if (token !== null && user.id )
            setSigningInUser((prev) => ({ ...prev, ready: true }));
        else {
            clearTimeout(timeOut);
            timeOut = setTimeout(
                () => {
                    setSigningInUser((prev) => ({
                        ...prev,
                        loading: false,
                        ready: false,
                        noAuth: true,
                    }));
                },
                items !== null ? 3000 : 100
            );
        }

        return () => clearTimeout(timeOut);
    }, [user.id]);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (signingInUser.ready) {
                    return <Component {...props} {...rest} />;
                } else if (signingInUser.noAuth) {
                    if (process.env.REACT_APP_NODE_ENV === "production")
                        return <Landing />;
                    else return <Password />;
                }
            }}
        />
    );
};

export default ProtectedRoute;
