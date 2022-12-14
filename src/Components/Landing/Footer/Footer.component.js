import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import getFroyoGamesContactUrl from "Utils/GetFroyoGamesContact";

const Footer = () => {
    const { t } = useTranslation();

    const socialList = [
        {
            id: "twitter",
            icon: `${window.cdn}icons/social/icon_twitter.png`,
            url: "https://twitter.com/realfroyogames",
        },
        {
            id: "medium",
            icon: `${window.cdn}icons/social/icon_medium.png`,
            url: "https://medium.com/@froyogames",
        },
        {
            id: "discord",
            icon: `${window.cdn}icons/social/icon_discord.png`,
            url: "https://discord.com/invite/Aja3uWSSAS",
        },
        {
            id: "telegram",
            icon: `${window.cdn}icons/social/icon_telegram.png`,
            url: "https://t.me/froyogames",
        },
        {
            id: "github",
            icon: `${window.cdn}icons/social/icon_github.png`,
            url: "https://github.com/froyogames",
        },
        {
            id: "facebook",
            icon: `${window.cdn}icons/social/icon_facebook.png`,
            url: "https://www.facebook.com/realfroyogames",
        },
        {
            id: "instagram",
            icon: `${window.cdn}icons/social/icon_instagram.png`,
            url: "https://www.instagram.com/realfroyogames",
        },
        {
            id: "youtube",
            icon: `${window.cdn}icons/social/icon_youtube.png`,
            url: "https://www.youtube.com/channel/UC_IS0oR68lKx1qGxoIw-J3Q",
        },
    ];

    const { config } = useSelector((state) => state.config);
    const nowTimeStamp = () => Date.now() + (config?.offsetTimestamp || 0);

    const renderSocialElement = socialList.map((data) => (
        <li key={data.id}>
            <a target="_blank" rel="noopener noreferrer" href={data.url}>
                <img src={data.icon} alt={data.id} />
            </a>
        </li>
    ));

    return (
        <div className="footer">
            <div className="col-12 col-md-10 col-xl-8 footer-container mx-auto py-4 row">
                <div className="logo-image-container col-12 d-md-none mb-5">
                    <Link to="/">
                        <img
                            className="footer-img"
                            src={`${window.cdn}logo/logo_gamebox.png`}
                            alt="game-box-logo"
                        />
                    </Link>
                </div>
                <div className="about-info-container col-12 col-md-8 col-xl-7 no-gutters d-flex flex-wrap mb-3 mb-md-5">
                    <div className="about-detail-container d-flex flex-column col-12 col-md-4 mb-3">
                        <div className="title-text mb-2">
                            {t("footer.about")}
                        </div>
                        {/* <div className="subtitle-text mb-1">GameBox</div> */}
                        <div className="subtitle-text">
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={`${process.env.REACT_APP_FROYO_WEB_URL}/home`}
                            >
                                {t("footer.foryo_games")}
                            </a>
                        </div>
                    </div>
                    <div className="help-detail-container d-flex flex-column col-12 col-md-4 mb-3">
                        <div className="title-text mb-2">
                            {t("footer.help")}
                        </div>
                        <div className="subtitle-text">
                            <a
                                href={getFroyoGamesContactUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t("footer.contact_support")}
                            </a>
                        </div>
                    </div>
                    <div className="froyo-coin-detail-container d-flex flex-column col-12 col-md-4 mb-3">
                        <div className="title-text mb-2">
                            {t("footer.froyo_token")}
                        </div>
                        <div className="subtitle-text">
                            <a
                                className="subtitle-text"
                                target="_blank"
                                rel="noreferrer"
                                href={`${process.env.REACT_APP_FROYO_WEB_URL}/token`}
                            >
                                {t("footer.get_froyo")}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="join-community-container col-12 col-md-4 col-xl-5 text-md-right mb-5">
                    <div className="title-text mb-2">
                        {t("footer.join_community")}
                    </div>

                    <div className="logo-img-container">
                        <ul className="float-md-right">
                            {renderSocialElement}
                        </ul>

                        {/* <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.facebook.com/EsportsMini/"
                        >
                            <svg viewBox="0 0 112.196 112.196" width="42">
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
                            rel="noopener noreferrer"
                            href="https://www.instagram.com/esportsmini/"
                        >
                            <svg viewBox="0 0 24 24" width="42">
                                <linearGradient
                                    id="SVGID_1_"
                                    gradientTransform="matrix(0 -1.982 -1.844 0 -132.522 -51.077)"
                                    gradientUnits="userSpaceOnUse"
                                    x1="-37.106"
                                    x2="-26.555"
                                    y1="-72.705"
                                    y2="-84.047"
                                >
                                    <stop offset="0" stopColor="#fd5" />
                                    <stop offset=".5" stopColor="#ff543e" />
                                    <stop offset="1" stopColor="#c837ab" />
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
                            rel="noopener noreferrer"
                            href="https://twitter.com/esports_mini/"
                        >
                            <svg viewBox="0 0 112.197 112.197" width="42">
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
                        </a> */}
                    </div>
                </div>
                <div className="terms-and-conditions-container col-12 col-md-9 align-self-end">
                    <div className="trademark-container d-flex flex-wrap">
                        <span className="pr-2 d-none d-md-inline-flex">
                            {t("footer.copyright", {
                                year: new Date(nowTimeStamp()).getFullYear(),
                            })}
                        </span>
                        <span className="d-none d-md-inline-flex">&bull;</span>
                        <Link
                            className="pr-2 px-md-2"
                            to="/terms-and-conditions"
                        >
                            {t("footer.tnc")}
                        </Link>
                        <span>&bull;</span>
                        <Link className="px-2" to="/privacy-policy">
                            {t("footer.privacy_policy")}
                        </Link>
                        <span>&bull;</span>
                        <Link className="px-2" to="/tournament-rules">
                            {t("footer.tournament_rules")}
                        </Link>
                        <span className="d-md-none">&bull;</span>
                        <span className="pl-2 d-md-none">
                            {t("footer.copyright", {
                                year: new Date(nowTimeStamp()).getFullYear(),
                            })}
                        </span>
                    </div>
                </div>
                <div className="logo-image-container col-12 col-md-3 justify-content-end d-none d-md-inline-flex">
                    <Link to="/">
                        <img
                            className="footer-img"
                            src={`${window.cdn}logo/logo_gamebox.png`}
                            alt="game-box-logo"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
