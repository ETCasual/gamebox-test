import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "Components/Landing/Navbar/Navbar.component";
import Content from "Components/Landing/Content/index.component";
import BlockedUserModal from "Components/Landing/BlockedUserModal/BlockedUserModal.component";
import Loading from "Components/Landing/Loading/Loading.component";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
    const { user, loginStatus } = useSelector((state) => state.userData);
    let heroRef = useRef(null);
    let workRef = useRef(null);
    let workCardRef = useRef([]);
    let dailyRewardRef = useRef(null);

    const [blockedArchivedModal, setBlockedArchivedModal] = useState(false);

    const [registrationInstructionModal, setRegistrationInstructionModal] =
        useState(false);

    useEffect(() => {
        setBlockedArchivedModal(
            sessionStorage.getItem("errorType") !== null ? true : false
        );
    }, [user?.status]);

    // SCROLL TRIGGER ANIMATIONS
    useEffect(() => {
        let g1, g2, g3;
        function playFadeIn() {
            if (
                heroRef.current &&
                workRef.current &&
                workCardRef.current &&
                workCardRef.current[0] !== null &&
                workCardRef.current[1] !== null &&
                workCardRef.current[2] !== null &&
                workCardRef.current[0] !== "" &&
                workCardRef.current[1] !== "" &&
                workCardRef.current[2] !== "" &&
                dailyRewardRef.current
            ) {
                // HERO
                g1 = ScrollTrigger.create({
                    trigger: heroRef.current,
                    start: "top bottom",
                    onEnter: () => {
                        if (gsap) {
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
                        }
                    },
                });

                // WORK
                g2 = ScrollTrigger.create({
                    trigger: workCardRef.current,
                    start: "10% bottom",
                    onEnter: () => {
                        if (
                            gsap &&
                            workCardRef.current &&
                            workCardRef.current[0] !== null &&
                            workCardRef.current[1] !== null &&
                            workCardRef.current[2] !== null &&
                            workCardRef.current[0] !== "" &&
                            workCardRef.current[1] !== "" &&
                            workCardRef.current[2] !== ""
                        ) {
                            const tl = gsap.timeline();
                            tl.to(
                                workCardRef.current,
                                {
                                    duration: 1,
                                    autoAlpha: 1,
                                    y: 0,
                                    ease: "power2.out",
                                    stagger: 0.2,
                                },
                                0
                            );
                        }
                    },
                });

                // DAILY REWARD
                g3 = ScrollTrigger.create({
                    trigger: dailyRewardRef.current,
                    start: "100px bottom",
                    onEnter: () => {
                        if (gsap && dailyRewardRef.current) {
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
                        }
                    },
                });
            }
        }

        let delayId = setTimeout(playFadeIn, 500);

        return () => {
            clearTimeout(delayId);
            g1?.kill?.();
            g2?.kill?.();
            g3?.kill?.();
        };
    }, []);

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
                registrationInstructionModal={registrationInstructionModal}
                setRegistrationInstructionModal={
                    setRegistrationInstructionModal
                }
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
