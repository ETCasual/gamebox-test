// REACT & REDUX
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// HELPER FUNCTIONS
import { scrollToTop } from "Utils/ScrollToTop";
import { handleSignOut } from "Utils/SignOut";
import { defaultUserImage } from "Utils/DefaultImage";
import {
    getCurrentLevelExp,
    getCurrentLevel,
    getCurrentMultiplier,
    getLevelProgress,
} from "Utils/CurrentLevel";

const Profile = ({
    handlePlayerLevelPanel,
    handleTeamPanel,
    handleHighScorePanel,
}) => {
    const { user } = useSelector((state) => state.userData);
    const { ranks } = useSelector((state) => state.ranks);
    const { config } = useSelector((state) => state.config);

    const dispatch = useDispatch();

    const history = useHistory();

    return (
        <section id="profile">
            <div className="container-fluid">
                {/* PROFILE */}
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-5">
                        <div className="row">
                            {/* PROFILE INFO */}
                            <div className="col-12 text-center">
                                <div className="profile-info">
                                    <Link
                                        to={{
                                            pathname: "/profile/edit",
                                            state: {
                                                prevPath:
                                                    history.location.pathname,
                                            },
                                        }}
                                    >
                                        <img
                                            onError={(e) => defaultUserImage(e)}
                                            src={
                                                user
                                                    ? user.picture
                                                    : `${window.cdn}art_assets/avatars/avatar_01.png`
                                            }
                                            alt="avatar"
                                        />
                                        <h3 className="user-name">
                                            {user.username}
                                        </h3>
                                        <p className="email-text">
                                            {user ? user.email : "..."}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                            {/* GEMS BALANCE */}
                            <div className="col-12 gem-balance d-flex align-items-center justify-content-between">
                                <p className="gem-balance-text mb-0 mb-md-2">
                                    Your gems balance
                                </p>
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
                                            width="24"
                                            src={`${window.cdn}art_assets/gems/gems.png`}
                                            alt="gems"
                                        />
                                        <span className="gems">
                                            {user.gems}
                                        </span>
                                        <img
                                            width="22"
                                            src={`${window.cdn}art_assets/buttons/button_addgems.png`}
                                            alt="add-gems"
                                        />
                                    </div>
                                </Link>
                            </div>
                            {/* MULTIPLIER */}
                            <div className="col-12 multiplier-holder">
                                <div
                                    className="multiplier p-4 d-flex flex-column align-items-start"
                                    onClick={handlePlayerLevelPanel}
                                >
                                    <p className="multiplier-info">
                                        Multiplier{" "}
                                        <span>
                                            {getCurrentMultiplier(
                                                user,
                                                ranks
                                            ) || 0}
                                            %
                                        </span>
                                    </p>
                                    {/* LEVEL */}
                                    <div className="w-100">
                                        <div className="level mb-2 d-flex align-items-center justify-content-between">
                                            <p className="mb-0 current-level">
                                                <span>
                                                    {getCurrentLevel(
                                                        user,
                                                        ranks
                                                    )}
                                                </span>
                                            </p>
                                            <div className="mb-0 d-flex align-items-center exp">
                                                <span className="player-exp">
                                                    {user.exp >
                                                    ranks[ranks.length - 1]?.exp
                                                        ? ranks[
                                                              ranks.length - 1
                                                          ]?.exp?.toLocaleString()
                                                        : user.exp?.toLocaleString()}
                                                </span>
                                                <span className="px-2">/</span>
                                                <span className="current-multiplier-total">
                                                    {getCurrentLevelExp(
                                                        user,
                                                        ranks
                                                    )?.toLocaleString()}
                                                </span>{" "}
                                                <img
                                                    className="ml-1"
                                                    width="18"
                                                    src={`${window.cdn}art_assets/icons/exp_01.png`}
                                                    alt="coin"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 px-0">
                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                        width: `${getLevelProgress(
                                                            user,
                                                            ranks
                                                        )}%`,
                                                    }}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                />
                                            </div>
                                            <div
                                                className="progressbar-shadow"
                                                role="progressbar"
                                                style={{
                                                    width: `${
                                                        getLevelProgress(
                                                            user,
                                                            ranks
                                                        ) >= 100
                                                            ? 100
                                                            : getLevelProgress(
                                                                  user,
                                                                  ranks
                                                              )
                                                    }%`,
                                                }}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* INVITE FRIENDS */}
                            <div className="col-12 invite-friends-holder">
                                <div className="team d-flex">
                                    <div
                                        className="col-12 col-md-6"
                                        onClick={handleTeamPanel}
                                    >
                                        <p className="team-title">
                                            Invite Friends
                                        </p>
                                        <p className="mb-2 d-flex align-items-center refer-text">
                                            Refer and get{" "}
                                            <span className="px-1">
                                                {config.gemsPerInvite}
                                            </span>
                                            <img
                                                width="24"
                                                src={`${window.cdn}art_assets/gems/gems.png`}
                                                alt="gems"
                                            />
                                        </p>
                                        <p className="mb-1 share-text">
                                            {`Share your referral code with
                                                your friends and get ${config.gemsPerInvite} Gems on
                                                us (for you and your friend)
                                                when your friend creates an
                                                account with us.`}
                                        </p>
                                    </div>
                                    <div className="d-none col-md-6 px-0 px-md-3 d-flex align-items-center justify-content-center">
                                        <img
                                            className="img-fluid bg-d"
                                            src={`${window.cdn}art_assets/illustrations/friends_01.png`}
                                            alt="invite"
                                        />
                                    </div>
                                    <img
                                        className="img-fluid bg-m d-md-none"
                                        src={`${window.cdn}art_assets/illustrations/friends_01.png`}
                                        alt="invite"
                                    />
                                </div>
                                <button
                                    className="invite-btn"
                                    onClick={handleTeamPanel}
                                >
                                    Invite friends
                                </button>
                            </div>
                            {/* HIGHSCORE & REWARDS */}
                            <div className="col-12 mt-4">
                                <div className="row">
                                    <div
                                        className="col-6 col-md-6 pr-1 pr-md-3 mb-4 mb-md-0"
                                        onClick={handleHighScorePanel}
                                    >
                                        <div className="highscore d-flex align-items-center justify-content-center">
                                            <img
                                                className="mr-2 icon"
                                                src={`${window.cdn}art_assets/icons/trophy.png`}
                                                alt="highscores"
                                            />
                                            <p className="mb-0 pl-1">
                                                Highscores
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-6 pl-1 pl-md-3 mb-4 mb-md-0">
                                        <Link
                                            onClick={scrollToTop}
                                            to={{
                                                pathname: "/profile/rewards",
                                                state: {
                                                    prevPath:
                                                        history.location
                                                            .pathname,
                                                },
                                            }}
                                        >
                                            <div className="rewards d-flex align-items-center justify-content-center">
                                                <img
                                                    className="mb-1 mr-2 icon"
                                                    src={`${window.cdn}art_assets/illustrations/rewards_close.png`}
                                                    alt="highscores"
                                                />
                                                <p className="d-flex align-items-center justify-content-around mb-0">
                                                    Rewards
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* SETTINGS */}
                            <div className="col-12 mt-0 mt-md-4 mb-5">
                                <Link
                                    onClick={scrollToTop}
                                    to={{
                                        pathname: "/profile/settings",
                                        state: {
                                            prevPath: history.location.pathname,
                                        },
                                    }}
                                >
                                    <div className="settings d-flex align-items-center justify-content-center">
                                        <img
                                            className="mr-2 icon"
                                            src={`${window.cdn}art_assets/icons/settings.png`}
                                            alt="setting"
                                        />{" "}
                                        <p className="mb-0">Settings</p>
                                    </div>
                                </Link>
                            </div>
                            {/* LOGOUT */}
                            <div className="col-12 text-center">
                                <button
                                    className="logout"
                                    onClick={() => handleSignOut(dispatch)}
                                >
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
