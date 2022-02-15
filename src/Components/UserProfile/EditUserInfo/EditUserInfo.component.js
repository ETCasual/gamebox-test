// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadUpdateUserSettings from "redux/thunks/UpdateUserSettings.thunk";
import loadNotifications from "redux/thunks/Notifcations.thunk";
import loadNotificationNumber from "redux/thunks/NotifcationNumber.thunk";

// HELPER FUNCTIONS
import { scrollToTop } from "Utils/ScrollToTop";
import { defaultUserImage } from "Utils/DefaultImage";

const EditUserInfo = ({ avatar, handleAvatarSelectionPanel }) => {
    const { search } = useLocation();
    const { user } = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    const history = useHistory();

    const [nickName, setNickName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            loadUpdateUserSettings(
                nickName,
                avatar ? avatar : user.picture,
                user.isNotifyAllowed
            )
        );
        let isNewUser = localStorage.getItem("isNewUser");
        if (isNewUser !== null) {
            history.push("/");
            if (user.isNotifyAllowed) {
                // NOTIFICATION NUMBER
                dispatch(loadNotificationNumber());
                // NOTIFICATION
                dispatch(loadNotifications());
            }
        } else {
            // GOING BACK TO SETTINGS PAGE
            history.push("/profile/settings");
        }
    };

    useEffect(() => {
        if (user.id > 0) setNickName(user.username);
    }, [user.id, user]);

    // BLUR BACKGROUND FOR NAVBAR & SCROLL TO TOP
    useEffect(() => {
        const overlay = document.querySelector(".blur-overlay");
        overlay?.setAttribute("style", `min-height: 145px`);
        return () => {
            overlay?.removeAttribute("style");
        };
    }, []);

    return (
        <>
            {!search.includes("isNewUser=true") && (
                <div className="nav-top-back-btn-wrapper d-flex align-items-center justify-content-center mx-auto">
                    <div className="d-flex col-11 col-md-10 col-lg-8 col-xl-8 justify-content-between">
                        <Link
                            onClick={scrollToTop}
                            to={{
                                pathname: history.location?.state?.prevPath,
                                state: {
                                    prevPath: history.location?.state?.prevPath,
                                },
                            }}
                        >
                            <img
                                className="back-button"
                                width="42"
                                src={`${window.cdn}buttons/button_back.png`}
                                alt="back-btn"
                            />
                        </Link>
                    </div>
                </div>
            )}
            <section id="edit-user-info">
                <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                            <div className="row">
                                <div className="col-12 mt-4">
                                    <form onSubmit={(e) => handleSubmit(e)}>
                                        <div className="col-12 avatar-img d-flex align-items-center justify-content-center">
                                            <div className="row">
                                                <div
                                                    className="avatar-wrapper position-relative"
                                                    onClick={
                                                        handleAvatarSelectionPanel
                                                    }
                                                >
                                                    <img
                                                        onError={(e) => {
                                                            defaultUserImage(e);
                                                        }}
                                                        src={
                                                            avatar
                                                                ? avatar
                                                                : user.picture
                                                        }
                                                        alt="avatar"
                                                    />
                                                    <div className="edit-icon">
                                                        <svg
                                                            viewBox="-15 -15 484.00019 484"
                                                            width="24"
                                                        >
                                                            <path d="m401.648438 18.234375c-24.394532-24.351563-63.898438-24.351563-88.292969 0l-22.101563 22.222656-235.269531 235.144531-.5.503907c-.121094.121093-.121094.25-.25.25-.25.375-.625.746093-.871094 1.121093 0 .125-.128906.125-.128906.25-.25.375-.371094.625-.625 1-.121094.125-.121094.246094-.246094.375-.125.375-.25.625-.378906 1 0 .121094-.121094.121094-.121094.25l-52.199219 156.96875c-1.53125 4.46875-.367187 9.417969 2.996094 12.734376 2.363282 2.332031 5.550782 3.636718 8.867188 3.625 1.355468-.023438 2.699218-.234376 3.996094-.625l156.847656-52.324219c.121094 0 .121094 0 .25-.121094.394531-.117187.773437-.285156 1.121094-.503906.097656-.011719.183593-.054688.253906-.121094.371094-.25.871094-.503906 1.246094-.753906.371093-.246094.75-.621094 1.125-.871094.125-.128906.246093-.128906.246093-.25.128907-.125.378907-.246094.503907-.5l257.371093-257.371094c24.351563-24.394531 24.351563-63.898437 0-88.289062zm-232.273438 353.148437-86.914062-86.910156 217.535156-217.535156 86.914062 86.910156zm-99.15625-63.808593 75.929688 75.925781-114.015626 37.960938zm347.664062-184.820313-13.238281 13.363282-86.917969-86.917969 13.367188-13.359375c14.621094-14.609375 38.320312-14.609375 52.945312 0l33.964844 33.964844c14.511719 14.6875 14.457032 38.332031-.121094 52.949218zm0 0" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 py-5">
                                            <div className="row">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="username"
                                                    placeholder="Nickname"
                                                    minLength={2}
                                                    maxLength={20}
                                                    value={nickName}
                                                    onChange={(e) =>
                                                        setNickName(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 text-center mt-1">
                                            <button
                                                type="submit"
                                                disabled={
                                                    nickName.length > 0
                                                        ? ""
                                                        : "disabled"
                                                }
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EditUserInfo;
