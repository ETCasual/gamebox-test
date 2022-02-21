import "./styles.module.scss";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "Components/Landing/Navbar/Navbar.component";
import Login from "Components/Landing/LoginModal/LoginModal.component";
import Content from "Components/Landing/Content/Content.component";

import BlockedUserModal from "Components/Landing/BlockedUserModal/BlockedUserModal.component";
import BetaModal from "Components/Landing/BetaModal/BetaModal.component";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
    let loginRef = useRef(null);
    let loginWrapperRef = useRef(null);

    let heroRef = useRef(null);
    let workRef = useRef(null);
    let workCardRef = useRef([]);
    let dailyRewardRef = useRef(null);
    let dailyRewardCardRef = useRef(null);
    let iconsRef = useRef([]);

    // const [betaModal, setModal] = useState(false);
    const [blockedArchivedModal, setBlockedArchivedModal] = useState(
        sessionStorage.getItem("errorType") !== null ? true : false
    );

    // SCROLL TRIGGER ANIMATIONS
    useEffect(() => {
        // HERO
        const g1 = ScrollTrigger.create({
            trigger: heroRef.current,
            start: "top bottom",
            onEnter: () => {
                const tl = gsap.timeline();
                tl.to(
                    heroRef.current,
                    {
                        duration: 1,
                        autoAlpha: 1,
                        y: 0,
                        ease: "power4.out",
                    },
                    0
                )
                    .to(
                        iconsRef.current,
                        {
                            duration: 1,
                            autoAlpha: 1,
                            y: 0,
                            ease: "power4.out",
                            onComplete: () => {
                                const min = 1;
                                const max = 20;
                                gsap.utils
                                    .toArray(iconsRef.current.splice(2, 6))
                                    .forEach((item, idx) => {
                                        gsap.fromTo(
                                            item,
                                            { y: 0 },
                                            {
                                                delay: 0.2 + idx / 1.5,
                                                duration: 3,
                                                y: `-=${
                                                    Math.random() *
                                                        (max - min) +
                                                    min
                                                }px`,
                                                repeat: -1,
                                                yoyo: true,
                                                ease: "power2.easeInOut",
                                            }
                                        );
                                    });
                            },
                        },
                        0
                    )
                    .to(
                        [
                            workRef.current.childNodes[0],
                            workRef.current.childNodes[1],
                        ],
                        {
                            duration: 0.6,
                            autoAlpha: 1,
                            y: 0,
                            ease: "power4.out",
                            stagger: 0.2,
                        },
                        0
                    );
            },
        });

        // WORK
        const g2 = ScrollTrigger.create({
            trigger: workCardRef.current,
            start: "10% bottom",
            onEnter: () => {
                gsap.to(workCardRef.current, {
                    duration: 1,
                    autoAlpha: 1,
                    y: 0,
                    ease: "power2.out",
                    stagger: 0.2,
                });
            },
        });

        // DAILY REWARD
        const g3 = ScrollTrigger.create({
            trigger: dailyRewardRef.current,
            start: "100px bottom",
            onEnter: () => {
                const tl = gsap.timeline();
                tl.to(
                    [
                        dailyRewardRef.current.childNodes[0],
                        dailyRewardRef.current.childNodes[1],
                    ],
                    {
                        duration: 0.6,
                        autoAlpha: 1,
                        y: 0,
                        ease: "power4.out",
                        stagger: 0.2,
                    },
                    0
                ).to(
                    dailyRewardCardRef.current,
                    {
                        duration: 0.6,
                        autoAlpha: 1,
                        y: 0,
                        ease: "power4.out",
                        stagger: 0.2,
                    },
                    0.7
                );
            },
        });

        return () => {
            g1.kill();
            g2.kill();
            g3.kill();
        };
    }, []);

    // REVEAL LOGIN MODAL ANIMATION
    const handleOnClickSignUp = () => {
        gsap.to(loginRef.current, {
            duration: 1,
            display: "block",
            autoAlpha: 1,
            ease: "power2.out",
            onStart: () => {
                gsap.to(loginWrapperRef.current, {
                    delay: 0.5,
                    duration: 1,
                    bottom: 0,
                    ease: "power4.out",
                });
            },
        });
    };

    return (
        <>
            {/* TOP NAVIGATION BAR */}
            <Navbar handleSignUp={handleOnClickSignUp} />

            {/* MIDDLE CONTENT */}
            <Content
                handleSignUp={handleOnClickSignUp}
                heroRef={heroRef}
                iconsRef={iconsRef}
                workRef={workRef}
                workCardRef={workCardRef}
                dailyRewardRef={dailyRewardRef}
                dailyRewardCardRef={dailyRewardCardRef}
            />

            {/* BOTTOM LOGIN MODAL */}
            <Login loginRef={loginRef} loginWrapperRef={loginWrapperRef} />

            {/* BETA POPUP MODAL */}
            {/* {betaModal && <BetaModal setModal={setModal} />} */}

            {/* BLOCKED USER MODAL */}
            {blockedArchivedModal && (
                <BlockedUserModal
                    setBlockedArchivedModal={setBlockedArchivedModal}
                />
            )}
        </>
    );
};

export default Index;
