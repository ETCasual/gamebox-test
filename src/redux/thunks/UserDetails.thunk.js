import refreshToken from "Utils/RefreshToken";
import { getUserDetails } from "redux/services/index.service";
import { USER_DETAILS } from 'redux/types';

export default function loadUserDetails() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        const token = await refreshToken();
        if (token) {
            return getUserDetails(user)
                .then((data) =>
                    dispatch({
                        type: USER_DETAILS,
                        payload: data,
                    })
                )
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("USER DETAILS THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
