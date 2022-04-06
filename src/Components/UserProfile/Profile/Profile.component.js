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
import { handleConnectWallet } from "Utils/ConnectWallet";

const Profile = ({
    handlePlayerLevelPanel,
    handleTeamPanel,
    handleHighScorePanel,
}) => {
    const { user } = useSelector((state) => state.userData);
    const { ranks } = useSelector((state) => state.ranks);
    const { config } = useSelector((state) => state.config);
    const { blockchainNetworks } = useSelector((state) => state.blockchainNetworks);

    const dispatch = useDispatch();

    const history = useHistory();

    const handleWallet = async () => {
        if (user.walletAddress) return;

        await handleConnectWallet(dispatch, blockchainNetworks);
    };

    return (
        <section id="profile">
            <div className="container-fluid">
                {/* PROFILE */}
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-5">
                        <div className="row">
                            {/* PROFILE INFO */}
                            <div className="col-12 text-center mb-4 mb-md-5">
                                <div className={`profile-info`}>
                                    <img
                                        onError={(e) => defaultUserImage(e)}
                                        src={
                                            user
                                                ? user.picture
                                                : `${window.cdn}avatars/avatar_01.png`
                                        }
                                        alt="avatar"
                                    />
                                    <h3 className="user-name mt-4">
                                        {user.username || `Player ${user.id}`}
                                    </h3>
                                    <p className="email-text">
                                        {user ? user.email : "..."}
                                    </p>
                                </div>
                            </div>
                            {/* GEMS BALANCE */}
                            <div className="col-12 gem-balance d-flex align-items-center justify-content-between">
                                <p className="gem-balance-text mb-0 mb-md-2">
                                    Gems balance
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
                                            src={`${window.cdn}assets/additional_gems_01.png`}
                                            alt="gems"
                                        />
                                        <span className="gems">
                                            {user.gems}
                                        </span>
                                        <img
                                            width="22"
                                            src={`${window.cdn}buttons/button_plus.png`}
                                            alt="add-gems"
                                        />
                                    </div>
                                </Link>
                            </div>
                            {/* TOKEN BALANCE */}
                            <div className="col-12 mt-3 token-balance d-flex align-items-center justify-content-between">
                                <p className="gem-balance-text mb-0 mb-md-2">
                                    Froyo Tokens available
                                </p>
                                <div
                                    className="gem-wrapper"
                                    onClick={handleWallet}
                                >
                                    <img
                                        width="24"
                                        src={`${window.cdn}icons/icon_froyo.png`}
                                        alt="wallet"
                                    />
                                    {user.walletAddress && (
                                        <p className=" d-flex token-balance-text">
                                            {parseFloat(user.tokenBalance)
                                                ?.toFixed(2)
                                                ?.toLocaleString()}{" "}
                                            <small className="d-flex align-self-center ml-1">
                                                {user.tokenSymbol}
                                            </small>
                                        </p>
                                    )}
                                    {!user.walletAddress && (
                                        <p className="mb-0 ml-1 connect-text">
                                            Connect Wallet
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* MULTIPLIER */}
                            <div className="col-12 multiplier-holder mt-4">
                                <div
                                    className="multiplier p-3 p-md-4 d-flex flex-column align-items-start"
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
                                                <span className="px-1">/</span>
                                                <span className="current-multiplier-total">
                                                    {getCurrentLevelExp(
                                                        user,
                                                        ranks
                                                    )?.toLocaleString() +
                                                        " exp"}
                                                </span>{" "}
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
                            <div className="col-12 invite-friends-holder mt-4">
                                <div
                                    className="team d-flex align-items-center justify-content-between p-3 p-md-4"
                                    onClick={handleTeamPanel}
                                >
                                    <div className="col-7 col-md-6 p-0 pb-4">
                                        <p className="team-title">
                                            Invite Friends
                                        </p>
                                        <p className="pt-2 mb-2 d-flex align-items-center refer-text">
                                            Refer and get{" "}
                                            <span className="px-1">
                                                {config.gemsPerInvite} gems
                                            </span>
                                        </p>
                                        <p className="mb-1 share-text">
                                            {`Share your referral code with
                                                your friends and get ${config.gemsPerInvite} Gems on
                                                us (for you and your friend)
                                                when your friend creates an
                                                account with us.`}
                                        </p>
                                    </div>
                                    <div className="col-4 col-md-6 px-0 d-flex align-items-end justify-content-end">
                                        <img
                                            className="img-fluid bg d-none d-md-block"
                                            src={`${window.cdn}assets/model_friend_01.png`}
                                            alt="invite"
                                        />
                                        <img
                                            className="img-fluid bg"
                                            src={`${window.cdn}assets/model_friend_02.png`}
                                            alt="invite"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* HIGHSCORE & REWARDS */}
                            <div className="col-12 mt-4">
                                <div className="row">
                                    <div
                                        className="col-6 col-md-6 pr-1 pr-md-3 mb-4 mb-md-0"
                                        onClick={handleHighScorePanel}
                                    >
                                        <div className="highscore d-flex align-items-center justify-content-center">
                                            <p className="mb-0">Highscores</p>
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
                                                <p className="mb-0">Rewards</p>
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
                                        <p className="mb-0">Settings</p>
                                    </div>
                                </Link>
                            </div>
                            {/* LOGOUT */}
                            <div className="col-12 text-center mb-3">
                                <button
                                    className="logout"
                                    onClick={() => handleSignOut(dispatch)}
                                >
                                    Sign out
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
