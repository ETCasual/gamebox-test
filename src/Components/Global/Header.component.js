import React from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Notification from "Components/Global/Notifications.component";

import loadPrizes from "redux/thunks/Prizes.thunk";

import { defaultUserImage } from "Utils/DefaultImage";
import { scrollToTop } from "Utils/ScrollToTop";
import { handleConnectWallet } from "Utils/ConnectWallet";

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

    const dispatch = useDispatch();

    const history = useHistory();

    // GETTING GEMS
    const getGems = () => {
        let _earnAdditional = [...earnAdditionalBenefitStatus];
        if (_earnAdditional.lenght > 1) {
            let now = Date.now();
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

    const getWalletAmount = () => {
        const amount = 4;
        return amount.toFixed(2).toLocaleString();
    };

    const handleHomeNavLink = () => {
        scrollToTop();
        dispatch(loadPrizes());
    };

    const handleWallet = async () => {
        if (user.walletAddress) return;

        await handleConnectWallet(dispatch);
    };

    return (
        <>
            <div className="navbar-top d-flex flex-column justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-7 mx-auto d-flex align-items-center justify-content-between">
                    {/* LOGO & NAV LINKS */}
                    <div className="left-items d-none d-md-flex align-items-center justify-content-start">
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

                        <div className="pl-3 d-flex nav-items">
                            <NavLink
                                onClick={handleHomeNavLink}
                                exact
                                to={{
                                    pathname: "/",
                                    state: {
                                        prevPath: history.location.pathname,
                                    },
                                }}
                                activeClassName="active"
                            >
                                <div className="py-4 px-2 mx-2">Home</div>
                            </NavLink>
                            <NavLink
                                onClick={scrollToTop}
                                to={{
                                    pathname: "/activity",
                                    state: {
                                        prevPath: history.location.pathname,
                                    },
                                }}
                                activeClassName="active"
                            >
                                <div className="py-4 px-2 mx-2">Activities</div>
                            </NavLink>
                            <NavLink
                                onClick={scrollToTop}
                                to={{
                                    pathname: "/winners",
                                    state: {
                                        prevPath: history.location.pathname,
                                    },
                                }}
                                activeClassName="active"
                            >
                                <div className="py-4 px-2 mx-2">Winners</div>
                            </NavLink>
                        </div>
                    </div>
                    {/* GEMS, NOTIFICATION ICON & PROFILE ICON */}
                    <div className="right-items w-100 d-flex align-items-center justify-content-md-end justify-content-around">
                        <div className="wallet-wrapper">
                            {user.walletAddress && (
                                <img
                                    className="icon"
                                    src={`${window.cdn}assets/wallet_01.png`}
                                    alt="wallet"
                                />
                            )}
                            <div
                                className="info-wrapper ml-1 w-100"
                                onClick={handleWallet}
                            >
                                {user.walletAddress && (
                                    <>
                                        <p className="mb-1 d-flex">
                                            {getWalletAmount() || 0}{" "}
                                            <small className="d-flex align-self-center ml-1">
                                                froyo
                                            </small>
                                        </p>
                                        <p className="mb-0">
                                            {user.walletAddress?.substring(
                                                0,
                                                4
                                            )}
                                            ....
                                            {user.walletAddress?.substring(
                                                user.walletAddress.length - 5,
                                                user.walletAddress.length - 1
                                            )}
                                        </p>
                                    </>
                                )}
                                {!user.walletAddress && (
                                    <p className="mb-0">Connect Wallet</p>
                                )}
                            </div>
                        </div>
                        <div className="position-relative d-flex flex-nowrap align-items-center mx-2">
                            <Link
                                className="gem-wrapper"
                                onClick={scrollToTop}
                                to={{
                                    pathname: "/iap",
                                    state: {
                                        prevPath: history.location.pathname,
                                    },
                                }}
                            >
                                <img
                                    className="icon"
                                    src={`${window.cdn}assets/additional_gems_01.png`}
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
                            <Link
                                onClick={scrollToTop}
                                to={{
                                    pathname: "/profile",
                                    state: {
                                        prevPath: history.location.pathname,
                                    },
                                }}
                            >
                                <img
                                    onError={(e) => defaultUserImage(e)}
                                    className="img-fluid"
                                    src={
                                        userImage ||
                                        `${window.cdn}icons/icons/icon_profile.png`
                                    }
                                    alt="profile"
                                />
                            </Link>
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
                </div>
            </div>
        </>
    );
};

export default Header;
