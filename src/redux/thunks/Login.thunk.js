import {
    addUser,
    getUserAccountInfoFroyo,
    userSignIn,
} from "redux/services/index.service";

export default function loadLoginUser(history) {
    return async (dispatch) => {
        const user = await userSignIn();
        console.log("GameBox UserInfo request:", user);
        if (user.id) {
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: user,
            });
            history.push("/");
        } else {
            const _user = await getUserAccountInfoFroyo();
            console.log("Froyo UserInfo request:", _user);
            if (_user.id) {
                const id = await addUser(_user);
                if (id === "-1") {
                    console.log("Unable to add user / user already exists", id);
                    return;
                }
                const user = await userSignIn();
                console.log("GameBox UserInfo request:", user);
                if (user.id) history.push("/");
                return;
            }
        }
        // .then((user) => {
        //     console.log("FROYO UserInfo: ", user);
        //     return addUser(user)
        //         .then((id) => {
        //             if (id === "-1")
        //                 console.log("Unable to add user", id);
        //             else history.push("/");
        //         })
        //         .catch((error) => {
        //             if (error.code === 7) {
        //                 console.log(error.message);
        //             } else if (error.code === 3)
        //                 dispatch({
        //                     type: "LOGIN_ERROR",
        //                     payload: {
        //                         dispatch,
        //                         errorType: error.message,
        //                     },
        //                 });
        //             else if (error.code === 13)
        //                 console.log(
        //                     "LOGIN USER THUNK: No Result found!"
        //                 );
        //             else console.log(error);
        //         });
        // })
        // .catch((error) => {
        //     console.log(error);
        // });

        // return userSignIn()
        //     .then((user) => {
        //         console.log("GameBox UserInfo:", user);

        //         if (user.id)
        //             dispatch({
        //                 type: "LOGIN_SUCCESS",
        //                 payload: user,
        //             });
        //         else
        //             return getUserAccountInfoFroyo()
        //                 .then((user) => {
        //                     console.log("FROYO UserInfo: ", user);
        //                     return addUser(user)
        //                         .then((id) => {
        //                             if (id === "-1")
        //                                 console.log("Unable to add user", id);
        //                             else history.push("/");
        //                         })
        //                         .catch((error) => {
        //                             if (error.code === 7) {
        //                                 console.log(error.message);
        //                             } else if (error.code === 3)
        //                                 dispatch({
        //                                     type: "LOGIN_ERROR",
        //                                     payload: {
        //                                         dispatch,
        //                                         errorType: error.message,
        //                                     },
        //                                 });
        //                             else if (error.code === 13)
        //                                 console.log(
        //                                     "LOGIN USER THUNK: No Result found!"
        //                                 );
        //                             else console.log(error);
        //                         });
        //                 })
        //                 .catch((error) => {
        //                     console.log(error);
        //                 });
        //     })
        //     .catch((error) => {
        //         if (error.code === 7) {
        //             console.log({
        //                 code: error.code,
        //                 message: error.message,
        //             });
        //         } else if (error.code === 13)
        //             console.log("LOGIN USER THUNK: No Result found!");
        //         else console.log(error);
        //     });
    };
}
