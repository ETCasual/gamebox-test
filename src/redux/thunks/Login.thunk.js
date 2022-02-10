import { addUser, userSignIn } from "redux/services/index.service";
import { handleSignOut } from "Utils/SignOut";
import { LOGIN_SUCCESS } from 'redux/types';

export default function loadLoginUser(authUser, isNewUser) {
    return async (dispatch) => {
        if (isNewUser)
            return addUser(authUser)
                .then((data) => {
                    if (data > 0)
                        return userSignIn(authUser)
                            .then((data) => {
                                dispatch({
                                    type: "LOGIN_SUCCESS",
                                    payload: data,
                                });
                            })
                            .catch((error) => {
                                handleSignOut(dispatch);
                                if (error.code === 7) {
                                    console.log(error.message);
                                } else if (error.code === 13)
                                    console.log(
                                        "LOGIN USER THUNK: No Result found!"
                                    );
                                else console.log(error);
                            });
                    else handleSignOut(dispatch);
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("ADD USER THUNK: No Result found!");
                    else console.log(error);
                });
        else
            return userSignIn(authUser)
                .then((data) => {
                    if (data.id > 0)
                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: data,
                        });
                    else handleSignOut(dispatch);
                })
                .catch((error) => {
                    handleSignOut(dispatch);
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 3)
                        dispatch({
                            type: "LOGIN_ERROR",
                            payload: { dispatch, errorType: error.message },
                        });
                    else if (error.code === 13)
                        console.log("LOGIN USER THUNK: No Result found!");
                    else console.log(error);
                });
    };
}
