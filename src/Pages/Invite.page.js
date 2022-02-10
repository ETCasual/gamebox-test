import React from "react";
import { Redirect, Route, useParams } from "react-router-dom";

const Invite = () => {
    let { id } = useParams();
    if (id) localStorage.setItem("inviteCode", id);

    return (
        <Route>
            <Redirect to={`/`} />
        </Route>
    );
};

export default Invite;
