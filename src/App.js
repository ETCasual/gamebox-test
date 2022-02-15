import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { auth, messaging, onMessageListener } from "./firebase";
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";

import ProtectedRoute from "Components/Global/ProtectedRoutes";
import Toasty from "Components/Global/Toasty.component";
import NavigationHOC from "Components/Global/NavigationHOC.component";
import HeaderHOC from "Components/Global/HeaderHOC.component";
import GlobalTimer from "Components/Global/GlobalTimer.component";
import OrientationModal from "Components/Modals/Orientation.modal";

import Home from "Pages/Home.page";
import Tournament from "Pages/Tournament.page";
import Activity from "Pages/Activity.page";
import Winners from "Pages/Winners.page";
import Profile from "Pages/Profile.page";
import ProfileEdit from "Pages/ProfileEdit.page";
import Invite from "Pages/Invite.page";
import Settings from "Pages/Settings.page";
import Rewards from "Pages/Rewards.page";
import ClaimPrize from "Pages/ClaimPrize.page";
import Notifications from "Pages/Notifications.page";
import IAP from "Pages/IAP.page";
import TermsAndConditions from "Pages/TermsAndConditions.page";
import PrivacyPolicy from "Pages/PrivacyPolicy.page";
import TournamentRules from "Pages/TournamentRules.page";
import LaunchingSoon from "Pages/LaunchingSoon.page";

import loadLoginUser from "redux/thunks/Login.thunk";
import loadPrizes from "redux/thunks/Prizes.thunk";
import loadExchangeRate from "redux/thunks/ExchangeRate.thunk";
import loadRanks from "redux/thunks/Ranks.thunk";
import loadConfig from "redux/thunks/Config.thunk";
import loadGemsList from "redux/thunks/GemsList.thunk";
import loadSpinnerRules from "redux/thunks/SpinnerRules.thunk";
import loadNotificationToken from "redux/thunks/UpdateNotificationToken.thunk";
import loadNotificationNumber from "redux/thunks/NotifcationNumber.thunk";
import loadNotifications from "redux/thunks/Notifcations.thunk";
import loadFriendInvitation from "redux/thunks/FriendInvitation.thunk";
import loadGamesList from "redux/thunks/GamesList.thunk";
import loadUnClaimedPrizes from "redux/thunks/UnClaimedPrizes.thunk";
import { getExchangeRate } from "redux/services/index.service";

const App = () => {
    const { user } = useSelector((state) => state.userData);
    const { prizes } = useSelector((state) => state.prizes);
    const dispatch = useDispatch();

    const [pendingRegion, setPendingRegion] = useState(true);
    const [regionAllow, setRegionAllow] = useState(false);

    // FIREBASE ONMESSAGE
    onMessageListener()
        .then((payload) => {
            console.log("Firebase File:", payload);
            let notification =
                JSON.parse(localStorage.getItem("notification")) || [];
            notification.push({ data: payload.data });
            localStorage.setItem("notification", JSON.stringify(notification));
        })
        .catch((error) => console.log("Notification OnMessage Error: ", error));

    // ONAUTH CHANGED & API CALLS
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                sessionStorage.setItem("sessionTimeStamp", Date.now());
                const jwtToken = await authUser.getIdToken(true);
                if (jwtToken) {
                    sessionStorage.setItem("token", jwtToken);
                    let isNewUser = false;
                    isNewUser =
                        localStorage.getItem("isNewUser") !== null
                            ? Boolean(localStorage.getItem("isNewUser"))
                            : false;
                    dispatch(loadLoginUser(authUser, isNewUser));
                    dispatch(loadPrizes());
                    dispatch(loadExchangeRate());
                    dispatch(loadRanks());
                    dispatch(loadConfig());
                    dispatch(loadGemsList());
                    dispatch(loadSpinnerRules());
                    dispatch(loadGamesList());

                    // FOR FUTURE PURPOSE
                    // dispatch({ type: "LIST_PURCHASE_HISTORY" });
                }
            } else sessionStorage.removeItem("token");
        });
        return () => unsubscribe();
    }, [dispatch]);

    useEffect(() => {
        if (user.id > 0) sessionStorage.removeItem("errorType");
    }, [user.id]);

    // UPDATE NOTIFICATION TOKEN & LOAD NOTIFICATION
    useEffect(() => {
        if (user.id > 0) {
            // NOTIFICATION TOKEN UPDATE
            if (messaging) {
                messaging
                    .getToken({
                        vapidKey: process.env.REACT_APP_VAPID_KEY,
                    })
                    .then((currentToken) => {
                        if (currentToken) {
                            dispatch(loadNotificationToken(currentToken));
                        } else {
                            // TODO: Show permission request UI
                            console.log(
                                "No registration token available. Request permission to generate one."
                            );
                            Notification.requestPermission();
                        }
                    })
                    .catch((err) => {
                        console.log("Error: messaging.getToken: ", err);
                        // TODO: handle the error here, maybe bcos of different browser problem
                        // Brave browser will need to enable it manually
                        // Brave settings > Privacy and Security > Use Google Services for Push Messaging
                        // Chrome is OK by default
                        // Other haven't check.
                    });
            }
            // NOTIFICATION NUMBER & LIST AND UNCLAIMED PRIZES
            dispatch(loadNotificationNumber());
            dispatch(loadNotifications());
            dispatch(loadUnClaimedPrizes());
        }
    }, [user.id, dispatch]);

    // INVITATION
    useEffect(() => {
        const isNewUser = Boolean(localStorage.getItem("isNewUser"));
        if (user.id > 0 && isNewUser) {
            const inviteCode = localStorage.getItem("inviteCode");
            if (inviteCode !== null) {
                const originalText = decodeURIComponent(inviteCode);
                const decryption = AES.decrypt(
                    originalText,
                    process.env.REACT_APP_SECRET_PHRASE
                ).toString(Utf8);
                setTimeout(() => {
                    dispatch(loadFriendInvitation(parseInt(decryption)));
                }, 1000);
            }
        } else localStorage.removeItem("isNewUser");
    }, [user.id, dispatch]);

    // REGIONAL CHECK
    useEffect(() => {
        getExchangeRate()
            .then((data) => {
                if (data.ipInfo && data.ipInfo.country_code === "MY")
                    setRegionAllow(true);
            })
            .finally(() => setPendingRegion(false));
    }, []);

    if (pendingRegion) {
        return null;
    } else if (!regionAllow) {
        return <LaunchingSoon />;
    } else {
        return (
            <Router>
                <Toasty />
                <OrientationModal />
                <HeaderHOC />
                <Switch>
                    <ProtectedRoute path="/" exact component={Home} />
                    <Route path="/invite/:id" component={Invite} />
                    <ProtectedRoute path="/activity" component={Activity} />
                    <ProtectedRoute path="/winners" component={Winners} />
                    <ProtectedRoute
                        path="/prize/:type/:id"
                        component={Tournament}
                    />
                    <ProtectedRoute
                        exact
                        path="/notifications"
                        component={Notifications}
                    />
                    <ProtectedRoute exact path="/profile" component={Profile} />
                    <ProtectedRoute
                        path="/profile/rewards"
                        component={Rewards}
                    />
                    <ProtectedRoute path="/claim/:id" component={ClaimPrize} />
                    <ProtectedRoute
                        path="/profile/settings"
                        component={Settings}
                    />
                    <ProtectedRoute
                        path="/profile/edit"
                        component={ProfileEdit}
                    />
                    <ProtectedRoute path="/iap" component={IAP} />
                    <Route
                        path="/terms-and-conditions"
                        component={TermsAndConditions}
                    />
                    <Route path="/privacy-policy" component={PrivacyPolicy} />
                    <Route
                        path="/tournament-rules"
                        component={TournamentRules}
                    />
                </Switch>
                <NavigationHOC />

                {prizes?.featuredData.map((prize, idx) => (
                    <GlobalTimer key={`prize_feature_${idx}`} data={prize} />
                ))}
                {prizes?.premiumData.map((prize, idx) => (
                    <GlobalTimer key={`prize_premium_${idx}`} data={prize} />
                ))}
            </Router>
        );
    }
};

export default App;
