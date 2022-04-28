import React, { useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Notification from "Components/Global/Notifications.component";

import loadPrizes from "redux/thunks/Prizes.thunk";
import SelectWalletsModal from "Components/Modals/SelectWallets.modal";

import { defaultUserImage } from "Utils/DefaultImage";
import { handleConnectWallet, disconnectWallet, handleMetamask, handleWalletConnect } from "Utils/ConnectWallet";
import { UPDATE_USER_WALLET } from "redux/types";

import { handleSignOut } from "Utils/SignOut";

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

    // const [hideGemsOnMobile, setHideGemsOnMobile] = useState(false);
    const [onHoverWallet, setOnWalletHover] = useState(false);
    const [selectWalletModalShown, setSelectWalletModalShown] = useState(false);
    const [mobileProfileWallet, setMobileProfileWallet] = useState(false);

    const dispatch = useDispatch();

    const history = useHistory();

    // useEffect(() => {
    //     window.addEventListener("resize", handleResize);

    //     function handleResize() {
    //         setHideGemsOnMobile(
    //             window.innerWidth > 767 
    //         );
    //     }
    //     handleResize();

    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, []);

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
        if (user.walletAddress) {
            if (user.network === "Wrong Network!") {
                handleConnectWallet(dispatch);    
            } else {
                handleWalletDropDown();
            }
        } else {
            setSelectWalletModalShown(true);
        }
        // await handleConnectWallet(dispatch, blockchainNetworks);
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

    const handleConnectMetamask = async () => {
        try {
            await handleMetamask(dispatch);
            await handleConnectWallet(dispatch);

            setSelectWalletModalShown(false);
        } catch (err) {
            if (err.code === 4903) {
                setSelectWalletModalShown(false);
            } else {
                console.log(err);
            }
        }
    }

    const handleConnectWalletConnect = async () => {
        try {
            await handleWalletConnect(dispatch);
            await handleConnectWallet(dispatch);

            setSelectWalletModalShown(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="navbar-top d-flex flex-column justify-content-center">
                <div className="col-12 px-1 px-lg-3 d-flex align-items-center justify-content-between">
                    {/* LOGO & NAV LINKS */}
                    <div className="left-items d-flex align-items-center justify-content-start">
                        <div className="d-flex">
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

                    </div>
                    {/* GEMS, NOTIFICATION ICON & PROFILE ICON */}
                    <div className="right-items w-100 d-flex align-items-center justify-content-end">
                        
                        <div
                            className="wallet-wrapper d-none d-sm-flex"
                            onClick={handleWallet}
                        >
                            {/* TOKEN VALUE & ADDRESS */}
                            <div className="info-wrapper w-100 d-flex align-items-center">
                                {!user.walletAddress && !user.network && (
                                    <p className="mb-0">Connect Wallet</p>
                                )}
                                {user.walletAddress &&
                                    user.network === "Wrong Network!" && (
                                        <p className="mb-0">Wrong Network</p>
                                )}

                                {user.walletAddress && user.network !== "Wrong Network!" && (
                                    <>
                                        <img
                                            className="icon"
                                            src={`${window.cdn}icons/icon_froyo.png`}
                                            alt="wallet"
                                        />
                                        <div className="ml-1">
                                            <p className="mb-1 d-flex">
                                                {user.tokenBalance >= 0 ? 
                                                    parseFloat(user.tokenBalance)?.toFixed(2)?.toLocaleString()
                                                    : "Invalid token"
                                                }{" "} 
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
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

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
                            <Link
                                className="d-none d-sm-flex"
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
                                        `${window.cdn}icons/icon_profile.svg`
                                    }
                                    alt="profile"
                                />
                            </Link>
                            <div 
                                className="d-flex d-sm-none"
                                onClick={() => setMobileProfileWallet(true)}
                            >
                                <img
                                    onError={(e) => defaultUserImage(e)}
                                    className="img-fluid"
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
                            <div className="overlay-profile-wallet"
                                onClick={() => setMobileProfileWallet(false)}>
                            </div>
                            <div className="profile-wallet-wrapper p-3">
                                <div className="profile-wrapper d-flex align-items-center mb-3">
                                    <div className="profile-avatar">
                                        <img
                                            onError={(e) => defaultUserImage(e)}
                                            className="img-fluid"
                                            src={
                                                user.picture ||
                                                `${window.cdn}icons/icon_profile.svg`
                                            }
                                            alt="profile"
                                        />
                                    </div>
                                    <div className="profile-name ml-3">{user.username}</div>
                                </div>
                                <div className="wallet-info-wrapper mb-3">
                                    {/* <div
                                        className="wallet-wrapper d-flex d-sm-none"
                                        onClick={handleWallet}
                                        > */}
                                    {/* TOKEN VALUE & ADDRESS */}
                                    {!user.walletAddress && !user.network && (
                                        <div className="wallet-btn w-100 d-flex align-items-center justify-content-center p-3"
                                            onClick={handleWallet}
                                        >
                                            <p className="mb-0">Connect Wallet</p>
                                        </div>
                                    )}
                                    {user.walletAddress && user.network === "Wrong Network!" && (
                                        <div className="wallet-btn w-100 d-flex align-items-center justify-content-center p-3"
                                            onClick={handleWallet}
                                        >
                                            <p className="mb-0">Wrong Network</p>
                                        </div>
                                    )}
                                    {user.walletAddress && user.network !== "Wrong Network!" && (
                                        <>
                                            <div className="wallet-connected-wrapper p-3 w-100">
                                                <div className="d-flex justify-content-between">
                                                    <div className="wallet-connected-label mb-2">Wallet address</div>
                                                    <div className="wallet-connected-value">
                                                        {user.walletAddress?.substring(
                                                            0,
                                                            5
                                                        )}
                                                        ....
                                                        {user.walletAddress?.substring(
                                                            user.walletAddress.length - 4
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <div className="wallet-connected-label mb-2">$Froyo tokens</div>
                                                    <div className="wallet-connected-value">
                                                        {user.tokenBalance >= 0 ? 
                                                            parseFloat(user.tokenBalance)?.toFixed(2)?.toLocaleString()
                                                            : "Invalid token"
                                                        }{" "} 
                                                    </div>
                                                </div>
                                                <div className="wallet-disconnect-btn text-right mt-3"
                                                    onClick={handleWalletDisconnect}
                                                >
                                                    Disconnect
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="submenu-wrapper">
                                    <Link
                                        onClick={() => setMobileProfileWallet(false)}
                                        to={{
                                            pathname: "/profile",
                                            state: {
                                                prevPath: history.location.pathname,
                                            },
                                        }}
                                    >
                                        My account
                                    </Link>
                                    <p className="submenu-sign-out mt-2 mb-0" 
                                        onClick={() => {
                                            setMobileProfileWallet(false);
                                            handleSignOut(dispatch);
                                        }}
                                    >
                                        Sign out
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>
            {selectWalletModalShown && (
                <SelectWalletsModal
                    handleInstructionsCloseBtn={
                        ()=>{setSelectWalletModalShown(false)}
                    }
                    handleConnectMetamask={handleConnectMetamask}
                    handleConnectWalletConnect={handleConnectWalletConnect}
                />
            )}

        </>
    );
};

export default Header;
