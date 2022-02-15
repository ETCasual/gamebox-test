import { Link } from "react-router-dom";
import { scrollToTop } from "Utils/ScrollToTop";

const Footer = () => {
    return (
        <div class="footer">
            <div class="row ">
                <div class="col">
                    <div class="d-flex mt-5">
                        <ul class="list list-unstyled mx-auto justify-content-center">
                            {/* ABOUT */}
                            <li class=" title list-item">ABOUT</li>
                            <li class=" subtitle list-item mt-2">
                                <Link
                                    target="_blank"
                                    to={{
                                        pathname:
                                            "https://www.facebook.com/EsportsMini/",
                                    }}
                                >
                                    GameBox
                                </Link>
                            </li>
                            <li class="subtitle list-item mt-2">
                                <Link
                                    target="_blank"
                                    to={{
                                        pathname:
                                            "https://www.instagram.com/esportsmini/",
                                    }}
                                >
                                    Froyo
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col">
                    {/* HELP */}
                    <div class="d-flex mt-5">
                        <ul class="list list-unstyled mx-auto justify-content-center">
                            <li class=" title list-item">HELP</li>
                            <li class=" subtitle list-item mt-2">
                                <Link
                                    target="_blank"
                                    to={{
                                        pathname:
                                            "https://www.facebook.com/EsportsMini/",
                                    }}
                                >
                                    Contact us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col">
                    {/* FROYO COIN */}
                    <div class="d-flex mt-5">
                        <ul class="list list-unstyled mx-auto justify-content-center">
                            <li class=" title list-item">FROYO COIN</li>
                            <li class=" subtitle list-item mt-2">
                                <Link
                                    target="_blank"
                                    to={{
                                        pathname:
                                            "https://www.facebook.com/EsportsMini/",
                                    }}
                                >
                                    Get Froyo Coin
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-4">
                </div>
                <div class="col">
                    <div class="d-flex mt-5">
                        <ul class="list list-unstyled">
                            {/* JOIN OUR COMMUNITY */}
                            <li class=" title list-item">JOIN OUR COMMUNITY</li>
                            <div class="align-items-center d-flex mt-4">
                                {/* FACEBOOK */}
                                <li>
                                    <Link
                                        target="_blank"
                                        to={{
                                            pathname:
                                                "https://www.facebook.com/EsportsMini/",
                                        }}
                                    >
                                        <svg
                                            viewBox="0 0 112.196 112.196"
                                            width="42"
                                        >
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
                                    </Link>
                                </li>
                                {/* INSTAGRAM */}
                                <li>
                                    <Link
                                        className="mx-3"
                                        target="_blank"
                                        to={{
                                            pathname:
                                                "https://www.instagram.com/esportsmini/",
                                        }}
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
                                    </Link>
                                </li>
                                {/* TWITTER */}
                                <li>
                                    <Link
                                        target="_blank"
                                        to={{
                                            pathname:
                                                "https://twitter.com/esports_mini/",
                                        }}
                                    >
                                        <svg
                                            viewBox="0 0 112.197 112.197"
                                            width="42"
                                        >
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
                                    </Link>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
