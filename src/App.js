// import { addListener, launch } from "devtools-detector";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { messaging, onMessageListener } from "./firebase";

import ProtectedRoute from "Components/Global/ProtectedRoutes";
import Toasty from "Components/Global/Toasty.component";
import NavigationHOC from "Components/Global/NavigationHOC.component";
import HeaderHOC from "Components/Global/HeaderHOC.component";
import GlobalTimer from "Components/Global/GlobalTimer.component";
import OrientationModal from "Components/Modals/Orientation.modal";
import ScrollToTop from "Components/Global/ScrollToTop.component";

import Home from "Pages/Home.page";
import Tournament from "Pages/Tournament.page";
import Activity from "Pages/Activity.page";
import Winners from "Pages/Winners.page";
import Profile from "Pages/Profile.page";
import Invite from "Pages/Invite.page";
import Settings from "Pages/Settings.page";
import Rewards from "Pages/Rewards.page";
import HighScore from "Pages/Highscore.page";
import Notifications from "Pages/Notifications.page";
import IAP from "Pages/IAP.page";
import TermsAndConditions from "Pages/TermsAndConditions.page";
import PrivacyPolicy from "Pages/PrivacyPolicy.page";
import TournamentRules from "Pages/TournamentRules.page";
import LaunchingSoon from "Pages/LaunchingSoon.page";

import loadPrizes from "redux/thunks/Prizes.thunk";
import loadExchangeRate from "redux/thunks/ExchangeRate.thunk";
import loadRanks from "redux/thunks/Ranks.thunk";
import loadConfig from "redux/thunks/Config.thunk";
import loadGemsList from "redux/thunks/GemsList.thunk";
import loadSpinnerRules from "redux/thunks/SpinnerRules.thunk";
import loadGamesList from "redux/thunks/GamesList.thunk";
import loadNotificationToken from "redux/thunks/UpdateNotificationToken.thunk";
import loadNotificationNumber from "redux/thunks/NotifcationNumber.thunk";
import { loadInitNotifications } from "redux/thunks/Notifcations.thunk";
import { loadUnClaimedPrizes } from "redux/thunks/UnClaimedPrizes.thunk";
import { getExchangeRate } from "redux/services/index.service";
import {
    loadConnectWalletAuto,
    loadLoginUserWithToken,
} from "redux/thunks/Login.thunk";
import loadBlockChainNetworks from "redux/thunks/BlockChainNetworks.thunk";
import loadAvailableSpins from "redux/thunks/AvailableSpins.thunk";
import loadCheckGiveaway from "redux/thunks/Giveaway.thunk";
// import { LOG_OUT } from "redux/types";
import GoogleAnalytics from "Components/Global/GoogleAnalytics.component";
import Footer from "Components/Landing/Footer/Footer.component";
import { register } from "serviceWorker";

const App = () => {
    const { user } = useSelector((state) => state.userData);
    const { prizes } = useSelector((state) => state.prizes);
    const { blockchainNetworks } = useSelector(
        (state) => state.blockchainNetworks
    );

    const dispatch = useDispatch();

    const [pendingRegion, setPendingRegion] = useState(true);
    const [regionAllow, setRegionAllow] = useState(false);
    register();

    // const [consoleOpen, setConsoleOpen] = useState(false);

    // CHECK IS DEVTOOLS CONSOLE OPEN
    // if (process.env.REACT_APP_NODE_ENV === "production") {
    // 	addListener((isOpen) => {
    // 		if (isOpen) {
    // 			setConsoleOpen(true);
    // 			sessionStorage.setItem("errorType", "Unusual");
    // 			dispatch({ type: LOG_OUT });
    // 		} else {
    // 			setConsoleOpen(false);
    // 		}
    // 	});
    // 	launch();
    // }

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

    // ONAUTH CHANGED & API CALLS & CONSOLE OPEN
    useEffect(() => {
        document.addEventListener("visibilitychange", handleLoadPrize);

        async function handleLoadPrize() {
            if (document.visibilityState === "visible" && user.id) {
                await dispatch(loadLoginUserWithToken());
                dispatch(loadPrizes());
            }
        }

        // if (process.env.REACT_APP_NODE_ENV === "production" && consoleOpen) {
        // 	// Show warning message to user in console panel
        // 	console.log(
        // 		"%cAny suspicious activity will result in account BAN!",
        // 		"background: #fff700; color: #ff2c44; font-size: 24px; font-weight: bold;"
        // 	);
        // 	sessionStorage.setItem("errorType", "Unusual");
        // 	dispatch({ type: LOG_OUT });
        // 	return;
        // }

        if (user.id) {
            // dispatch(loadLoginUser(authUser, isNewUser));
            dispatch(loadPrizes());
            dispatch(loadAvailableSpins());
            dispatch(loadSpinnerRules());
            dispatch(loadBlockChainNetworks());
            dispatch(loadExchangeRate());
            dispatch(loadRanks());
            dispatch(loadConfig());
            dispatch(loadGemsList());
            dispatch(loadGamesList());

            dispatch(loadCheckGiveaway(user.id));

            // FOR FUTURE PURPOSE
            // dispatch({ type: "LIST_PURCHASE_HISTORY" });
        }

        return () =>
            document.removeEventListener("visibilitychange", handleLoadPrize);
    }, [
        dispatch,
        user.id,
        // consoleOpen
    ]);

    useEffect(() => {
        // Check if connect from Froyo side
        let web3Connection = JSON.parse(
            localStorage.getItem("froyo-walletconnection")
        );
        if (web3Connection?.connectionType === "metamask") {
            localStorage.setItem("wallet", "Metamask");
        } else if (web3Connection?.connectionType === "walletconnect") {
            localStorage.setItem("wallet", "WalletConnect");
        }

        // FOR LOADING WALLET IF ALREADY CONNECTED
        if (blockchainNetworks.length > 0)
            dispatch(loadConnectWalletAuto(user.bindWalletAddress));
    }, [dispatch, blockchainNetworks, user.bindWalletAddress]);

    useEffect(() => {
        if (user.id) sessionStorage.removeItem("errorType");
    }, [user.id]);

    // UPDATE NOTIFICATION TOKEN & LOAD NOTIFICATION
    useEffect(() => {
        // if (process.env.REACT_APP_NODE_ENV === "production" && consoleOpen) {
        // 	// Show warning message to user in console panel
        // 	console.log(
        // 		"%cAny suspicious activity will result in account BAN!",
        // 		"background: #fff700; color: #ff2c44; font-size: 24px; font-weight: bold;"
        // 	);
        // 	sessionStorage.setItem("errorType", "Unusual");
        // 	dispatch({ type: LOG_OUT });
        // 	return;
        // }

        if (user.id) {
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
            dispatch(loadInitNotifications());
            dispatch(loadUnClaimedPrizes());
        }
    }, [
        user.id,
        dispatch,
        // consoleOpen
    ]);

    // REGIONAL CHECK
    useEffect(() => {
        if (process.env.REACT_APP_NODE_ENV === "production") {
            setRegionAllow(true);
            setPendingRegion(false);
        } else {
            getExchangeRate()
                .then(({ ipInfo }) => {
                    if (
                        ipInfo &&
                        (ipInfo.country_code === "MY" ||
                            ipInfo.country_code === "SG" ||
                            ipInfo.country_code === "ID")
                    )
                        setRegionAllow(true);
                })
                .finally(() => setPendingRegion(false));
        }
    }, []);

    if (pendingRegion) return null;
    else if (!regionAllow) return <LaunchingSoon />;
    else {
        return (
            <Router basename={process.env.REACT_APP_PUBLIC_URL}>
                <Toasty />
                <OrientationModal />
                <HeaderHOC />
                <ScrollToTop />
                <GoogleAnalytics />
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
                        path="/profile/highscore"
                        component={HighScore}
                    />
                    <ProtectedRoute
                        path="/profile/rewards"
                        component={Rewards}
                    />
                    <ProtectedRoute
                        path="/profile/settings"
                        component={Settings}
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
                <Footer />
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
