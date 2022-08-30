import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Toggle from "react-toggle";

import loadUpdateUserSettings from "redux/thunks/UpdateUserSettings.thunk";
import ConnectWallet from "Components/Global/ConnectWallet.component";

import { defaultUserImage } from "Utils/DefaultImage";
import { disconnectWallet } from "Utils/ConnectWallet";
import { UPDATE_USER_WALLET } from "redux/types";
import getFroyoGamesContactUrl from "Utils/GetFroyoGamesContact";

const Settings = () => {
    const { user } = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    // const [hideGemsOnMobile, setHideGemsOnMobile] = useState(false);
    const [selectWalletModalShown, setSelectWalletModalShown] = useState(false);
    const [invalidWalletModalShown, setInvalidWalletModalShown] =
        useState(false);

    // useEffect(() => {
    //     window.addEventListener("resize", handleResize);

    //     function handleResize() {
    //         setHideGemsOnMobile(
    //             window.innerWidth > 767 && window.ethereum ? false : true
    //         );
    //     }
    //     handleResize();

    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, []);

    // TOOGLE NOTIFICATION
    const handleNotificationToggle = () => {
        let isNotificationAllowed = user.isNotifyAllowed;
        isNotificationAllowed = !isNotificationAllowed;
        dispatch(
            loadUpdateUserSettings(
                user.username,
                user.picture,
                user.firstName,
                user.lastName,
                isNotificationAllowed
            )
        );
    };

    const handleWallet = async () => {
        setSelectWalletModalShown(true);

        // await handleConnectWallet(dispatch, blockchainNetworks);
    };

    const handleDisconnectWallet = async () => {
        await disconnectWallet();
        dispatch({
            type: UPDATE_USER_WALLET,
            payload: {
                ...user,
                walletAddress: null,
                tokenBalance: null,
                tokenSymbol: null,
                network: null,
            },
        });
    };

    return (
        <section id="settings">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-9 wrapper">
                        <div className="row">
                            {/* BACK BUTTON */}
                            <div className="col-12 mb-3 mb-md-4">
                                <Link
                                    className="back-button"
                                    to={{
                                        pathname: "/profile",
                                        state: {
                                            prevPath: "/",
                                        },
                                    }}
                                >
                                    <img
                                        src={`${window.cdn}buttons/button_back.png`}
                                        alt="back-btn"
                                    />
                                    <span className="ml-2">Back</span>
                                </Link>
                            </div>
                            {/* SETTING ITEMS */}
                            <div className="col-12 mb-4">
                                <h1 className="main-title my-2 my-md-4">
                                    Settings
                                </h1>
                                {/* ITEM 1 - USER INFO */}
                                <div className="row py-4">
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={`${process.env.REACT_APP_FROYO_WEB_URL}/my-profile`}
                                        className="col-12 d-flex align-items-center profile-info"
                                    >
                                        <img
                                            onError={(e) => defaultUserImage(e)}
                                            src={
                                                user?.picture ||
                                                `${window.cdn}icons/icon_profile.svg`
                                            }
                                            alt="avatar"
                                        />
                                        <div className="d-flex flex-column ml-3 w-100">
                                            <p className="player-name mb-1 mb-md-2">
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
                                    </a>
                                </div>
                                {/* ITEM 2 - CONNECTED WALLET */}
                                <div className="row py-4 py-md-5">
                                    <div className="col-12 connect-wallet">
                                        <p className="main-title mb-3 mb-md-4">
                                            Wallet connected
                                        </p>
                                        <div className="col-12 px-0 mb-2">
                                            <div className="row">
                                                <p className="mb-3 wallet-label px-3">
                                                    Wallet address
                                                </p>
                                                <div className="col-12 d-flex align-items-center justify-content-between">
                                                    <div className="wallet-address p-md-4">
                                                        <span>
                                                            {user.walletAddress
                                                                ? user.walletAddress
                                                                : "No wallet found"}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={
                                                            user.walletAddress
                                                                ? handleDisconnectWallet
                                                                : handleWallet
                                                        }
                                                    >
                                                        {user.walletAddress && (
                                                            <p
                                                                className={`mb-0 ${
                                                                    user.walletAddress
                                                                        ? "text-danger"
                                                                        : ""
                                                                }`}
                                                            >
                                                                Disconnect
                                                                Wallet
                                                            </p>
                                                        )}
                                                        {!user.walletAddress &&
                                                            !user.network && (
                                                                <p className="mb-0">
                                                                    Connect
                                                                    Wallet
                                                                </p>
                                                            )}
                                                        {!user.walletAddress &&
                                                            user.network ===
                                                                "Wrong Network!" && (
                                                                <p className="mb-0">
                                                                    Wrong
                                                                    Network
                                                                </p>
                                                            )}
                                                    </button>
                                                </div>

                                                {/* {hideGemsOnMobile && (
                                                    <div className="mobile-note-wallet px-3">
                                                        <p className="mb-1 note-title">
                                                            Unable to connect
                                                            through mobile
                                                            device.
                                                        </p>
                                                        <p className="note-subtitle">
                                                            Connect your wallet
                                                            through your
                                                            computer browser.
                                                        </p>
                                                    </div>
                                                )} */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ITEM 3 - NOTIFICATION */}
                                <div className="row py-4 py-md-5">
                                    <div className="col-12">
                                        <p className="main-title mb-3 mb-md-4">
                                            Notifications
                                        </p>
                                        <div className="col-12 px-0 mb-2 notification-toggle-wrapper">
                                            <div className="row">
                                                <div className="col-6 d-flex align-items-center">
                                                    <p className="mb-0">
                                                        Turn on notifications
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
                                {/* REMOVED ON 21/7/2022: Due to redundant with Footer. */}
                                {/* ITEM 4 - STAY CONNECTED */}
                                {/* <div className="row py-4 py-md-5">
                                    <div className="col-12 mb-3">
                                        <p className="main-title mb-0">
                                            Stay connected
                                        </p>
                                    </div>
                                    <div className="col-12 social-media d-flex align-items-center">

                                        <a
                                            target="_blank"
                                            rel="noreferrer"
                                            href="https://www.facebook.com/GameBox_Froyo-105972522069601"
                                        >
                                            <svg viewBox="0 0 112.196 112.196">
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
                                        </a>

                                        <a
                                            className="mx-3"
                                            target="_blank"
                                            rel="noreferrer"
                                            href="https://www.instagram.com/gamebox_froyo/"
                                        >
                                            <svg viewBox="0 0 24 24">
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
                                        </a>

                                        <a
                                            target="_blank"
                                            rel="noreferrer"
                                            href="https://twitter.com/Gamebox_Froyo"
                                        >
                                            <svg viewBox="0 0 112.197 112.197">
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
                                        </a>
                                    </div>
                                </div> */}
                                {/* ITEM 5 - MORE INFO */}
                                <div className="row py-4">
                                    <div className="col-12 mb-3">
                                        <p className="main-title">
                                            More information
                                        </p>
                                    </div>
                                    <div className="col-12 d-flex info-links">
                                        <ul className="p-0 w-100">
                                            {/* <li>
                                                <Link to="/privacy-policy">
                                                    Privacy Policy
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/terms-and-conditions">
                                                    Terms of use
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/tournament-rules">
                                                    Tournament rules
                                                </Link>
                                            </li>
                                            <li>
                                                <a
                                                    href={getFroyoGamesContactUrl()}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Contact Support
                                                </a>
                                            </li> */}
                                            <li className="d-flex align-items-center justify-content-between">
                                                <a
                                                    href={getFroyoGamesContactUrl()}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Contact Support
                                                </a>
                                                <span className="app-version">
                                                    Version:{" "}
                                                    {
                                                        process.env
                                                            .REACT_APP_VERSION
                                                    }
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConnectWallet
                selectWalletModalShown={selectWalletModalShown}
                setSelectWalletModalShown={setSelectWalletModalShown}
                invalidWalletModalShown={invalidWalletModalShown}
                setInvalidWalletModalShown={setInvalidWalletModalShown}
            />
        </section>
    );
};

export default Settings;
