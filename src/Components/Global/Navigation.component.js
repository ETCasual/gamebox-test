import React, { useRef, useCallback, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { gsap } from "gsap";
import { scrollToTop } from "Utils/ScrollToTop";

const Navigation = () => {
    const history = useHistory();

    const path = window.location.pathname;

    const navWrapperRef = useRef(null);

    const onClickNavigationTabs = (e) => {
        gsap.to(e.target, {
            duration: 0.3,
            y: -5,
            ease: "power4.out",
            onComplete: () =>
                gsap.to(e.target, {
                    duration: 0.7,
                    y: 0,
                    ease: "Bounce.easeOut",
                }),
        });
    };

    const handleMobileNavbarBottom = useCallback(() => {
        const tl = gsap.timeline();
        const routes = path === "/profile" || path === "/notifications" || path === "/iap";
        tl.to(
            [
                navWrapperRef.current?.childNodes[0],
                navWrapperRef.current?.childNodes[1],
                navWrapperRef.current?.childNodes[2],
            ],
            {
                duration: 0.5,
                opacity: routes ? 0 : 1,
                visibility: routes ? "hidden" : "visible",
                ease: "power2.out",
                onComplete: () => {
                    navWrapperRef.current?.childNodes.forEach((e, idx) => {
                        if (
                            navWrapperRef.current?.childNodes?.length - 1 !==
                            idx
                        ) {
                            routes
                                ? e.classList.add("d-none")
                                : e.classList.remove("d-none");
                        }
                    });
                },
            },
            0
        )
            .to(
                navWrapperRef.current,
                {
                    duration: 0.5,
                    width: routes ? 54 : "100%",
                    ease: "power2.out",
                },
                0
            )
            .to(
                navWrapperRef.current?.childNodes[3],
                {
                    duration: 0.5,
                    opacity: routes ? 1 : 0,
                    visibility: routes ? "visible" : "hidden",
                    ease: "power2.out",
                    onComplete: () => {
                        if (routes)
                            navWrapperRef.current?.childNodes[3].classList.remove(
                                "d-none"
                            );
                        else
                            navWrapperRef.current?.childNodes[3].classList.add(
                                "d-none"
                            );
                    },
                },
                0
            );
    }, [path]);

    useEffect(() => {
        handleMobileNavbarBottom();
    }, [handleMobileNavbarBottom]);

    const handleOnClickHamburger = () => {
        const tl = gsap.timeline();
        const routes = path === "/profile" || path === "/notifications" || path === "/iap";
        tl.to(
            [
                navWrapperRef.current?.childNodes[0],
                navWrapperRef.current?.childNodes[1],
                navWrapperRef.current?.childNodes[2],
            ],
            {
                duration: 0.5,
                opacity: routes ? 1 : 0,
                visibility: routes ? "visible" : "hidden",
                ease: "power2.out",
                onComplete: () => {
                    navWrapperRef.current?.childNodes.forEach((e, idx) => {
                        if (
                            navWrapperRef.current?.childNodes.length - 1 !==
                            idx
                        ) {
                            routes
                                ? e.classList.remove("d-none")
                                : e.classList.add("d-none");
                        }
                    });
                },
            },
            0
        )
            .to(
                navWrapperRef.current,
                {
                    duration: 0.5,
                    width: routes ? "100%" : 70,
                    ease: "power2.out",
                },
                0
            )
            .to(
                navWrapperRef.current?.childNodes[3],
                {
                    duration: 0.5,
                    opacity: routes ? 0 : 1,
                    visibility: routes ? "hidden" : "visible",
                    ease: "power2.out",
                    onComplete: () => {
                        if (routes)
                            navWrapperRef.current?.childNodes[3].classList.add(
                                "d-none"
                            );
                        else
                            navWrapperRef.current?.childNodes[3].classList.remove(
                                "d-none"
                            );
                    },
                },
                0
            );
    };

    return (
        <div className="container-fluid navbar-bottom d-block d-md-none">
            <div className="navigation-wrapper" ref={navWrapperRef}>
                <Link
                    onClick={scrollToTop}
                    to={{
                        pathname: "/",
                        state: {
                            prevPath: history.location.pathname,
                        },
                    }}
                >
                    <p
                        className="mb-0"
                        style={{
                            color: path === "/" ? "#7824F8" : "#D6D6D6",
                        }}
                        onClick={onClickNavigationTabs}
                        data-name="home"
                    >
                        Home
                    </p>
                </Link>
                <Link
                    onClick={scrollToTop}
                    to={{
                        pathname: "/activity",
                        state: {
                            prevPath: history.location.pathname,
                        },
                    }}
                >
                    <p
                        className="mb-0"
                        style={{
                            color: path === "/activity" ? "#7824F8" : "#D6D6D6",
                        }}
                        onClick={onClickNavigationTabs}
                        data-name="activity"
                    >
                        Activity
                    </p>
                </Link>
                <Link
                    onClick={scrollToTop}
                    to={{
                        pathname: "/winners",
                        state: {
                            prevPath: history.location.pathname,
                        },
                    }}
                >
                    <p
                        className="mb-0"
                        style={{
                            color: path === "/winners" ? "#7824F8" : "#D6D6D6",
                        }}
                        onClick={onClickNavigationTabs}
                        data-name="winner"
                    >
                        Winner
                    </p>
                </Link>
                <div
                    className={`hamburger d-none`}
                    onClick={handleOnClickHamburger}
                >
                    <div className="point" />
                    <div className="point mx-2" />
                    <div className="point" />
                </div>
            </div>
        </div>
    );
};

export default Navigation;
