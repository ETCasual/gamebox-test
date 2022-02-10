import React from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Notification from "Components/Global/Notifications.component";

import loadPrizes from "redux/thunks/Prizes.thunk";
import { defaultUserImage } from "Utils/DefaultImage";
import { scrollToTop } from "Utils/ScrollToTop";

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

    const handleHomeNavLink = () => {
        scrollToTop();
        dispatch(loadPrizes());
    };

    return (
        <>
            <div className="blur-overlay" />
            <div className="container-fluid navbar-top d-flex flex-column justify-content-center">
                <div className="row">
                    <div className="col-12 mx-auto d-flex flex-row justify-content-center">
                        {/* LOGO */}
                        <div className="col-3 col-md-2 col-lg-1 col-xl-1 d-flex align-items-center justify-content-between px-0 pl-md-1">
                            <Link
                                to="/"
                                className="d-flex"
                                onClick={handleHomeNavLink}
                            >
                                <img
                                    width={110}
                                    className="img-fluid"
                                    src={`${window.cdn}art_assets/logo/logo_esportsmini.png`}
                                    alt="Esports Mini"
                                />
                            </Link>
                        </div>

                        {/* NAV LINKS */}
                        <div className="col-md-5 col-lg-4 col-xl-4 d-none d-md-flex align-items-center justify-content-start nav-items">
                            <ul className="mb-0 d-flex list-unstyled">
                                <li>
                                    <NavLink
                                        onClick={handleHomeNavLink}
                                        exact
                                        to={{
                                            pathname: "/",
                                            state: {
                                                prevPath:
                                                    history.location.pathname,
                                            },
                                        }}
                                        activeClassName="active"
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li className="mx-5">
                                    <NavLink
                                        onClick={scrollToTop}
                                        to={{
                                            pathname: "/activity",
                                            state: {
                                                prevPath:
                                                    history.location.pathname,
                                            },
                                        }}
                                        activeClassName="active"
                                    >
                                        Activity
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        onClick={scrollToTop}
                                        to={{
                                            pathname: "/winners",
                                            state: {
                                                prevPath:
                                                    history.location.pathname,
                                            },
                                        }}
                                        activeClassName="active"
                                    >
                                        Winners
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        {/* GEMS, NOTIFICATION ICON & PROFILE ICON */}
                        <div className="col-9 col-md-4 col-lg-3 col-xl-3 d-flex align-items-center justify-content-end pr-1">
                            <div className="gems position-relative d-flex flex-nowrap align-items-center mr-2">
                                <Link
                                    onClick={scrollToTop}
                                    to={{
                                        pathname: "/iap",
                                        state: {
                                            prevPath: history.location.pathname,
                                        },
                                    }}
                                >
                                    <div className="gem-wrapper">
                                        <img
                                            className="gem-icon"
                                            src={`${window.cdn}art_assets/gems/gems.png`}
                                            alt="gems"
                                        />
                                        <span>{getGems() || 0}</span>
                                        <img
                                            className="add-gems-icon"
                                            src={`${window.cdn}art_assets/buttons/button_addgems.png`}
                                            alt="add-gems"
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="profile d-flex position-relative ml-2 order-1 order-lg-2">
                                    <Link
                                        onClick={scrollToTop}
                                        to={{
                                            pathname: "/profile",
                                            state: {
                                                prevPath:
                                                    history.location.pathname,
                                            },
                                        }}
                                    >
                                        <img
                                            onError={(e) => defaultUserImage(e)}
                                            className="img-fluid"
                                            src={
                                                userImage ||
                                                `${window.cdn}art_assets/icons/user.png`
                                            }
                                            alt="profile"
                                        />
                                    </Link>
                                </div>
                                <button
                                    className="notification p-0 semi-transparent"
                                    onClick={handleOnClickNotificationIcon}
                                >
                                    <img
                                        className="icon"
                                        src={`${
                                            window.cdn
                                        }art_assets/icons/notification_${
                                            notificationNumber.count > 0 &&
                                            notificationData.length > 0
                                                ? "yes"
                                                : "no"
                                        }.png`}
                                        alt="bell"
                                    />
                                    <div
                                        className={`notification-number ${
                                            notificationNumber.count > 0 &&
                                            notificationData.length > 0
                                                ? "d-flex "
                                                : " d-none"
                                        } align-items-center`}
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
                        </div>

                        {/* NOTIFICATION */}
                        {isNotificationShown && (
                            <Notification
                                notificationData={notificationData}
                                handleBackButton={
                                    handleNotificationPanelBackButton
                                }
                                handleNotificationLeaderboardHistory={
                                    handleNotificationLeaderboardHistory
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
