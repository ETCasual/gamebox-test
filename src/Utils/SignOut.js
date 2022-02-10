import { _firebase } from "../firebase";
import { LOG_OUT } from "redux/types";

export const handleSignOut = (dispatch) => {
    _firebase
        .auth()
        .signOut()
        .then(function () {
            dispatch({ type: LOG_OUT });
        })
        .catch(function (error) {
            console.log(error);
        });
};
