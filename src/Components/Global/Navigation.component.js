import React, { useRef, useCallback, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";

const Navigation = () => {
    const history = useHistory();

    const path = window.location.pathname;

    const navWrapperRef = useRef(null);

    const handleMobileNavbarBottom = useCallback(() => {
        const tl = gsap.timeline();
        const routes =
            path === "/profile" || path === "/notifications" || path === "/iap";
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
                    width: routes ? 60 : "100%",
                    borderRadius: "12px",
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
        const routes =
            path === "/profile" || path === "/notifications" || path === "/iap";
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

    const { t } = useTranslation();

    return (
        <div className="container-fluid navbar-bottom px-0 d-block d-md-none">
            <div className="navigation-wrapper" ref={navWrapperRef}>
                <NavLink
                    exact
                    to={{
                        pathname: "/",
                        state: {
                            prevPath: history.location.pathname,
                        },
                    }}
                    activeClassName="active"
                >
                    <p className="mb-0" data-name="home">
                        {t("nav.home")}
                    </p>
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
                    <p className="mb-0" data-name="activity">
                        {t("nav.activity")}
                    </p>
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
                    <p className="mb-0" data-name="winner">
                        {t("nav.winner")}
                    </p>
                </NavLink>
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
