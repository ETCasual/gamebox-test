import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Notification from "Components/Global/Notifications.component";

import loadPrizes from "redux/thunks/Prizes.thunk";

import { defaultUserImage } from "Utils/DefaultImage";
import { handleConnectWallet, disconnectWallet } from "Utils/ConnectWallet";
import { UPDATE_USER_WALLET } from "redux/types";

import { handleSignOut } from "Utils/SignOut";
import ConnectWallet from "./ConnectWallet.component";

const Header = ({
    userImage,
    userGems,
    isNotificationShown,
    handleNotificationPanelBackButton,
    notificationData,
    handleOnClickNotificationIcon,
    handleNotificationLeaderboardHistory,
}) => {
    const { notificationNumber } = useSelector(
        (state) => state.notificationNumber
    );
    const { earnAdditionalBenefitStatus } = useSelector(
        (state) => state.earnAdditional
    );
    const { user } = useSelector((state) => state.userData);
    const { config } = useSelector((state) => state.config);

    // const [hideGemsOnMobile, setHideGemsOnMobile] = useState(false);
    const [onHoverWallet, setOnWalletHover] = useState(false);
    const [selectWalletModalShown, setSelectWalletModalShown] = useState(false);
    const [invalidWalletModalShown, setInvalidWalletModalShown] =
        useState(false);
    const [mobileProfileWallet, setMobileProfileWallet] = useState(false);

    const dispatch = useDispatch();
    const location = useLocation();

    const nowTimeStamp = () => Date.now() + (config?.offsetTimestamp || 0);

    // GETTING GEMS
    const getGems = () => {
        let _earnAdditional = [...earnAdditionalBenefitStatus];
        if (_earnAdditional.lenght > 1) {
            let now = nowTimeStamp();
            const output = _earnAdditional.reduce((prev, curr) =>
                Math.abs(curr?.timestamp - now) <
                Math.abs(prev?.timestamp - now)
                    ? curr
                    : prev
            );
            if (userGems === output?.gems) return userGems;
            return output?.gems;
        }
        return userGems;
    };

    const handleHomeNavLink = () => {
        dispatch(loadPrizes());
    };

    const handleWallet = async () => {
        setMobileProfileWallet(false);

        if (user.walletAddress) {
            if (user.network === "Wrong Network!") {
                await handleConnectWallet(dispatch, user.bindWalletAddress);
            } else {
                handleWalletDropDown();
            }
        } else {
            setSelectWalletModalShown(true);
        }
    };

    const handleWalletDropDown = () => {
        user.walletAddress && setOnWalletHover(true);
    };

    const handleWalletDisconnect = async () => {
        await disconnectWallet();
        setOnWalletHover(false);
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
        <>
            <div className="navbar-top d-flex flex-column justify-content-center">
                <div className="col-12 px-1 px-lg-3 d-flex align-items-center justify-content-between">
                    {/* LOGO & NAV LINKS */}
                    <div className="left-items d-flex align-items-center justify-content-start">
                        <div className="d-flex">
                            <Link
                                to="/"
                                className="logo"
                                onClick={handleHomeNavLink}
                            >
                                <img
                                    className="img-fluid"
                                    src={`${window.cdn}logo/logo_gamebox.png`}
                                    alt="GameBox"
                                />
                            </Link>

                            <div className="nav-items d-none d-md-flex">
                                <NavLink
                                    onClick={handleHomeNavLink}
                                    exact
                                    to={{
                                        pathname: "/",
                                        state: {
                                            prevPath: location.pathname,
                                        },
                                    }}
                                    activeClassName="active"
                                >
                                    <div className="py-4 px-2 mx-2">Home</div>
                                </NavLink>
                                <NavLink
                                    to={{
                                        pathname: "/activity",
                                        state: {
                                            prevPath: location.pathname,
                                        },
                                    }}
                                    activeClassName="active"
                                >
                                    <div className="py-4 px-2 mx-2">
                                        Activities
                                    </div>
                                </NavLink>
                                <NavLink
                                    to={{
                                        pathname: "/winners",
                                        state: {
                                            prevPath: location.pathname,
                                        },
                                    }}
                                    activeClassName="active"
                                >
                                    <div className="py-4 px-2 mx-2">
                                        Winners
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    {/* GEMS, NOTIFICATION ICON & PROFILE ICON */}
                    <div className="right-items w-100 d-flex align-items-center justify-content-end">
                        <div className="position-relative d-flex flex-nowrap align-items-center mx-2">
                            <Link
                                className="gem-wrapper"
                                to={{
                                    pathname: "/iap",
                                    state: {
                                        prevPath: location.pathname,
                                    },
                                }}
                            >
                                <img
                                    className="icon"
                                    src={`${window.cdn}assets/gem_01.png`}
                                    alt="gems"
                                />
                                <span>{getGems() || 0}</span>
                                <img
                                    className="add-icon"
                                    src={`${window.cdn}buttons/button_plus.png`}
                                    alt="add-gems"
                                />
                            </Link>
                        </div>
                        <div className="mr-1">
                            <button
                                className="notification p-0 semi-transparent"
                                onClick={handleOnClickNotificationIcon}
                            >
                                <img
                                    style={{
                                        filter:
                                            notificationNumber.count > 0 &&
                                            notificationData.length > 0
                                                ? "none"
                                                : "grayscale(0.9)",
                                    }}
                                    className="icon"
                                    src={`${window.cdn}icons/icon_notification.png`}
                                    alt="bell"
                                />
                                <div
                                    className={`notification-number ${
                                        notificationNumber.count > 0 &&
                                        notificationData.length > 0
                                            ? "d-flex"
                                            : "d-none"
                                    } align-items-center justify-content-center`}
                                >
                                    <span className="w-100">
                                        {notificationNumber.count > 0 &&
                                        notificationData.length > 0
                                            ? notificationNumber.count
                                            : 0}
                                    </span>
                                </div>
                            </button>
                        </div>
                        <div className="profile d-flex position-relative m-1">
                            <div
                                className="d-flex"
                                onClick={() => setMobileProfileWallet(true)}
                            >
                                <img
                                    onError={(e) => defaultUserImage(e)}
                                    className={user.isVip ? "vip-frame" : ""}
                                    src={
                                        userImage ||
                                        `${window.cdn}icons/icon_profile.svg`
                                    }
                                    alt="profile"
                                />
                            </div>
                        </div>
                    </div>

                    {/* NOTIFICATION */}
                    {isNotificationShown && (
                        <Notification
                            notificationData={notificationData}
                            handleBackButton={handleNotificationPanelBackButton}
                            handleNotificationLeaderboardHistory={
                                handleNotificationLeaderboardHistory
                            }
                        />
                    )}

                    {/* DISCONNET */}
                    {onHoverWallet && user.walletAddress && (
                        <>
                            <div
                                className="overlay-disconnect-wallet"
                                onClick={() => setOnWalletHover(false)}
                            />
                            <div
                                className="disconnect-wrapper d-flex align-items-center justify-content-center"
                                onClick={handleWalletDisconnect}
                            >
                                Disconnect
                            </div>
                        </>
                    )}

                    {/* MOBILE PROFILE WALLET */}
                    {mobileProfileWallet && (
                        <>
                            <div
                                className="overlay-profile-wallet"
                                onClick={() => setMobileProfileWallet(false)}
                            ></div>
                            <div className="profile-wallet-wrapper p-3">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`${process.env.REACT_APP_FROYO_WEB_URL}/my-profile`}
                                >
                                    <div className="profile-wrapper d-flex align-items-center mb-3">
                                        <div className="profile-avatar">
                                            <img
                                                onError={(e) =>
                                                    defaultUserImage(e)
                                                }
                                                className={`img-fluid ${
                                                    user.isVip
                                                        ? "vip-frame"
                                                        : ""
                                                }`}
                                                src={
                                                    user.picture ||
                                                    `${window.cdn}icons/icon_profile.svg`
                                                }
                                                alt="profile"
                                            />
                                        </div>
                                        <div>
                                            <div className="profile-name ml-3 mb-1">
                                                {user.username}
                                            </div>
                                            {user.bindWalletAddress && (
                                                <div className="profile-wallet ml-3 py-1 px-2">
                                                    {user.bindWalletAddress?.substring(
                                                        0,
                                                        5
                                                    )}
                                                    ....
                                                    {user.bindWalletAddress?.substring(
                                                        user.bindWalletAddress
                                                            .length - 4
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </a>
                                <div className="wallet-info-wrapper mb-3">
                                    {/* <div
                                        className="wallet-wrapper d-flex d-sm-none"
                                        onClick={handleWallet}
                                        > */}
                                    {/* TOKEN VALUE & ADDRESS */}
                                    {!user.walletAddress && !user.network && (
                                        <div
                                            className="wallet-btn w-100 d-flex align-items-center justify-content-center p-3"
                                            onClick={handleWallet}
                                        >
                                            <p className="mb-0">
                                                CONNECT WALLET
                                            </p>
                                        </div>
                                    )}
                                    {user.walletAddress &&
                                        user.network === "Wrong Network!" && (
                                            <div
                                                className="wallet-btn w-100 d-flex align-items-center justify-content-center p-3"
                                                onClick={handleWallet}
                                            >
                                                <p className="mb-0">
                                                    WRONG NETWORK
                                                </p>
                                            </div>
                                        )}
                                    {user.walletAddress &&
                                        user.network !== "Wrong Network!" && (
                                            <>
                                                <div className="wallet-connected-wrapper py-3 w-100">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="wallet-connected-label mb-2">
                                                            <img
                                                                className="icon"
                                                                src={`${window.cdn}icons/icon_froyo.png`}
                                                                alt="wallet"
                                                            />
                                                        </div>
                                                        <div className="wallet-connected-value">
                                                            {user.tokenBalance >=
                                                            0
                                                                ? parseFloat(
                                                                      user.tokenBalance
                                                                  )
                                                                      ?.toFixed(
                                                                          2
                                                                      )
                                                                      ?.toLocaleString() +
                                                                  " FROYO"
                                                                : "Invalid token"}{" "}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="wallet-disconnect-btn w-100 d-flex align-items-center justify-content-center p-3 mt-3"
                                                        onClick={
                                                            handleWalletDisconnect
                                                        }
                                                    >
                                                        DISCONNECT WALLET
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                </div>
                                <div className="submenu-wrapper">
                                    <Link
                                        onClick={() =>
                                            setMobileProfileWallet(false)
                                        }
                                        to={{
                                            pathname: "/profile",
                                            state: {
                                                prevPath: location.pathname,
                                            },
                                        }}
                                    >
                                        Gamebox profile
                                    </Link>
                                    <p
                                        className="submenu-sign-out mt-2 mb-0"
                                        onClick={() => {
                                            setMobileProfileWallet(false);
                                            handleSignOut(dispatch);
                                        }}
                                    >
                                        Logout
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ConnectWallet
                selectWalletModalShown={selectWalletModalShown}
                setSelectWalletModalShown={setSelectWalletModalShown}
                invalidWalletModalShown={invalidWalletModalShown}
                setInvalidWalletModalShown={setInvalidWalletModalShown}
            />
        </>
    );
};

export default Header;
