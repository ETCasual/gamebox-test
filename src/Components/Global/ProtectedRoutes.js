import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Landing from "Pages/Landing.page";
import Password from "Pages/Password.page";

import { loadLoginStatus } from "redux/thunks/Login.thunk";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user, loginStatus } = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    useEffect(() => {
        const token =
            localStorage
                .getItem("froyo-authenticationtoken")
                ?.replaceAll('"', "") || null;

        dispatch(
            loadLoginStatus({
                noAuth: token === null && user.id === null ? true : false,
                loading: token !== null && user.id === null ? true : false,
                ready: token !== null && user.id > 0 ? true : false,
            })
        );
    }, [user.id, dispatch]);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (loginStatus.ready) {
                    return <Component {...props} {...rest} />;
                } else if (loginStatus.noAuth || loginStatus.loading) {
                    if (process.env.REACT_APP_NODE_ENV === "production")
                        return <Landing />;
                    else return <Password />;
                }
            }}
        />
    );
};

export default ProtectedRoute;
