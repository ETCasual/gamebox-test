import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "Components/Landing/Navbar/Navbar.component";
import Content from "Components/Landing/Content/index.component";
import BlockedUserModal from "Components/Landing/BlockedUserModal/BlockedUserModal.component";
import Loading from "Components/Landing/Loading/Loading.component";

import { loadLoginUser } from "redux/thunks/Login.thunk";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
    const history = useHistory();

    const { user, loginStatus } = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    let heroRef = useRef(null);
    let workRef = useRef(null);
    let workCardRef = useRef([]);
    let dailyRewardRef = useRef(null);

    const [blockedArchivedModal, setBlockedArchivedModal] = useState(false);

    useEffect(() => {
        setBlockedArchivedModal(
            sessionStorage.getItem("errorType") !== null ? true : false
        );
    }, [user?.status]);

    // SCROLL TRIGGER ANIMATIONS
    useEffect(() => {
        let g1, g2, g3;
        if (
            heroRef.current &&
            workRef.current &&
            workCardRef.current &&
            dailyRewardRef.current &&
            gsap
        ) {
            // HERO
            g1 = ScrollTrigger.create({
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
            g2 = ScrollTrigger.create({
                trigger: workCardRef.current,
                start: "10% bottom",
                onEnter: () => {
                    if (workCardRef.current !== null && gsap)
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
            g3 = ScrollTrigger.create({
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
        }

        return () => {
            g1?.kill?.();
            g2?.kill?.();
            g3?.kill?.();
        };
    }, []);

    useEffect(() => {
        const token = localStorage
            .getItem("froyo-authenticationtoken")
            ?.replaceAll('"', "");
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

            {/* LOADING */}
            {(loginStatus.loading || loginStatus.ready) && <Loading />}

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
