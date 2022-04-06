import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import loadSpinnerRules from "redux/thunks/SpinnerRules.thunk";

const FortuneWheelSVG = ({ spinnerRules }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (spinnerRules.length <= 0) dispatch(loadSpinnerRules());
    }, [spinnerRules, dispatch]);

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
            <defs>
                <filter
                    id="Ellipse_1540"
                    x="162"
                    y="163"
                    width="176"
                    height="175"
                    filterUnits="userSpaceOnUse"
                >
                    <feOffset dy="12" input="SourceAlpha" />
                    <feGaussianBlur stdDeviation="10" result="blur" />
                    <feFlood
                        floodColor="#c48a00"
                        floodOpacity="0.161"
                        result="color"
                    />
                    <feComposite operator="out" in="SourceGraphic" in2="blur" />
                    <feComposite operator="in" in="color" />
                    <feComposite operator="in" in2="SourceGraphic" />
                </filter>
                <linearGradient
                    id="linear-gradient"
                    x1="0.5"
                    x2="0.5"
                    y2="1"
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset="0" stopColor="#fdc43d" />
                    <stop offset="1" stopColor="#efa500" />
                </linearGradient>
                <filter
                    id="Path_26883"
                    x="172.17"
                    y="183.391"
                    width="156.665"
                    height="156.665"
                    filterUnits="userSpaceOnUse"
                >
                    <feOffset dy="12" input="SourceAlpha" />
                    <feGaussianBlur stdDeviation="10" result="blur-2" />
                    <feFlood floodColor="#c48a00" floodOpacity="0.698" />
                    <feComposite operator="in" in2="blur-2" />
                    <feComposite in="SourceGraphic" />
                </filter>
                <linearGradient
                    id="linear-gradient-2"
                    x1="0.5"
                    x2="0.5"
                    y2="1"
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset="0" stopColor="#fdc43d" />
                    <stop offset="1" stopColor="#ff9300" />
                </linearGradient>
                <radialGradient
                    id="radial-gradient"
                    cx="0.5"
                    cy="0"
                    r="0.641"
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset="0" stopColor="#fff" stopOpacity="0.447" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
                <radialGradient
                    id="radial-gradient-2"
                    cx="0.5"
                    cy="-0.123"
                    r="0.764"
                    gradientTransform="translate(0 -0.005) scale(1 1.149)"
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset="0" stopColor="#fff" stopOpacity="0.506" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
                <clipPath id="clip-Landing_Page">
                    <rect width="500" height="500" />
                </clipPath>
            </defs>
            <g
                id="Landing_Page"
                data-name="Landing Page"
                clipPath="url(#clip-Landing_Page)"
            >
                <rect width="500" height="500" fill="none" />
                <circle
                    id="Ellipse_1539"
                    data-name="Ellipse 1539"
                    cx="224.5"
                    cy="224.5"
                    r="224.5"
                    transform="translate(26 25)"
                    fill="#ededed"
                />
                <g data-type="innerShadowGroup">
                    <ellipse
                        id="Ellipse_1540-2"
                        data-name="Ellipse 1540"
                        cx="88"
                        cy="87.5"
                        rx="88"
                        ry="87.5"
                        transform="translate(162 163)"
                        fill="#fdc43d"
                    />
                    <g
                        transform="matrix(1, 0, 0, 1, 0, 0)"
                        filter="url(#Ellipse_1540)"
                    >
                        <ellipse
                            id="Ellipse_1540-3"
                            data-name="Ellipse 1540"
                            cx="88"
                            cy="87.5"
                            rx="88"
                            ry="87.5"
                            transform="translate(162 163)"
                            fill="#fff"
                        />
                    </g>
                </g>
                <path
                    id="Path_26870"
                    data-name="Path 26870"
                    d="M810.548,272.245a146.328,146.328,0,0,1,33.652,3.9,6.919,6.919,0,0,0,8.185-4.582l16.573-51.008a6.973,6.973,0,0,0-4.812-8.889c-36.295-9.764-70.9-9.764-107.195,0a6.973,6.973,0,0,0-4.812,8.889l16.573,51.008a6.919,6.919,0,0,0,8.185,4.582A146.33,146.33,0,0,1,810.548,272.245Z"
                    transform="translate(-560.545 -168.1)"
                    fill="#f9bf38"
                />
                <path
                    id="Path_26886"
                    data-name="Path 26886"
                    d="M802.62,263.082a126.582,126.582,0,0,1,29.111,3.374,5.985,5.985,0,0,0,7.08-3.964l14.337-44.125a6.032,6.032,0,0,0-4.163-7.689,172.845,172.845,0,0,0-92.729,0,6.032,6.032,0,0,0-4.163,7.689l14.337,44.125a5.985,5.985,0,0,0,7.08,3.964A126.584,126.584,0,0,1,802.62,263.082Z"
                    transform="translate(-552.616 -162.986)"
                    fill="url(#radial-gradient-2)"
                />
                <text
                    id="_500"
                    data-name="500"
                    transform="translate(249 79)"
                    fill="#fff"
                    fontSize="22"
                    fontFamily="OpenSans-Bold, Open Sans"
                    fontWeight="700"
                >
                    <tspan x="-18.836" y="0">
                        {spinnerRules[0]?.tickets}
                    </tspan>
                </text>
                <path
                    id="Path_26889"
                    data-name="Path 26889"
                    d="M58.753,67.9A146.328,146.328,0,0,1,92.4,71.8a6.919,6.919,0,0,0,8.185-4.582l16.573-51.008a6.973,6.973,0,0,0-4.812-8.889c-36.295-9.764-70.9-9.764-107.195,0A6.973,6.973,0,0,0,.344,16.212L16.917,67.22A6.919,6.919,0,0,0,25.1,71.8,146.33,146.33,0,0,1,58.753,67.9Z"
                    transform="matrix(0.809, 0.588, -0.588, 0.809, 328.277, 42.739)"
                    fill="#f9bf38"
                />
                <path
                    id="Path_26890"
                    data-name="Path 26890"
                    d="M50.825,58.738a126.582,126.582,0,0,1,29.111,3.374,5.985,5.985,0,0,0,7.08-3.964l14.337-44.125A6.032,6.032,0,0,0,97.19,6.335a172.845,172.845,0,0,0-92.729,0A6.032,6.032,0,0,0,.3,14.024L14.634,58.149a5.985,5.985,0,0,0,7.08,3.964A126.584,126.584,0,0,1,50.825,58.738Z"
                    transform="matrix(0.809, 0.588, -0.588, 0.809, 331.841, 51.763)"
                    fill="url(#radial-gradient-2)"
                />
                <text
                    id="_350"
                    data-name="350"
                    transform="matrix(0.809, 0.588, -0.588, 0.809, 352.993, 107.379)"
                    fill="#fff"
                    fontSize="15"
                    fontFamily="OpenSans-Bold, Open Sans"
                    fontWeight="700"
                >
                    <tspan x="-12.843" y="0">
                        {spinnerRules[1]?.tickets}
                    </tspan>
                </text>
                <path
                    id="Path_26889-2"
                    data-name="Path 26889"
                    d="M58.753,67.9A146.328,146.328,0,0,1,92.4,71.8a6.919,6.919,0,0,0,8.185-4.582l16.573-51.008a6.973,6.973,0,0,0-4.812-8.889c-36.295-9.764-70.9-9.764-107.195,0A6.973,6.973,0,0,0,.344,16.212L16.917,67.22A6.919,6.919,0,0,0,25.1,71.8,146.33,146.33,0,0,1,58.753,67.9Z"
                    transform="matrix(0.809, -0.588, 0.588, 0.809, 78.024, 111.807)"
                    fill="#f9bf38"
                />
                <path
                    id="Path_26890-2"
                    data-name="Path 26890"
                    d="M50.825,58.738a126.582,126.582,0,0,1,29.111,3.374,5.985,5.985,0,0,0,7.08-3.964l14.337-44.125A6.032,6.032,0,0,0,97.19,6.335a172.845,172.845,0,0,0-92.729,0A6.032,6.032,0,0,0,.3,14.024L14.634,58.149a5.985,5.985,0,0,0,7.08,3.964A126.584,126.584,0,0,1,50.825,58.738Z"
                    transform="matrix(0.809, -0.588, 0.588, 0.809, 87.707, 111.207)"
                    fill="url(#radial-gradient-2)"
                />
                <text
                    id="_250"
                    data-name="250"
                    transform="matrix(0.809, -0.588, 0.588, 0.809, 147.138, 108.276)"
                    fill="#fff"
                    fontSize="15"
                    fontFamily="OpenSans-Bold, Open Sans"
                    fontWeight="700"
                >
                    <tspan x="-12.843" y="0">
                        {spinnerRules[9]?.tickets}
                    </tspan>
                </text>
                <path
                    id="Path_26889-3"
                    data-name="Path 26889"
                    d="M58.753,67.9A146.328,146.328,0,0,1,92.4,71.8a6.919,6.919,0,0,0,8.185-4.582l16.573-51.008a6.973,6.973,0,0,0-4.812-8.889c-36.295-9.764-70.9-9.764-107.195,0A6.973,6.973,0,0,0,.344,16.212L16.917,67.22A6.919,6.919,0,0,0,25.1,71.8,146.33,146.33,0,0,1,58.753,67.9Z"
                    transform="translate(434.782 127.72) rotate(72)"
                    fill="#f9bf38"
                />
                <path
                    id="Path_26890-3"
                    data-name="Path 26890"
                    d="M50.825,58.738a126.582,126.582,0,0,1,29.111,3.374,5.985,5.985,0,0,0,7.08-3.964l14.337-44.125A6.032,6.032,0,0,0,97.19,6.335a172.845,172.845,0,0,0-92.729,0A6.032,6.032,0,0,0,.3,14.024L14.634,58.149a5.985,5.985,0,0,0,7.08,3.964A126.584,126.584,0,0,1,50.825,58.738Z"
                    transform="translate(432.361 137.116) rotate(72)"
                    fill="url(#radial-gradient-2)"
                />
                <text
                    id="_100"
                    data-name="100"
                    transform="translate(416.783 194.543) rotate(72)"
                    fill="#fff"
                    fontSize="15"
                    fontFamily="OpenSans-Bold, Open Sans"
                    fontWeight="700"
                >
                    <tspan x="-12.843" y="0">
                        {spinnerRules[2]?.tickets}
                    </tspan>
                </text>
                <path
                    id="Path_26889-4"
                    data-name="Path 26889"
                    d="M58.753,67.9A146.328,146.328,0,0,1,92.4,71.8a6.919,6.919,0,0,0,8.185-4.582l16.573-51.008a6.973,6.973,0,0,0-4.812-8.889c-36.295-9.764-70.9-9.764-107.195,0A6.973,6.973,0,0,0,.344,16.212L16.917,67.22A6.919,6.919,0,0,0,25.1,71.8,146.33,146.33,0,0,1,58.753,67.9Z"
                    transform="matrix(0.309, -0.951, 0.951, 0.309, 29.565, 239.476)"
                    fill="#f9bf38"
                />
                <path
                    id="Path_26890-4"
                    data-name="Path 26890"
                    d="M50.825,58.738a126.582,126.582,0,0,1,29.111,3.374,5.985,5.985,0,0,0,7.08-3.964l14.337-44.125A6.032,6.032,0,0,0,97.19,6.335a172.845,172.845,0,0,0-92.729,0A6.032,6.032,0,0,0,.3,14.024L14.634,58.149a5.985,5.985,0,0,0,7.08,3.964A126.584,126.584,0,0,1,50.825,58.738Z"
                    transform="matrix(0.309, -0.951, 0.951, 0.309, 37.047, 233.299)"
                    fill="url(#radial-gradient-2)"
                />
                <text
                    id="_50"
                    data-name="50"
                    transform="matrix(0.309, -0.951, 0.951, 0.309, 84.541, 195.733)"
                    fill="#fff"
                    fontSize="16"
                    fontFamily="OpenSans-Bold, Open Sans"
                    fontWeight="700"
                >
                    <tspan x="-9.133" y="0">
                        {spinnerRules[8]?.tickets}
                    </tspan>
                </text>
                <path
                    id="Path_26870-2"
                    data-name="Path 26870"
                    d="M58.753,67.9A146.328,146.328,0,0,1,92.4,71.8a6.919,6.919,0,0,0,8.185-4.582l16.573-51.008a6.973,6.973,0,0,0-4.812-8.889c-36.295-9.764-70.9-9.764-107.195,0A6.973,6.973,0,0,0,.344,16.212L16.917,67.22A6.919,6.919,0,0,0,25.1,71.8,146.33,146.33,0,0,1,58.753,67.9Z"
                    transform="translate(309.408 462.3) rotate(180)"
                    fill="#f9bf38"
                />
                <path
                    id="Path_26886-2"
                    data-name="Path 26886"
                    d="M50.825,58.738a126.582,126.582,0,0,1,29.111,3.374,5.985,5.985,0,0,0,7.08-3.964l14.337-44.125A6.032,6.032,0,0,0,97.19,6.335a172.845,172.845,0,0,0-92.729,0A6.032,6.032,0,0,0,.3,14.024L14.634,58.149a5.985,5.985,0,0,0,7.08,3.964A126.584,126.584,0,0,1,50.825,58.738Z"
                    transform="translate(301.48 457.186) rotate(180)"
                    fill="url(#radial-gradient-2)"
                />
                <text
                    id="_400"
                    data-name="400"
                    transform="translate(251.4 419.182) rotate(180)"
                    fill="#fff"
                    fontSize="22"
                    fontFamily="OpenSans-Bold, Open Sans"
                    fontWeight="700"
                >
                    <tspan x="-18.836" y="0">
                        {spinnerRules[5]?.tickets}
                    </tspan>
                </text>
                <path
                    id="Path_26889-5"
                    data-name="Path 26889"
                    d="M58.753,67.9A146.328,146.328,0,0,1,92.4,71.8a6.919,6.919,0,0,0,8.185-4.582l16.573-51.008a6.973,6.973,0,0,0-4.812-8.889c-36.295-9.764-70.9-9.764-107.195,0A6.973,6.973,0,0,0,.344,16.212L16.917,67.22A6.919,6.919,0,0,0,25.1,71.8,146.33,146.33,0,0,1,58.753,67.9Z"
                    transform="matrix(-0.809, -0.588, 0.588, -0.809, 172.381, 455.806)"
                    fill="#f9bf38"
                />
                <path
                    id="Path_26890-5"
                    data-name="Path 26890"
                    d="M50.825,58.738a126.582,126.582,0,0,1,29.111,3.374,5.985,5.985,0,0,0,7.08-3.964l14.337-44.125A6.032,6.032,0,0,0,97.19,6.335a172.845,172.845,0,0,0-92.729,0A6.032,6.032,0,0,0,.3,14.024L14.634,58.149a5.985,5.985,0,0,0,7.08,3.964A126.584,126.584,0,0,1,50.825,58.738Z"
                    transform="matrix(-0.809, -0.588, 0.588, -0.809, 168.817, 446.782)"
                    fill="url(#radial-gradient-2)"
                />
                <text
                    id="_300"
                    data-name="300"
                    transform="matrix(-0.809, -0.588, 0.588, -0.809, 147.665, 391.165)"
                    fill="#fff"
                    fontSize="15"
                    fontFamily="OpenSans-Bold, Open Sans"
                    fontWeight="700"
                >
                    <tspan x="-12.843" y="0">
                        {spinnerRules[6]?.tickets}
                    </tspan>
                </text>
                <path
                    id="Path_26889-6"
                    data-name="Path 26889"
                    d="M58.753,67.9A146.328,146.328,0,0,1,92.4,71.8a6.919,6.919,0,0,0,8.185-4.582l16.573-51.008a6.973,6.973,0,0,0-4.812-8.889c-36.295-9.764-70.9-9.764-107.195,0A6.973,6.973,0,0,0,.344,16.212L16.917,67.22A6.919,6.919,0,0,0,25.1,71.8,146.33,146.33,0,0,1,58.753,67.9Z"
                    transform="matrix(-0.809, 0.588, -0.588, -0.809, 422.634, 386.737)"
                    fill="#f9bf38"
                />
                <path
                    id="Path_26890-6"
                    data-name="Path 26890"
                    d="M50.825,58.738a126.582,126.582,0,0,1,29.111,3.374,5.985,5.985,0,0,0,7.08-3.964l14.337-44.125A6.032,6.032,0,0,0,97.19,6.335a172.845,172.845,0,0,0-92.729,0A6.032,6.032,0,0,0,.3,14.024L14.634,58.149a5.985,5.985,0,0,0,7.08,3.964A126.584,126.584,0,0,1,50.825,58.738Z"
                    transform="matrix(-0.809, 0.588, -0.588, -0.809, 412.95, 387.338)"
                    fill="url(#radial-gradient-2)"
                />
                <text
                    id="_200"
                    data-name="200"
                    transform="matrix(-0.809, 0.588, -0.588, -0.809, 353.519, 390.269)"
                    fill="#fff"
                    fontSize="15"
                    fontFamily="OpenSans-Bold, Open Sans"
                    fontWeight="700"
                >
                    <tspan x="-12.843" y="0">
                        {spinnerRules[4]?.tickets}
                    </tspan>
                </text>
                <path
                    id="Path_26889-7"
                    data-name="Path 26889"
                    d="M58.753,67.9A146.328,146.328,0,0,1,92.4,71.8a6.919,6.919,0,0,0,8.185-4.582l16.573-51.008a6.973,6.973,0,0,0-4.812-8.889c-36.295-9.764-70.9-9.764-107.195,0A6.973,6.973,0,0,0,.344,16.212L16.917,67.22A6.919,6.919,0,0,0,25.1,71.8,146.33,146.33,0,0,1,58.753,67.9Z"
                    transform="translate(65.876 370.824) rotate(-108)"
                    fill="#f9bf38"
                />
                <path
                    id="Path_26890-7"
                    data-name="Path 26890"
                    d="M50.825,58.738a126.582,126.582,0,0,1,29.111,3.374,5.985,5.985,0,0,0,7.08-3.964l14.337-44.125A6.032,6.032,0,0,0,97.19,6.335a172.845,172.845,0,0,0-92.729,0A6.032,6.032,0,0,0,.3,14.024L14.634,58.149a5.985,5.985,0,0,0,7.08,3.964A126.584,126.584,0,0,1,50.825,58.738Z"
                    transform="translate(68.297 361.429) rotate(-108)"
                    fill="url(#radial-gradient-2)"
                />
                <text
                    id="_75"
                    data-name="75"
                    transform="translate(84.641 303.121) rotate(-108)"
                    fill="#fff"
                    fontSize="16"
                    fontFamily="OpenSans-Bold, Open Sans"
                    fontWeight="700"
                >
                    <tspan x="-9.133" y="0">
                        {spinnerRules[7]?.tickets}
                    </tspan>
                </text>
                <path
                    id="Path_26889-8"
                    data-name="Path 26889"
                    d="M58.753,67.9A146.328,146.328,0,0,1,92.4,71.8a6.919,6.919,0,0,0,8.185-4.582l16.573-51.008a6.973,6.973,0,0,0-4.812-8.889c-36.295-9.764-70.9-9.764-107.195,0A6.973,6.973,0,0,0,.344,16.212L16.917,67.22A6.919,6.919,0,0,0,25.1,71.8,146.33,146.33,0,0,1,58.753,67.9Z"
                    transform="matrix(-0.309, 0.951, -0.951, -0.309, 471.093, 259.068)"
                    fill="#f9bf38"
                />
                <path
                    id="Path_26890-8"
                    data-name="Path 26890"
                    d="M50.825,58.738a126.582,126.582,0,0,1,29.111,3.374,5.985,5.985,0,0,0,7.08-3.964l14.337-44.125A6.032,6.032,0,0,0,97.19,6.335a172.845,172.845,0,0,0-92.729,0A6.032,6.032,0,0,0,.3,14.024L14.634,58.149a5.985,5.985,0,0,0,7.08,3.964A126.584,126.584,0,0,1,50.825,58.738Z"
                    transform="matrix(-0.309, 0.951, -0.951, -0.309, 463.611, 265.246)"
                    fill="url(#radial-gradient-2)"
                />
                <text
                    id="_10"
                    data-name="10"
                    transform="matrix(-0.309, 0.951, -0.951, -0.309, 416.117, 302.812)"
                    fill="#fff"
                    fontSize="16"
                    fontFamily="OpenSans-Bold, Open Sans"
                    fontWeight="700"
                >
                    <tspan x="-9.133" y="0">
                        {spinnerRules[3]?.tickets}
                    </tspan>
                </text>
            </g>
        </svg>
    );
};

export default FortuneWheelSVG;
