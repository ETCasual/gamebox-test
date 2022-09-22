// REACT & REDUX
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation, Trans } from "react-i18next";

// COMPONENT FUNCTIONS
import ConnectWallet from "Components/Global/ConnectWallet.component";
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

// HELPER FUNCTIONS
import { handleSignOut } from "Utils/SignOut";
import { defaultUserImage, defaultGameImage } from "Utils/DefaultImage";
import {
    getCurrentLevelExp,
    getCurrentLevel,
    getCurrentMultiplier,
    getLevelProgress,
} from "Utils/CurrentLevel";
import { getNFTBalance } from "Utils/ConnectWallet";
// import { UPDATE_USER_WALLET } from "redux/types";

const Profile = ({
    handlePlayerLevelPanel,
    handleTeamPanel,
    handleHighScorePanel,
}) => {
    const { user } = useSelector((state) => state.userData);
    const { ranks } = useSelector((state) => state.ranks);
    const { config } = useSelector((state) => state.config);

    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [selectWalletModalShown, setSelectWalletModalShown] = useState(false);
    const [invalidWalletModalShown, setInvalidWalletModalShown] =
        useState(false);
    const [vipPassData, setVipPassData] = useState({
        symbol: "",
        quantity: 0,
    });
    const vipPassMediaUrl =
        "https://gamebox-froyo.s3.ap-southeast-1.amazonaws.com/app/rewards/vippass/mp4/vip_pass_01.mp4";

    const dispatch = useDispatch();

    const history = useHistory();

    const enableLevel = false;

    // const [hideGemsOnMobile, setHideGemsOnMobile] = useState(false);

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

    useEffect(() => {
        const handleCheckNFTBalance = async () => {
            const { nftBalance, symbol } = await getNFTBalance(
                user.walletAddress
            );
            setVipPassData({
                symbol: symbol,
                quantity: nftBalance,
            });
        };

        const isWalletConnected =
            user.walletAddress && user.network !== "Wrong Network!";
        setIsWalletConnected(isWalletConnected);

        if (isWalletConnected) {
            handleCheckNFTBalance();
        }
    }, [user]);

    const handleConnectWallet = async () => {
        setSelectWalletModalShown(true);
    };

    // const handleDisconnectWallet = () => {
    //     dispatch({
    //         type: UPDATE_USER_WALLET,
    //         payload: {
    //             ...user,
    //             walletAddress: null,
    //             tokenBalance: null,
    //             tokenSymbol: null,
    //             network: null,
    //         },
    //     });
    // };

    const { t } = useTranslation();

    return (
        <section id="profile">
            <div className="container-fluid">
                {/* PROFILE */}
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">
                        <div className="row">
                            {/* PROFILE INFO */}
                            <div className="col-12 text-center my-2">
                                <div className="row justify-content-between">
                                    <div className="col-12 col-md-6 mb-4 mb-md-0">
                                        <div className="profile-info d-md-flex justify-content-md-start">
                                            {/* PROFILE IMG */}
                                            <div
                                                className={`profile-img d-inline-flex ${
                                                    user?.isVip ? "is-vip" : ""
                                                }`}
                                            >
                                                <span>
                                                    <img
                                                        className="img-holder"
                                                        onError={(e) =>
                                                            defaultUserImage(e)
                                                        }
                                                        src={
                                                            user
                                                                ? user.picture
                                                                : `${window.cdn}icons/icon_profile.svg`
                                                        }
                                                        alt="avatar"
                                                    />
                                                </span>
                                                <span className="img-frame">
                                                    {user?.isVip && (
                                                        <img
                                                            className="vip-frame"
                                                            src={`${window.cdn}icons/icon_vip_frame_01.png`}
                                                            alt="vip-frame"
                                                        />
                                                    )}
                                                </span>
                                            </div>

                                            <div className="mx-4 my-3">
                                                <div className="d-inline-md-flex flex-md-column text-center text-md-left">
                                                    <div className="col-12">
                                                        <h3 className="user-name">
                                                            {user.username ||
                                                                t(
                                                                    "profile.defaultPlayer",
                                                                    {
                                                                        id: user.id,
                                                                    }
                                                                )}
                                                        </h3>
                                                    </div>
                                                    <div className="col-12">
                                                        <p className="email-text">
                                                            {user
                                                                ? user.email
                                                                : "..."}
                                                        </p>
                                                    </div>
                                                    <div className="col-12">
                                                        <Link
                                                            className="settings-btn"
                                                            to={{
                                                                pathname:
                                                                    "/profile/settings",
                                                                state: {
                                                                    prevPath:
                                                                        history
                                                                            .location
                                                                            .pathname,
                                                                },
                                                            }}
                                                        >
                                                            <div className="m-auto d-flex align-items-center justify-content-center">
                                                                <p className="mb-0">
                                                                    {t(
                                                                        "btn.settings"
                                                                    ).toUpperCase()}
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-auto d-flex justify-content-center align-items-end">
                                        <div className="row gem-balance align-items-center">
                                            {/* GEMS BALANCE */}
                                            <div className="col">
                                                <p className="gem-balance-text mb-0 mb-md-2">
                                                    {t("profile.gems")}
                                                </p>
                                            </div>
                                            <div className="col align-items-center justify-content-between">
                                                <Link
                                                    to={{
                                                        pathname: "/iap",
                                                        state: {
                                                            prevPath:
                                                                history.location
                                                                    .pathname,
                                                        },
                                                    }}
                                                >
                                                    <div className="gem-wrapper">
                                                        <img
                                                            width="24"
                                                            src={`${window.cdn}assets/gem_01.png`}
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
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* TOKEN BALANCE */}
                            {/* {!hideGemsOnMobile && (
                                <div className="col-12 mt-3 token-balance d-flex align-items-center justify-content-between">
                                    <p className="gem-balance-text mb-0 mb-md-2">
                                        Froyo Tokens available
                                    </p>
                                    <div
                                        className="gem-wrapper"
                                        onClick={
                                            user.walletAddress
                                                ? handleDisconnectWallet
                                                : handleWallet
                                        }
                                    >
                                        {user.walletAddress && (
                                            <img
                                                width="24"
                                                src={`${window.cdn}icons/icon_froyo.png`}
                                                alt="wallet"
                                            />
                                        )}
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
                            )} */}

                            {/* MULTIPLIER */}
                            {enableLevel && (
                                <div className="col-12 multiplier-holder mt-4">
                                    <div
                                        className="multiplier p-3 p-md-4 d-flex flex-column align-items-start"
                                        onClick={handlePlayerLevelPanel}
                                    >
                                        <p className="multiplier-info">
                                            <Trans
                                                i18nKey="playerLevel.multiplier"
                                                values={{
                                                    number:
                                                        getCurrentMultiplier(
                                                            user,
                                                            ranks
                                                        ) || 0,
                                                }}
                                            >
                                                {/* HACK: Trick the compile to think this as an element to render proper style */}
                                                <>0</>
                                                <span>1</span>
                                            </Trans>
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
                                                    <Trans
                                                        i18nKey="playerLevel.currency"
                                                        values={{
                                                            max: getCurrentLevelExp(
                                                                user,
                                                                ranks
                                                            )?.toLocaleString(),
                                                            expts:
                                                                user.exp >
                                                                ranks[
                                                                    ranks.length -
                                                                        1
                                                                ]?.exp
                                                                    ? ranks[
                                                                          ranks.length -
                                                                              1
                                                                      ]?.exp?.toLocaleString()
                                                                    : user.exp?.toLocaleString(),
                                                        }}
                                                    >
                                                        <span className="player-exp">
                                                            0
                                                        </span>
                                                        <span className="px-1">
                                                            1
                                                        </span>
                                                        <span className="current-multiplier-total">
                                                            2
                                                        </span>
                                                    </Trans>
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
                            )}
                            {/* INVITE FRIENDS */}
                            <div className="col-12 invite-friends-holder mt-4">
                                <div className="team d-flex align-items-center justify-content-between p-3 px-md-4 py-md-2">
                                    <div className="col-7 col-md-6 p-md-2">
                                        <p className="team-title">
                                            {t("invite.settings.title")}
                                        </p>
                                        <p className="pt-2 mb-2 d-flex align-items-center refer-text">
                                            <Trans
                                                i18nKey="invite.settings.subtitle"
                                                values={{
                                                    count: config.gemsPerInvite,
                                                }}
                                            >
                                                {/* HACK: Trick the compile to think this as an element to render proper style */}
                                                <>0</>
                                                <span className="px-2">1</span>
                                            </Trans>
                                            <img
                                                width="24"
                                                src={`${window.cdn}assets/gem_01.png`}
                                                alt="gems"
                                            />
                                        </p>
                                        <p className="mb-4 share-text">
                                            {t("invite.subtitle", {
                                                gems: config.gemsPerInvite,
                                                action:
                                                    config.rewardInvitesRank <=
                                                    0
                                                        ? "join Gamebox."
                                                        : `reaches level ${config.rewardInvitesRank} in GameBox`,
                                            })}
                                        </p>
                                        <div
                                            className="invite-btn d-flex align-items-center justify-content-center"
                                            // onClick={handleCheckNFTBalance}
                                            onClick={handleTeamPanel}
                                        >
                                            <p className="mb-0">
                                                {t(
                                                    "invite.settings.btn"
                                                ).toUpperCase()}
                                            </p>
                                        </div>
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
                                    <div className="col-6 col-md-6 pr-1 pr-md-3 mb-4 mb-md-0">
                                        <Link
                                            to={{
                                                pathname: "/profile/highscore",
                                                state: {
                                                    prevPath:
                                                        history.location
                                                            .pathname,
                                                },
                                            }}
                                        >
                                            <div className="highscore d-flex align-items-center justify-content-center">
                                                <p className="mb-0">
                                                    {t("highscore.title")}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-6 col-md-6 pl-1 pl-md-3 mb-4 mb-md-0">
                                        <Link
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
                                                <p className="mb-0">
                                                    {t(
                                                        "playerLevel.reward.title"
                                                    )}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* VIP PASS */}
                            {
                                <div className="col-12 mt-0 mt-md-4 mb-4">
                                    <div className="vip-pass-title mb-3">
                                        {t("VIPPass.name")}
                                    </div>
                                    <div className="vip-pass-holder py-4">
                                        {!isWalletConnected && (
                                            <div
                                                className="connect-btn d-flex align-items-center justify-content-center m-auto"
                                                onClick={handleConnectWallet}
                                            >
                                                <p className="mb-0">
                                                    {t(
                                                        "header.profile.connect_wallet"
                                                    )}
                                                </p>
                                            </div>
                                        )}

                                        {isWalletConnected &&
                                            vipPassData.quantity <= 0 && (
                                                <div className="text-center mt-2">
                                                    <p className="vip-pass-empty">
                                                        {t("VIPPass.noVip")}
                                                    </p>
                                                </div>
                                            )}

                                        {isWalletConnected &&
                                            vipPassData.quantity > 0 && (
                                                <div className="vip-pass-info row">
                                                    <div className="col-auto mx-auto">
                                                        <div className="vip-pass-card mx-3">
                                                            <ThumbnailMedia
                                                                className="vip-pass-thumb"
                                                                url={
                                                                    vipPassMediaUrl
                                                                }
                                                                isPlayVideo={
                                                                    true
                                                                }
                                                                onError={(e) =>
                                                                    defaultGameImage(
                                                                        e
                                                                    )
                                                                }
                                                            />
                                                            <div className="col-12 mt-3 text-center">
                                                                <p className="vip-pass-quantity">
                                                                    {t(
                                                                        "VIPPass.quantity",
                                                                        {
                                                                            count:
                                                                                vipPassData.quantity >
                                                                                1
                                                                                    ? ` (x${vipPassData.quantity})`
                                                                                    : "",
                                                                        }
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            }

                            {/* SETTINGS */}
                            {/* <div className="col-12 mt-0 mt-md-4 mb-5">
                                <Link
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
                            </div> */}

                            {/* LOGOUT */}
                            <div className="col-12 text-center my-4">
                                <button
                                    className="logout"
                                    onClick={() => handleSignOut(dispatch)}
                                >
                                    LOG OUT
                                </button>
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

export default Profile;
