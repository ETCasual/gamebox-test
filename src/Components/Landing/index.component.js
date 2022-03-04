import "./styles.module.scss";

import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "Components/Landing/Navbar/Navbar.component";
import Content from "Components/Landing/Content/index.component";
import BlockedUserModal from "Components/Landing/BlockedUserModal/BlockedUserModal.component";

import loadLoginUser from "redux/thunks/Login.thunk";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    let heroRef = useRef(null);
    let workRef = useRef(null);
    let workCardRef = useRef([]);
    let dailyRewardRef = useRef(null);

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
                ).to(
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
                        dailyRewardRef.current.childNodes[2],
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

        return () => {
            g1.kill();
            g2.kill();
            g3.kill();
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("froyo-authenticationtoken");
        if (token) dispatch(loadLoginUser(history));
    }, [dispatch, history]);

    return (
        <>
            {/* TOP NAVIGATION BAR */}
            <Navbar />

            {/* MIDDLE CONTENT */}
            <Content
                heroRef={heroRef}
                workRef={workRef}
                workCardRef={workCardRef}
                dailyRewardRef={dailyRewardRef}
            />

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
