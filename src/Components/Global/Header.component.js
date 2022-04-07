import React, { useEffect, useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Notification from "Components/Global/Notifications.component";

import loadPrizes from "redux/thunks/Prizes.thunk";

import { defaultUserImage } from "Utils/DefaultImage";
import { handleConnectWallet } from "Utils/ConnectWallet";
import { UPDATE_USER_WALLET } from "redux/types";

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
    const { blockchainNetworks } = useSelector(
        (state) => state.blockchainNetworks
    );

    const [hideGemsOnMobile, setHideGemsOnMobile] = useState(false);
    const [onHoverWallet, setOnWalletHover] = useState(false);

    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        function handleResize() {
            setHideGemsOnMobile(
                window.innerWidth > 767 && window.ethereum ? false : true
            );
        }
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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

    const handleHomeNavLink = () => {
        dispatch(loadPrizes());
    };

    const handleWallet = async () => {
        if (user.walletAddress) return;

        await handleConnectWallet(dispatch, blockchainNetworks);
    };

    const handleWalletDropDown = () => {
        user.walletAddress && setOnWalletHover(true);
    };

    const handleWalletDisconnect = () => {
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
        <div className="navbar-top d-flex flex-column justify-content-center">
            <div className="col-12 px-1 px-lg-3 d-flex align-items-center justify-content-between">
                {/* LOGO & NAV LINKS */}
                <div className="left-items d-flex align-items-center justify-content-start">
                    <Link to="/" className="logo" onClick={handleHomeNavLink}>
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
                                    prevPath: history.location.pathname,
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
                                    prevPath: history.location.pathname,
                                },
                            }}
                            activeClassName="active"
                        >
                            <div className="py-4 px-2 mx-2">Activities</div>
                        </NavLink>
                        <NavLink
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
                <div className="right-items w-100 d-flex align-items-center justify-content-end">
                    {!hideGemsOnMobile && (
                        <div
                            className="wallet-wrapper"
                            onClick={handleWalletDropDown}
                        >
                            {/* ICON */}
                            {user.walletAddress && (
                                <img
                                    className="icon"
                                    src={`${window.cdn}icons/icon_froyo.png`}
                                    alt="wallet"
                                />
                            )}
                            {/* TOKEN VALUE & ADDRESS */}
                            <div
                                className="info-wrapper ml-1 w-100"
                                onClick={handleWallet}
                            >
                                {user.walletAddress && (
                                    <>
                                        <p className="mb-1 d-flex">
                                            {parseFloat(user.tokenBalance)
                                                ?.toFixed(2)
                                                ?.toLocaleString()}{" "}
                                            <small className="d-flex align-self-center ml-1">
                                                {user.tokenSymbol}
                                            </small>
                                        </p>
                                        <p className="mb-0">
                                            {user.walletAddress?.substring(
                                                0,
                                                5
                                            )}
                                            ....
                                            {user.walletAddress?.substring(
                                                user.walletAddress.length - 4
                                            )}
                                        </p>
                                    </>
                                )}
                                {!user.walletAddress && !user.network && (
                                    <p className="mb-0">Connect Wallet</p>
                                )}
                                {!user.walletAddress &&
                                    user.network === "Wrong Network!" && (
                                        <p className="mb-0">Wrong Network</p>
                                    )}
                            </div>
                        </div>
                    )}
                    <div className="position-relative d-flex flex-nowrap align-items-center mx-2">
                        <Link
                            className="gem-wrapper"
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
                                    `${window.cdn}icons/icon_profile.png`
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

                {/* DISCONNET */}
                {onHoverWallet && user.walletAddress && (
                    <div
                        className="disconnect-wrapper d-none d-md-flex align-items-center justify-content-center"
                        onClick={handleWalletDisconnect}
                    >
                        Disconnect
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
