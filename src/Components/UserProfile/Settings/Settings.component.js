import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Toggle from "react-toggle";

import SubscriptionButtonLoader from "Components/Loader/SubscriptionButton.loader";
import CancelSubscriptionModal from "Components/Modals/CancelSubscription.modal";

import loadUpdateUserSettings from "redux/thunks/UpdateUserSettings.thunk";
import {
    loadCancelSubscription,
    loadReActivateSubscription,
} from "redux/thunks/Subscription.thunk";

import { scrollToTop } from "Utils/ScrollToTop";
import { defaultUserImage } from "Utils/DefaultImage";
import {
    cancelSubscription,
    findActiveSubscription,
    reActivateSubscription,
} from "Utils/SubscriptionHandlers";

const Settings = () => {
    const { subscription } = useSelector((state) => state.subscription);
    const { user } = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    const history = useHistory();

    const [isCheckingSub, setIsCheckingSub] = useState(true);
    const [isSubActive, setIsSubActive] = useState(false);
    const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(false);
    const [cancelDate, setCancelDate] = useState(null);
    const [confirmModal, setConfirmModal] = useState(false);

    // TOOGLE NOTIFICATION
    const handleNotificationToggle = () => {
        let isNotificationAllowed = user.isNotifyAllowed;
        isNotificationAllowed = !isNotificationAllowed;
        dispatch(
            loadUpdateUserSettings(
                user.username,
                user.picture,
                isNotificationAllowed
            )
        );
    };

    // BLUR BACKGROUND FOR NAVBAR & SCROLL TO TOP
    useEffect(() => {
        const overlay = document.querySelector(".blur-overlay");
        overlay?.setAttribute("style", `min-height: 145px`);
        return () => {
            overlay?.removeAttribute("style");
        };
    }, []);

    // ACTIVE SUBSCRIPTION
    useEffect(() => {
        setIsCheckingSub(true);
        if (user?.subId?.length > 0) handleFindActiveSubscription();
        else {
            setIsCheckingSub(false);
            setIsSubActive(false);
            setCancelAtPeriodEnd(false);
        }

        async function handleFindActiveSubscription() {
            const activeSub = await findActiveSubscription(user?.subId);
            if (activeSub) {
                setIsCheckingSub(false);
                setIsSubActive(activeSub?.status === "active" ? true : false);
                setCancelAtPeriodEnd(activeSub?.cancel_at_period_end);
                setCancelDate(activeSub.current_period_end);
            }
        }
    }, [user.subId]);

    // CANCEL SUBSCRIPTION
    const handleSubscriptionCancellation = async () => {
        setIsCheckingSub(true);
        setConfirmModal(false);
        const cancelData = await cancelSubscription(user?.subId);
        if (cancelData) {
            setIsCheckingSub(false);
            dispatch(
                loadCancelSubscription(cancelData?.response?.current_period_end)
            );
            setIsSubActive(true);
            setCancelAtPeriodEnd(true);
        }
    };

    // RE-ACTIVATED SUBSCRIPTION
    const handleSubscriptionActivation = async () => {
        setIsCheckingSub(true);
        const reActivateData = await reActivateSubscription(user?.subId);
        if (reActivateData) {
            setIsCheckingSub(false);
            setIsSubActive(true);
            setCancelAtPeriodEnd(false);
            dispatch(loadReActivateSubscription());
        }
    };

    // NEXT PAYMENT DATE FOR SUBSCRIPTION
    const getNextPaymentDate = (nextDate) => {
        let readableDate = new Date(nextDate * 1000)?.toDateString();
        let splitted = readableDate?.split(" ");
        let date = splitted[2];
        let month = splitted[1];
        let year = splitted[3];
        return `${date} ${month} ${year}`;
    };

    // CHECK IF SUBSCRIPTION IS ACTIVE
    const checkIfSubscriptionIsActive = () => {
        if (
            (!isSubActive && !cancelAtPeriodEnd) ||
            (!isSubActive && cancelAtPeriodEnd)
        )
            return true;
        return false;
    };

    // EXPIRY DATE
    const getExpiryDate = (date) => {
        return `${new Date(date * 1000)?.toLocaleDateString()} - ${new Date(
            date * 1000
        )?.toLocaleTimeString("en-us", {
            hour: "2-digit",
            minute: "2-digit",
        })}`;
    };

    const handleCancelSubscriptionModal = (type) => {
        if (type === "yes") handleSubscriptionCancellation();
        else setConfirmModal(false);
    };

    const loadSubscriptionButtonStatus = () => {
        // SUBSCRIBE BUTTON
        if (isCheckingSub)
            return (
                <SubscriptionButtonLoader
                    height="15"
                    cx1="90%"
                    cx2="94%"
                    cx3="98.5%"
                    cy="10"
                />
            );
        else {
            if (checkIfSubscriptionIsActive()) {
                return (
                    <Link to="/iap" className="btn-sub">
                        Subscribe
                    </Link>
                );
            }
            //  CANCEL BUTTON
            else if (isSubActive && !cancelAtPeriodEnd) {
                return (
                    <button
                        className="p-0 text-danger"
                        onClick={() => setConfirmModal(true)}
                    >
                        Cancel Subscription
                    </button>
                );
            }
            // RE-ACTIVATE BUTTON
            else if (isSubActive && cancelAtPeriodEnd) {
                return (
                    <button
                        className="p-0 re-active"
                        onClick={handleSubscriptionActivation}
                    >
                        Re-activate Subscription
                    </button>
                );
            }
        }
    };

    return (
        <>
            <div className="nav-top-back-btn-wrapper d-flex align-items-center justify-content-center mx-auto">
                <div className="d-flex col-11 col-md-10 col-lg-8 col-xl-8 justify-content-between">
                    <Link
                        onClick={scrollToTop}
                        to={{
                            pathname: "/profile",
                            state: {
                                prevPath: "/",
                            },
                        }}
                    >
                        <img
                            className="back-button"
                            width="42"
                            src={`${window.cdn}art_assets/buttons/button_back.png`}
                            alt="back-btn"
                        />
                    </Link>
                </div>
            </div>
            <section id="settings">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-11 col-md-10 col-lg-8 col-xl-8 px-0 px-md-3">
                            {/* ITEM 1 - USER INFO */}
                            <p className="title mb-4">Settings</p>
                            <div className="row py-4">
                                <Link
                                    onClick={scrollToTop}
                                    to={{
                                        pathname: "/profile/edit",
                                        state: {
                                            prevPath: history.location.pathname,
                                        },
                                    }}
                                    className="w-100"
                                >
                                    <div className="col-12 d-flex flex-row px-0">
                                        <div className="col-12 d-flex align-items-center profile-info">
                                            <img
                                                onError={(e) =>
                                                    defaultUserImage(e)
                                                }
                                                src={
                                                    user?.picture ||
                                                    `${window.cdn}art_assets/icons/user.png`
                                                }
                                                alt="avatar"
                                            />{" "}
                                            <div className="d-flex flex-column ml-3 w-100">
                                                <p className="player-name mb-2">
                                                    {user?.username}
                                                </p>
                                                <div className="bottom-wrapper d-flex align-items-center justify-content-between">
                                                    <p className="player-email mb-0 pb-1">
                                                        {user?.email}
                                                    </p>
                                                    <button className="profile-edit">
                                                        Edit Profile
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            {/* ITEM 2 - CONNECTED ACCOUNT */}
                            <div className="row py-4">
                                <div className="col-12">
                                    <p className="title mb-4">
                                        Connected accounts
                                    </p>
                                    <div className="col-12 px-0 mb-2">
                                        <div className="row">
                                            <div className="col-12 d-flex align-items-center social-account-icons">
                                                {(user?.providerId ===
                                                    "google" ||
                                                    user?.providerId?.includes(
                                                        "google.com"
                                                    )) && (
                                                    <div className="svg-wrapper google-icon mr-3">
                                                        <svg viewBox="0 0 512 512">
                                                            <path
                                                                fill="#FBBB00"
                                                                d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
	c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
	C103.821,274.792,107.225,292.797,113.47,309.408z"
                                                            />
                                                            <path
                                                                fill="#518EF8"
                                                                d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
	c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
	c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                                                            />
                                                            <path
                                                                fill="#28B446"
                                                                d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
	c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
	c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                                                            />
                                                            <path
                                                                fill="#F14336"
                                                                d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
	c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
	C318.115,0,375.068,22.126,419.404,58.936z"
                                                            />
                                                        </svg>{" "}
                                                    </div>
                                                )}
                                                {(user?.providerId ===
                                                    "facebook" ||
                                                    user?.providerId?.includes(
                                                        "facebook.com"
                                                    )) && (
                                                    <div className="svg-wrapper fb-icon">
                                                        <svg viewBox="0 0 42.054 42.054">
                                                            <path
                                                                fill="white"
                                                                d="M42.054,21.168c0,10.001-6.987,18.354-16.344,20.485V24.185h5.053v-5.833h-5.104V17.05c0-2.5,1.094-4.532,3.697-4.532
		c1.043,0,1.877,0.157,2.555,0.365l0.311-6.094c-1.094-0.312-2.445-0.522-4.217-0.522c-2.291,0-5.053,0.68-7.031,2.554
		c-2.293,2.084-3.23,5.469-3.23,8.541v0.989H14.41v5.833h3.333v17.729C7.694,40.334,0,31.661,0,21.168
		C0,9.555,9.415,0.14,21.028,0.14C32.641,0.139,42.054,9.554,42.054,21.168z"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ITEM 3 - NOTIFICATION */}
                            <div className="row py-4">
                                <div className="col-12">
                                    <p className="title">Notifications</p>
                                    <div className="col-12 px-0 mb-2 toggle-wrapper">
                                        <div className="row">
                                            <div className="col-6 d-flex align-items-center">
                                                <p className="mb-0">
                                                    Mute all notifications
                                                </p>
                                            </div>
                                            <div className="col-6 d-flex align-items-center justify-content-end">
                                                <Toggle
                                                    checked={
                                                        user?.isNotifyAllowed
                                                    }
                                                    icons={false}
                                                    onChange={
                                                        handleNotificationToggle
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ITEM 4 - SUBSCRIPTION */}
                            <div className="row py-4">
                                <div className="col-12">
                                    <p className="title">Subscription</p>
                                    <div className="col-12 px-0 mb-2 subscription">
                                        <div className="row">
                                            <div className="col-12 px-3 d-flex align-items-center justify-content-between">
                                                <p className="mb-3">
                                                    Subscription Status
                                                </p>
                                                <p
                                                    className={`plan-status ${
                                                        isSubActive
                                                            ? "active"
                                                            : "opacity-0-5"
                                                    }`}
                                                >
                                                    {isSubActive
                                                        ? "Active"
                                                        : "Inactive"}
                                                </p>
                                            </div>
                                            {subscription.map((sub, idx) => (
                                                <div
                                                    className="col-12 px-2"
                                                    key={`sub-${idx}`}
                                                >
                                                    <div className="subscription-wrapper py-3 d-flex align-items-center justify-content-between">
                                                        <div className="col-8 col-md-6 text-left">
                                                            <p className="mb-3 plan-title">
                                                                {`${sub?.title} Plan`}
                                                            </p>
                                                            {checkIfSubscriptionIsActive() && (
                                                                <p className="mb-0">
                                                                    Automatically
                                                                    renews every
                                                                    month
                                                                </p>
                                                            )}
                                                            {isSubActive &&
                                                                !cancelAtPeriodEnd && (
                                                                    <p className="mb-0">
                                                                        {`Next Payment on ${getNextPaymentDate(
                                                                            cancelDate
                                                                        )}`}
                                                                    </p>
                                                                )}
                                                            {isSubActive &&
                                                                cancelAtPeriodEnd && (
                                                                    <p className="mb-0 expiry-date-time">
                                                                        Expires
                                                                        by:{" "}
                                                                        <span>
                                                                            {getExpiryDate(
                                                                                cancelDate
                                                                            )}
                                                                        </span>
                                                                    </p>
                                                                )}
                                                        </div>
                                                        <div className="col-4 col-md-6 text-right">
                                                            <p className="mb-3 plan-price">{`SGD ${sub?.price?.toFixed(
                                                                2
                                                            )}`}</p>

                                                            {loadSubscriptionButtonStatus()}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ITEM 5 - STAY CONNECTED */}
                            <div className="row py-4">
                                <div className="col-12 mb-3">
                                    <p className="title">Stay connected</p>
                                </div>
                                <div className="col-12 social-media d-flex align-items-center">
                                    {/* FACEBOOK */}
                                    <Link
                                        target="_blank"
                                        to={{
                                            pathname:
                                                "https://www.facebook.com/EsportsMini/",
                                        }}
                                    >
                                        <svg
                                            viewBox="0 0 112.196 112.196"
                                            width="56"
                                        >
                                            <circle
                                                fill="#1877F2"
                                                cx="56.098"
                                                cy="56.098"
                                                r="56.098"
                                            />
                                            <path
                                                fill="#FFFFFF"
                                                d="M70.201,58.294h-10.01v36.672H45.025V58.294h-7.213V45.406h7.213v-8.34
		c0-5.964,2.833-15.303,15.301-15.303L71.56,21.81v12.51h-8.151c-1.337,0-3.217,0.668-3.217,3.513v7.585h11.334L70.201,58.294z"
                                            />
                                        </svg>
                                    </Link>
                                    {/* INSTAGRAM */}
                                    <Link
                                        className="mx-3"
                                        target="_blank"
                                        to={{
                                            pathname:
                                                "https://www.instagram.com/esportsmini/",
                                        }}
                                    >
                                        <svg viewBox="0 0 24 24" width="56">
                                            <linearGradient
                                                id="SVGID_1_"
                                                gradientTransform="matrix(0 -1.982 -1.844 0 -132.522 -51.077)"
                                                gradientUnits="userSpaceOnUse"
                                                x1="-37.106"
                                                x2="-26.555"
                                                y1="-72.705"
                                                y2="-84.047"
                                            >
                                                <stop
                                                    offset="0"
                                                    stopColor="#fd5"
                                                />
                                                <stop
                                                    offset=".5"
                                                    stopColor="#ff543e"
                                                />
                                                <stop
                                                    offset="1"
                                                    stopColor="#c837ab"
                                                />
                                            </linearGradient>
                                            <path
                                                d="m1.5 1.633c-1.886 1.959-1.5 4.04-1.5 10.362 0 5.25-.916 10.513 3.878 11.752 1.497.385 14.761.385 16.256-.002 1.996-.515 3.62-2.134 3.842-4.957.031-.394.031-13.185-.001-13.587-.236-3.007-2.087-4.74-4.526-5.091-.559-.081-.671-.105-3.539-.11-10.173.005-12.403-.448-14.41 1.633z"
                                                fill="url(#SVGID_1_)"
                                            />
                                            <path
                                                d="m11.998 3.139c-3.631 0-7.079-.323-8.396 3.057-.544 1.396-.465 3.209-.465 5.805 0 2.278-.073 4.419.465 5.804 1.314 3.382 4.79 3.058 8.394 3.058 3.477 0 7.062.362 8.395-3.058.545-1.41.465-3.196.465-5.804 0-3.462.191-5.697-1.488-7.375-1.7-1.7-3.999-1.487-7.374-1.487zm-.794 1.597c7.574-.012 8.538-.854 8.006 10.843-.189 4.137-3.339 3.683-7.211 3.683-7.06 0-7.263-.202-7.263-7.265 0-7.145.56-7.257 6.468-7.263zm5.524 1.471c-.587 0-1.063.476-1.063 1.063s.476 1.063 1.063 1.063 1.063-.476 1.063-1.063-.476-1.063-1.063-1.063zm-4.73 1.243c-2.513 0-4.55 2.038-4.55 4.551s2.037 4.55 4.55 4.55 4.549-2.037 4.549-4.55-2.036-4.551-4.549-4.551zm0 1.597c3.905 0 3.91 5.908 0 5.908-3.904 0-3.91-5.908 0-5.908z"
                                                fill="#fff"
                                            />
                                        </svg>
                                    </Link>
                                    {/* TWITTER */}
                                    <Link
                                        target="_blank"
                                        to={{
                                            pathname:
                                                "https://twitter.com/esports_mini/",
                                        }}
                                    >
                                        <svg
                                            viewBox="0 0 112.197 112.197"
                                            width="56"
                                        >
                                            <circle
                                                fill="white"
                                                cx="56.099"
                                                cy="56.098"
                                                r="56.098"
                                            />
                                            <path
                                                fill="#1DA1F2"
                                                d="M90.461,40.316c-2.404,1.066-4.99,1.787-7.702,2.109c2.769-1.659,4.894-4.284,5.897-7.417
			c-2.591,1.537-5.462,2.652-8.515,3.253c-2.446-2.605-5.931-4.233-9.79-4.233c-7.404,0-13.409,6.005-13.409,13.409
			c0,1.051,0.119,2.074,0.349,3.056c-11.144-0.559-21.025-5.897-27.639-14.012c-1.154,1.98-1.816,4.285-1.816,6.742
			c0,4.651,2.369,8.757,5.965,11.161c-2.197-0.069-4.266-0.672-6.073-1.679c-0.001,0.057-0.001,0.114-0.001,0.17
			c0,6.497,4.624,11.916,10.757,13.147c-1.124,0.308-2.311,0.471-3.532,0.471c-0.866,0-1.705-0.083-2.523-0.239
			c1.706,5.326,6.657,9.203,12.526,9.312c-4.59,3.597-10.371,5.74-16.655,5.74c-1.08,0-2.15-0.063-3.197-0.188
			c5.931,3.806,12.981,6.025,20.553,6.025c24.664,0,38.152-20.432,38.152-38.153c0-0.581-0.013-1.16-0.039-1.734
			C86.391,45.366,88.664,43.005,90.461,40.316L90.461,40.316z"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            {/* ITEM 6 - MORE INFO */}
                            <div className="row py-4">
                                <div className="col-12 mb-3">
                                    <p className="title">More information</p>
                                </div>
                                <div className="col-12 d-flex info-links">
                                    <ul className="p-0 w-100">
                                        <li>
                                            <Link
                                                to="/privacy-policy"
                                                onClick={scrollToTop}
                                            >
                                                Privacy Policy
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/terms-and-conditions"
                                                onClick={scrollToTop}
                                            >
                                                Terms of use
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/tournament-rules"
                                                onClick={scrollToTop}
                                            >
                                                Tournament rules
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={{
                                                    pathname:
                                                        "mailto:hello@esportsmini.com",
                                                }}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Contact us
                                            </Link>
                                        </li>
                                        <li className="d-flex align-items-center justify-content-between">
                                            <Link
                                                to={{
                                                    pathname:
                                                        "mailto:hello@esportsmini.com",
                                                }}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Bug report
                                            </Link>
                                            {/* <span className="app-version">
                                                Version: 1.0.5
                                            </span> */}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {confirmModal && (
                <CancelSubscriptionModal
                    handleModalButton={handleCancelSubscriptionModal}
                    getExpiryDate={getExpiryDate}
                    cancelDate={cancelDate}
                />
            )}
        </>
    );
};

export default Settings;
